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
const language_server_1 = require("../../common/language_server");
const language_server_2 = require("../actions/language_server");
const initialState = {
    languageServers: [],
    loading: false,
    installServerLoading: {},
};
exports.languageServer = redux_actions_1.handleActions({
    [String(language_server_2.loadLanguageServers)]: (state, action) => immer_1.default(state, draft => {
        draft.loading = true;
    }),
    [String(language_server_2.loadLanguageServersSuccess)]: (state, action) => immer_1.default(state, draft => {
        draft.languageServers = action.payload;
        draft.loading = false;
    }),
    [String(language_server_2.loadLanguageServersFailed)]: (state, action) => immer_1.default(state, draft => {
        draft.languageServers = [];
        draft.loading = false;
    }),
    [String(language_server_2.requestInstallLanguageServer)]: (state, action) => immer_1.default(state, draft => {
        draft.installServerLoading[action.payload] = true;
    }),
    [String(language_server_2.requestInstallLanguageServerSuccess)]: (state, action) => immer_1.default(state, (draft) => {
        draft.installServerLoading[action.payload] = false;
        draft.languageServers.find(ls => ls.name === action.payload).status =
            language_server_1.LanguageServerStatus.READY;
    }),
}, initialState);
