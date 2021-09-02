"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.TOP_DNS_DOMAINS = i18n_1.i18n.translate('xpack.siem.networkDnsTable.title', {
    defaultMessage: 'Top DNS Domains',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.networkDnsTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {Domain} other {Domains}}`,
});
exports.TOOLTIP = i18n_1.i18n.translate('xpack.siem.networkDnsTable.helperTooltip', {
    defaultMessage: 'This shows DNS protocol traffic only, and can be useful for hunting domains used in DNS data exfiltration.',
});
exports.REGISTERED_DOMAIN = i18n_1.i18n.translate('xpack.siem.networkDnsTable.column.registeredDomain', {
    defaultMessage: 'Registered Domain',
});
exports.TOTAL_QUERIES = i18n_1.i18n.translate('xpack.siem.networkDnsTable.column.TotalQueriesTitle', {
    defaultMessage: 'Total Queries',
});
exports.UNIQUE_DOMAINS = i18n_1.i18n.translate('xpack.siem.networkDnsTable.column.uniqueDomainsTitle', {
    defaultMessage: 'Unique Domains',
});
exports.DNS_BYTES_IN = i18n_1.i18n.translate('xpack.siem.networkDnsTable.column.bytesInTitle', {
    defaultMessage: 'DNS Bytes In',
});
exports.DNS_BYTES_OUT = i18n_1.i18n.translate('xpack.siem.networkDnsTable.column.bytesOutTitle', {
    defaultMessage: 'DNS Bytes Out',
});
exports.INCLUDE_PTR_RECORDS = i18n_1.i18n.translate('xpack.siem.networkDnsTable.select.includePtrRecords', {
    defaultMessage: 'Include PTR Records',
});
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.networkDnsTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.networkDnsTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.networkDnsTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.networkDnsTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
