"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createKfetch = createKfetch;
exports.withDefaultOptions = withDefaultOptions;
exports.addInterceptor = exports.resetInterceptors = void 0;

var _lodash = require("lodash");

var _kfetch_error = require("./kfetch_error");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var interceptors = [];

var resetInterceptors = function resetInterceptors() {
  return interceptors.length = 0;
};

exports.resetInterceptors = resetInterceptors;

var addInterceptor = function addInterceptor(interceptor) {
  return interceptors.push(interceptor);
};

exports.addInterceptor = addInterceptor;

function createKfetch(http) {
  return function kfetch(options) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$prependBasePath = _ref.prependBasePath,
        prependBasePath = _ref$prependBasePath === void 0 ? true : _ref$prependBasePath;

    return responseInterceptors(requestInterceptors(withDefaultOptions(options)).then(function (_ref2) {
      var pathname = _ref2.pathname,
          restOptions = _objectWithoutProperties(_ref2, ["pathname"]);

      return http.fetch(pathname, _objectSpread({}, restOptions, {
        prependBasePath: prependBasePath
      }));
    }).catch(function (err) {
      throw new _kfetch_error.KFetchError(err.response || {
        statusText: err.message
      }, err.body);
    }));
  };
} // Request/response interceptors are called in opposite orders.
// Request hooks start from the newest interceptor and end with the oldest.


function requestInterceptors(config) {
  return interceptors.reduceRight(function (acc, interceptor) {
    return acc.then(interceptor.request, interceptor.requestError);
  }, Promise.resolve(config));
} // Response hooks start from the oldest interceptor and end with the newest.


function responseInterceptors(responsePromise) {
  return interceptors.reduce(function (acc, interceptor) {
    return acc.then(interceptor.response, interceptor.responseError);
  }, responsePromise);
}

function withDefaultOptions(options) {
  var withDefaults = (0, _lodash.merge)({
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  }, options);

  if (options && options.headers && 'Content-Type' in options.headers && options.headers['Content-Type'] === undefined) {
    // TS thinks headers could be undefined here, but that isn't possible because
    // of the merge above.
    // @ts-ignore
    withDefaults.headers['Content-Type'] = undefined;
  }

  return withDefaults;
}