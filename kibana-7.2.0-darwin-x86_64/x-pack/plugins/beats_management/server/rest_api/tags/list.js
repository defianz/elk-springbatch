"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Joi = tslib_1.__importStar(require("joi"));
const security_1 = require("../../../common/constants/security");
exports.createListTagsRoute = (libs) => ({
    method: 'GET',
    path: '/api/beats/tags',
    requiredRoles: ['beats_admin'],
    licenseRequired: security_1.REQUIRED_LICENSES,
    validate: {
        headers: Joi.object({
            'kbn-beats-enrollment-token': Joi.string().required(),
        }).options({
            allowUnknown: true,
        }),
        query: Joi.object({
            ESQuery: Joi.string(),
        }),
    },
    handler: async (request) => {
        const tags = await libs.tags.getAll(request.user, request.query && request.query.ESQuery ? JSON.parse(request.query.ESQuery) : undefined);
        return { list: tags, success: true, page: -1, total: -1 };
    },
});
