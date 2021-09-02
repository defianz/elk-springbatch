"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KibanaParsedUrl = void 0;

var _url = require("url");

var _utils = require("../../../../core/public/utils");

var _prepend_path = require("./prepend_path");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents the pieces that make up a url in Kibana, offering some helpful functionality
 * for translating those pieces into absolute or relative urls. A Kibana url with a basePath
 * looks like this: http://localhost:5601/basePath/app/appId#/an/appPath?with=query&params
 *
 *  - basePath is "/basePath"
 *  - appId is "appId"
 *  - appPath is "/an/appPath?with=query&params"
 *
 * Almost all urls in Kibana should have this structure, including the "/app" portion in front of the appId
 * (one exception is the login link).
 */
var KibanaParsedUrl =
/*#__PURE__*/
function () {
  function KibanaParsedUrl(options) {
    _classCallCheck(this, KibanaParsedUrl);

    _defineProperty(this, "appId", void 0);

    _defineProperty(this, "appPath", void 0);

    _defineProperty(this, "basePath", void 0);

    _defineProperty(this, "hostname", void 0);

    _defineProperty(this, "protocol", void 0);

    _defineProperty(this, "port", void 0);

    var appId = options.appId,
        _options$basePath = options.basePath,
        basePath = _options$basePath === void 0 ? '' : _options$basePath,
        _options$appPath = options.appPath,
        appPath = _options$appPath === void 0 ? '' : _options$appPath,
        hostname = options.hostname,
        protocol = options.protocol,
        port = options.port; // We'll use window defaults

    var hostOrProtocolSpecified = hostname || protocol || port;
    this.basePath = basePath;
    this.appId = appId;
    this.appPath = appPath;
    this.hostname = hostOrProtocolSpecified ? hostname : window.location.hostname;
    this.port = hostOrProtocolSpecified ? port : window.location.port;
    this.protocol = hostOrProtocolSpecified ? protocol : window.location.protocol;
  }

  _createClass(KibanaParsedUrl, [{
    key: "getGlobalState",
    value: function getGlobalState() {
      if (!this.appPath) {
        return '';
      }

      var parsedUrl = (0, _url.parse)(this.appPath, true);
      var query = parsedUrl.query || {};
      return query._g || '';
    }
  }, {
    key: "setGlobalState",
    value: function setGlobalState(newGlobalState) {
      if (!this.appPath) {
        return;
      }

      this.appPath = (0, _utils.modifyUrl)(this.appPath, function (parsed) {
        parsed.query._g = newGlobalState;
      });
    }
  }, {
    key: "addQueryParameter",
    value: function addQueryParameter(name, val) {
      this.appPath = (0, _utils.modifyUrl)(this.appPath, function (parsed) {
        parsed.query[name] = val;
      });
    }
  }, {
    key: "getHashedAppPath",
    value: function getHashedAppPath() {
      return "#".concat(this.appPath);
    }
  }, {
    key: "getAppBasePath",
    value: function getAppBasePath() {
      return "/".concat(this.appId);
    }
  }, {
    key: "getAppRootPath",
    value: function getAppRootPath() {
      return "/app".concat(this.getAppBasePath()).concat(this.getHashedAppPath());
    }
  }, {
    key: "getRootRelativePath",
    value: function getRootRelativePath() {
      return (0, _prepend_path.prependPath)(this.getAppRootPath(), this.basePath);
    }
  }, {
    key: "getAbsoluteUrl",
    value: function getAbsoluteUrl() {
      var _this = this;

      return (0, _utils.modifyUrl)(this.getRootRelativePath(), function (parsed) {
        parsed.protocol = _this.protocol;
        parsed.port = _this.port;
        parsed.hostname = _this.hostname;
      });
    }
  }]);

  return KibanaParsedUrl;
}();

exports.KibanaParsedUrl = KibanaParsedUrl;