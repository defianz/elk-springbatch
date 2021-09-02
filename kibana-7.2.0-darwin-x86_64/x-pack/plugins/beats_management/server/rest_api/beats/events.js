"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const joi_1 = tslib_1.__importDefault(require("joi"));
exports.beatEventsRoute = (libs) => ({
    method: 'POST',
    path: '/api/beats/{beatId}/events',
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
        const events = request.payload;
        const accessToken = request.headers['kbn-beats-access-token'];
        const beat = await libs.beats.getById(libs.framework.internalUser, beatId);
        if (beat === null) {
            return { error: { message: `Beat "${beatId}" not found`, code: 400 }, success: false };
        }
        const isAccessTokenValid = beat.access_token === accessToken;
        if (!isAccessTokenValid) {
            return { error: { message: `Invalid access token`, code: 401 }, success: false };
        }
        const results = await libs.beatEvents.log(libs.framework.internalUser, beat.id, events);
        return {
            results,
            success: true,
        };
    },
});
