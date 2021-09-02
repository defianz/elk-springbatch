"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiSettingsService = void 0;

var _ui_settings_api = require("./ui_settings_api");

var _ui_settings_client = require("./ui_settings_client");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @internal */
var UiSettingsService =
/*#__PURE__*/
function () {
  function UiSettingsService() {
    _classCallCheck(this, UiSettingsService);

    _defineProperty(this, "uiSettingsApi", void 0);

    _defineProperty(this, "uiSettingsClient", void 0);
  }

  _createClass(UiSettingsService, [{
    key: "setup",
    value: function setup(_ref) {
      var http = _ref.http,
          injectedMetadata = _ref.injectedMetadata,
          basePath = _ref.basePath;
      this.uiSettingsApi = new _ui_settings_api.UiSettingsApi(basePath, injectedMetadata.getKibanaVersion());
      http.addLoadingCount(this.uiSettingsApi.getLoadingCount$()); // TODO: Migrate away from legacyMetadata https://github.com/elastic/kibana/issues/22779

      var legacyMetadata = injectedMetadata.getLegacyMetadata();
      this.uiSettingsClient = new _ui_settings_client.UiSettingsClient({
        api: this.uiSettingsApi,
        defaults: legacyMetadata.uiSettings.defaults,
        initialSettings: legacyMetadata.uiSettings.user
      });
      return this.uiSettingsClient;
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.uiSettingsClient) {
        this.uiSettingsClient.stop();
      }

      if (this.uiSettingsApi) {
        this.uiSettingsApi.stop();
      }
    }
  }]);

  return UiSettingsService;
}();
/** @public */


exports.UiSettingsService = UiSettingsService;