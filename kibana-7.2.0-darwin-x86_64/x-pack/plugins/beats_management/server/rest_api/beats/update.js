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
const adapter_types_1 = require("../../lib/adapters/framework/adapter_types");
// TODO: write to Kibana audit log file (include who did the verification as well) https://github.com/elastic/kibana/issues/26024
exports.createBeatUpdateRoute = (libs) => ({
    method: 'PUT',
    path: '/api/beats/agent/{beatId}',
    licenseRequired: security_1.REQUIRED_LICENSES,
    requiredRoles: ['beats_admin'],
    config: {
        validate: {
            headers: joi_1.default.object({
                'kbn-beats-access-token': joi_1.default.string(),
            }).options({
                allowUnknown: true,
            }),
            params: joi_1.default.object({
                beatId: joi_1.default.string(),
            }),
            payload: joi_1.default.object({
                active: joi_1.default.bool(),
                ephemeral_id: joi_1.default.string(),
                host_name: joi_1.default.string(),
                local_configuration_yml: joi_1.default.string(),
                metadata: joi_1.default.object(),
                name: joi_1.default.string(),
                type: joi_1.default.string(),
                version: joi_1.default.string(),
            }),
        },
    },
    handler: async (request) => {
        const { beatId } = request.params;
        const accessToken = request.headers['kbn-beats-access-token'];
        const remoteAddress = request.info.remoteAddress;
        const userOrToken = accessToken || request.user;
        if (request.user.kind === 'unauthenticated' && request.payload.active !== undefined) {
            return {
                error: {
                    message: 'access-token is not a valid auth type to change beat status',
                    code: 401,
                },
                success: false,
            };
        }
        const status = await libs.beats.update(userOrToken, beatId, {
            ...request.payload,
            host_ip: remoteAddress,
        });
        switch (status) {
            case 'beat-not-found':
                return {
                    error: {
                        message: 'Beat not found',
                        code: 404,
                    },
                    success: false,
                };
            case 'invalid-access-token':
                return {
                    error: {
                        message: 'Invalid access token',
                        code: 401,
                    },
                    success: false,
                };
        }
        const beat = await libs.beats.getById(adapter_types_1.internalUser, beatId);
        return {
            item: beat,
            action: 'updated',
            success: true,
        };
    },
});
