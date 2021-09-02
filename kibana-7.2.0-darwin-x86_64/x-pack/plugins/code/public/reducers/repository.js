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
var ToastType;
(function (ToastType) {
    ToastType["danger"] = "danger";
    ToastType["success"] = "success";
    ToastType["warning"] = "warning";
})(ToastType = exports.ToastType || (exports.ToastType = {}));
const initialState = {
    repositories: [],
    loading: false,
    importLoading: false,
    showToast: false,
    projectConfigs: {},
    repoNotFound: false,
};
exports.repository = redux_actions_1.handleActions({
    [String(actions_1.fetchRepos)]: (state) => immer_1.default(state, draft => {
        draft.loading = true;
    }),
    [String(actions_1.fetchReposSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.loading = false;
        draft.repositories = action.payload || [];
    }),
    [String(actions_1.fetchReposFailed)]: (state, action) => {
        if (action.payload) {
            return immer_1.default(state, draft => {
                draft.error = action.payload;
                draft.loading = false;
            });
        }
        else {
            return state;
        }
    },
    [String(actions_1.deleteRepoFinished)]: (state, action) => immer_1.default(state, (draft) => {
        draft.repositories = state.repositories.filter(repo => repo.uri !== action.payload);
    }),
    [String(actions_1.importRepo)]: (state) => immer_1.default(state, draft => {
        draft.importLoading = true;
    }),
    [String(actions_1.importRepoSuccess)]: (state, action) => immer_1.default(state, (draft) => {
        draft.importLoading = false;
        draft.showToast = true;
        draft.toastType = ToastType.success;
        draft.toastMessage = `${action.payload.name} has been successfully submitted!`;
        draft.repositories = [...state.repositories, action.payload];
    }),
    [String(actions_1.importRepoFailed)]: (state, action) => immer_1.default(state, draft => {
        if (action.payload) {
            if (action.payload.res.status === 304) {
                draft.toastMessage = 'This Repository has already been imported!';
                draft.showToast = true;
                draft.toastType = ToastType.warning;
                draft.importLoading = false;
            }
            else {
                draft.toastMessage = action.payload.body.message;
                draft.showToast = true;
                draft.toastType = ToastType.danger;
                draft.importLoading = false;
            }
        }
    }),
    [String(actions_1.closeToast)]: (state, action) => immer_1.default(state, draft => {
        draft.showToast = false;
    }),
    [String(actions_1.fetchRepoConfigSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.repoConfigs = action.payload;
    }),
    [String(actions_1.loadConfigsSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.projectConfigs = action.payload;
    }),
    [String(actions_1.loadRepo)]: (state, action) => immer_1.default(state, draft => {
        draft.currentRepository = undefined;
        draft.repoNotFound = false;
    }),
    [String(actions_1.loadRepoSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.currentRepository = action.payload;
        draft.repoNotFound = false;
    }),
    [String(actions_1.loadRepoFailed)]: (state, action) => immer_1.default(state, draft => {
        draft.currentRepository = undefined;
        draft.repoNotFound = true;
    }),
}, initialState);
