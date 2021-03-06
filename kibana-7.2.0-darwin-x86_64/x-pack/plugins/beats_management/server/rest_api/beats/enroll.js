"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const joi_1 = tslib_1.__importDefault(require("joi"));
const lodash_1 = require("lodash");
const security_1 = require("../../../common/constants/security");
const types_1 = require("../../lib/types");
// TODO: write to Kibana audit log file https://github.com/elastic/kibana/issues/26024
exports.createBeatEnrollmentRoute = (libs) => ({
    method: 'POST',
    path: '/api/beats/agent/{beatId}',
    licenseRequired: security_1.REQUIRED_LICENSES,
    config: {
        auth: false,
        validate: {
            headers: joi_1.default.object({
                'kbn-beats-enrollment-token': joi_1.default.string().required(),
            }).options({
                allowUnknown: true,
            }),
            payload: joi_1.default.object({
                host_name: joi_1.default.string().required(),
                name: joi_1.default.string().required(),
                type: joi_1.default.string().required(),
                version: joi_1.default.string().required(),
            }).required(),
        },
    },
    handler: async (request) => {
        const { beatId } = request.params;
        const enrollmentToken = request.headers['kbn-beats-enrollment-token'];
        const { status, accessToken } = await libs.beats.enrollBeat(enrollmentToken, beatId, request.info.remoteAddress, lodash_1.omit(request.payload, 'enrollment_token'));
        switch (status) {
            case types_1.BeatEnrollmentStatus.ExpiredEnrollmentToken:
                return {
                    error: { message: types_1.BeatEnrollmentStatus.ExpiredEnrollmentToken, code: 400 },
                    success: false,
                };
            case types_1.BeatEnrollmentStatus.InvalidEnrollmentToken:
                return {
                    error: { message: types_1.BeatEnrollmentStatus.InvalidEnrollmentToken, code: 400 },
                    success: false,
                };
            case types_1.BeatEnrollmentStatus.Success:
            default:
                return {
                    item: accessToken,
                    action: 'created',
                    success: true,
                };
        }
    },
});
