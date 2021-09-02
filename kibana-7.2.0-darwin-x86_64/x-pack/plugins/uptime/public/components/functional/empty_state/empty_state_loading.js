"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
exports.EmptyStateLoading = () => (react_1.default.createElement(eui_1.EuiEmptyPrompt, { body: react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "xl" }),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(eui_1.EuiTitle, { size: "l" },
            react_1.default.createElement("h2", null, i18n_1.i18n.translate('xpack.uptime.emptyState.loadingMessage', {
                defaultMessage: 'Loading…',
            })))) }));
