"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const react_1 = tslib_1.__importDefault(require("react"));
const useFetcher_1 = require("../../hooks/useFetcher");
const xpack_1 = require("../../services/rest/xpack");
const InvalidLicenseNotification_1 = require("./InvalidLicenseNotification");
const initialLicense = {
    features: {
        watcher: { is_available: false },
        ml: { is_available: false }
    },
    license: { is_active: false }
};
exports.LicenseContext = react_1.default.createContext(initialLicense);
exports.LicenseProvider = ({ children }) => {
    const { data = initialLicense, status } = useFetcher_1.useFetcher(() => xpack_1.loadLicense(), []);
    const hasValidLicense = data.license.is_active;
    // if license is invalid show an error message
    if (status === useFetcher_1.FETCH_STATUS.SUCCESS && !hasValidLicense) {
        return react_1.default.createElement(InvalidLicenseNotification_1.InvalidLicenseNotification, null);
    }
    // render rest of application and pass down license via context
    return react_1.default.createElement(exports.LicenseContext.Provider, { value: data, children: children });
};
