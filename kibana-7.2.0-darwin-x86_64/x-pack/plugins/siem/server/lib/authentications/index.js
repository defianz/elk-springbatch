"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Authentications {
    constructor(adapter) {
        this.adapter = adapter;
    }
    async getAuthentications(req, options) {
        return await this.adapter.getAuthentications(req, options);
    }
}
exports.Authentications = Authentications;
