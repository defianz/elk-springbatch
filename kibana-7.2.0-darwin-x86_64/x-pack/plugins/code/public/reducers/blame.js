"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const immer_1 = tslib_1.__importDefault(require("immer"));
const redux_actions_1 = require("redux-actions");
const blame_1 = require("../actions/blame");
const initialState = {
    blames: [],
    loading: false,
};
exports.blame = redux_actions_1.handleActions({
    [String(blame_1.loadBlame)]: (state) => immer_1.default(state, draft => {
        draft.loading = true;
    }),
    [String(blame_1.loadBlameSuccess)]: (state, action) => immer_1.default(state, (draft) => {
        draft.blames = action.payload;
        draft.loading = false;
    }),
    [String(blame_1.loadBlameFailed)]: (state, action) => immer_1.default(state, draft => {
        draft.loading = false;
        draft.error = action.payload;
        draft.blames = [];
    }),
}, initialState);
