"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typed_redux_1 = require("../../utils/typed_redux");
const log_entries_1 = require("./log_entries");
exports.logEntriesSelectors = typed_redux_1.globalizeSelectors((state) => state.logEntries, log_entries_1.logEntriesSelectors);
