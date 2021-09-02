"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldParamEditor = FieldParamEditor;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _utils = require("../../../../utils");

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
var label = _i18n.i18n.translate('common.ui.aggTypes.field.fieldLabel', {
  defaultMessage: 'Field'
});

function FieldParamEditor(_ref) {
  var agg = _ref.agg,
      aggParam = _ref.aggParam,
      _ref$indexedFields = _ref.indexedFields,
      indexedFields = _ref$indexedFields === void 0 ? [] : _ref$indexedFields,
      showValidation = _ref.showValidation,
      value = _ref.value,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity,
      setValue = _ref.setValue;
  var selectedOptions = value ? [{
    label: value.displayName,
    value: value
  }] : [];

  var onChange = function onChange(options) {
    var selectedOption = (0, _lodash.get)(options, '0.value');

    if (!(aggParam.required && !selectedOption)) {
      setValue(selectedOption);
    }

    if (aggParam.onChange) {
      aggParam.onChange(agg);
    }
  };

  var errors = [];

  if (!indexedFields.length) {
    errors.push(_i18n.i18n.translate('common.ui.aggTypes.field.noCompatibleFieldsDescription', {
      defaultMessage: 'The index pattern {indexPatternTitle} does not contain any of the following compatible field types: {fieldTypes}',
      values: {
        indexPatternTitle: agg.getIndexPattern && agg.getIndexPattern().title,
        fieldTypes: getFieldTypesString(agg)
      }
    }));
    setTouched();
  }

  var isValid = !!value && !!indexedFields.length;
  (0, _react.useEffect)(function () {
    setValidity(isValid);
  }, [isValid]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    isInvalid: showValidation ? !isValid : false,
    fullWidth: true,
    error: errors,
    className: "visEditorSidebar__aggParamFormRow"
  }, _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('common.ui.aggTypes.field.selectFieldPlaceholder', {
      defaultMessage: 'Select a field'
    }),
    options: indexedFields,
    isDisabled: !indexedFields.length,
    selectedOptions: selectedOptions,
    singleSelection: {
      asPlainText: true
    },
    isClearable: false,
    isInvalid: showValidation ? !isValid : false,
    onChange: onChange,
    onBlur: setTouched,
    "data-test-subj": "visDefaultEditorField",
    fullWidth: true
  }));
}

function getFieldTypesString(agg) {
  return (0, _utils.formatListAsProse)((0, _utils.parseCommaSeparatedList)((0, _lodash.get)(agg, 'type.params.byName.field.filterFieldTypes')), {
    inclusive: false
  });
}