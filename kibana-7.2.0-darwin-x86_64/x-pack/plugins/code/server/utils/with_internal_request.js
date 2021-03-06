"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class WithInternalRequest {
    constructor(server) {
        const cluster = server.plugins.elasticsearch.getCluster('admin');
        this.callCluster = cluster.callWithInternalUser;
    }
}
exports.WithInternalRequest = WithInternalRequest;
