"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_types_1 = require("./adapter_types");
const apollo_server_hapi_1 = require("./apollo_server_hapi");
class InfraKibanaBackendFrameworkAdapter {
    constructor(server) {
        this.server = server;
        this.version = server.config().get('pkg.version');
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
                    tags: ['access:infra'],
                },
            },
            plugin: apollo_server_hapi_1.graphqlHapi,
        });
        this.server.register({
            options: {
                graphiqlOptions: request => ({
                    endpointURL: request ? `${request.getBasePath()}${routePath}` : routePath,
                    passHeader: `'kbn-version': '${this.version}'`,
                }),
                path: `${routePath}/graphiql`,
                route: {
                    tags: ['access:infra'],
                },
            },
            plugin: apollo_server_hapi_1.graphiqlHapi,
        });
    }
    registerRoute(route) {
        const wrappedHandler = (request, h) => route.handler(wrapRequest(request), h);
        this.server.route({
            handler: wrappedHandler,
            options: route.options,
            method: route.method,
            path: route.path,
        });
    }
    async callWithRequest(req, endpoint, params, ...rest) {
        const internalRequest = req[adapter_types_1.internalInfraFrameworkRequest];
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
    getIndexPatternsService(request) {
        return this.server.indexPatternsServiceFactory({
            callCluster: async (method, args, ...rest) => {
                const fieldCaps = await this.callWithRequest(request, method, { ...args, allowNoIndices: true }, ...rest);
                return fieldCaps;
            },
        });
    }
    getSavedObjectsService() {
        return this.server.savedObjects;
    }
    async makeTSVBRequest(req, model, timerange, filters) {
        const internalRequest = req[adapter_types_1.internalInfraFrameworkRequest];
        const server = internalRequest.server;
        let url = '/api/metrics/vis/data';
        if (server.plugins.spaces) {
            const spaceId = server.plugins.spaces.getSpaceId(internalRequest);
            if (spaceId !== 'default') {
                url = `/s/${spaceId}${url}`;
            }
        }
        const request = {
            url,
            method: 'POST',
            headers: internalRequest.headers,
            payload: {
                timerange,
                panels: [model],
                filters,
            },
        };
        const res = await server.inject(request);
        if (res.statusCode !== 200) {
            throw res;
        }
        return res.result;
    }
}
exports.InfraKibanaBackendFrameworkAdapter = InfraKibanaBackendFrameworkAdapter;
function wrapRequest(req) {
    const { params, payload, query } = req;
    return {
        [adapter_types_1.internalInfraFrameworkRequest]: req,
        params,
        payload,
        query,
    };
}
exports.wrapRequest = wrapRequest;
