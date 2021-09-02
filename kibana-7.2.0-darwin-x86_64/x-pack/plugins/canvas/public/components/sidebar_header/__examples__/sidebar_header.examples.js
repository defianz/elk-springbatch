"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@storybook/react");
const addon_actions_1 = require("@storybook/addon-actions");
const sidebar_header_1 = require("../sidebar_header");
const handlers = {
    cloneNodes: addon_actions_1.action('cloneNodes'),
    copyNodes: addon_actions_1.action('copyNodes'),
    cutNodes: addon_actions_1.action('cutNodes'),
    pasteNodes: addon_actions_1.action('pasteNodes'),
    deleteNodes: addon_actions_1.action('deleteNodes'),
    bringToFront: addon_actions_1.action('bringToFront'),
    bringForward: addon_actions_1.action('bringForward'),
    sendBackward: addon_actions_1.action('sendBackward'),
    sendToBack: addon_actions_1.action('sendToBack'),
    createCustomElement: addon_actions_1.action('createCustomElement'),
    groupNodes: addon_actions_1.action('groupNodes'),
    ungroupNodes: addon_actions_1.action('ungroupNodes'),
};
react_2.storiesOf('components/SidebarHeader/', module)
    .addDecorator(story => react_1.default.createElement("div", { style: { width: '300px' } }, story()))
    .add('default', () => react_1.default.createElement(sidebar_header_1.SidebarHeader, Object.assign({ title: "Selected layer" }, handlers)))
    .add('without layer controls', () => (react_1.default.createElement(sidebar_header_1.SidebarHeader, Object.assign({ title: "Grouped element", showLayerControls: false }, handlers))));
