"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const constants_1 = require("./common/constants");
const register_routes_1 = require("./server/routes/api/register_routes");
class Plugin {
    start(core, plugins) {
        const router = core.http.createRouter(constants_1.API_BASE_PATH);
        // Register routes
        register_routes_1.registerRoutes(router, plugins);
    }
}
exports.Plugin = Plugin;
