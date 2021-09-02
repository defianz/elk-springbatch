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
const model_1 = require("../../model");
const actions_1 = require("../actions");
var RepoState;
(function (RepoState) {
    RepoState[RepoState["CLONING"] = 0] = "CLONING";
    RepoState[RepoState["DELETING"] = 1] = "DELETING";
    RepoState[RepoState["INDEXING"] = 2] = "INDEXING";
    RepoState[RepoState["READY"] = 3] = "READY";
    RepoState[RepoState["CLONE_ERROR"] = 4] = "CLONE_ERROR";
    RepoState[RepoState["DELETE_ERROR"] = 5] = "DELETE_ERROR";
    RepoState[RepoState["INDEX_ERROR"] = 6] = "INDEX_ERROR";
})(RepoState = exports.RepoState || (exports.RepoState = {}));
const initialState = {
    status: {},
    loading: false,
};
exports.status = redux_actions_1.handleActions({
    [String(actions_1.loadStatus)]: (state) => immer_1.default(state, draft => {
        draft.loading = true;
    }),
    [String(actions_1.loadStatusSuccess)]: (state, action) => immer_1.default(state, draft => {
        Object.keys(action.payload).forEach((repoUri) => {
            const statuses = action.payload[repoUri];
            if (statuses.deleteStatus) {
                // 1. Look into delete status first
                const progress = statuses.deleteStatus.progress;
                if (progress === model_1.WorkerReservedProgress.ERROR ||
                    progress === model_1.WorkerReservedProgress.TIMEOUT) {
                    draft.status[repoUri] = {
                        ...statuses.deleteStatus,
                        state: RepoState.DELETE_ERROR,
                    };
                }
                else if (progress < model_1.WorkerReservedProgress.COMPLETED) {
                    draft.status[repoUri] = {
                        ...statuses.deleteStatus,
                        state: RepoState.DELETING,
                    };
                }
            }
            else if (statuses.indexStatus) {
                const progress = statuses.indexStatus.progress;
                if (progress === model_1.WorkerReservedProgress.ERROR ||
                    progress === model_1.WorkerReservedProgress.TIMEOUT) {
                    draft.status[repoUri] = {
                        ...statuses.indexStatus,
                        state: RepoState.INDEX_ERROR,
                    };
                }
                else if (progress < model_1.WorkerReservedProgress.COMPLETED) {
                    draft.status[repoUri] = {
                        ...statuses.indexStatus,
                        state: RepoState.INDEXING,
                    };
                }
                else if (progress === model_1.WorkerReservedProgress.COMPLETED) {
                    draft.status[repoUri] = {
                        ...statuses.indexStatus,
                        state: RepoState.READY,
                    };
                }
            }
            else if (statuses.gitStatus) {
                const progress = statuses.gitStatus.progress;
                if (progress === model_1.WorkerReservedProgress.ERROR ||
                    progress === model_1.WorkerReservedProgress.TIMEOUT) {
                    draft.status[repoUri] = {
                        ...statuses.gitStatus,
                        state: RepoState.CLONE_ERROR,
                    };
                }
                else if (progress < model_1.WorkerReservedProgress.COMPLETED) {
                    draft.status[repoUri] = {
                        ...statuses.gitStatus,
                        state: RepoState.CLONING,
                    };
                }
                else if (progress === model_1.WorkerReservedProgress.COMPLETED) {
                    draft.status[repoUri] = {
                        ...statuses.gitStatus,
                        state: RepoState.READY,
                    };
                }
            }
        });
        draft.loading = false;
    }),
    [String(actions_1.loadStatusFailed)]: (state, action) => immer_1.default(state, draft => {
        draft.loading = false;
        draft.error = action.payload;
    }),
    [String(actions_1.updateCloneProgress)]: (state, action) => immer_1.default(state, draft => {
        const progress = action.payload.progress;
        let s = RepoState.CLONING;
        if (progress === model_1.WorkerReservedProgress.ERROR ||
            progress === model_1.WorkerReservedProgress.TIMEOUT) {
            s = RepoState.CLONE_ERROR;
        }
        else if (progress === model_1.WorkerReservedProgress.COMPLETED) {
            s = RepoState.READY;
        }
        draft.status[action.payload.repoUri] = {
            ...action.payload,
            state: s,
        };
    }),
    [String(actions_1.updateIndexProgress)]: (state, action) => immer_1.default(state, draft => {
        const progress = action.payload.progress;
        let s = RepoState.INDEXING;
        if (progress === model_1.WorkerReservedProgress.ERROR ||
            progress === model_1.WorkerReservedProgress.TIMEOUT) {
            s = RepoState.INDEX_ERROR;
        }
        else if (progress === model_1.WorkerReservedProgress.COMPLETED) {
            s = RepoState.READY;
        }
        draft.status[action.payload.repoUri] = {
            ...action.payload,
            state: s,
        };
    }),
    [String(actions_1.updateDeleteProgress)]: (state, action) => immer_1.default(state, draft => {
        const progress = action.payload.progress;
        if (progress === model_1.WorkerReservedProgress.COMPLETED) {
            delete draft.status[action.payload.repoUri];
        }
        else {
            let s = RepoState.DELETING;
            if (progress === model_1.WorkerReservedProgress.ERROR ||
                progress === model_1.WorkerReservedProgress.TIMEOUT) {
                s = RepoState.DELETE_ERROR;
            }
            draft.status[action.payload.repoUri] = {
                ...action.payload,
                state: s,
            };
        }
    }),
    [String(actions_1.deleteRepoFinished)]: (state, action) => immer_1.default(state, (draft) => {
        delete draft.status[action.payload];
    }),
}, initialState);
