"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhrasesValuesInput = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

var _generic_combo_box = require("./generic_combo_box");

var _phrase_suggestor = require("./phrase_suggestor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PhrasesValuesInputUI =
/*#__PURE__*/
function (_PhraseSuggestor) {
  _inherits(PhrasesValuesInputUI, _PhraseSuggestor);

  function PhrasesValuesInputUI() {
    _classCallCheck(this, PhrasesValuesInputUI);

    return _possibleConstructorReturn(this, _getPrototypeOf(PhrasesValuesInputUI).apply(this, arguments));
  }

  _createClass(PhrasesValuesInputUI, [{
    key: "render",
    value: function render() {
      var suggestions = this.state.suggestions;
      var _this$props = this.props,
          values = _this$props.values,
          intl = _this$props.intl,
          onChange = _this$props.onChange;
      var options = values ? (0, _lodash.uniq)([].concat(_toConsumableArray(values), _toConsumableArray(suggestions))) : suggestions;
      return _react2.default.createElement(_eui.EuiFormRow, {
        label: intl.formatMessage({
          id: 'common.ui.filterEditor.valuesSelectLabel',
          defaultMessage: 'Values'
        })
      }, _react2.default.createElement(StringComboBox, {
        placeholder: intl.formatMessage({
          id: 'common.ui.filterEditor.valuesSelectPlaceholder',
          defaultMessage: 'Select values'
        }),
        options: options,
        getLabel: function getLabel(option) {
          return option;
        },
        selectedOptions: values || [],
        onCreateOption: function onCreateOption(option) {
          return onChange([].concat(_toConsumableArray(values || []), [option]));
        },
        onChange: onChange,
        isClearable: false,
        "data-test-subj": "filterParamsComboBox phrasesParamsComboxBox"
      }));
    }
  }]);

  return PhrasesValuesInputUI;
}(_phrase_suggestor.PhraseSuggestor);

function StringComboBox(props) {
  return (0, _generic_combo_box.GenericComboBox)(props);
}

var PhrasesValuesInput = (0, _react.injectI18n)(PhrasesValuesInputUI);
exports.PhrasesValuesInput = PhrasesValuesInput;