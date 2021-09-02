"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryLanguageSwitcher = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _documentation_links = require("ui/documentation_links/documentation_links");

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

var kueryQuerySyntaxDocs = _documentation_links.documentationLinks.query.kueryQuerySyntax;

var QueryLanguageSwitcher =
/*#__PURE__*/
function (_Component) {
  _inherits(QueryLanguageSwitcher, _Component);

  function QueryLanguageSwitcher() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QueryLanguageSwitcher);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QueryLanguageSwitcher)).call.apply(_getPrototypeOf2, [this].concat(args)));

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

    _defineProperty(_assertThisInitialized(_this), "onSwitchChange", function () {
      var newLanguage = _this.props.language === 'lucene' ? 'kuery' : 'lucene';

      _this.props.onSelectLanguage(newLanguage);
    });

    return _this;
  }

  _createClass(QueryLanguageSwitcher, [{
    key: "render",
    value: function render() {
      var luceneLabel = _react2.default.createElement(_react.FormattedMessage, {
        id: "data.query.queryBar.luceneLanguageName",
        defaultMessage: "Lucene"
      });

      var kqlLabel = _react2.default.createElement(_react.FormattedMessage, {
        id: "data.query.queryBar.kqlLanguageName",
        defaultMessage: "KQL"
      });

      var kqlFullName = _react2.default.createElement(_react.FormattedMessage, {
        id: "data.query.queryBar.kqlFullLanguageName",
        defaultMessage: "Kibana Query Language"
      });

      var button = _react2.default.createElement(_eui.EuiButtonEmpty, {
        size: "xs",
        onClick: this.togglePopover
      }, this.props.language === 'lucene' ? luceneLabel : kqlLabel);

      return _react2.default.createElement(_eui.EuiPopover, {
        id: "popover",
        className: "eui-displayBlock",
        ownFocus: true,
        anchorPosition: "downRight",
        button: button,
        isOpen: this.state.isPopoverOpen,
        closePopover: this.closePopover,
        withTitle: true
      }, _react2.default.createElement(_eui.EuiPopoverTitle, null, _react2.default.createElement(_react.FormattedMessage, {
        id: "data.query.queryBar.syntaxOptionsTitle",
        defaultMessage: "Syntax options"
      })), _react2.default.createElement("div", {
        style: {
          width: '350px'
        }
      }, _react2.default.createElement(_eui.EuiText, null, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
        id: "data.query.queryBar.syntaxOptionsDescription",
        defaultMessage: "The {docsLink} (KQL) offers a simplified query syntax and support for scripted fields. KQL also provides autocomplete if you have a Basic license or above. If you turn off KQL, Kibana uses Lucene.",
        values: {
          docsLink: _react2.default.createElement(_eui.EuiLink, {
            href: kueryQuerySyntaxDocs,
            target: "_blank"
          }, kqlFullName)
        }
      }))), _react2.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: kqlFullName
      }, _react2.default.createElement(_eui.EuiSwitch, {
        id: "queryEnhancementOptIn",
        name: "popswitch",
        label: this.props.language === 'kuery' ? _react2.default.createElement(_react.FormattedMessage, {
          id: "data.query.queryBar.kqlOnLabel",
          defaultMessage: "On"
        }) : _react2.default.createElement(_react.FormattedMessage, {
          id: "data.query.queryBar.kqlOffLabel",
          defaultMessage: "Off"
        }),
        checked: this.props.language === 'kuery',
        onChange: this.onSwitchChange,
        "data-test-subj": "languageToggle"
      })))));
    }
  }]);

  return QueryLanguageSwitcher;
}(_react2.Component);

exports.QueryLanguageSwitcher = QueryLanguageSwitcher;