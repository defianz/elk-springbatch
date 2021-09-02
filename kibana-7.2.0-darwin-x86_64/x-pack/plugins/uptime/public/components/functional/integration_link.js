"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const i18n_1 = require("@kbn/i18n");
exports.IntegrationLink = ({ ariaLabel, href, iconType, message, tooltipContent, }) => typeof href === 'undefined' ? (react_1.default.createElement(eui_1.EuiFlexGroup, null,
    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_1.EuiToolTip, { content: i18n_1.i18n.translate('xpack.uptime.integrationLink.missingDataMessage', {
                defaultMessage: 'Required data for this integration was not found.',
            }) },
            react_1.default.createElement(eui_1.EuiIcon, { type: iconType }))),
    react_1.default.createElement(eui_1.EuiFlexItem, null,
        react_1.default.createElement(eui_1.EuiText, { color: "subdued" }, message)))) : (react_1.default.createElement(eui_1.EuiLink, { "aria-label": ariaLabel, href: href },
    react_1.default.createElement(eui_1.EuiFlexGroup, null,
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiToolTip, { content: tooltipContent, position: "top" },
                react_1.default.createElement(eui_1.EuiIcon, { type: iconType }))),
        react_1.default.createElement(eui_1.EuiFlexItem, null, message))));
