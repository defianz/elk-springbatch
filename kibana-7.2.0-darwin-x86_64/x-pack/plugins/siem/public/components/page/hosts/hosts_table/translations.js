"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.HOSTS = i18n_1.i18n.translate('xpack.siem.hostsTable.hostsTitle', {
    defaultMessage: 'All Hosts',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.hostsTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {Host} other {Hosts}}`,
});
exports.NAME = i18n_1.i18n.translate('xpack.siem.hostsTable.nameTitle', {
    defaultMessage: 'Name',
});
exports.FIRST_SEEN = i18n_1.i18n.translate('xpack.siem.hostsTable.firstSeenTitle', {
    defaultMessage: 'First Seen',
});
exports.LAST_SEEN = i18n_1.i18n.translate('xpack.siem.hostsTable.lastSeenTitle', {
    defaultMessage: 'Last Seen',
});
exports.FIRST_LAST_SEEN_TOOLTIP = i18n_1.i18n.translate('xpack.siem.hostsTable.firstLastSeenToolTip', {
    defaultMessage: 'Relative to the selected date range',
});
exports.OS = i18n_1.i18n.translate('xpack.siem.hostsTable.osTitle', {
    defaultMessage: 'OS',
});
exports.VERSION = i18n_1.i18n.translate('xpack.siem.hostsTable.versionTitle', {
    defaultMessage: 'Version',
});
exports.ROWS_2 = i18n_1.i18n.translate('xpack.siem.hostsTable.rows', {
    values: { numRows: 2 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.hostsTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.hostsTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.hostsTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.hostsTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
