"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const FETCH_TIMEOUT = 30000;
exports.fetch = axios_1.default.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'kbn-xsrf': 'professionally-crafted-string-of-text',
    },
    timeout: FETCH_TIMEOUT,
});
