"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_hapi_1 = require("./apollo_server_hapi");
const types_1 = require("./types");
class KibanaBackendFrameworkAdapter {
    constructor(server) {
        this.server = server;
        this.version = server.config().get('pkg.version');
    }
    async callWithRequest(req, endpoint, params, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...rest) {
        const internalRequest = req[types_1.internalFrameworkRequest];
        const { elasticsearch } = internalRequest.server.plugins;
        const { callWithRequest } = elasticsearch.getCluster('data');
        const includeFrozen = await internalRequest.getUiSettingsService().get('search:includeFrozen');
        if (endpoint === 'msearch') {
            const maxConcurrentShardRequests = await internalRequest
                .getUiSettingsService()
                .get('courier:maxConcurrentShardRequests');
            if (maxConcurrentShardRequests > 0) {
                params = { ...params, max_concurrent_shard_requests: maxConcurrentShardRequests };
            }
        }
        const fields = await callWithRequest(internalRequest, endpoint, { ...params, ignore_throttled: !includeFrozen }, ...rest);
        return fields;
    }
    exposeStaticDir(urlPath, dir) {
        this.server.route({
            handler: {
                directory: {
                    path: dir,
                },
            },
            method: 'GET',
            path: urlPath,
        });
    }
    registerGraphQLEndpoint(routePath, schema) {
        this.server.register({
            options: {
                graphqlOptions: (req) => ({
                    context: { req: wrapRequest(req) },
                    schema,
                }),
                path: routePath,
                route: {
                    tags: ['access:siem'],
                },
            },
            plugin: apollo_server_hapi_1.graphqlHapi,
        });
        this.server.register({
            options: {
                graphiqlOptions: {
                    endpointURL: routePath,
                    passHeader: `'kbn-version': '${this.version}'`,
                },
                path: `${routePath}/graphiql`,
                route: {
                    tags: ['access:siem'],
                },
            },
            plugin: apollo_server_hapi_1.graphiqlHapi,
        });
    }
    getIndexPatternsService(request) {
        return this.server.indexPatternsServiceFactory({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            callCluster: async (method, args, ...rest) => {
                const fieldCaps = await this.callWithRequest(request, method, { ...args, allowNoIndices: true }, ...rest);
                return fieldCaps;
            },
        });
    }
    getSavedObjectsService() {
        return this.server.savedObjects;
    }
}
exports.KibanaBackendFrameworkAdapter = KibanaBackendFrameworkAdapter;
function wrapRequest(req) {
    const { auth, params, payload, query } = req;
    return {
        [types_1.internalFrameworkRequest]: req,
        auth,
        params,
        payload,
        query,
    };
}
exports.wrapRequest = wrapRequest;
