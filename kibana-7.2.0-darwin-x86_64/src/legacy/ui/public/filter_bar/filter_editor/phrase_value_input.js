"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhraseValueInput = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _react2 = _interopRequireDefault(require("react"));

var _generic_combo_box = require("./generic_combo_box");

var _phrase_suggestor = require("./phrase_suggestor");

var _value_input_type = require("./value_input_type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var PhraseValueInputUI =
/*#__PURE__*/
function (_PhraseSuggestor) {
  _inherits(PhraseValueInputUI, _PhraseSuggestor);

  function PhraseValueInputUI() {
    _classCallCheck(this, PhraseValueInputUI);

    return _possibleConstructorReturn(this, _getPrototypeOf(PhraseValueInputUI).apply(this, arguments));
  }

  _createClass(PhraseValueInputUI, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(_eui.EuiFormRow, {
        label: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.valueInputLabel',
          defaultMessage: 'Value'
        })
      }, this.isSuggestingValues() ? this.renderWithSuggestions() : _react2.default.createElement(_value_input_type.ValueInputType, {
        placeholder: this.props.intl.formatMessage({
          id: 'common.ui.filterEditor.valueInputPlaceholder',
          defaultMessage: 'Enter a value'
        }),
        value: this.props.value,
        onChange: this.props.onChange,
        type: this.props.field ? this.props.field.type : 'string'
      }));
    }
  }, {
    key: "renderWithSuggestions",
    value: function renderWithSuggestions() {
      var suggestions = this.state.suggestions;
      var _this$props = this.props,
          value = _this$props.value,
          intl = _this$props.intl,
          onChange = _this$props.onChange;
      var options = value ? (0, _lodash.uniq)([value].concat(_toConsumableArray(suggestions))) : suggestions;
      return _react2.default.createElement(StringComboBox, {
        placeholder: intl.formatMessage({
          id: 'common.ui.filterEditor.valueSelectPlaceholder',
          defaultMessage: 'Select a value'
        }),
        options: options,
        getLabel: function getLabel(option) {
          return option;
        },
        selectedOptions: value ? [value] : [],
        onChange: function (_onChange) {
          function onChange(_x) {
            return _onChange.apply(this, arguments);
          }

          onChange.toString = function () {
            return _onChange.toString();
          };

          return onChange;
        }(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              _ref2$ = _ref2[0],
              newValue = _ref2$ === void 0 ? '' : _ref2$;

          return onChange(newValue);
        }),
        onSearchChange: this.onSearchChange,
        singleSelection: {
          asPlainText: true
        },
        onCreateOption: onChange,
        isClearable: false,
        "data-test-subj": "filterParamsComboBox phraseParamsComboxBox"
      });
    }
  }]);

  return PhraseValueInputUI;
}(_phrase_suggestor.PhraseSuggestor);

function StringComboBox(props) {
  return (0, _generic_combo_box.GenericComboBox)(props);
}

var PhraseValueInput = (0, _react.injectI18n)(PhraseValueInputUI);
exports.PhraseValueInput = PhraseValueInput;