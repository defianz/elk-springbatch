"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class SavedObjectActions {
    constructor(versionNumber) {
        this.prefix = `saved_object:${versionNumber}:`;
    }
    get all() {
        return `${this.prefix}*`;
    }
    get(type, operation) {
        if (!type || !lodash_1.isString(type)) {
            throw new Error('type is required and must be a string');
        }
        if (!operation || !lodash_1.isString(operation)) {
            throw new Error('type is required and must be a string');
        }
        return `${this.prefix}${type}/${operation}`;
    }
}
exports.SavedObjectActions = SavedObjectActions;
