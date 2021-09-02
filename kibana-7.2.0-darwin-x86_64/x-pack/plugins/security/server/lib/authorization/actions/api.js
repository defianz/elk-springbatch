"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lodash_1 = require("lodash");
class ApiActions {
    constructor(versionNumber) {
        this.prefix = `api:${versionNumber}:`;
    }
    get all() {
        return `${this.prefix}*`;
    }
    get(operation) {
        if (!operation || !lodash_1.isString(operation)) {
            throw new Error('operation is required and must be a string');
        }
        return `${this.prefix}${operation}`;
    }
}
exports.ApiActions = ApiActions;
