"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.USERS = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.usersTitle', {
    defaultMessage: 'Users',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {User} other {Users}}`,
});
// Columns
exports.USER_NAME = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.userNameTitle', {
    defaultMessage: 'Name',
});
exports.USER_ID = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.userIdTitle', {
    defaultMessage: 'ID',
});
exports.GROUP_NAME = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.groupNameTitle', {
    defaultMessage: 'Group Name',
});
exports.GROUP_ID = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.groupIdTitle', {
    defaultMessage: 'Group ID',
});
exports.DOCUMENT_COUNT = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.columns.documentCountTitle', {
    defaultMessage: 'Document Count',
});
// Row Select
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.MORE = i18n_1.i18n.translate('xpack.siem.network.ipDetails.usersTable.moreDescription', {
    defaultMessage: 'More ...',
});
