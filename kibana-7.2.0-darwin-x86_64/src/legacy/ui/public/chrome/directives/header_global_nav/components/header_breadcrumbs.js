"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderBreadcrumbs = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var HeaderBreadcrumbs =
/*#__PURE__*/
function (_Component) {
  _inherits(HeaderBreadcrumbs, _Component);

  function HeaderBreadcrumbs(props) {
    var _this;

    _classCallCheck(this, HeaderBreadcrumbs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderBreadcrumbs).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _this.state = {
      breadcrumbs: []
    };
    return _this;
  }

  _createClass(HeaderBreadcrumbs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.subscribe();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.breadcrumbs$ === this.props.breadcrumbs$) {
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
      return _react.default.createElement(_eui.EuiHeaderBreadcrumbs, {
        breadcrumbs: this.getBreadcrumbs(),
        "data-test-subj": "breadcrumbs"
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe() {
      var _this2 = this;

      this.subscription = this.props.breadcrumbs$.subscribe(function (breadcrumbs) {
        _this2.setState({
          breadcrumbs: breadcrumbs
        });
      });
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        delete this.subscription;
      }
    }
  }, {
    key: "getBreadcrumbs",
    value: function getBreadcrumbs() {
      var breadcrumbs = this.state.breadcrumbs;

      if (breadcrumbs.length === 0 && this.props.appTitle) {
        breadcrumbs = [{
          text: this.props.appTitle
        }];
      }

      return breadcrumbs.map(function (breadcrumb, i) {
        return _objectSpread({}, breadcrumb, {
          'data-test-subj': (0, _classnames.default)('breadcrumb', breadcrumb['data-test-subj'], i === 0 && 'first', i === breadcrumbs.length - 1 && 'last')
        });
      });
    }
  }]);

  return HeaderBreadcrumbs;
}(_react.Component);

exports.HeaderBreadcrumbs = HeaderBreadcrumbs;