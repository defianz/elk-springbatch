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
const initialState = {
    query: '',
    isLoading: false,
    isScopeSearchLoading: false,
    scope: model_1.SearchScope.DEFAULT,
    searchOptions: { repoScope: [], defaultRepoScopeOn: false },
    scopeSearchResults: { repositories: [] },
};
exports.search = redux_actions_1.handleActions({
    [String(actions_1.changeSearchScope)]: (state, action) => immer_1.default(state, draft => {
        if (Object.values(model_1.SearchScope).includes(action.payload)) {
            draft.scope = action.payload;
        }
        else {
            draft.scope = model_1.SearchScope.DEFAULT;
        }
        draft.isLoading = false;
    }),
    [String(actions_1.documentSearch)]: (state, action) => immer_1.default(state, draft => {
        if (action.payload) {
            draft.query = action.payload.query;
            draft.page = parseInt(action.payload.page, 10);
            if (action.payload.languages) {
                draft.languages = new Set(decodeURIComponent(action.payload.languages).split(','));
            }
            else {
                draft.languages = new Set();
            }
            if (action.payload.repositories) {
                draft.repositories = new Set(decodeURIComponent(action.payload.repositories).split(','));
            }
            else {
                draft.repositories = new Set();
            }
            draft.isLoading = true;
            draft.error = undefined;
        }
    }),
    [String(actions_1.documentSearchSuccess)]: (state, action) => immer_1.default(state, (draft) => {
        const { from, page, totalPage, results, total, repoAggregations, langAggregations, took, } = action.payload;
        draft.isLoading = false;
        const repoStats = repoAggregations.map(agg => {
            return {
                name: agg.key,
                value: agg.doc_count,
            };
        });
        const languageStats = langAggregations.map(agg => {
            return {
                name: agg.key,
                value: agg.doc_count,
            };
        });
        draft.documentSearchResults = {
            ...draft.documentSearchResults,
            query: state.query,
            total,
            took,
            stats: {
                total,
                from: from + 1,
                to: from + results.length,
                page: page,
                totalPage: totalPage,
                repoStats,
                languageStats,
            },
            results,
        };
    }),
    [String(actions_1.documentSearchFailed)]: (state, action) => {
        if (action.payload) {
            return immer_1.default(state, draft => {
                draft.isLoading = false;
                draft.error = action.payload;
            });
        }
        else {
            return state;
        }
    },
    [String(actions_1.suggestionSearch)]: (state, action) => immer_1.default(state, draft => {
        if (action.payload) {
            draft.query = action.payload;
        }
    }),
    [String(actions_1.repositorySearch)]: (state, action) => immer_1.default(state, draft => {
        if (action.payload) {
            draft.query = action.payload.query;
            draft.isLoading = true;
        }
    }),
    [String(actions_1.repositorySearchSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.repositorySearchResults = action.payload;
        draft.isLoading = false;
    }),
    [String(actions_1.repositorySearchFailed)]: (state, action) => {
        if (action.payload) {
            return immer_1.default(state, draft => {
                draft.isLoading = false;
                draft.error = action.payload.error;
            });
        }
        else {
            return state;
        }
    },
    [String(actions_1.saveSearchOptions)]: (state, action) => immer_1.default(state, draft => {
        draft.searchOptions = action.payload;
    }),
    [String(actions_1.searchReposForScope)]: (state, action) => immer_1.default(state, draft => {
        draft.isScopeSearchLoading = true;
    }),
    [String(actions_1.searchReposForScopeSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.scopeSearchResults = action.payload;
        draft.isScopeSearchLoading = false;
    }),
    [String(actions_1.turnOnDefaultRepoScope)]: (state, action) => immer_1.default(state, draft => {
        draft.searchOptions.defaultRepoScope = action.payload;
        draft.searchOptions.defaultRepoScopeOn = true;
    }),
    [String(actions_1.turnOffDefaultRepoScope)]: (state, action) => immer_1.default(state, draft => {
        delete draft.searchOptions.defaultRepoScope;
        draft.searchOptions.defaultRepoScopeOn = false;
    }),
}, initialState);
