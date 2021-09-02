"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggParamReactWrapper = AggParamReactWrapper;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function AggParamReactWrapper(props) {
  var agg = props.agg,
      aggParam = props.aggParam,
      ParamEditor = props.paramEditor,
      onChange = props.onChange,
      setValidity = props.setValidity,
      rest = _objectWithoutProperties(props, ["agg", "aggParam", "paramEditor", "onChange", "setValidity"]);

  (0, _react.useEffect)(function () {
    if (aggParam.shouldShow && !aggParam.shouldShow(agg)) {
      setValidity(true);
    }
  }, [agg, agg.params.field]);

  if (aggParam.shouldShow && !aggParam.shouldShow(agg)) {
    return null;
  }

  return _react.default.createElement(ParamEditor, _extends({
    agg: agg,
    aggParam: aggParam,
    setValidity: setValidity,
    setValue: onChange
  }, rest));
}