"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToggleExpandPanelAction = getToggleExpandPanelAction;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _embeddable = require("ui/embeddable");

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

/**
 * Returns an action that toggles the panel into maximized or minimized state.
 * @param {boolean} isExpanded
 * @param {function} toggleExpandedPanel
 * @return {ContextMenuAction}
 */
function getToggleExpandPanelAction(_ref) {
  var isExpanded = _ref.isExpanded,
      toggleExpandedPanel = _ref.toggleExpandedPanel;
  return new _embeddable.ContextMenuAction({
    id: 'togglePanel',
    parentPanelId: 'mainMenu'
  }, {
    getDisplayName: function getDisplayName() {
      return isExpanded ? _i18n.i18n.translate('kbn.dashboard.panel.toggleExpandPanel.expandedDisplayName', {
        defaultMessage: 'Minimize'
      }) : _i18n.i18n.translate('kbn.dashboard.panel.toggleExpandPanel.notExpandedDisplayName', {
        defaultMessage: 'Full screen'
      });
    },
    // TODO: Update to minimize icon when https://github.com/elastic/eui/issues/837 is complete.
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: isExpanded ? 'expand' : 'expand'
    }),
    onClick: toggleExpandedPanel
  });
}