"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
function validateEsPrivilegeResponse(response, application, actions, resources) {
    const schema = buildValidationSchema(application, actions, resources);
    const { error, value } = schema.validate(response);
    if (error) {
        throw new Error(`Invalid response received from Elasticsearch has_privilege endpoint. ${error}`);
    }
    return value;
}
exports.validateEsPrivilegeResponse = validateEsPrivilegeResponse;
function buildActionsValidationSchema(actions) {
    return joi_1.default.object({
        ...actions.reduce((acc, action) => {
            return {
                ...acc,
                [action]: joi_1.default.bool().required(),
            };
        }, {}),
    }).required();
}
function buildValidationSchema(application, actions, resources) {
    const actionValidationSchema = buildActionsValidationSchema(actions);
    const resourceValidationSchema = joi_1.default.object({
        ...resources.reduce((acc, resource) => {
            return {
                ...acc,
                [resource]: actionValidationSchema,
            };
        }, {}),
    }).required();
    return joi_1.default.object({
        username: joi_1.default.string().required(),
        has_all_requested: joi_1.default.bool(),
        cluster: joi_1.default.object(),
        application: joi_1.default.object({
            [application]: resourceValidationSchema,
        }).required(),
        index: joi_1.default.object(),
    }).required();
}
