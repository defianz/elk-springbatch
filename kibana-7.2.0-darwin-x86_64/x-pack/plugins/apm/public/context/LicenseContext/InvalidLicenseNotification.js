"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const MANAGE_LICENSE_URL = `${chrome_1.default.getBasePath()}/app/kibana#/management/elasticsearch/license_management`;
function InvalidLicenseNotification() {
    return (react_1.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "alert", iconColor: "warning", title: react_1.default.createElement("h1", null, i18n_1.i18n.translate('xpack.apm.invalidLicense.title', {
            defaultMessage: 'Invalid License'
        })), body: react_1.default.createElement("p", null, i18n_1.i18n.translate('xpack.apm.invalidLicense.message', {
            defaultMessage: 'The APM UI is not available because your current license has expired or is no longer valid.'
        })), actions: [
            react_1.default.createElement(eui_1.EuiButton, { href: MANAGE_LICENSE_URL }, i18n_1.i18n.translate('xpack.apm.invalidLicense.licenseManagementLink', {
                defaultMessage: 'Manage your license'
            }))
        ] }));
}
exports.InvalidLicenseNotification = InvalidLicenseNotification;
