"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shortenUrl = shortenUrl;

var _kfetch = require("ui/kfetch");

var _url = _interopRequireDefault(require("url"));

var _chrome = _interopRequireDefault(require("../../chrome"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function shortenUrl(_x) {
  return _shortenUrl.apply(this, arguments);
}

function _shortenUrl() {
  _shortenUrl = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(absoluteUrl) {
    var basePath, parsedUrl, path, hash, relativeUrl, body, resp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            basePath = _chrome.default.getBasePath();
            parsedUrl = _url.default.parse(absoluteUrl);

            if (!(!parsedUrl || !parsedUrl.path)) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            path = parsedUrl.path.replace(basePath, '');
            hash = parsedUrl.hash ? parsedUrl.hash : '';
            relativeUrl = path + hash;
            body = JSON.stringify({
              url: relativeUrl
            });
            _context.next = 10;
            return (0, _kfetch.kfetch)({
              method: 'POST',
              pathname: '/api/shorten_url',
              body: body
            });

          case 10:
            resp = _context.sent;
            return _context.abrupt("return", _url.default.format({
              protocol: parsedUrl.protocol,
              host: parsedUrl.host,
              pathname: "".concat(basePath, "/goto/").concat(resp.urlId)
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _shortenUrl.apply(this, arguments);
}