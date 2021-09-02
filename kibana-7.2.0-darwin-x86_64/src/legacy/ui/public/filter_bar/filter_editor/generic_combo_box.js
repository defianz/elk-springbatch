"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericComboBox = GenericComboBox;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * A generic combo box. Instead of accepting a set of options that contain a `label`, it accepts
 * any type of object. It also accepts a `getLabel` function that each object will be sent through
 * to get the label to be passed to the combo box. The `onChange` will trigger with the actual
 * selected objects, rather than an option object.
 */
function GenericComboBox(props) {
  var options = props.options,
      selectedOptions = props.selectedOptions,
      getLabel = props.getLabel,
      onChange = props.onChange,
      otherProps = _objectWithoutProperties(props, ["options", "selectedOptions", "getLabel", "onChange"]);

  var labels = options.map(getLabel);
  var euiOptions = labels.map(function (label) {
    return {
      label: label
    };
  });
  var selectedEuiOptions = selectedOptions.map(function (option) {
    return euiOptions[options.indexOf(option)];
  });

  var onComboBoxChange = function onComboBoxChange(newOptions) {
    var newValues = newOptions.map(function (_ref) {
      var label = _ref.label;
      return options[labels.indexOf(label)];
    });
    onChange(newValues);
  };

  return _react.default.createElement(_eui.EuiComboBox, _extends({
    options: euiOptions,
    selectedOptions: selectedEuiOptions,
    onChange: onComboBoxChange
  }, otherProps));
}