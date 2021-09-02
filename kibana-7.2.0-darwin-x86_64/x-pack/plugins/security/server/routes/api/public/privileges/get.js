"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const joi_1 = tslib_1.__importDefault(require("joi"));
function initGetPrivilegesApi(server, routePreCheckLicenseFn) {
    server.route({
        method: 'GET',
        path: '/api/security/privileges',
        handler(req) {
            const { authorization } = server.plugins.security;
            const privileges = authorization.privileges.get();
            if (req.query.includeActions) {
                return privileges;
            }
            return {
                global: Object.keys(privileges.global),
                space: Object.keys(privileges.space),
                features: Object.entries(privileges.features).reduce((acc, [featureId, featurePrivileges]) => {
                    return {
                        ...acc,
                        [featureId]: Object.keys(featurePrivileges),
                    };
                }, {}),
                reserved: Object.keys(privileges.reserved),
            };
        },
        config: {
            pre: [routePreCheckLicenseFn],
            validate: {
                query: joi_1.default.object().keys({
                    includeActions: joi_1.default.bool(),
                }),
            },
        },
    });
}
exports.initGetPrivilegesApi = initGetPrivilegesApi;
