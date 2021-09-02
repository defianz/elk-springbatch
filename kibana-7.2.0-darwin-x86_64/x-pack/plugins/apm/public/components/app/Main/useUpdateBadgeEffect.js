"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("react");
const capabilities_1 = require("ui/capabilities");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
exports.useUpdateBadgeEffect = () => {
    react_1.useEffect(() => {
        const uiCapabilities = capabilities_1.capabilities.get();
        chrome_1.default.badge.set(!uiCapabilities.apm.save
            ? {
                text: i18n_1.i18n.translate('xpack.apm.header.badge.readOnly.text', {
                    defaultMessage: 'Read only'
                }),
                tooltip: i18n_1.i18n.translate('xpack.apm.header.badge.readOnly.tooltip', {
                    defaultMessage: 'Unable to save'
                }),
                iconType: 'glasses'
            }
            : undefined);
    }, []);
};
