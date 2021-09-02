"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberIntervalParamEditor = NumberIntervalParamEditor;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var label = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
  id: "common.ui.aggTypes.numberInterval.minimumIntervalLabel",
  defaultMessage: "Minimum interval"
}), ' ', _react.default.createElement(_eui.EuiIconTip, {
  position: "right",
  content: _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.numberInterval.minimumIntervalTooltip",
    defaultMessage: "Interval will be automatically scaled in the event that the provided value creates more buckets than specified by Advanced Setting's {histogramMaxBars}",
    values: {
      histogramMaxBars: 'histogram:maxBars'
    }
  }),
  type: "questionInCircle"
}));

function NumberIntervalParamEditor(_ref) {
  var agg = _ref.agg,
      editorConfig = _ref.editorConfig,
      showValidation = _ref.showValidation,
      value = _ref.value,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue;
  var base = (0, _lodash.get)(editorConfig, 'interval.base');
  var min = base || 0;
  var isValid = value !== undefined && value >= min;
  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid]);

  var onChange = function onChange(event) {
    var numberValue = parseFloat(event.target.value);
    setValue(isNaN(numberValue) ? undefined : numberValue);
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    className: "visEditorSidebar__aggParamFormRow",
    label: label,
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    helpText: (0, _lodash.get)(editorConfig, 'interval.help')
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    value: value === undefined ? '' : value,
    min: min,
    step: base,
    "data-test-subj": "visEditorInterval".concat(agg.id),
    isInvalid: showValidation ? !isValid : false,
    onChange: onChange,
    onBlur: setTouched,
    fullWidth: true,
    placeholder: _i18n.i18n.translate('common.ui.aggTypes.numberInterval.selectIntervalPlaceholder', {
      defaultMessage: 'Enter an interval'
    })
  }));
}