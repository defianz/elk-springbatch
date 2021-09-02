"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const security_1 = require("../../../common/constants/security");
exports.createDeleteConfidurationsRoute = (libs) => ({
    method: 'DELETE',
    path: '/api/beats/configurations/{ids}',
    requiredRoles: ['beats_admin'],
    licenseRequired: security_1.REQUIRED_LICENSES,
    handler: async (request) => {
        const idString = request.params.ids;
        const ids = idString.split(',').filter((id) => id.length > 0);
        const results = await libs.configurationBlocks.delete(request.user, ids);
        return {
            success: true,
            results: results.map(result => ({
                success: result.success,
                action: 'deleted',
                error: result.success ? undefined : { message: result.reason },
            })),
        };
    },
});
