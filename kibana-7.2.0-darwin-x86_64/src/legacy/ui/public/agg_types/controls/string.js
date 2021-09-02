"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringParamEditor = StringParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

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
function StringParamEditor(_ref) {
  var agg = _ref.agg,
      aggParam = _ref.aggParam,
      showValidation = _ref.showValidation,
      value = _ref.value,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue,
      setTouched = _ref.setTouched;
  var isValid = aggParam.required ? !!value : true;
  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: aggParam.displayName || aggParam.name,
    fullWidth: true,
    className: "visEditorSidebar__aggParamFormRow",
    isInvalid: showValidation ? !isValid : false
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: value || '',
    "data-test-subj": "visEditorStringInput".concat(agg.id).concat(aggParam.name),
    onChange: function onChange(ev) {
      return setValue(ev.target.value);
    },
    fullWidth: true,
    onBlur: setTouched,
    isInvalid: showValidation ? !isValid : false
  }));
}