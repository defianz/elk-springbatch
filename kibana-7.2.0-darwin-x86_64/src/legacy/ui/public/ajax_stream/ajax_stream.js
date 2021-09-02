"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ajaxStream = ajaxStream;

var _lodash = require("lodash");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Create a function which, when successively passed streaming response text,
// calls a handler callback with each response in the batch.
function processBatchResponseStream(handler) {
  var index = 0;
  return function (text) {
    // While there's text to process...
    while (index < text.length) {
      // Our messages are delimited by colon: len:json
      var delim = ':';
      var delimIndex = text.indexOf(delim, index);
      var payloadStart = delimIndex + delim.length; // We've got an incomplete batch length

      if (delimIndex < 0) {
        return;
      }

      var rawLen = text.slice(index, delimIndex);
      var payloadLen = parseInt(rawLen, 10);
      var payloadEnd = payloadStart + payloadLen; // We've got an invalid batch message (e.g. one without a numeric length: prefix)

      if (isNaN(payloadLen)) {
        throw new Error("Invalid stream response length: ".concat(rawLen));
      } // We've got an incomplete batch message


      if (text.length < payloadEnd) {
        return;
      }

      var payload = JSON.parse(text.slice(payloadStart, payloadEnd));
      handler(payload);
      index = payloadEnd;
    }
  };
}
/**
 * Sends an AJAX request to the server, and processes the result as a
 * streaming HTTP/1 response.
 *
 * @param basePath - The Kibana basepath
 * @param defaultHeaders - The default HTTP headers to be sent with each request
 * @param req - The XMLHttpRequest
 * @param opts - The request options
 * @returns A promise which resolves when the entire batch response has been processed.
 */


function ajaxStream(basePath, defaultHeaders, req, opts) {
  return new Promise(function (resolve, reject) {
    var url = opts.url,
        method = opts.method,
        headers = opts.headers; // There are several paths by which the promise may resolve or reject. We wrap this
    // in "once" as a safeguard against cases where we attempt more than one call. (e.g.
    // a batch handler fails, so we reject the promise, but then new data comes in for
    // a subsequent batch item)

    var complete = (0, _lodash.once)(function () {
      var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      return err ? reject(err) : resolve(req);
    }); // Begin the request

    req.open(method || 'POST', "".concat(basePath, "/").concat(url.replace(/^\//, '')));
    req.withCredentials = true; // Set the HTTP headers

    Object.entries(Object.assign({}, defaultHeaders, headers)).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      return req.setRequestHeader(k, v);
    });
    var batchHandler = processBatchResponseStream(opts.onResponse);

    var processBatch = function processBatch() {
      try {
        batchHandler(req.responseText);
      } catch (err) {
        req.abort();
        complete(err);
      }
    };

    req.onprogress = processBatch;

    req.onreadystatechange = function () {
      // Older browsers don't support onprogress, so we need
      // to call this here, too. It's safe to call this multiple
      // times even for the same progress event.
      processBatch(); // 4 is the magic number that means the request is done

      if (req.readyState === 4) {
        // 0 indicates a network failure. 400+ messages are considered server errors
        if (req.status === 0 || req.status >= 400) {
          complete(new Error("Batch request failed with status ".concat(req.status)));
        } else {
          complete();
        }
      }
    }; // Send the payload to the server


    req.send(opts.body);
  });
}