"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const joi_1 = tslib_1.__importDefault(require("joi"));
exports.createGetBeatConfigurationRoute = (libs) => ({
    method: 'GET',
    path: '/api/beats/agent/{beatId}/configuration',
    config: {
        validate: {
            headers: joi_1.default.object({
                'kbn-beats-access-token': joi_1.default.string().required(),
            }).options({ allowUnknown: true }),
        },
        auth: false,
    },
    handler: async (request) => {
        const beatId = request.params.beatId;
        const accessToken = request.headers['kbn-beats-access-token'];
        let configurationBlocks;
        const beat = await libs.beats.getById(libs.framework.internalUser, beatId);
        if (beat === null) {
            return { error: { message: `Beat "${beatId}" not found`, code: 404 }, success: false };
        }
        const isAccessTokenValid = beat.access_token === accessToken;
        if (!isAccessTokenValid) {
            return { error: { message: 'Invalid access token', code: 401 }, success: false };
        }
        await libs.beats.update(libs.framework.internalUser, beat.id, {
            last_checkin: new Date(),
        });
        if (beat.tags) {
            const result = await libs.configurationBlocks.getForTags(libs.framework.internalUser, beat.tags, -1);
            configurationBlocks = result.blocks;
        }
        else {
            configurationBlocks = [];
        }
        return {
            list: configurationBlocks,
            success: true,
        };
    },
});
