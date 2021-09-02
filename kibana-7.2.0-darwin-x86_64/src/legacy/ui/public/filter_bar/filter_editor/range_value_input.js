"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeValueInput = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireWildcard(require("react"));

var _documentation_links = require("ui/documentation_links");

var _value_input_type = require("./value_input_type");

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

var RangeValueInputUI =
/*#__PURE__*/
function (_Component) {
  _inherits(RangeValueInputUI, _Component);

  function RangeValueInputUI(props) {
    var _this;

    _classCallCheck(this, RangeValueInputUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RangeValueInputUI).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onFromChange", function (value) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error('Range params must be a string or number');
      }

      _this.props.onChange({
        from: value,
        to: (0, _lodash.get)(_assertThisInitialized(_this), 'props.value.to')
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onToChange", function (value) {
      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error('Range params must be a string or number');
      }

      _this.props.onChange({
        from: (0, _lodash.get)(_assertThisInitialized(_this), 'props.value.from'),
        to: value
      });
    });

    return _this;
  }

  _createClass(RangeValueInputUI, [{
    key: "render",
    value: function render() {
      var type = this.props.field ? this.props.field.type : 'string';
      return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiFlexGroup, {
        style: {
          maxWidth: 600
        }
      }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.rangeStartInputLabel',
          defaultMessage: 'From'
        })
      }, _react2.default.createElement(_value_input_type.ValueInputType, {
        type: type,
        value: this.props.value ? this.props.value.from : undefined,
        onChange: this.onFromChange,
        placeholder: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.rangeStartInputPlaceholder',
          defaultMessage: 'Start of the range'
        })
      }))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
        label: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.rangeEndInputLabel',
          defaultMessage: 'To'
        })
      }, _react2.default.createElement(_value_input_type.ValueInputType, {
        type: type,
        value: this.props.value ? this.props.value.to : undefined,
        onChange: this.onToChange,
        placeholder: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.rangeEndInputPlaceholder',
          defaultMessage: 'End of the range'
        })
      })))), type === 'date' ? _react2.default.createElement(_eui.EuiLink, {
        target: "_blank",
        href: (0, _documentation_links.getDocLink)('date.dateMath')
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "common.ui.filterEditor.dateFormatHelpLinkLabel",
        defaultMessage: "Accepted date formats"
      }), ' ', _react2.default.createElement(_eui.EuiIcon, {
        type: "link"
      })) : '');
    }
  }]);

  return RangeValueInputUI;
}(_react2.Component);

var RangeValueInput = (0, _react.injectI18n)(RangeValueInputUI);
exports.RangeValueInput = RangeValueInput;