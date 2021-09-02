"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.KQL_PLACEHOLDER = i18n_1.i18n.translate('xpack.siem.hosts.kqlPlaceholder', {
    defaultMessage: 'e.g. host.name: "foo"',
});
exports.PAGE_TITLE = i18n_1.i18n.translate('xpack.siem.hosts.pageTitle', {
    defaultMessage: 'Hosts',
});
exports.EMPTY_TITLE = i18n_1.i18n.translate('xpack.siem.hosts.emptyTitle', {
    defaultMessage: 'It looks like you don’t have any indices relevant to hosts in the SIEM application',
});
exports.EMPTY_ACTION_PRIMARY = i18n_1.i18n.translate('xpack.siem.hosts.emptyActionPrimary', {
    defaultMessage: 'View setup instructions',
});
exports.EMPTY_ACTION_SECONDARY = i18n_1.i18n.translate('xpack.siem.hosts.emptyActionSecondary', {
    defaultMessage: 'Go to documentation',
});
