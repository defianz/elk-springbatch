"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
// @ts-ignore unconverted local file
const clipboard_1 = require("./clipboard");
// @ts-ignore unconverted local file
const clone_subgraphs_1 = require("./clone_subgraphs");
// @ts-ignore unconverted local file
const notify_1 = require("./notify");
const customElementService = tslib_1.__importStar(require("./custom_element_service"));
const get_id_1 = require("./get_id");
const extractId = (node) => node.id;
// handlers for clone and delete
exports.basicHandlerCreators = {
    cloneNodes: ({ insertNodes, pageId, selectToplevelNodes, selectedNodes }) => () => {
        const clonedNodes = selectedNodes && clone_subgraphs_1.cloneSubgraphs(selectedNodes);
        if (clonedNodes) {
            insertNodes(clonedNodes, pageId);
            selectToplevelNodes(clonedNodes);
        }
    },
    deleteNodes: ({ pageId, removeNodes, selectedNodes }) => () => {
        if (selectedNodes.length) {
            removeNodes(selectedNodes.map(extractId), pageId);
        }
    },
    createCustomElement: ({ selectedNodes }) => (name = '', description = '', image = '') => {
        if (selectedNodes.length) {
            const content = JSON.stringify({ selectedNodes });
            const customElement = {
                id: get_id_1.getId('custom-element'),
                name: lodash_1.camelCase(name),
                displayName: name,
                help: description,
                image,
                content,
            };
            customElementService
                .create(customElement)
                .then(() => notify_1.notify.success(`Custom element '${customElement.displayName || customElement.id}' was saved`))
                .catch((result) => notify_1.notify.warning(result, {
                title: `Custom element '${customElement.displayName ||
                    customElement.id}' was not saved`,
            }));
        }
    },
};
// handlers for group and ungroup
exports.groupHandlerCreators = {
    groupNodes: ({ commit }) => () => {
        commit('actionEvent', { event: 'group' });
    },
    ungroupNodes: ({ commit }) => () => {
        commit('actionEvent', { event: 'ungroup' });
    },
};
// handlers for cut/copy/paste
exports.clipboardHandlerCreators = {
    cutNodes: ({ pageId, removeNodes, selectedNodes }) => () => {
        if (selectedNodes.length) {
            clipboard_1.setClipboardData({ selectedNodes });
            removeNodes(selectedNodes.map(extractId), pageId);
            notify_1.notify.success('Cut element to clipboard');
        }
    },
    copyNodes: ({ selectedNodes }) => () => {
        if (selectedNodes.length) {
            clipboard_1.setClipboardData({ selectedNodes });
            notify_1.notify.success('Copied element to clipboard');
        }
    },
    pasteNodes: ({ insertNodes, pageId, selectToplevelNodes }) => () => {
        const { selectedNodes = [] } = JSON.parse(clipboard_1.getClipboardData()) || {};
        const clonedNodes = selectedNodes && clone_subgraphs_1.cloneSubgraphs(selectedNodes);
        if (clonedNodes) {
            insertNodes(clonedNodes, pageId); // first clone and persist the new node(s)
            selectToplevelNodes(clonedNodes); // then select the cloned node(s)
        }
    },
};
// handlers for changing element layer position
// TODO: support relayering multiple elements
exports.layerHandlerCreators = {
    bringToFront: ({ elementLayer, pageId, selectedNodes }) => () => {
        if (selectedNodes.length === 1) {
            elementLayer(pageId, selectedNodes[0].id, Infinity);
        }
    },
    bringForward: ({ elementLayer, pageId, selectedNodes }) => () => {
        if (selectedNodes.length === 1) {
            elementLayer(pageId, selectedNodes[0].id, 1);
        }
    },
    sendBackward: ({ elementLayer, pageId, selectedNodes }) => () => {
        if (selectedNodes.length === 1) {
            elementLayer(pageId, selectedNodes[0].id, -1);
        }
    },
    sendToBack: ({ elementLayer, pageId, selectedNodes }) => () => {
        if (selectedNodes.length === 1) {
            elementLayer(pageId, selectedNodes[0].id, -Infinity);
        }
    },
};
