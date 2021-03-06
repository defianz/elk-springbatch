"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const security_1 = require("../../../common/constants/security");
exports.createAssignableTagsRoute = (libs) => ({
    method: 'GET',
    path: '/api/beats/tags/assignable/{beatIds}',
    requiredRoles: ['beats_admin'],
    licenseRequired: security_1.REQUIRED_LICENSES,
    handler: async (request) => {
        const beatIdString = request.params.beatIds;
        const beatIds = beatIdString.split(',').filter((id) => id.length > 0);
        const beats = await libs.beats.getByIds(request.user, beatIds);
        const tags = await libs.tags.getNonConflictingTags(request.user, lodash_1.flatten(beats.map(beat => beat.tags)));
        return {
            items: tags,
            success: true,
        };
    },
});
