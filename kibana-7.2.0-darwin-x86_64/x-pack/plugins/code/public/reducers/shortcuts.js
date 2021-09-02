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
const helpShortcut = {
    key: '?',
    help: 'Display this page',
    modifier: new Map(),
    onPress: dispatch => {
        dispatch(actions_1.toggleHelp(null));
    },
};
const initialState = {
    showHelp: false,
    shortcuts: [helpShortcut],
};
exports.shortcuts = redux_actions_1.handleActions({
    [String(actions_1.toggleHelp)]: (state, action) => immer_1.default(state, (draft) => {
        if (action.payload === null) {
            draft.showHelp = !state.showHelp;
        }
        else {
            draft.showHelp = action.payload;
        }
    }),
    [String(actions_1.registerShortcut)]: (state, action) => immer_1.default(state, (draft) => {
        const hotKey = action.payload;
        draft.shortcuts.push(hotKey);
    }),
    [String(actions_1.unregisterShortcut)]: (state, action) => immer_1.default(state, (draft) => {
        const hotKey = action.payload;
        const idx = state.shortcuts.indexOf(hotKey);
        if (idx >= 0) {
            draft.shortcuts.splice(idx, 1);
        }
    }),
}, initialState);
