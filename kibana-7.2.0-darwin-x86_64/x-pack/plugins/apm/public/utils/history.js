"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const createHashHistory_1 = tslib_1.__importDefault(require("history/createHashHistory"));
// Make history singleton available across APM project
// TODO: Explore using React context or hook instead?
const history = createHashHistory_1.default();
exports.history = history;
