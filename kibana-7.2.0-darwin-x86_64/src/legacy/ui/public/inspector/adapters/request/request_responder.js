"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestResponder = void 0;

var _i18n = require("@kbn/i18n");

var _types = require("./types");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An API to specify information about a specific request that will be logged.
 * Create a new instance to log a request using {@link RequestAdapter#start}.
 */
var RequestResponder =
/*#__PURE__*/
function () {
  function RequestResponder(request, onChange) {
    _classCallCheck(this, RequestResponder);

    _defineProperty(this, "request", void 0);

    _defineProperty(this, "onChange", void 0);

    this.request = request;
    this.onChange = onChange;
  }

  _createClass(RequestResponder, [{
    key: "json",
    value: function json(reqJson) {
      this.request.json = reqJson;
      this.onChange();
      return this;
    }
  }, {
    key: "stats",
    value: function stats(_stats) {
      this.request.stats = _objectSpread({}, this.request.stats || {}, _stats);
      var startDate = new Date(this.request.startTime);
      this.request.stats.requestTimestamp = {
        label: _i18n.i18n.translate('common.ui.inspector.reqTimestampKey', {
          defaultMessage: 'Request timestamp'
        }),
        value: startDate.toISOString(),
        description: _i18n.i18n.translate('common.ui.inspector.reqTimestampDescription', {
          defaultMessage: 'Time when the start of the request has been logged'
        })
      };
      this.onChange();
      return this;
    }
  }, {
    key: "finish",
    value: function finish(status, response) {
      this.request.time = Date.now() - this.request.startTime;
      this.request.status = status;
      this.request.response = response;
      this.onChange();
    }
  }, {
    key: "ok",
    value: function ok(response) {
      this.finish(_types.RequestStatus.OK, response);
    }
  }, {
    key: "error",
    value: function error(response) {
      this.finish(_types.RequestStatus.ERROR, response);
    }
  }]);

  return RequestResponder;
}();

exports.RequestResponder = RequestResponder;