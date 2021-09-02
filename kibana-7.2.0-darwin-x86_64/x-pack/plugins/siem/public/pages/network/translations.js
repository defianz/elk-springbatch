"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.KQL_PLACEHOLDER = i18n_1.i18n.translate('xpack.siem.network.kqlPlaceholder', {
    defaultMessage: 'e.g. source.ip: "foo"',
});
exports.PAGE_TITLE = i18n_1.i18n.translate('xpack.siem.network.pageTitle', {
    defaultMessage: 'Network',
});
exports.EMPTY_TITLE = i18n_1.i18n.translate('xpack.siem.network.emptyTitle', {
    defaultMessage: 'It looks like you don’t have any indices relevant to network in the SIEM application',
});
exports.EMPTY_ACTION_PRIMARY = i18n_1.i18n.translate('xpack.siem.network.emptyActionPrimary', {
    defaultMessage: 'View setup instructions',
});
exports.EMPTY_ACTION_SECONDARY = i18n_1.i18n.translate('xpack.siem.network.emptyActionSecondary', {
    defaultMessage: 'Go to documentation',
});
