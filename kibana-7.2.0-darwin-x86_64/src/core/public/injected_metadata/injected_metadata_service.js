"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InjectedMetadataService = void 0;

var _lodash = require("lodash");

var _deep_freeze = require("../utils/deep_freeze");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Provides access to the metadata that is injected by the
 * server into the page. The metadata is actually defined
 * in the entry file for the bundle containing the new platform
 * and is read from the DOM in most cases.
 *
 * @internal
 */
var InjectedMetadataService =
/*#__PURE__*/
function () {
  function InjectedMetadataService(params) {
    _classCallCheck(this, InjectedMetadataService);

    this.params = params;

    _defineProperty(this, "state", (0, _deep_freeze.deepFreeze)(this.params.injectedMetadata));
  }

  _createClass(InjectedMetadataService, [{
    key: "start",
    value: function start() {
      return this.setup();
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this = this;

      return {
        getBasePath: function getBasePath() {
          return _this.state.basePath;
        },
        getKibanaVersion: function getKibanaVersion() {
          return _this.state.version;
        },
        getCapabilities: function getCapabilities() {
          return _this.state.capabilities;
        },
        getCspConfig: function getCspConfig() {
          return _this.state.csp;
        },
        getPlugins: function getPlugins() {
          return _this.state.uiPlugins;
        },
        getLegacyMetadata: function getLegacyMetadata() {
          return _this.state.legacyMetadata;
        },
        getInjectedVar: function getInjectedVar(name, defaultValue) {
          return (0, _lodash.get)(_this.state.vars, name, defaultValue);
        },
        getInjectedVars: function getInjectedVars() {
          return _this.state.vars;
        },
        getKibanaBuildNumber: function getKibanaBuildNumber() {
          return _this.state.buildNumber;
        }
      };
    }
  }]);

  return InjectedMetadataService;
}();
/**
 * Provides access to the metadata injected by the server into the page
 *
 * @public
 */


exports.InjectedMetadataService = InjectedMetadataService;