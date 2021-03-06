"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
exports.dateValidation = joi_1.default.alternatives()
    .try(joi_1.default.date().iso(), joi_1.default.number())
    .required();
exports.withDefaultValidators = (validators = {}) => {
    return joi_1.default.object().keys({
        _debug: joi_1.default.bool(),
        start: exports.dateValidation,
        end: exports.dateValidation,
        uiFiltersES: joi_1.default.string(),
        ...validators
    });
};
