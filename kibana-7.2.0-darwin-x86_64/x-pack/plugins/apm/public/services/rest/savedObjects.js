"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const callApi_1 = require("./callApi");
exports.getAPMIndexPattern = lodash_1.memoize(async () => {
    try {
        return await callApi_1.callApi({
            method: 'GET',
            pathname: `/api/apm/index_pattern`
        });
    }
    catch (error) {
        return;
    }
});
