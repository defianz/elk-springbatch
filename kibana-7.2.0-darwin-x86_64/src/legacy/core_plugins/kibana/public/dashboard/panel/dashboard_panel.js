"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardPanel = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash"));

var _react2 = _interopRequireDefault(require("react"));

var _panel_error = require("./panel_error");

var _panel_header = require("./panel_header");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DashboardPanelUi =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DashboardPanelUi, _React$Component);

  function DashboardPanelUi(props) {
    var _this;

    _classCallCheck(this, DashboardPanelUi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DashboardPanelUi).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "mounted", void 0);

    _defineProperty(_assertThisInitialized(_this), "embeddable", void 0);

    _defineProperty(_assertThisInitialized(_this), "onFocus", function () {
      var _this$props = _this.props,
          onPanelFocused = _this$props.onPanelFocused,
          panel = _this$props.panel;

      if (onPanelFocused) {
        onPanelFocused(panel.panelIndex);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      var _this$props2 = _this.props,
          onPanelBlurred = _this$props2.onPanelBlurred,
          panel = _this$props2.panel;

      if (onPanelBlurred) {
        onPanelBlurred(panel.panelIndex);
      }
    });

    _this.state = {
      error: props.embeddableFactory ? null : props.intl.formatMessage({
        id: 'kbn.dashboard.panel.noEmbeddableFactoryErrorMessage',
        defaultMessage: 'The feature to render this panel is missing.'
      })
    };
    _this.mounted = false;
    return _this;
  }

  _createClass(DashboardPanelUi, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var _this$props3, initialized, embeddableFactory, embeddableIsInitializing, panel, embeddableStateChanged, embeddableIsInitialized, embeddableError;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.mounted = true;
                _this$props3 = this.props, initialized = _this$props3.initialized, embeddableFactory = _this$props3.embeddableFactory, embeddableIsInitializing = _this$props3.embeddableIsInitializing, panel = _this$props3.panel, embeddableStateChanged = _this$props3.embeddableStateChanged, embeddableIsInitialized = _this$props3.embeddableIsInitialized, embeddableError = _this$props3.embeddableError;

                if (!initialized) {
                  embeddableIsInitializing();
                  embeddableFactory.create(panel, embeddableStateChanged).then(function (embeddable) {
                    if (_this2.mounted) {
                      _this2.embeddable = embeddable;
                      embeddableIsInitialized(embeddable.metadata);

                      _this2.embeddable.render(_this2.panelElement, _this2.props.containerState);
                    } else {
                      embeddable.destroy();
                    }
                  }).catch(function (error) {
                    if (_this2.mounted) {
                      embeddableError(error.message);
                    }
                  });
                }

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.destroy();
      this.mounted = false;

      if (this.embeddable) {
        this.embeddable.destroy();
      }
    }
  }, {
    key: "renderEmbeddableViewport",
    value: function renderEmbeddableViewport() {
      var _this3 = this;

      var classes = (0, _classnames.default)('panel-content', {
        'panel-content-isLoading': !this.props.initialized
      });
      return _react2.default.createElement("div", {
        id: "embeddedPanel",
        className: classes,
        ref: function ref(panelElement) {
          return _this3.panelElement = panelElement;
        }
      }, !this.props.initialized && _react2.default.createElement(_eui.EuiLoadingChart, {
        size: "l",
        mono: true
      }));
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      if (this.embeddable && !_lodash.default.isEqual(nextProps.containerState, this.props.containerState)) {
        this.embeddable.onContainerStateChanged(nextProps.containerState);
      }

      if (this.embeddable && nextProps.lastReloadRequestTime !== this.props.lastReloadRequestTime) {
        this.embeddable.reload();
      }

      return nextProps.error !== this.props.error || nextProps.initialized !== this.props.initialized;
    }
  }, {
    key: "renderEmbeddedError",
    value: function renderEmbeddedError() {
      return _react2.default.createElement(_panel_error.PanelError, {
        error: this.props.error
      });
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var error = this.props.error;

      if (error) {
        return this.renderEmbeddedError();
      } else {
        return this.renderEmbeddableViewport();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          viewOnlyMode = _this$props4.viewOnlyMode,
          panel = _this$props4.panel;
      var classes = (0, _classnames.default)('dshPanel', this.props.className, {
        'dshPanel--editing': !viewOnlyMode
      });
      return _react2.default.createElement(_eui.EuiPanel, {
        className: classes,
        "data-test-subj": "dashboardPanel",
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        paddingSize: "none"
      }, _react2.default.createElement(_panel_header.PanelHeader, {
        panelId: panel.panelIndex,
        embeddable: this.embeddable
      }), this.renderContent());
    }
  }]);

  return DashboardPanelUi;
}(_react2.default.Component);

var DashboardPanel = (0, _react.injectI18n)(DashboardPanelUi);
exports.DashboardPanel = DashboardPanel;