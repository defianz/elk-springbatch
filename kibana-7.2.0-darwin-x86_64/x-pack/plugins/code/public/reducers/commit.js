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
const commit_1 = require("../actions/commit");
const initialState = {
    commit: null,
    loading: false,
};
exports.commit = redux_actions_1.handleActions({
    [String(commit_1.loadCommit)]: (state, action) => immer_1.default(state, draft => {
        draft.loading = true;
    }),
    [String(commit_1.loadCommitSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.commit = action.payload;
        draft.loading = false;
    }),
    [String(commit_1.loadCommitFailed)]: (state, action) => immer_1.default(state, draft => {
        draft.commit = null;
        draft.loading = false;
    }),
}, initialState);
