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
exports.createListAgentsRoute = (libs) => ({
    method: 'GET',
    path: '/api/beats/agents/{listByAndValue*}',
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
        const listByAndValueParts = request.params.listByAndValue
            ? request.params.listByAndValue.split('/')
            : [];
        let listBy = null;
        let listByValue = null;
        if (listByAndValueParts.length === 2) {
            listBy = listByAndValueParts[0];
            listByValue = listByAndValueParts[1];
        }
        let beats;
        switch (listBy) {
            case 'tag':
                beats = await libs.beats.getAllWithTag(request.user, listByValue || '');
                break;
            default:
                beats = await libs.beats.getAll(request.user, request.query && request.query.ESQuery ? JSON.parse(request.query.ESQuery) : undefined);
                break;
        }
        return { list: beats, success: true, page: -1, total: -1 };
    },
});
