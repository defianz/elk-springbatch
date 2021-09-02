"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
/**
 * Loops through allActions and extracts those that belong on the given contextMenuPanelId
 * @param {string} contextMenuPanelId
 * @param {Array.<ContextMenuAction>} allActions
 */
function getActionsForPanel(contextMenuPanelId, allActions) {
    return allActions.filter(action => action.parentPanelId === contextMenuPanelId);
}
/**
 * @param {String} contextMenuPanelId
 * @param {Array.<ContextMenuAction>} actions
 * @param {Embeddable} embeddable
 * @param {ContainerState} containerState
 * @return {{
 *   Array.<EuiContextMenuPanelItemDescriptor> items - panel actions converted into the items expected to be on an
 *     EuiContextMenuPanel,
 *   Array.<EuiContextMenuPanelDescriptor> childPanels - extracted child panels, if any actions also open a panel. They
 *     need to be moved to the top level for EUI.
 *  }}
 */
function buildEuiContextMenuPanelItemsAndChildPanels({ contextMenuPanelId, actions, embeddable, containerState, }) {
    const items = [];
    const childPanels = [];
    const actionsForPanel = getActionsForPanel(contextMenuPanelId, actions);
    actionsForPanel.forEach(action => {
        const isVisible = action.isVisible({ embeddable, containerState });
        if (!isVisible) {
            return;
        }
        if (action.childContextMenuPanel) {
            childPanels.push(...buildEuiContextMenuPanels({
                contextMenuPanel: action.childContextMenuPanel,
                actions,
                embeddable,
                containerState,
            }));
        }
        items.push(convertPanelActionToContextMenuItem({
            action,
            containerState,
            embeddable,
        }));
    });
    return { items, childPanels };
}
/**
 * Transforms a DashboardContextMenuPanel to the shape EuiContextMenuPanel expects, inserting any registered pluggable
 * panel actions.
 * @param {ContextMenuPanel} contextMenuPanel
 * @param {Array.<ContextMenuAction>} actions to build the context menu with
 * @param {Embeddable} embeddable
 * @param {ContainerState} containerState
 * @return {EuiContextMenuPanelDescriptor[]} An array of context menu panels to be used in the eui react component.
 */
function buildEuiContextMenuPanels({ contextMenuPanel, actions, embeddable, containerState, }) {
    const euiContextMenuPanel = {
        id: contextMenuPanel.id,
        title: contextMenuPanel.title,
        items: [],
        content: contextMenuPanel.getContent({ embeddable, containerState }),
    };
    const contextMenuPanels = [euiContextMenuPanel];
    const { items, childPanels } = buildEuiContextMenuPanelItemsAndChildPanels({
        contextMenuPanelId: contextMenuPanel.id,
        actions,
        embeddable,
        containerState,
    });
    euiContextMenuPanel.items = items;
    return contextMenuPanels.concat(childPanels);
}
exports.buildEuiContextMenuPanels = buildEuiContextMenuPanels;
/**
 *
 * @param {ContextMenuAction} action
 * @param {ContainerState} containerState
 * @param {Embeddable} embeddable
 * @return {EuiContextMenuPanelItemDescriptor}
 */
function convertPanelActionToContextMenuItem({ action, containerState, embeddable, }) {
    const menuPanelItem = {
        name: action.getDisplayName({ embeddable, containerState }),
        icon: action.icon,
        panel: lodash_1.default.get(action, 'childContextMenuPanel.id'),
        disabled: action.isDisabled({ embeddable, containerState }),
        'data-test-subj': `dashboardPanelAction-${action.id}`,
    };
    if (action.onClick) {
        menuPanelItem.onClick = () => {
            if (action.onClick) {
                action.onClick({ embeddable, containerState });
            }
        };
    }
    if (action.getHref) {
        menuPanelItem.href = action.getHref({ embeddable, containerState });
    }
    return menuPanelItem;
}
