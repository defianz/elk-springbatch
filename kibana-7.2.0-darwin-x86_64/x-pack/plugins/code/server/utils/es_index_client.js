"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class EsIndexClient {
    constructor(self) {
        this.self = self;
    }
    exists(params) {
        return this.self.callCluster('indices.exists', params);
    }
    create(params) {
        return this.self.callCluster('indices.create', params);
    }
    refresh(params) {
        return this.self.callCluster('indices.refresh', params);
    }
    delete(params) {
        return this.self.callCluster('indices.delete', params);
    }
    existsAlias(params) {
        return this.self.callCluster('indices.existsAlias', params);
    }
    getAlias(params) {
        return this.self.callCluster('indices.getAlias', params);
    }
    putAlias(params) {
        return this.self.callCluster('indices.putAlias', params);
    }
    deleteAlias(params) {
        return this.self.callCluster('indices.deleteAlias', params);
    }
    updateAliases(params) {
        return this.self.callCluster('indices.updateAliases', params);
    }
    getMapping(params) {
        return this.self.callCluster('indices.getMapping', params);
    }
}
exports.EsIndexClient = EsIndexClient;
