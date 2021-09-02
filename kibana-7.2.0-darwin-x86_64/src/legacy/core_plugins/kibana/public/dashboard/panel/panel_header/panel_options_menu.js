"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelOptionsMenu = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

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
function PanelOptionsMenuUi(_ref) {
  var toggleContextMenu = _ref.toggleContextMenu,
      isPopoverOpen = _ref.isPopoverOpen,
      closeContextMenu = _ref.closeContextMenu,
      panels = _ref.panels,
      isViewMode = _ref.isViewMode,
      intl = _ref.intl;

  var button = _react2.default.createElement(_eui.EuiButtonIcon, {
    iconType: isViewMode ? 'boxesHorizontal' : 'gear',
    color: "text",
    className: "dshPanel_optionsMenuButton",
    "aria-label": intl.formatMessage({
      id: 'kbn.dashboard.panel.optionsMenu.panelOptionsButtonAriaLabel',
      defaultMessage: 'Panel options'
    }),
    "data-test-subj": "dashboardPanelToggleMenuIcon",
    onClick: toggleContextMenu
  });

  return _react2.default.createElement(_eui.EuiPopover, {
    id: "dashboardPanelContextMenu",
    className: "dshPanel_optionsMenuPopover",
    button: button,
    isOpen: isPopoverOpen,
    closePopover: closeContextMenu,
    panelPaddingSize: "none",
    anchorPosition: "downRight",
    "data-test-subj": isPopoverOpen ? 'dashboardPanelContextMenuOpen' : 'dashboardPanelContextMenuClosed',
    withTitle: true
  }, _react2.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: "mainMenu",
    panels: panels
  }));
}

var PanelOptionsMenu = (0, _react.injectI18n)(PanelOptionsMenuUi);
exports.PanelOptionsMenu = PanelOptionsMenu;