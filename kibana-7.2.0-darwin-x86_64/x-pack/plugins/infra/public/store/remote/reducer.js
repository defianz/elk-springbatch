"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const log_entries_1 = require("./log_entries");
exports.initialRemoteState = {
    logEntries: log_entries_1.initialLogEntriesState,
};
exports.remoteReducer = redux_1.combineReducers({
    logEntries: log_entries_1.logEntriesReducer,
});
