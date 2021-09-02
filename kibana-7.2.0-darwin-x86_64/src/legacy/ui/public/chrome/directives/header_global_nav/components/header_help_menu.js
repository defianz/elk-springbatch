"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderHelpMenu = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _metadata = require("../../../../metadata");

var _documentation_links = require("../../../../documentation_links");

var _header_extension = require("./header_extension");

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

var HeaderHelpMenuUI =
/*#__PURE__*/
function (_Component) {
  _inherits(HeaderHelpMenuUI, _Component);

  function HeaderHelpMenuUI(props) {
    var _this;

    _classCallCheck(this, HeaderHelpMenuUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeaderHelpMenuUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "subscription", void 0);

    _defineProperty(_assertThisInitialized(_this), "onMenuButtonClick", function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeMenu", function () {
      _this.setState({
        isOpen: false
      });
    });

    _this.state = {
      isOpen: false,
      helpExtension: undefined
    };
    return _this;
  }

  _createClass(HeaderHelpMenuUI, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscription = this.props.helpExtension$.subscribe({
        next: function next(helpExtension) {
          _this2.setState({
            helpExtension: helpExtension
          });
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
      var _this$props = this.props,
          intl = _this$props.intl,
          useDefaultContent = _this$props.useDefaultContent,
          documentationLink = _this$props.documentationLink;
      var helpExtension = this.state.helpExtension;
      var defaultContent = useDefaultContent ? _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.chrome.headerGlobalNav.helpMenuHelpDescription",
        defaultMessage: "Get updates, information, and answers in our documentation."
      }))), _react2.default.createElement(_eui.EuiSpacer, null), _react2.default.createElement(_eui.EuiButton, {
        iconType: "popout",
        href: documentationLink,
        target: "_blank"
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.chrome.headerGlobalNav.helpMenuGoToDocumentation",
        defaultMessage: "Go to documentation"
      }))) : null;

      var button = _react2.default.createElement(_eui.EuiHeaderSectionItemButton, {
        "aria-expanded": this.state.isOpen,
        "aria-haspopup": "true",
        "aria-label": intl.formatMessage({
          id: 'common.ui.chrome.headerGlobalNav.helpMenuButtonAriaLabel',
          defaultMessage: 'Help menu'
        }),
        onClick: this.onMenuButtonClick
      }, _react2.default.createElement(_eui.EuiIcon, {
        type: "help",
        size: "m"
      }));

      return (// @ts-ignore repositionOnScroll doesn't exist in EuiPopover
        _react2.default.createElement(_eui.EuiPopover, {
          id: "headerHelpMenu",
          button: button,
          isOpen: this.state.isOpen,
          anchorPosition: "downRight",
          repositionOnScroll: true,
          closePopover: this.closeMenu,
          "data-test-subj": "helpMenuButton"
        }, _react2.default.createElement(_eui.EuiPopoverTitle, null, _react2.default.createElement(_eui.EuiFlexGroup, {
          responsive: false
        }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_react.FormattedMessage, {
          id: "common.ui.chrome.headerGlobalNav.helpMenuTitle",
          defaultMessage: "Help"
        })), _react2.default.createElement(_eui.EuiFlexItem, {
          grow: false,
          className: "chrHeaderHelpMenu__version"
        }, _react2.default.createElement(_react.FormattedMessage, {
          id: "common.ui.chrome.headerGlobalNav.helpMenuVersion",
          defaultMessage: "v {version}",
          values: {
            version: _metadata.metadata.version
          }
        })))), _react2.default.createElement("div", {
          style: {
            maxWidth: 240
          }
        }, defaultContent, defaultContent && helpExtension && _react2.default.createElement(_eui.EuiSpacer, null), helpExtension && _react2.default.createElement(_header_extension.HeaderExtension, {
          extension: helpExtension
        })))
      );
    }
  }]);

  return HeaderHelpMenuUI;
}(_react2.Component);

var HeaderHelpMenu = (0, _react.injectI18n)(HeaderHelpMenuUI);
exports.HeaderHelpMenu = HeaderHelpMenu;
HeaderHelpMenu.defaultProps = {
  documentationLink: _documentation_links.documentationLinks.kibana,
  useDefaultContent: true
};