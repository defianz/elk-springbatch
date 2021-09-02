"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class SpaceActions {
    constructor(versionNumber) {
        this.prefix = `space:${versionNumber}:`;
    }
    get manage() {
        return `${this.prefix}manage`;
    }
}
exports.SpaceActions = SpaceActions;
