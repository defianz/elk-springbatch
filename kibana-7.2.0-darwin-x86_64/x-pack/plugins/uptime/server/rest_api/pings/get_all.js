"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
exports.createGetAllRoute = (libs) => ({
    method: 'GET',
    path: '/api/uptime/pings',
    options: {
        validate: {
            query: joi_1.default.object({
                dateRangeStart: joi_1.default.number().required(),
                dateRangeEnd: joi_1.default.number().required(),
                monitorId: joi_1.default.string(),
                size: joi_1.default.number(),
                sort: joi_1.default.string(),
                status: joi_1.default.string(),
            }),
        },
        tags: ['access:uptime'],
    },
    handler: async (request) => {
        const { size, sort, dateRangeStart, dateRangeEnd, monitorId, status } = request.query;
        return await libs.pings.getAll(request, dateRangeStart, dateRangeEnd, monitorId, status, sort, size);
    },
});
