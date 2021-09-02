"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./elasticsearch_adapter"), exports);
class IpDetails {
    constructor(adapter) {
        this.adapter = adapter;
    }
    async getIpOverview(req, options) {
        return await this.adapter.getIpDetails(req, options);
    }
    async getDomains(req, options) {
        return await this.adapter.getDomains(req, options);
    }
    async getTls(req, options) {
        return await this.adapter.getTls(req, options);
    }
    async getDomainFirstLastSeen(req, options) {
        return await this.adapter.getDomainsFirstLastSeen(req, options);
    }
    async getUsers(req, options) {
        return await this.adapter.getUsers(req, options);
    }
}
exports.IpDetails = IpDetails;
