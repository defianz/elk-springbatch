"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.TRANSPORT_LAYER_SECURITY = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.transportLayerSecurityTitle', {
    defaultMessage: 'Transport Layer Security',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {Issuer} other {Issuers}}`,
});
// Columns
exports.ISSUER = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.issuerTitle', {
    defaultMessage: 'Issuer',
});
exports.SUBJECT = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.subjectTitle', {
    defaultMessage: 'Subject',
});
exports.SHA1_FINGERPRINT = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.sha1FingerPrintTitle', {
    defaultMessage: 'SHA1 Fingerprint',
});
exports.JA3_FINGERPRINT = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.ja3FingerPrintTitle', {
    defaultMessage: 'JA3 Fingerprint',
});
exports.VALID_UNTIL = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.columns.validUntilTitle', {
    defaultMessage: 'Valid Until',
});
// Row Select
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.MORE = i18n_1.i18n.translate('xpack.siem.network.ipDetails.tlsTable.moreDescription', {
    defaultMessage: 'More ...',
});
