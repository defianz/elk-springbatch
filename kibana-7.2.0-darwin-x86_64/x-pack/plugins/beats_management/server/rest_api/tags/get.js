"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const security_1 = require("../../../common/constants/security");
exports.createGetTagsWithIdsRoute = (libs) => ({
    method: 'GET',
    path: '/api/beats/tags/{tagIds}',
    requiredRoles: ['beats_admin'],
    licenseRequired: security_1.REQUIRED_LICENSES,
    handler: async (request) => {
        const tagIdString = request.params.tagIds;
        const tagIds = tagIdString.split(',').filter((id) => id.length > 0);
        const tags = await libs.tags.getWithIds(request.user, tagIds);
        return {
            items: tags,
            success: true,
        };
    },
});
