"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const reduce_reducers_1 = tslib_1.__importDefault(require("reduce-reducers"));
const load_1 = require("./operations/load");
const load_more_1 = require("./operations/load_more");
exports.logEntriesReducer = reduce_reducers_1.default(load_1.loadEntriesReducer, load_more_1.loadMoreEntriesReducer);
