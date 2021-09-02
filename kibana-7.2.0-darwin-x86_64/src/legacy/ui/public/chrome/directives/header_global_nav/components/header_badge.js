"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderBadge = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HeaderBadge =
/*#__PURE__*/
function (_Component) {
  _inherits(HeaderBadge, _Component);

  function HeaderBadge(props) {
    var _this;

    _classCallCheck(this, HeaderBadge);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderBadge).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _this.state = {
      badge: undefined
    };
    return _this;
  }

  _createClass(HeaderBadge, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.subscribe();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.badge$ === this.props.badge$) {
        return;
      }

      this.unsubscribe();
      this.subscribe();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.badge == null) {
        return null;
      }

      return _react.default.createElement("div", {
        className: "chrHeaderBadge__wrapper"
      }, _react.default.createElement(_eui.EuiBetaBadge, {
        "data-test-subj": "headerBadge",
        "data-test-badge-label": this.state.badge.text,
        tabIndex: 0,
        label: this.state.badge.text,
        tooltipContent: this.state.badge.tooltip,
        iconType: this.state.badge.iconType
      }));
    }
  }, {
    key: "subscribe",
    value: function subscribe() {
      var _this2 = this;

      this.subscription = this.props.badge$.subscribe(function (badge) {
        _this2.setState({
          badge: badge
        });
      });
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }
    }
  }]);

  return HeaderBadge;
}(_react.Component);

exports.HeaderBadge = HeaderBadge;