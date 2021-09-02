"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const blame_1 = require("./blame");
const commit_1 = require("./commit");
const editor_1 = require("./editor");
const file_1 = require("./file");
const language_server_1 = require("./language_server");
const repository_1 = require("./repository");
const route_1 = require("./route");
const search_1 = require("./search");
const setup_1 = require("./setup");
const shortcuts_1 = require("./shortcuts");
const status_1 = require("./status");
exports.RepoState = status_1.RepoState;
const symbol_1 = require("./symbol");
const reducers = {
    repository: repository_1.repository,
    file: file_1.file,
    symbol: symbol_1.symbol,
    editor: editor_1.editor,
    search: search_1.search,
    route: route_1.route,
    status: status_1.status,
    commit: commit_1.commit,
    blame: blame_1.blame,
    languageServer: language_server_1.languageServer,
    shortcuts: shortcuts_1.shortcuts,
    setup: setup_1.setup,
};
// @ts-ignore
exports.rootReducer = redux_1.combineReducers(reducers);
