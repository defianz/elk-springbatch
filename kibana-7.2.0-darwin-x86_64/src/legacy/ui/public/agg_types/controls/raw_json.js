"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RawJsonParamEditor = RawJsonParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _utils = require("../utils");

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
function RawJsonParamEditor(_ref) {
  var agg = _ref.agg,
      showValidation = _ref.showValidation,
      value = _ref.value,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue,
      setTouched = _ref.setTouched;

  var label = _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.aggTypes.jsonInputLabel",
    defaultMessage: "JSON input"
  }), ' ', _react.default.createElement(_eui.EuiIconTip, {
    position: "right",
    content: _i18n.i18n.translate('common.ui.aggTypes.jsonInputTooltip', {
      defaultMessage: "Any JSON formatted properties you add here will be merged with the elasticsearch aggregation definition for this section. For example 'shard_size' on a terms aggregation."
    }),
    type: "questionInCircle"
  }));

  var isValid = (0, _utils.isValidJson)(value);

  var onChange = function onChange(ev) {
    var textValue = ev.target.value;
    setValue(textValue);
    setValidity((0, _utils.isValidJson)(textValue));
  };

  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    isInvalid: showValidation ? !isValid : false,
    fullWidth: true,
    className: "visEditorSidebar__aggParamFormRow"
  }, _react.default.createElement(_eui.EuiTextArea, {
    id: "visEditorRawJson".concat(agg.id),
    isInvalid: showValidation ? !isValid : false,
    value: value || '',
    onChange: onChange,
    rows: 2,
    fullWidth: true,
    onBlur: setTouched
  }));
}