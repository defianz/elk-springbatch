"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const immer_1 = tslib_1.__importDefault(require("immer"));
const redux_actions_1 = require("redux-actions");
const actions_1 = require("../actions");
const language_server_1 = require("../actions/language_server");
const initialState = {
    symbols: {},
    loading: false,
    structureTree: {},
    closedPaths: [],
    languageServerInitializing: false,
};
exports.symbol = redux_actions_1.handleActions({
    [String(actions_1.loadStructure)]: (state, action) => immer_1.default(state, draft => {
        draft.loading = true;
        draft.lastRequestPath = action.payload || '';
    }),
    [String(actions_1.loadStructureSuccess)]: (state, action) => immer_1.default(state, (draft) => {
        draft.loading = false;
        const { path, data, structureTree } = action.payload;
        draft.structureTree[path] = structureTree;
        draft.symbols = {
            ...state.symbols,
            [path]: data,
        };
        draft.languageServerInitializing = false;
        draft.error = undefined;
    }),
    [String(actions_1.loadStructureFailed)]: (state, action) => immer_1.default(state, draft => {
        if (action.payload) {
            draft.loading = false;
            draft.error = action.payload;
        }
        draft.languageServerInitializing = false;
    }),
    [String(actions_1.closeSymbolPath)]: (state, action) => immer_1.default(state, (draft) => {
        const path = action.payload;
        if (!state.closedPaths.includes(path)) {
            draft.closedPaths.push(path);
        }
    }),
    [String(actions_1.openSymbolPath)]: (state, action) => immer_1.default(state, draft => {
        const idx = state.closedPaths.indexOf(action.payload);
        if (idx >= 0) {
            draft.closedPaths.splice(idx, 1);
        }
    }),
    [String(language_server_1.languageServerInitializing)]: (state) => immer_1.default(state, draft => {
        draft.languageServerInitializing = true;
    }),
}, initialState);
