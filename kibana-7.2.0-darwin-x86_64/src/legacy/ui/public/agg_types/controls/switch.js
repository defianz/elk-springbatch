"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchParamEditor = SwitchParamEditor;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

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
function SwitchParamEditor(_ref) {
  var value = _ref.value,
      setValue = _ref.setValue,
      dataTestSubj = _ref.dataTestSubj,
      displayToolTip = _ref.displayToolTip,
      displayLabel = _ref.displayLabel,
      disabled = _ref.disabled;
  return _react.default.createElement("div", {
    className: "visEditorSidebar__aggParamFormRow"
  }, _react.default.createElement(_eui.EuiToolTip, {
    content: displayToolTip,
    delay: "long",
    position: "right"
  }, _react.default.createElement(_eui.EuiSwitch, {
    label: displayLabel,
    checked: value,
    disabled: disabled,
    "data-test-subj": dataTestSubj,
    onChange: function onChange(ev) {
      return setValue(ev.target.checked);
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }));
}