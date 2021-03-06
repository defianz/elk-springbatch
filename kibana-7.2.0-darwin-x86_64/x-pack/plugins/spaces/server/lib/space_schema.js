"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const constants_1 = require("../../common/constants");
exports.spaceSchema = joi_1.default.object({
    id: joi_1.default.string().regex(/^[a-z0-9_\-]+$/, `lower case, a-z, 0-9, "_", and "-" are allowed`),
    name: joi_1.default.string().required(),
    description: joi_1.default.string().allow(''),
    initials: joi_1.default.string().max(constants_1.MAX_SPACE_INITIALS),
    color: joi_1.default.string().regex(/^#[a-z0-9]{6}$/, `6 digit hex color, starting with a #`),
    disabledFeatures: joi_1.default.array().items(joi_1.default.string()),
    _reserved: joi_1.default.boolean(),
}).default();
