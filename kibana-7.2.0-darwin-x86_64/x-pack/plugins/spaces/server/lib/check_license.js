"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns object that defines behavior of the spaces related features based
 * on the license information extracted from the xPackInfo.
 * @param {XPackInfo} xPackInfo XPackInfo instance to extract license information from.
 * @returns {LicenseCheckResult}
 */
function checkLicense(xPackInfo) {
    if (!xPackInfo.isAvailable()) {
        return {
            showSpaces: false,
        };
    }
    const isAnyXpackLicense = xPackInfo.license.isOneOf([
        'basic',
        'standard',
        'gold',
        'platinum',
        'trial',
    ]);
    if (!isAnyXpackLicense) {
        return {
            showSpaces: false,
        };
    }
    return {
        showSpaces: true,
    };
}
exports.checkLicense = checkLicense;
