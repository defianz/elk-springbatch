"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizeParamEditor = SizeParamEditor;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

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
function SizeParamEditor(_ref) {
  var value = _ref.value,
      setValue = _ref.setValue,
      showValidation = _ref.showValidation,
      setValidity = _ref.setValidity,
      setTouched = _ref.setTouched;

  var label = _i18n.i18n.translate('common.ui.aggTypes.sizeLabel', {
    defaultMessage: 'Size'
  });

  var isValid = Number(value) > 0;
  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    className: "visEditorSidebar__aggParamFormRow"
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    value: (0, _lodash.isUndefined)(value) ? '' : value,
    onChange: function onChange(ev) {
      return setValue(ev.target.value === '' ? '' : parseFloat(ev.target.value));
    },
    fullWidth: true,
    isInvalid: showValidation ? !isValid : false,
    onBlur: setTouched,
    min: 1,
    "data-test-subj": "sizeParamEditor"
  }));
}