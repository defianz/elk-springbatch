"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_fsa_1 = tslib_1.__importDefault(require("typescript-fsa"));
const load_1 = require("./operations/load");
const load_more_1 = require("./operations/load_more");
const actionCreator = typescript_fsa_1.default('x-pack/infra/remote/log_entries');
exports.setSourceId = actionCreator('SET_SOURCE_ID');
exports.loadEntries = load_1.loadEntriesActionCreators.resolve;
exports.loadMoreEntries = load_more_1.loadMoreEntriesActionCreators.resolve;
exports.loadNewerEntries = actionCreator('LOAD_NEWER_LOG_ENTRIES');
exports.reloadEntries = actionCreator('RELOAD_LOG_ENTRIES');
