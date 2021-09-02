"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class WithRequest {
    constructor(req) {
        this.req = req;
        const cluster = req.server.plugins.elasticsearch.getCluster('data');
        // @ts-ignore
        const securityPlugin = req.server.plugins.security;
        if (securityPlugin) {
            const useRbac = securityPlugin.authorization.mode.useRbacForRequest(req);
            if (useRbac) {
                this.callCluster = cluster.callWithInternalUser;
                return;
            }
        }
        this.callCluster = cluster.callWithRequest.bind(null, req);
    }
}
exports.WithRequest = WithRequest;
