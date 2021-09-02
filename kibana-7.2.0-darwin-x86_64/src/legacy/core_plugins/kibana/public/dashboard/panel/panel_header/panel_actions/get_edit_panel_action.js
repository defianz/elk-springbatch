"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditPanelAction = getEditPanelAction;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

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
 * @return {ContextMenuAction}
 */
function getEditPanelAction() {
  return new _embeddable.ContextMenuAction({
    id: 'editPanel',
    parentPanelId: 'mainMenu'
  }, {
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "pencil"
    }),
    isDisabled: function isDisabled(_ref) {
      var embeddable = _ref.embeddable;
      return !embeddable || !embeddable.metadata || !embeddable.metadata.editUrl;
    },
    isVisible: function isVisible(_ref2) {
      var containerState = _ref2.containerState,
          embeddable = _ref2.embeddable;
      var canEditEmbeddable = Boolean(embeddable && embeddable.metadata && embeddable.metadata.editable);
      var inDashboardEditMode = containerState.viewMode === _dashboard_view_mode.DashboardViewMode.EDIT;
      return canEditEmbeddable && inDashboardEditMode;
    },
    getHref: function getHref(_ref3) {
      var embeddable = _ref3.embeddable;

      if (embeddable && embeddable.metadata.editUrl) {
        return embeddable.metadata.editUrl;
      }
    },
    getDisplayName: function getDisplayName(_ref4) {
      var embeddable = _ref4.embeddable;

      if (embeddable && embeddable.metadata.editLabel) {
        return embeddable.metadata.editLabel;
      }

      return _i18n.i18n.translate('kbn.dashboard.panel.editPanel.defaultDisplayName', {
        defaultMessage: 'Edit'
      });
    }
  });
}