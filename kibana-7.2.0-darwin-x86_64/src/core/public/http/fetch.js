"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = void 0;

var _lodash = require("lodash");

var _url = require("url");

var _http_fetch_error = require("./http_fetch_error");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JSON_CONTENT = /^(application\/(json|x-javascript)|text\/(x-)?javascript|x-json)(;.*)?$/;
var NDJSON_CONTENT = /^(application\/ndjson)(;.*)?$/;

var setup = function setup(_ref) {
  var basePath = _ref.basePath,
      injectedMetadata = _ref.injectedMetadata;

  function fetch(_x) {
    return _fetch.apply(this, arguments);
  }

  function _fetch() {
    _fetch = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(path) {
      var options,
          _merge,
          query,
          prependBasePath,
          fetchOptions,
          url,
          response,
          body,
          contentType,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _merge = (0, _lodash.merge)({
                method: 'GET',
                credentials: 'same-origin',
                prependBasePath: true,
                headers: {
                  'kbn-version': injectedMetadata.getKibanaVersion(),
                  'Content-Type': 'application/json'
                }
              }, options), query = _merge.query, prependBasePath = _merge.prependBasePath, fetchOptions = _objectWithoutProperties(_merge, ["query", "prependBasePath"]);
              url = (0, _url.format)({
                pathname: prependBasePath ? basePath.addToPath(path) : path,
                query: query
              });

              if (options.headers && 'Content-Type' in options.headers && options.headers['Content-Type'] === undefined) {
                delete fetchOptions.headers['Content-Type'];
              }

              body = null;
              _context.prev = 5;
              _context.next = 8;
              return window.fetch(url, fetchOptions);

            case 8:
              response = _context.sent;
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](5);
              throw new _http_fetch_error.HttpFetchError(_context.t0.message);

            case 14:
              contentType = response.headers.get('Content-Type') || '';
              _context.prev = 15;

              if (!NDJSON_CONTENT.test(contentType)) {
                _context.next = 22;
                break;
              }

              _context.next = 19;
              return response.blob();

            case 19:
              body = _context.sent;
              _context.next = 31;
              break;

            case 22:
              if (!JSON_CONTENT.test(contentType)) {
                _context.next = 28;
                break;
              }

              _context.next = 25;
              return response.json();

            case 25:
              body = _context.sent;
              _context.next = 31;
              break;

            case 28:
              _context.next = 30;
              return response.text();

            case 30:
              body = _context.sent;

            case 31:
              _context.next = 36;
              break;

            case 33:
              _context.prev = 33;
              _context.t1 = _context["catch"](15);
              throw new _http_fetch_error.HttpFetchError(_context.t1.message, response, body);

            case 36:
              if (response.ok) {
                _context.next = 38;
                break;
              }

              throw new _http_fetch_error.HttpFetchError(response.statusText, response, body);

            case 38:
              return _context.abrupt("return", body);

            case 39:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 11], [15, 33]]);
    }));
    return _fetch.apply(this, arguments);
  }

  function shorthand(method) {
    return function (path) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return fetch(path, _objectSpread({}, options, {
        method: method
      }));
    };
  }

  return {
    fetch: fetch,
    shorthand: shorthand
  };
};

exports.setup = setup;