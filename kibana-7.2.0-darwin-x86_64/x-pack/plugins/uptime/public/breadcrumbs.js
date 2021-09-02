"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const makeOverviewBreadcrumb = (search) => ({
    text: i18n_1.i18n.translate('xpack.uptime.breadcrumbs.overviewBreadcrumbText', {
        defaultMessage: 'Uptime',
    }),
    href: `#/${search ? search : ''}`,
});
exports.getOverviewPageBreadcrumbs = (search) => [
    makeOverviewBreadcrumb(search),
];
exports.getMonitorPageBreadcrumb = (name, search) => [
    makeOverviewBreadcrumb(search),
    { text: name },
];
