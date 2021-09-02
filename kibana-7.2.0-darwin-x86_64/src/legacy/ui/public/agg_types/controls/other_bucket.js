"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtherBucketParamEditor = OtherBucketParamEditor;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _switch = require("./switch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function OtherBucketParamEditor(props) {
  return _react.default.createElement(_switch.SwitchParamEditor, _extends({
    dataTestSubj: "otherBucketSwitch",
    displayLabel: _i18n.i18n.translate('common.ui.aggTypes.otherBucket.groupValuesLabel', {
      defaultMessage: 'Group other values in separate bucket'
    }),
    displayToolTip: _i18n.i18n.translate('common.ui.aggTypes.otherBucket.groupValuesTooltip', {
      defaultMessage: 'Values not in the top N are grouped in this bucket. ' + "To include documents with missing values, enable 'Show missing values'."
    })
  }, props));
}