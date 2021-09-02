"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FatalErrorsScreen = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var FatalErrorsScreen =
/*#__PURE__*/
function (_React$Component) {
  _inherits(FatalErrorsScreen, _React$Component);

  function FatalErrorsScreen() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FatalErrorsScreen);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FatalErrorsScreen)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      errors: []
    });

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "onClickGoBack", function (e) {
      e.preventDefault();
      window.history.back();
    });

    _defineProperty(_assertThisInitialized(_this), "onClickClearSession", function (e) {
      e.preventDefault();
      localStorage.clear();
      sessionStorage.clear();
      window.location.hash = '';
      window.location.reload();
    });

    return _this;
  }

  _createClass(FatalErrorsScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscription = Rx.merge( // reload the page if hash-based navigation is attempted
      Rx.fromEvent(window, 'hashchange').pipe((0, _operators.tap)(function () {
        window.location.reload();
      })), // consume error notifications and set them to the component state
      this.props.errorInfo$.pipe((0, _operators.tap)(function (error) {
        _this2.setState(function (state) {
          return _objectSpread({}, state, {
            errors: [].concat(_toConsumableArray(state.errors), [error])
          });
        });
      }))).subscribe({
        error: function error(_error) {
          // eslint-disable-next-line no-console
          console.error('Uncaught error in fatal error screen internals', _error);
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react.default.createElement(_eui.EuiPage, {
        style: {
          minHeight: '100vh'
        }
      }, _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, {
        verticalPosition: "center",
        horizontalPosition: "center"
      }, _react.default.createElement(_eui.EuiEmptyPrompt, {
        iconType: "alert",
        iconColor: "danger",
        title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "core.fatalErrors.somethingWentWrongTitle",
          defaultMessage: "Something went wrong"
        })),
        body: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "core.fatalErrors.tryRefreshingPageDescription",
          defaultMessage: "Try refreshing the page. If that doesn't work, go back to the previous page or clear your session data."
        })),
        actions: [_react.default.createElement(_eui.EuiButton, {
          color: "primary",
          fill: true,
          onClick: this.onClickClearSession,
          "data-test-subj": "clearSession"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "core.fatalErrors.clearYourSessionButtonLabel",
          defaultMessage: "Clear your session"
        })), _react.default.createElement(_eui.EuiButtonEmpty, {
          onClick: this.onClickGoBack,
          "data-test-subj": "goBack"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "core.fatalErrors.goBackButtonLabel",
          defaultMessage: "Go back"
        }))]
      }), this.state.errors.map(function (error, i) {
        return _react.default.createElement(_eui.EuiCallOut, {
          key: i,
          title: error.message,
          color: "danger",
          iconType: "alert"
        }, _react.default.createElement(_eui.EuiCodeBlock, {
          language: "bash",
          className: "eui-textBreakAll"
        }, "Version: ".concat(_this3.props.kibanaVersion) + '\n' + "Build: ".concat(_this3.props.buildNumber) + '\n' + (error.stack ? error.stack : '')));
      }))));
    }
  }]);

  return FatalErrorsScreen;
}(_react.default.Component);

exports.FatalErrorsScreen = FatalErrorsScreen;