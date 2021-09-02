"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.TOP_TALKERS = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.title', {
    defaultMessage: 'Top Talkers',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {IP} other {IPs}}`,
});
exports.SOURCE_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.sourceIpTitle', {
    defaultMessage: 'Source IP',
});
exports.DESTINATION_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.destinationIpTitle', {
    defaultMessage: 'Destination IP',
});
exports.CLIENT_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.clientIpTitle', {
    defaultMessage: 'Client IP',
});
exports.SERVER_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.serverIpTitle', {
    defaultMessage: 'Server IP',
});
exports.DOMAIN = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.lastDomainTitle', {
    defaultMessage: 'Last Domain',
});
exports.BYTES = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.bytesTitle', {
    defaultMessage: 'Bytes',
});
exports.PACKETS = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.packetsTitle', {
    defaultMessage: 'Packets',
});
exports.DIRECTION = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.directionTitle', {
    defaultMessage: 'Direction',
});
exports.UNIQUE_SOURCE_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.uniqueSourceIpsTitle', {
    defaultMessage: 'Unique Source IPs',
});
exports.UNIQUE_DESTINATION_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.uniqueDestinationIpsTitle', {
    defaultMessage: 'Unique Destination IPs',
});
exports.UNIQUE_CLIENT_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.uniqueClientIpsTitle', {
    defaultMessage: 'Unique Client IPs',
});
exports.UNIQUE_SERVER_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.column.uniqueServerIpsTitle', {
    defaultMessage: 'Unique Server IPs',
});
exports.BY_SOURCE_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.select.bySourceIpDropDownOptionLabel', {
    defaultMessage: 'By Source IP',
});
exports.BY_DESTINATION_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.select.byDestinationIpDropDownOptionLabel', {
    defaultMessage: 'By Destination IP',
});
exports.BY_CLIENT_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.select.byClientIpDropDownOptionLabel', {
    defaultMessage: 'By Client IP',
});
exports.BY_SERVER_IP = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.select.byServerIpDropDownOptionLabel', {
    defaultMessage: 'By Server IP',
});
exports.MORE = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.moreDescription', {
    defaultMessage: 'More ...',
});
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.networkTopNFlowTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
