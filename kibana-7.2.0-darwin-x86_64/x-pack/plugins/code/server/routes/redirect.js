"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function redirectRoute(server, redirectUrl, log) {
    const proxyHandler = {
        proxy: {
            passThrough: true,
            async mapUri(request) {
                let uri;
                uri = `${redirectUrl}${request.path}`;
                if (request.url.search) {
                    uri += request.url.search;
                }
                log.info(`redirect ${request.path}${request.url.search || ''} to ${uri}`);
                return {
                    uri,
                };
            },
        },
    };
    server.route({
        path: '/api/code/{p*}',
        method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        handler: proxyHandler,
    });
    server.route({
        path: '/api/code/lsp/{p*}',
        method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        handler: proxyHandler,
    });
}
exports.redirectRoute = redirectRoute;
