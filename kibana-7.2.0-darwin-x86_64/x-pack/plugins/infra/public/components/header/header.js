"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_2 = require("@kbn/i18n/react");
const with_kibana_chrome_1 = require("../../containers/with_kibana_chrome");
const external_header_1 = require("./external_header");
exports.Header = react_2.injectI18n(({ breadcrumbs = [], readOnlyBadge = false, intl }) => (react_1.default.createElement(with_kibana_chrome_1.WithKibanaChrome, null, ({ setBreadcrumbs, setBadge }) => (react_1.default.createElement(external_header_1.ExternalHeader, { breadcrumbs: breadcrumbs, setBreadcrumbs: setBreadcrumbs, badge: readOnlyBadge
        ? {
            text: intl.formatMessage({
                defaultMessage: 'Read only',
                id: 'xpack.infra.header.badge.readOnly.text',
            }),
            tooltip: intl.formatMessage({
                defaultMessage: 'Unable to change source configuration',
                id: 'xpack.infra.header.badge.readOnly.tooltip',
            }),
            iconType: 'glasses',
        }
        : undefined, setBadge: setBadge })))));
