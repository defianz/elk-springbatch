"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const boom_1 = tslib_1.__importDefault(require("boom"));
function promiseTimeout(ms, promise) {
    const boom = boom_1.default.gatewayTimeout('Timed out in ' + ms + 'ms.');
    // @ts-ignore
    boom.isTimeout = true;
    if (ms > 0) {
        // Create a promise that rejects in <ms> milliseconds
        const timeout = new Promise((resolve, reject) => {
            const id = setTimeout(() => {
                clearTimeout(id);
                reject(boom);
            }, ms);
        });
        // Returns a race between our timeout and the passed in promise
        return Promise.race([promise, timeout]);
    }
    else {
        return Promise.reject(boom);
    }
}
exports.promiseTimeout = promiseTimeout;
