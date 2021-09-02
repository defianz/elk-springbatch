"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const es_index_client_1 = require("./es_index_client");
const with_request_1 = require("./with_request");
class EsClientWithRequest extends with_request_1.WithRequest {
    constructor(req) {
        super(req);
        this.req = req;
        this.indices = new es_index_client_1.EsIndexClient(this);
    }
    bulk(params) {
        return this.callCluster('bulk', params);
    }
    delete(params) {
        return this.callCluster('delete', params);
    }
    deleteByQuery(params) {
        return this.callCluster('deleteByQuery', params);
    }
    get(params) {
        return this.callCluster('get', params);
    }
    index(params) {
        return this.callCluster('index', params);
    }
    ping() {
        return this.callCluster('ping');
    }
    reindex(params) {
        return this.callCluster('reindex', params);
    }
    search(params) {
        return this.callCluster('search', params);
    }
    update(params) {
        return this.callCluster('update', params);
    }
    updateByQuery(params) {
        return this.callCluster('updateByQuery', params);
    }
}
exports.EsClientWithRequest = EsClientWithRequest;
