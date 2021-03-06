"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const security_1 = require("../../../common/constants/security");
exports.createGetConfigurationBlocksRoute = (libs) => ({
    method: 'GET',
    path: '/api/beats/configurations/{tagIds}/{page?}',
    requiredRoles: ['beats_admin'],
    licenseRequired: security_1.REQUIRED_LICENSES,
    handler: async (request) => {
        const tagIdString = request.params.tagIds;
        const tagIds = tagIdString.split(',').filter((id) => id.length > 0);
        const result = await libs.configurationBlocks.getForTags(request.user, tagIds, parseInt(request.params.page, 10), 5);
        return { page: result.page, total: result.total, list: result.blocks, success: true };
    },
});
