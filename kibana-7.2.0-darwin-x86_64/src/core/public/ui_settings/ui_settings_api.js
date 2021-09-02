"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsApi = void 0;

var _rxjs = require("rxjs");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NOOP_CHANGES = {
  values: {},
  callback: function callback() {// noop
  }
};

var UiSettingsApi =
/*#__PURE__*/
function () {
  function UiSettingsApi(basePath, kibanaVersion) {
    _classCallCheck(this, UiSettingsApi);

    this.basePath = basePath;
    this.kibanaVersion = kibanaVersion;

    _defineProperty(this, "pendingChanges", void 0);

    _defineProperty(this, "sendInProgress", false);

    _defineProperty(this, "loadingCount$", new _rxjs.BehaviorSubject(0));
  }
  /**
   * Adds a key+value that will be sent to the server ASAP. If a request is
   * already in progress it will wait until the previous request is complete
   * before sending the next request
   */


  _createClass(UiSettingsApi, [{
    key: "batchSet",
    value: function batchSet(key, value) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var prev = _this.pendingChanges || NOOP_CHANGES;
        _this.pendingChanges = {
          values: _objectSpread({}, prev.values, _defineProperty({}, key, value)),
          callback: function callback(error, resp) {
            prev.callback(error, resp);

            if (error) {
              reject(error);
            } else {
              resolve(resp);
            }
          }
        };

        _this.flushPendingChanges();
      });
    }
    /**
     * Gets an observable that notifies subscribers of the current number of active requests
     */

  }, {
    key: "getLoadingCount$",
    value: function getLoadingCount$() {
      return this.loadingCount$.asObservable();
    }
    /**
     * Prepares the uiSettings API to be discarded
     */

  }, {
    key: "stop",
    value: function stop() {
      this.loadingCount$.complete();
    }
    /**
     * If there are changes that need to be sent to the server and there is not already a
     * request in progress, this method will start a request sending those changes. Once
     * the request is complete `flushPendingChanges()` will be called again, and if the
     * prerequisites are still true (because changes were queued while the request was in
     * progress) then another request will be started until all pending changes have been
     * sent to the server.
     */

  }, {
    key: "flushPendingChanges",
    value: function () {
      var _flushPendingChanges = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var changes;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.pendingChanges) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!this.sendInProgress) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return");

              case 4:
                changes = this.pendingChanges;
                this.pendingChanges = undefined;
                _context.prev = 6;
                this.sendInProgress = true;
                _context.t0 = changes;
                _context.t1 = undefined;
                _context.next = 12;
                return this.sendRequest('POST', '/api/kibana/settings', {
                  changes: changes.values
                });

              case 12:
                _context.t2 = _context.sent;

                _context.t0.callback.call(_context.t0, _context.t1, _context.t2);

                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t3 = _context["catch"](6);
                changes.callback(_context.t3);

              case 19:
                _context.prev = 19;
                this.sendInProgress = false;
                this.flushPendingChanges();
                return _context.finish(19);

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 16, 19, 23]]);
      }));

      function flushPendingChanges() {
        return _flushPendingChanges.apply(this, arguments);
      }

      return flushPendingChanges;
    }()
    /**
     * Calls window.fetch() with the proper headers and error handling logic.
     *
     * TODO: migrate this to kfetch or whatever the new platform equivalent is once it exists
     */

  }, {
    key: "sendRequest",
    value: function () {
      var _sendRequest = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(method, path, body) {
        var _response;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                this.loadingCount$.next(this.loadingCount$.getValue() + 1);
                _context2.next = 4;
                return fetch(this.basePath.addToPath(path), {
                  method: method,
                  body: JSON.stringify(body),
                  headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    'kbn-version': this.kibanaVersion
                  },
                  credentials: 'same-origin'
                });

              case 4:
                _response = _context2.sent;

                if (!(_response.status >= 300)) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("Request failed with status code: ".concat(_response.status));

              case 7:
                _context2.next = 9;
                return _response.json();

              case 9:
                return _context2.abrupt("return", _context2.sent);

              case 10:
                _context2.prev = 10;
                this.loadingCount$.next(this.loadingCount$.getValue() - 1);
                return _context2.finish(10);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0,, 10, 13]]);
      }));

      function sendRequest(_x, _x2, _x3) {
        return _sendRequest.apply(this, arguments);
      }

      return sendRequest;
    }()
  }]);

  return UiSettingsApi;
}();

exports.UiSettingsApi = UiSettingsApi;