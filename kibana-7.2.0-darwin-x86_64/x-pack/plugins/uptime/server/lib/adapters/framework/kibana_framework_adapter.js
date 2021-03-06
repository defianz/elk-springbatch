"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_framework_adapter_1 = require("./apollo_framework_adapter");
class UMKibanaBackendFrameworkAdapter {
    constructor(hapiServer) {
        this.server = hapiServer;
    }
    registerRoute(route) {
        this.server.route(route);
    }
    registerGraphQLEndpoint(routePath, schema) {
        this.server.register({
            options: {
                graphQLOptions: (req) => ({
                    context: { req },
                    schema,
                }),
                path: routePath,
                route: {
                    tags: ['access:uptime'],
                },
            },
            plugin: apollo_framework_adapter_1.uptimeGraphQLHapiPlugin,
        });
    }
}
exports.UMKibanaBackendFrameworkAdapter = UMKibanaBackendFrameworkAdapter;
