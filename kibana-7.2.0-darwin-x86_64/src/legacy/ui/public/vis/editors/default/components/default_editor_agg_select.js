"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultEditorAggSelect = DefaultEditorAggSelect;

var _lodash = require("lodash");

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _documentation_links = require("../../../../documentation_links/documentation_links");

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
function DefaultEditorAggSelect(_ref) {
  var agg = _ref.agg,
      value = _ref.value,
      setValue = _ref.setValue,
      aggTypeOptions = _ref.aggTypeOptions,
      isSelectInvalid = _ref.isSelectInvalid,
      isSubAggregation = _ref.isSubAggregation,
      setTouched = _ref.setTouched,
      setValidity = _ref.setValidity;
  var selectedOptions = value ? [{
    label: value.title,
    value: value
  }] : [];
  var label = isSubAggregation ? _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.defaultEditor.aggSelect.subAggregationLabel",
    defaultMessage: "Sub aggregation"
  }) : _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.defaultEditor.aggSelect.aggregationLabel",
    defaultMessage: "Aggregation"
  });
  var aggHelpLink = null;

  if ((0, _lodash.has)(agg, 'type.name')) {
    aggHelpLink = (0, _lodash.get)(_documentation_links.documentationLinks, ['aggs', agg.type.name]);
  }

  var helpLink = value && aggHelpLink && _react.default.createElement(_eui.EuiLink, {
    href: aggHelpLink,
    target: "_blank",
    rel: "noopener",
    className: "visEditorAggSelect__helpLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "common.ui.vis.defaultEditor.aggSelect.helpLinkLabel",
    defaultMessage: "{aggTitle} help",
    values: {
      aggTitle: value ? value.title : ''
    }
  }));

  var errors = [];

  if (!aggTypeOptions.length) {
    errors.push(_i18n.i18n.translate('common.ui.vis.defaultEditor.aggSelect.noCompatibleAggsDescription', {
      defaultMessage: 'The index pattern {indexPatternTitle} does not contain any aggregations.',
      values: {
        indexPatternTitle: agg.getIndexPattern && agg.getIndexPattern().title
      }
    }));
    setTouched();
  }

  (0, _react.useEffect)(function () {
    // The selector will be invalid when the value is empty.
    setValidity(!!value);
  }, [value]);
  return _react.default.createElement(_eui.EuiFormRow, {
    label: label,
    labelAppend: helpLink,
    error: errors,
    isInvalid: isSelectInvalid,
    fullWidth: true,
    className: "visEditorAggSelect__formRow"
  }, _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('common.ui.vis.defaultEditor.aggSelect.selectAggPlaceholder', {
      defaultMessage: 'Select an aggregation'
    }),
    id: "visDefaultEditorAggSelect".concat(agg.id),
    isDisabled: !aggTypeOptions.length,
    options: aggTypeOptions,
    selectedOptions: selectedOptions,
    singleSelection: {
      asPlainText: true
    },
    onBlur: setTouched,
    onChange: function onChange(options) {
      return setValue((0, _lodash.get)(options, '0.value'));
    },
    "data-test-subj": "defaultEditorAggSelect",
    isClearable: false,
    isInvalid: isSelectInvalid,
    fullWidth: true
  }));
}