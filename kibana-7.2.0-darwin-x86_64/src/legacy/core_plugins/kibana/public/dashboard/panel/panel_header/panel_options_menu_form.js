"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelOptionsMenuForm = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

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
function PanelOptionsMenuFormUi(_ref) {
  var title = _ref.title,
      onReset = _ref.onReset,
      onUpdatePanelTitle = _ref.onUpdatePanelTitle,
      onClose = _ref.onClose,
      intl = _ref.intl;

  function onInputChange(event) {
    onUpdatePanelTitle(event.target.value);
  }

  function onKeyDown(event) {
    if (event.keyCode === _eui.keyCodes.ENTER) {
      onClose();
    }
  }

  return _react.default.createElement("div", {
    className: "dshPanel__optionsMenuForm",
    "data-test-subj": "dashboardPanelTitleInputMenuItem"
  }, _react.default.createElement(_eui.EuiFormRow, {
    label: intl.formatMessage({
      id: 'kbn.dashboard.panel.optionsMenuForm.panelTitleFormRowLabel',
      defaultMessage: 'Panel title'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    id: "panelTitleInput",
    "data-test-subj": "customDashboardPanelTitleInput",
    name: "min",
    type: "text",
    value: title,
    onChange: onInputChange,
    onKeyDown: onKeyDown,
    "aria-label": intl.formatMessage({
      id: 'kbn.dashboard.panel.optionsMenuForm.panelTitleInputAriaLabel',
      defaultMessage: 'Changes to this input are applied immediately. Press enter to exit.'
    })
  })), _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "resetCustomDashboardPanelTitle",
    onClick: onReset
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "kbn.dashboard.panel.optionsMenuForm.resetCustomDashboardButtonLabel",
    defaultMessage: "Reset title"
  })));
}

var PanelOptionsMenuForm = (0, _react2.injectI18n)(PanelOptionsMenuFormUi);
exports.PanelOptionsMenuForm = PanelOptionsMenuForm;