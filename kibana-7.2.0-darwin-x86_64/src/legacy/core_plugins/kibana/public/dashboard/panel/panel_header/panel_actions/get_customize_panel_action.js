"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomizePanelAction = getCustomizePanelAction;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _embeddable = require("ui/embeddable");

var _dashboard_view_mode = require("../../../dashboard_view_mode");

var _panel_options_menu_form = require("../panel_options_menu_form");

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
function getCustomizePanelAction(_ref) {
  var onResetPanelTitle = _ref.onResetPanelTitle,
      onUpdatePanelTitle = _ref.onUpdatePanelTitle,
      closeContextMenu = _ref.closeContextMenu,
      title = _ref.title;
  return new _embeddable.ContextMenuAction({
    id: 'customizePanel',
    parentPanelId: 'mainMenu'
  }, {
    childContextMenuPanel: new _embeddable.ContextMenuPanel({
      id: 'panelSubOptionsMenu',
      title: _i18n.i18n.translate('kbn.dashboard.panel.customizePanelTitle', {
        defaultMessage: 'Customize panel'
      })
    }, {
      getContent: function getContent() {
        return _react.default.createElement(_panel_options_menu_form.PanelOptionsMenuForm, {
          onReset: onResetPanelTitle,
          onUpdatePanelTitle: onUpdatePanelTitle,
          title: title,
          onClose: closeContextMenu
        });
      }
    }),
    icon: _react.default.createElement(_eui.EuiIcon, {
      type: "pencil"
    }),
    isVisible: function isVisible(_ref2) {
      var containerState = _ref2.containerState;
      return containerState.viewMode === _dashboard_view_mode.DashboardViewMode.EDIT;
    },
    getDisplayName: function getDisplayName() {
      return _i18n.i18n.translate('kbn.dashboard.panel.customizePanel.displayName', {
        defaultMessage: 'Customize panel'
      });
    }
  });
}