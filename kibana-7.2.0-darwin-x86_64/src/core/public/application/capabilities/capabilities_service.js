"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CapabilitiesService = void 0;

var _deep_freeze = require("../../utils/deep_freeze");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** @internal */

/**
 * Service that is responsible for UI Capabilities.
 */
var CapabilitiesService =
/*#__PURE__*/
function () {
  function CapabilitiesService() {
    _classCallCheck(this, CapabilitiesService);
  }

  _createClass(CapabilitiesService, [{
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var apps, basePath, injectedMetadata, capabilities, availableApps;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apps = _ref.apps, basePath = _ref.basePath, injectedMetadata = _ref.injectedMetadata;
                capabilities = (0, _deep_freeze.deepFreeze)(injectedMetadata.getCapabilities());
                availableApps = apps.filter(function (app) {
                  return capabilities.navLinks[app.id];
                });
                return _context.abrupt("return", {
                  availableApps: availableApps,
                  capabilities: capabilities
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function start(_x) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }]);

  return CapabilitiesService;
}();

exports.CapabilitiesService = CapabilitiesService;