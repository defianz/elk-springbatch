"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestAdapter = void 0;

var _events = require("events");

var _lodash = _interopRequireDefault(require("lodash"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _request_responder = require("./request_responder");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An generic inspector adapter to log requests.
 * These can be presented in the inspector using the requests view.
 * The adapter is not coupled to a specific implementation or even Elasticsearch
 * instead it offers a generic API to log requests of any kind.
 * @extends EventEmitter
 */
var RequestAdapter =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(RequestAdapter, _EventEmitter);

  function RequestAdapter() {
    var _this;

    _classCallCheck(this, RequestAdapter);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RequestAdapter).call(this));

    _defineProperty(_assertThisInitialized(_this), "requests", void 0);

    _this.requests = new Map();
    return _this;
  }
  /**
   * Start logging a new request into this request adapter. The new request will
   * by default be in a processing state unless you explicitly finish it via
   * {@link RequestResponder#finish}, {@link RequestResponder#ok} or
   * {@link RequestResponder#error}.
   *
   * @param  {string} name The name of this request as it should be shown in the UI.
   * @param  {object} args Additional arguments for the request.
   * @return {RequestResponder} An instance to add information to the request and finish it.
   */


  _createClass(RequestAdapter, [{
    key: "start",
    value: function start(name) {
      var _this2 = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var req = _objectSpread({}, params, {
        name: name,
        startTime: Date.now(),
        status: _types.RequestStatus.PENDING,
        id: _lodash.default.get(params, 'id', (0, _v.default)())
      });

      this.requests.set(req.id, req);

      this._onChange();

      return new _request_responder.RequestResponder(req, function () {
        return _this2._onChange();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.requests = new Map();

      this._onChange();
    }
  }, {
    key: "resetRequest",
    value: function resetRequest(id) {
      this.requests.delete(id);

      this._onChange();
    }
  }, {
    key: "getRequests",
    value: function getRequests() {
      return Array.from(this.requests.values());
    }
  }, {
    key: "_onChange",
    value: function _onChange() {
      this.emit('change');
    }
  }]);

  return RequestAdapter;
}(_events.EventEmitter);

exports.RequestAdapter = RequestAdapter;