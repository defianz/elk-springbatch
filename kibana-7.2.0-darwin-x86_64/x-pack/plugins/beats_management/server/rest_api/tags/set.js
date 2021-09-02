"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const lodash_1 = require("lodash");
const constants_1 = require("../../../common/constants");
// TODO: write to Kibana audit log file
exports.createSetTagRoute = (libs) => ({
    method: 'PUT',
    path: '/api/beats/tag/{tagId}',
    licenseRequired: constants_1.REQUIRED_LICENSES,
    requiredRoles: ['beats_admin'],
    config: {
        validate: {
            params: joi_1.default.object({
                tagId: joi_1.default.string(),
            }),
            payload: joi_1.default.object({
                color: joi_1.default.string(),
                name: joi_1.default.string(),
            }),
        },
    },
    handler: async (request) => {
        const defaultConfig = {
            id: request.params.tagId,
            name: request.params.tagId,
            color: '#DD0A73',
            hasConfigurationBlocksTypes: [],
        };
        const config = { ...defaultConfig, ...lodash_1.get(request, 'payload', {}) };
        const id = await libs.tags.upsertTag(request.user, config);
        const tag = await libs.tags.getWithIds(request.user, [id]);
        // TODO the action needs to be surfaced
        return { success: true, item: tag[0], action: 'created' };
    },
});
