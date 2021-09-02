"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
/**
 * Returns the flag for the specified country code, or null if the specified
 * country code could not be converted
 * Example: `US` -> 🇺🇸
 */
exports.getFlag = (countryCode) => countryCode.length === 2
    ? countryCode
        .toUpperCase()
        .replace(/./g, c => String.fromCharCode(55356, 56741 + c.charCodeAt(0)))
    : null;
/** Renders an emjoi flag for the specified country code */
exports.CountryFlag = recompose_1.pure(({ countryCode }) => {
    const flag = exports.getFlag(countryCode);
    return flag !== null ? React.createElement("span", { "data-test-subj": "country-flag" }, flag) : null;
});
