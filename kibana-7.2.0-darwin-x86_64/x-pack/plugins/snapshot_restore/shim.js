"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const i18n_1 = require("@kbn/i18n");
const create_router_1 = require("../../server/lib/create_router");
const register_license_checker_1 = require("../../server/lib/register_license_checker");
function createShim(server, pluginId) {
    return {
        core: {
            http: {
                createRouter: (basePath) => create_router_1.createRouter(server, pluginId, basePath),
            },
            i18n: i18n_1.i18n,
        },
        plugins: {
            license: {
                registerLicenseChecker: register_license_checker_1.registerLicenseChecker,
            },
            cloud: {
                config: {
                    isCloudEnabled: lodash_1.get(server.plugins, 'cloud.config.isCloudEnabled', false),
                },
            },
            xpack_main: server.plugins.xpack_main,
            elasticsearch: server.plugins.elasticsearch,
        },
    };
}
exports.createShim = createShim;
