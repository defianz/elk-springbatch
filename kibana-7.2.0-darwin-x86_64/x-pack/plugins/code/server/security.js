"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class CodeServerRouter {
    constructor(server) {
        this.server = server;
    }
    route(route) {
        const routeOptions = (route.options || {});
        routeOptions.tags = [
            ...(routeOptions.tags || []),
            `access:code_${route.requireAdmin ? 'admin' : 'user'}`,
        ];
        this.server.route({
            handler: route.handler,
            method: route.method,
            options: routeOptions,
            path: route.path,
        });
    }
}
exports.CodeServerRouter = CodeServerRouter;
