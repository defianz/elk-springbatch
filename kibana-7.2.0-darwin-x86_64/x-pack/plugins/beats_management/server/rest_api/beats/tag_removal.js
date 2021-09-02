"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const security_1 = require("../../../common/constants/security");
// TODO: write to Kibana audit log file https://github.com/elastic/kibana/issues/26024
exports.createTagRemovalsRoute = (libs) => ({
    method: 'POST',
    path: '/api/beats/agents_tags/removals',
    licenseRequired: security_1.REQUIRED_LICENSES,
    requiredRoles: ['beats_admin'],
    config: {
        validate: {
            payload: joi_1.default.object({
                removals: joi_1.default.array().items(joi_1.default.object({
                    beatId: joi_1.default.string().required(),
                    tag: joi_1.default.string().required(),
                })),
            }).required(),
        },
    },
    handler: async (request) => {
        const { removals } = request.payload;
        const response = await libs.beats.removeTagsFromBeats(request.user, removals);
        return {
            success: true,
            results: response.removals.map(removal => ({
                success: removal.status && removal.status >= 200 && removal.status < 300,
                error: !removal.status || removal.status >= 300
                    ? {
                        code: removal.status || 400,
                        message: removal.result,
                    }
                    : undefined,
                result: removal.status && removal.status >= 200 && removal.status < 300
                    ? {
                        message: removal.result,
                    }
                    : undefined,
            })),
        };
    },
});
