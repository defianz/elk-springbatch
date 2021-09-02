"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExtendedBoundsParamEditor = ExtendedBoundsParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function areBoundsValid(_ref) {
  var min = _ref.min,
      max = _ref.max;

  if (min === '' || max === '') {
    return false;
  }

  return max >= min;
}

function ExtendedBoundsParamEditor(_ref2) {
  var value = _ref2.value,
      setValue = _ref2.setValue,
      setValidity = _ref2.setValidity,
      showValidation = _ref2.showValidation,
      setTouched = _ref2.setTouched;

  var minLabel = _i18n.i18n.translate('common.ui.aggTypes.extendedBounds.minLabel', {
    defaultMessage: 'Min'
  });

  var maxLabel = _i18n.i18n.translate('common.ui.aggTypes.extendedBounds.maxLabel', {
    defaultMessage: 'Max'
  });

  var isValid = areBoundsValid(value);
  var error;

  if (!isValid) {
    error = _i18n.i18n.translate('common.ui.aggTypes.extendedBounds.errorMessage', {
      defaultMessage: 'Min should be less than or equal to Max.'
    });
  }

  (0, _react.useEffect)(function () {
    setValidity(isValid);
    return function () {
      return setValidity(true);
    };
  }, [isValid]);

  var handleChange = function handleChange(ev, name) {
    setValue(_objectSpread({}, value, _defineProperty({}, name, ev.target.value === '' ? '' : parseFloat(ev.target.value))));
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    error: error
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    value: (0, _lodash.isUndefined)(value.min) ? '' : value.min,
    onChange: function onChange(ev) {
      return handleChange(ev, 'min');
    },
    onBlur: setTouched,
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    "aria-label": minLabel,
    prepend: _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement("strong", null, minLabel))
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFieldNumber, {
    value: (0, _lodash.isUndefined)(value.max) ? '' : value.max,
    onChange: function onChange(ev) {
      return handleChange(ev, 'max');
    },
    onBlur: setTouched,
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    "aria-label": maxLabel,
    prepend: _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, _react.default.createElement("strong", null, maxLabel))
  }))));
}