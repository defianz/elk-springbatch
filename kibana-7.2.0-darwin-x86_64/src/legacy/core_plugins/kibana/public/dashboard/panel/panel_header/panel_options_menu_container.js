"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelOptionsMenuContainer = void 0;

var _i18n = require("@kbn/i18n");

var _reactRedux = require("react-redux");

var _embeddable = require("ui/embeddable");

var _panel_actions_store = require("../../store/panel_actions_store");

var _panel_actions = require("./panel_actions");

var _panel_options_menu = require("./panel_options_menu");

var _actions = require("../../actions");

var _dashboard_view_mode = require("../../dashboard_view_mode");

var _selectors = require("../../selectors");

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
var mapStateToProps = function mapStateToProps(_ref, _ref2) {
  var dashboard = _ref.dashboard;
  var panelId = _ref2.panelId;
  var embeddable = (0, _selectors.getEmbeddable)(dashboard, panelId);
  var panel = (0, _selectors.getPanel)(dashboard, panelId);
  var embeddableTitle = (0, _selectors.getEmbeddableTitle)(dashboard, panelId);
  var containerState = (0, _selectors.getContainerState)(dashboard, panelId);
  var visibleContextMenuPanelId = (0, _selectors.getVisibleContextMenuPanelId)(dashboard);
  var viewMode = (0, _selectors.getViewMode)(dashboard);
  return {
    panelTitle: panel.title === undefined ? embeddableTitle : panel.title,
    editUrl: embeddable ? (0, _selectors.getEmbeddableEditUrl)(dashboard, panelId) : null,
    isExpanded: (0, _selectors.getMaximizedPanelId)(dashboard) === panelId,
    containerState: containerState,
    visibleContextMenuPanelId: visibleContextMenuPanelId,
    isViewMode: viewMode === _dashboard_view_mode.DashboardViewMode.VIEW
  };
};
/**
 * @param dispatch {Function}
 * @param embeddableFactory {EmbeddableFactory}
 * @param panelId {string}
 */


var mapDispatchToProps = function mapDispatchToProps(dispatch, _ref3) {
  var panelId = _ref3.panelId;
  return {
    onDeletePanel: function onDeletePanel() {
      dispatch((0, _actions.deletePanel)(panelId));
    },
    onCloseContextMenu: function onCloseContextMenu() {
      return dispatch((0, _actions.closeContextMenu)());
    },
    openContextMenu: function openContextMenu() {
      return dispatch((0, _actions.setVisibleContextMenuPanelId)(panelId));
    },
    onMaximizePanel: function onMaximizePanel() {
      return dispatch((0, _actions.maximizePanel)(panelId));
    },
    onMinimizePanel: function onMinimizePanel() {
      return dispatch((0, _actions.minimizePanel)());
    },
    onResetPanelTitle: function onResetPanelTitle() {
      return dispatch((0, _actions.resetPanelTitle)(panelId));
    },
    onUpdatePanelTitle: function onUpdatePanelTitle(newTitle) {
      return dispatch((0, _actions.setPanelTitle)({
        title: newTitle,
        panelId: panelId
      }));
    }
  };
};

var mergeProps = function mergeProps(stateProps, dispatchProps, ownProps) {
  var isExpanded = stateProps.isExpanded,
      panelTitle = stateProps.panelTitle,
      containerState = stateProps.containerState,
      visibleContextMenuPanelId = stateProps.visibleContextMenuPanelId,
      isViewMode = stateProps.isViewMode;
  var isPopoverOpen = visibleContextMenuPanelId === ownProps.panelId;
  var onMaximizePanel = dispatchProps.onMaximizePanel,
      onMinimizePanel = dispatchProps.onMinimizePanel,
      onDeletePanel = dispatchProps.onDeletePanel,
      onResetPanelTitle = dispatchProps.onResetPanelTitle,
      onUpdatePanelTitle = dispatchProps.onUpdatePanelTitle,
      onCloseContextMenu = dispatchProps.onCloseContextMenu,
      openContextMenu = dispatchProps.openContextMenu;

  var toggleContextMenu = function toggleContextMenu() {
    return isPopoverOpen ? onCloseContextMenu() : openContextMenu();
  }; // Outside click handlers will trigger for every closed context menu, we only want to react to clicks external to
  // the currently opened menu.


  var closeMyContextMenuPanel = function closeMyContextMenuPanel() {
    if (isPopoverOpen) {
      onCloseContextMenu();
    }
  };

  var toggleExpandedPanel = function toggleExpandedPanel() {
    // eslint-disable-next-line no-unused-expressions
    isExpanded ? onMinimizePanel() : onMaximizePanel();
    closeMyContextMenuPanel();
  };

  var panels = []; // Don't build the panels if the pop over is not open, or this gets expensive - this function is called once for
  // every panel, every time any state changes.

  if (isPopoverOpen) {
    var contextMenuPanel = new _embeddable.ContextMenuPanel({
      title: _i18n.i18n.translate('kbn.dashboard.panel.optionsMenu.optionsContextMenuTitle', {
        defaultMessage: 'Options'
      }),
      id: 'mainMenu'
    });
    var actions = [(0, _panel_actions.getInspectorPanelAction)({
      closeContextMenu: closeMyContextMenuPanel,
      panelTitle: panelTitle
    }), (0, _panel_actions.getEditPanelAction)(), (0, _panel_actions.getCustomizePanelAction)({
      onResetPanelTitle: onResetPanelTitle,
      onUpdatePanelTitle: onUpdatePanelTitle,
      title: panelTitle,
      closeContextMenu: closeMyContextMenuPanel
    }), (0, _panel_actions.getToggleExpandPanelAction)({
      isExpanded: isExpanded,
      toggleExpandedPanel: toggleExpandedPanel
    }), (0, _panel_actions.getRemovePanelAction)(onDeletePanel)].concat(_panel_actions_store.panelActionsStore.actions);
    panels = (0, _embeddable.buildEuiContextMenuPanels)({
      contextMenuPanel: contextMenuPanel,
      actions: actions,
      embeddable: ownProps.embeddable,
      containerState: containerState
    });
  }

  return {
    panels: panels,
    toggleContextMenu: toggleContextMenu,
    closeContextMenu: closeMyContextMenuPanel,
    isPopoverOpen: isPopoverOpen,
    isViewMode: isViewMode
  };
};

var PanelOptionsMenuContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(_panel_options_menu.PanelOptionsMenu);
exports.PanelOptionsMenuContainer = PanelOptionsMenuContainer;