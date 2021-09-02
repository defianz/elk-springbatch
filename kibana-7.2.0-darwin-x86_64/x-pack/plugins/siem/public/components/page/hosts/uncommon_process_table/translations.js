"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.UNCOMMON_PROCESSES = i18n_1.i18n.translate('xpack.siem.authenticationsTable.uncommonProcessTable', {
    defaultMessage: 'Uncommon Processes',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {Process} other {Processes}}`,
});
exports.HOSTS = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.hostsTitle', {
    defaultMessage: 'Hosts',
});
exports.NUMBER_OF_HOSTS = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.numberOfHostsTitle', {
    defaultMessage: 'Number of Hosts',
});
exports.NUMBER_OF_INSTANCES = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.numberOfInstances', {
    defaultMessage: 'Number of Instances',
});
exports.LAST_COMMAND = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.lastCommandTitle', {
    defaultMessage: 'Last Command',
});
exports.LAST_USER = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.lastUserTitle', {
    defaultMessage: 'Last User',
});
exports.NAME = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.nameTitle', {
    defaultMessage: 'Name',
});
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.uncommonProcessTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
