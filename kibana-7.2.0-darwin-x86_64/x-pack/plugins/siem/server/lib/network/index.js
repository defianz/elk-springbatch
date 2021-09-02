"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./elasticsearch_adapter"), exports);
class Network {
    constructor(adapter) {
        this.adapter = adapter;
    }
    async getNetworkTopNFlow(req, options) {
        return await this.adapter.getNetworkTopNFlow(req, options);
    }
    async getNetworkDns(req, options) {
        return await this.adapter.getNetworkDns(req, options);
    }
}
exports.Network = Network;
