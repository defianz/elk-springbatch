"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateButton = void 0;

var _eui_theme_k6_light = require("@elastic/eui/dist/eui_theme_k6_light.json");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _react3 = require("ui/capabilities/react");

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

var CreateButtonComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(CreateButtonComponent, _Component);

  function CreateButtonComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CreateButtonComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CreateButtonComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isPopoverOpen: false
    });

    _defineProperty(_assertThisInitialized(_this), "togglePopover", function () {
      _this.setState({
        isPopoverOpen: !_this.state.isPopoverOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closePopover", function () {
      _this.setState({
        isPopoverOpen: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderBetaBadge", function () {
      return _react.default.createElement(_eui.EuiBadge, {
        color: _eui_theme_k6_light.euiColorAccent
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "kbn.management.indexPatternList.createButton.betaLabel",
        defaultMessage: "Beta"
      }));
    });

    return _this;
  }

  _createClass(CreateButtonComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          options = _this$props.options,
          children = _this$props.children,
          uiCapabilities = _this$props.uiCapabilities;
      var isPopoverOpen = this.state.isPopoverOpen;

      if (!options || !options.length) {
        return null;
      }

      if (!uiCapabilities.indexPatterns.save) {
        return null;
      }

      if (options.length === 1) {
        return _react.default.createElement(_eui.EuiButton, {
          "data-test-subj": "createIndexPatternButton",
          fill: true,
          onClick: options[0].onClick,
          iconType: "plusInCircle"
        }, children);
      }

      var button = _react.default.createElement(_eui.EuiButton, {
        "data-test-subj": "createIndexPatternButton",
        fill: true,
        size: "s",
        iconType: "arrowDown",
        iconSide: "right",
        onClick: this.togglePopover
      }, children);

      if (options.length > 1) {
        return _react.default.createElement(_eui.EuiPopover, {
          id: "singlePanel",
          button: button,
          isOpen: isPopoverOpen,
          closePopover: this.closePopover,
          panelPaddingSize: "none",
          anchorPosition: "downLeft"
        }, _react.default.createElement(_eui.EuiContextMenuPanel, {
          items: options.map(function (option) {
            return _react.default.createElement(_eui.EuiContextMenuItem, {
              key: option.text,
              onClick: option.onClick,
              "data-test-subj": option.testSubj
            }, _react.default.createElement(_eui.EuiDescriptionList, {
              style: {
                whiteSpace: 'nowrap'
              }
            }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, option.text, option.isBeta ? _react.default.createElement(_react.Fragment, null, " ", _this2.renderBetaBadge()) : null), _react.default.createElement(_eui.EuiDescriptionListDescription, null, option.description)));
          })
        }));
      }
    }
  }]);

  return CreateButtonComponent;
}(_react.Component);

var CreateButton = (0, _react3.injectUICapabilities)(CreateButtonComponent);
exports.CreateButton = CreateButton;