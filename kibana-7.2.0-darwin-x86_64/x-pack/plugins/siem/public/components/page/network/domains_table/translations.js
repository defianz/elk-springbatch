"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.DOMAINS = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.domainsTitle', {
    defaultMessage: 'Domains',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {Domain} other {Domains}}`,
});
// Columns
exports.DOMAIN_NAME = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.domainNameTitle', {
    defaultMessage: 'Domain Name',
});
exports.DIRECTION = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.directionTitle', {
    defaultMessage: 'Direction',
});
exports.BYTES = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.bytesTitle', {
    defaultMessage: 'Bytes',
});
exports.PACKETS = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.packetsTitle', {
    defaultMessage: 'Packets',
});
exports.UNIQUE_DESTINATIONS = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.uniqueDestinationsTitle', {
    defaultMessage: 'Unique Destinations',
});
exports.UNIQUE_SOURCES = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.uniqueSourcesTitle', {
    defaultMessage: 'Unique Sources',
});
exports.UNIQUE_CLIENTS = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.uniqueClientsTitle', {
    defaultMessage: 'Unique Servers',
});
exports.UNIQUE_SERVERS = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.uniqueServersTitle', {
    defaultMessage: 'Unique Clients',
});
exports.FIRST_SEEN = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.firstSeenTitle', {
    defaultMessage: 'First Seen',
});
exports.LAST_SEEN = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.lastSeenTitle', {
    defaultMessage: 'Last Seen',
});
exports.FIRST_LAST_SEEN_TOOLTIP = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.columns.firstLastSeenToolTip', {
    defaultMessage: 'Relative to the selected date range',
});
// Direction Select
exports.UNIDIRECTIONAL = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.unidirectionalDropDownOptionLabel', {
    defaultMessage: 'Unidirectional',
});
exports.BIDIRECTIONAL = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.bidirectionalDropDownOptionLabel', {
    defaultMessage: 'Bidirectional',
});
// Row Select
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.MORE = i18n_1.i18n.translate('xpack.siem.network.ipDetails.domainsTable.moreDescription', {
    defaultMessage: 'More ...',
});
