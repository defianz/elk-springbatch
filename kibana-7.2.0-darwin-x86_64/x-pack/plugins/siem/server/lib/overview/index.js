"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Overview {
    constructor(adapter) {
        this.adapter = adapter;
    }
    async getOverviewNetwork(req, options) {
        return await this.adapter.getOverviewNetwork(req, options);
    }
    async getOverviewHost(req, options) {
        return await this.adapter.getOverviewHost(req, options);
    }
}
exports.Overview = Overview;
