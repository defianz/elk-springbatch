"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const lodash_1 = require("lodash");
class AppActions {
    constructor(versionNumber) {
        this.prefix = `app:${versionNumber}:`;
    }
    get all() {
        return `${this.prefix}*`;
    }
    get(appId) {
        if (!appId || !lodash_1.isString(appId)) {
            throw new Error('appId is required and must be a string');
        }
        return `${this.prefix}${appId}`;
    }
}
exports.AppActions = AppActions;
