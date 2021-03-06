"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const PathReporter_1 = require("io-ts/lib/PathReporter");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const joi_1 = tslib_1.__importDefault(require("joi"));
const constants_1 = require("../../../common/constants");
const domain_types_1 = require("../../../common/domain_types");
// TODO: write to Kibana audit log file
exports.upsertConfigurationRoute = (libs) => ({
    method: 'PUT',
    path: '/api/beats/configurations',
    licenseRequired: constants_1.REQUIRED_LICENSES,
    requiredRoles: ['beats_admin'],
    config: {
        validate: {
            payload: joi_1.default.array().items(joi_1.default.object({}).unknown(true)),
        },
    },
    handler: async (request) => {
        const result = await Promise.all(request.payload.map(async (block) => {
            const assertData = domain_types_1.createConfigurationBlockInterface().decode(block);
            if (assertData.isLeft()) {
                return {
                    error: `Error parsing block info, ${PathReporter_1.PathReporter.report(assertData)[0]}`,
                };
            }
            const { blockID, success, error } = await libs.configurationBlocks.save(request.user, block);
            if (error) {
                return { success, error };
            }
            return { success, blockID };
        }));
        return {
            results: result.map(r => ({
                success: r.success,
                // TODO: we need to surface this data, not hard coded
                action: 'created',
            })),
            success: true,
        };
    },
});
