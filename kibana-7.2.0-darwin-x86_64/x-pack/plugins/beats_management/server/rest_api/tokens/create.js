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
const security_1 = require("../../../common/constants/security");
// TODO: write to Kibana audit log file
const DEFAULT_NUM_TOKENS = 1;
exports.createTokensRoute = (libs) => ({
    method: 'POST',
    path: '/api/beats/enrollment_tokens',
    licenseRequired: security_1.REQUIRED_LICENSES,
    requiredRoles: ['beats_admin'],
    config: {
        validate: {
            payload: joi_1.default.object({
                num_tokens: joi_1.default.number()
                    .optional()
                    .default(DEFAULT_NUM_TOKENS)
                    .min(1),
            }).allow(null),
        },
    },
    handler: async (request) => {
        const numTokens = lodash_1.get(request, 'payload.num_tokens', DEFAULT_NUM_TOKENS);
        try {
            const tokens = await libs.tokens.createEnrollmentTokens(request.user, numTokens);
            return {
                results: tokens.map(token => ({
                    item: token,
                    success: true,
                    action: 'created',
                })),
                success: true,
            };
        }
        catch (err) {
            libs.framework.log(err.message);
            return {
                error: {
                    message: 'An error occured, please check your Kibana logs',
                    code: 500,
                },
                success: false,
            };
        }
    },
});
