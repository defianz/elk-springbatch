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
const actions_1 = require("../actions");
const initialState = {
    loading: false,
    showing: false,
    references: [],
    referencesTitle: '',
};
exports.editor = redux_actions_1.handleActions({
    [String(actions_1.findReferences)]: (state, action) => immer_1.default(state, (draft) => {
        draft.refPayload = action.payload;
        draft.showing = true;
        draft.loading = true;
        draft.references = initialState.references;
        draft.hover = state.currentHover;
        draft.referencesTitle = initialState.referencesTitle;
    }),
    [String(actions_1.findReferencesSuccess)]: (state, action) => immer_1.default(state, draft => {
        const { title, repos } = action.payload;
        draft.references = repos;
        draft.referencesTitle = title;
        draft.loading = false;
    }),
    [String(actions_1.findReferencesFailed)]: (state) => immer_1.default(state, draft => {
        draft.references = [];
        draft.loading = false;
        draft.refPayload = undefined;
    }),
    [String(actions_1.closeReferences)]: (state) => immer_1.default(state, draft => {
        draft.showing = false;
        draft.loading = false;
        draft.refPayload = undefined;
        draft.references = [];
    }),
    [String(actions_1.hoverResult)]: (state, action) => immer_1.default(state, draft => {
        draft.currentHover = action.payload;
    }),
    [String(actions_1.revealPosition)]: (state, action) => immer_1.default(state, draft => {
        draft.revealPosition = action.payload;
    }),
}, initialState);
