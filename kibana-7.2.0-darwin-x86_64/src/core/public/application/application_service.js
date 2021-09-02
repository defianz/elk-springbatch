"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationService = void 0;

var _rxjs = require("rxjs");

var _capabilities = require("./capabilities");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Service that is responsible for registering new applications.
 * @internal
 */
var ApplicationService =
/*#__PURE__*/
function () {
  function ApplicationService() {
    _classCallCheck(this, ApplicationService);

    _defineProperty(this, "apps$", new _rxjs.BehaviorSubject([]));

    _defineProperty(this, "legacyApps$", new _rxjs.BehaviorSubject([]));

    _defineProperty(this, "capabilities", new _capabilities.CapabilitiesService());
  }

  _createClass(ApplicationService, [{
    key: "setup",
    value: function setup() {
      var _this = this;

      return {
        registerApp: function registerApp(app) {
          _this.apps$.next([].concat(_toConsumableArray(_this.apps$.value), [app]));
        },
        registerLegacyApp: function registerLegacyApp(app) {
          _this.legacyApps$.next([].concat(_toConsumableArray(_this.legacyApps$.value), [app]));
        }
      };
    }
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var basePath, injectedMetadata, apps, _ref2, capabilities, availableApps;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                basePath = _ref.basePath, injectedMetadata = _ref.injectedMetadata;
                this.apps$.complete();
                this.legacyApps$.complete();
                apps = [].concat(_toConsumableArray(this.apps$.value), _toConsumableArray(this.legacyApps$.value));
                _context.next = 6;
                return this.capabilities.start({
                  apps: apps,
                  basePath: basePath,
                  injectedMetadata: injectedMetadata
                });

              case 6:
                _ref2 = _context.sent;
                capabilities = _ref2.capabilities;
                availableApps = _ref2.availableApps;
                return _context.abrupt("return", {
                  mount: function mount() {},
                  capabilities: capabilities,
                  availableApps: availableApps
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function start(_x) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return ApplicationService;
}();

exports.ApplicationService = ApplicationService;