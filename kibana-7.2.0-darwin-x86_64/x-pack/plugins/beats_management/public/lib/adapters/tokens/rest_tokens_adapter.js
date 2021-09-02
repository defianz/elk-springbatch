"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class RestTokensAdapter {
    constructor(REST) {
        this.REST = REST;
    }
    async createEnrollmentTokens(numTokens = 1) {
        const results = (await this.REST.post('/api/beats/enrollment_tokens', {
            num_tokens: numTokens,
        })).results;
        return results.map(result => result.item);
    }
}
exports.RestTokensAdapter = RestTokensAdapter;
