"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class LspMethod {
    constructor(method, client) {
        this.client = client;
        this.method = method;
    }
    asyncTask(input) {
        const abortController = new AbortController();
        const promise = () => {
            return this.client
                .sendRequest(this.method, input, abortController.signal)
                .then(result => result.result);
        };
        return {
            cancel() {
                abortController.abort();
            },
            promise,
        };
    }
    async send(input) {
        return await this.client
            .sendRequest(this.method, input)
            .then(result => result.result);
    }
}
exports.LspMethod = LspMethod;
