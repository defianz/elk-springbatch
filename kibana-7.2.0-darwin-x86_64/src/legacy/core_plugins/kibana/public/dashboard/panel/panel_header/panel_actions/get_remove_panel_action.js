"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRemovePanelAction = getRemovePanelAction;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _embeddable = require("ui/embeddable");

var _dashboard_view_mode = require("../../../dashboard_view_mode");

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
 *
 * @param {function} onDeletePanel
 * @return {ContextMenuAction}
 */
function getRemovePanelAction(onDeletePanel) {
  return new _embeddable.ContextMenuAction({
    id: 'deletePanel',
    parentPanelId: 'mainMenu'
  }, {
    getDisplayName: function getDisplayName() {
      return _i18n.i18n.translate('kbn.dashboard.panel.removePanel.displayName', {
        defaultMessage: 'Delete from dashboard'
      });
    },
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "trash"
    }),
    isVisible: function isVisible(_ref) {
      var containerState = _ref.containerState;
      return containerState.viewMode === _dashboard_view_mode.DashboardViewMode.EDIT && !containerState.isPanelExpanded;
    },
    onClick: onDeletePanel
  });
}