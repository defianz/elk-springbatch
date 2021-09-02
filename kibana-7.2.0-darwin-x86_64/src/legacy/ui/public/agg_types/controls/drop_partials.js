"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropPartialsParamEditor = DropPartialsParamEditor;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function DropPartialsParamEditor(_ref) {
  var agg = _ref.agg,
      aggParam = _ref.aggParam,
      value = _ref.value,
      setValue = _ref.setValue;

  var content = _i18n.i18n.translate('common.ui.aggTypes.dropPartialBucketsTooltip', {
    defaultMessage: "Remove buckets that span time outside the time range so the histogram doesn't start and end with incomplete buckets."
  });

  var label = _i18n.i18n.translate('common.ui.aggTypes.dropPartialBucketsLabel', {
    defaultMessage: 'Drop partial buckets'
  });

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiToolTip, {
    content: content,
    delay: "long",
    position: "right"
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: label,
    checked: value,
    "data-test-subj": "dropPartialBucketsCheckbox",
    onChange: function onChange(ev) {
      return setValue(ev.target.checked);
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }));
}