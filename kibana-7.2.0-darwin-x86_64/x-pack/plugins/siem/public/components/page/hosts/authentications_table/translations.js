"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.AUTHENTICATIONS = i18n_1.i18n.translate('xpack.siem.authenticationsTable.authenticationFailures', {
    defaultMessage: 'Authentications',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.authenticationsTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {User} other {Users}}`,
});
exports.LAST_SUCCESSFUL_SOURCE = i18n_1.i18n.translate('xpack.siem.authenticationsTable.lastSuccessfulSource', {
    defaultMessage: 'Last Successful Source',
});
exports.LAST_SUCCESSFUL_DESTINATION = i18n_1.i18n.translate('xpack.siem.authenticationsTable.lastSuccessfulDestination', {
    defaultMessage: 'Last Successful Destination',
});
exports.LAST_SUCCESSFUL_TIME = i18n_1.i18n.translate('xpack.siem.authenticationsTable.lastSuccessfulTime', {
    defaultMessage: 'Last Success',
});
exports.LAST_FAILED_SOURCE = i18n_1.i18n.translate('xpack.siem.authenticationsTable.lastFailedSource', {
    defaultMessage: 'Last Failed Source',
});
exports.LAST_FAILED_DESTINATION = i18n_1.i18n.translate('xpack.siem.authenticationsTable.lastFailedDestination', {
    defaultMessage: 'Last Failed Destination',
});
exports.LAST_FAILED_TIME = i18n_1.i18n.translate('xpack.siem.authenticationsTable.lastFailedTime', {
    defaultMessage: 'Last Failure',
});
exports.SUCCESSES = i18n_1.i18n.translate('xpack.siem.authenticationsTable.successes', {
    defaultMessage: 'Successes',
});
exports.FAILURES = i18n_1.i18n.translate('xpack.siem.authenticationsTable.failures', {
    defaultMessage: 'Failures',
});
exports.USER = i18n_1.i18n.translate('xpack.siem.authenticationsTable.user', {
    defaultMessage: 'User',
});
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.authenticationsTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.authenticationsTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.authenticationsTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.authenticationsTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
