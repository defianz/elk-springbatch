"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const eui_1 = require("@elastic/eui");
// @ts-ignore unconverted component
const popover_1 = require("../popover");
const custom_element_modal_1 = require("../custom_element_modal");
const tool_tip_shortcut_1 = require("../tool_tip_shortcut/");
const topBorderClassName = 'canvasContextMenu--topBorder';
const contextMenuButton = (handleClick) => (react_1.default.createElement(eui_1.EuiButtonIcon, { color: "text", iconType: "boxesVertical", onClick: handleClick, "aria-label": "Element options" }));
class SidebarHeader extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isModalVisible: false,
        };
        this._isMounted = false;
        this._showModal = () => this._isMounted && this.setState({ isModalVisible: true });
        this._hideModal = () => this._isMounted && this.setState({ isModalVisible: false });
        this._renderLayoutControls = () => {
            const { bringToFront, bringForward, sendBackward, sendToBack } = this.props;
            return (react_1.default.createElement(react_1.Fragment, null,
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiToolTip, { position: "bottom", content: react_1.default.createElement("span", null,
                            "Bring to front",
                            react_1.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { namespace: "ELEMENT", action: "BRING_TO_FRONT" })) },
                        react_1.default.createElement(eui_1.EuiButtonIcon, { color: "text", iconType: "sortUp", onClick: bringToFront, "aria-label": "Move element to top layer" }))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiToolTip, { position: "bottom", content: react_1.default.createElement("span", null,
                            "Bring forward",
                            react_1.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { namespace: "ELEMENT", action: "BRING_FORWARD" })) },
                        react_1.default.createElement(eui_1.EuiButtonIcon, { color: "text", iconType: "arrowUp", onClick: bringForward, "aria-label": "Move element up one layer" }))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiToolTip, { position: "bottom", content: react_1.default.createElement("span", null,
                            "Send backward",
                            react_1.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { namespace: "ELEMENT", action: "SEND_BACKWARD" })) },
                        react_1.default.createElement(eui_1.EuiButtonIcon, { color: "text", iconType: "arrowDown", onClick: sendBackward, "aria-label": "Move element down one layer" }))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiToolTip, { position: "bottom", content: react_1.default.createElement("span", null,
                            "Send to back",
                            react_1.default.createElement(tool_tip_shortcut_1.ToolTipShortcut, { namespace: "ELEMENT", action: "SEND_TO_BACK" })) },
                        react_1.default.createElement(eui_1.EuiButtonIcon, { color: "text", iconType: "sortDown", onClick: sendToBack, "aria-label": "Move element to bottom layer" })))));
        };
        this._getLayerMenuItems = () => {
            const { bringToFront, bringForward, sendBackward, sendToBack } = this.props;
            return {
                menuItem: { name: 'Order', className: topBorderClassName, panel: 1 },
                panel: {
                    id: 1,
                    title: 'Order',
                    items: [
                        {
                            name: 'Bring to front',
                            icon: 'sortUp',
                            onClick: bringToFront,
                        },
                        {
                            name: 'Bring forward',
                            icon: 'arrowUp',
                            onClick: bringForward,
                        },
                        {
                            name: 'Send backward',
                            icon: 'arrowDown',
                            onClick: sendBackward,
                        },
                        {
                            name: 'Send to back',
                            icon: 'sortDown',
                            onClick: sendToBack,
                        },
                    ],
                },
            };
        };
        this._getGroupMenuItems = (close) => {
            const { groupIsSelected, ungroupNodes, groupNodes, selectedNodes } = this.props;
            return groupIsSelected
                ? [
                    {
                        name: 'Ungroup',
                        className: topBorderClassName,
                        onClick: close(ungroupNodes),
                    },
                ]
                : selectedNodes.length > 1
                    ? [
                        {
                            name: 'Group',
                            className: topBorderClassName,
                            onClick: close(groupNodes),
                        },
                    ]
                    : [];
        };
        this._getPanels = (closePopover) => {
            const { showLayerControls, cutNodes, copyNodes, pasteNodes, deleteNodes, cloneNodes, } = this.props;
            // closes popover after invoking fn
            const close = (fn) => () => {
                fn();
                closePopover();
            };
            const items = [
                {
                    name: 'Cut',
                    icon: 'cut',
                    onClick: close(cutNodes),
                },
                {
                    name: 'Copy',
                    icon: 'copy',
                    onClick: copyNodes,
                },
                {
                    name: 'Paste',
                    icon: 'copyClipboard',
                    onClick: close(pasteNodes),
                },
                {
                    name: 'Delete',
                    icon: 'trash',
                    onClick: close(deleteNodes),
                },
                {
                    name: 'Clone',
                    onClick: close(cloneNodes),
                },
                ...this._getGroupMenuItems(close),
            ];
            const panels = [
                {
                    id: 0,
                    title: 'Element options',
                    items,
                },
            ];
            if (showLayerControls) {
                const { menuItem, panel } = this._getLayerMenuItems();
                // add Order menu item to first panel
                items.push(menuItem);
                // add nested panel for layers controls
                panels.push(panel);
            }
            items.push({
                name: 'Save as new element',
                icon: 'indexOpen',
                className: topBorderClassName,
                onClick: this._showModal,
            });
            return panels;
        };
        this._renderContextMenu = () => (react_1.default.createElement(popover_1.Popover, { id: "sidebar-context-menu-popover", className: "canvasContextMenu", button: contextMenuButton, panelPaddingSize: "none", tooltip: "Element options", tooltipPosition: "bottom" }, ({ closePopover }) => (react_1.default.createElement(eui_1.EuiContextMenu, { initialPanelId: 0, panels: this._getPanels(closePopover) }))));
        this._handleSave = (name, description, image) => {
            const { createCustomElement } = this.props;
            createCustomElement(name, description, image);
            this._hideModal();
        };
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const { title, showLayerControls } = this.props;
        const { isModalVisible } = this.state;
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement(eui_1.EuiFlexGroup, { className: "canvasLayout__sidebarHeader", gutterSize: "none", alignItems: "center", justifyContent: "spaceBetween" },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                        react_1.default.createElement("h3", null, title))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none" },
                        showLayerControls ? this._renderLayoutControls() : null,
                        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                            react_1.default.createElement(eui_1.EuiToolTip, { position: "bottom", content: "Save as new element" },
                                react_1.default.createElement(eui_1.EuiButtonIcon, { color: "text", iconType: "indexOpen", onClick: this._showModal, "aria-label": "Save as new element" }))),
                        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, this._renderContextMenu())))),
            isModalVisible ? (react_1.default.createElement(eui_1.EuiOverlayMask, null,
                react_1.default.createElement(custom_element_modal_1.CustomElementModal, { title: "Create new element", onSave: this._handleSave, onCancel: this._hideModal }))) : null));
    }
}
SidebarHeader.propTypes = {
    title: prop_types_1.default.string.isRequired,
    showLayerControls: prop_types_1.default.bool,
    cutNodes: prop_types_1.default.func.isRequired,
    copyNodes: prop_types_1.default.func.isRequired,
    pasteNodes: prop_types_1.default.func.isRequired,
    cloneNodes: prop_types_1.default.func.isRequired,
    deleteNodes: prop_types_1.default.func.isRequired,
    bringToFront: prop_types_1.default.func.isRequired,
    bringForward: prop_types_1.default.func.isRequired,
    sendBackward: prop_types_1.default.func.isRequired,
    sendToBack: prop_types_1.default.func.isRequired,
    createCustomElement: prop_types_1.default.func.isRequired,
    groupIsSelected: prop_types_1.default.bool,
    selectedNodes: prop_types_1.default.array,
    groupNodes: prop_types_1.default.func.isRequired,
    ungroupNodes: prop_types_1.default.func.isRequired,
};
SidebarHeader.defaultProps = {
    groupIsSelected: false,
    showLayerControls: false,
    selectedNodes: [],
};
exports.SidebarHeader = SidebarHeader;
