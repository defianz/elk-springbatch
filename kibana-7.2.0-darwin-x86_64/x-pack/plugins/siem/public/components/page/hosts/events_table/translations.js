"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
exports.EVENTS = i18n_1.i18n.translate('xpack.siem.eventsTable.eventsTitle', {
    defaultMessage: 'Events',
});
exports.UNIT = (totalCount) => i18n_1.i18n.translate('xpack.siem.eventsTable.unit', {
    values: { totalCount },
    defaultMessage: `{totalCount, plural, =1 {Event} other {Events}}`,
});
exports.TIMESTAMP = i18n_1.i18n.translate('xpack.siem.eventsTable.timestampTitle', {
    defaultMessage: 'Timestamp',
});
exports.HOST_NAME = i18n_1.i18n.translate('xpack.siem.eventsTable.hostsNameTitle', {
    defaultMessage: 'Host Name',
});
exports.EVENT_ACTION = i18n_1.i18n.translate('xpack.siem.eventsTable.eventTypeAction', {
    defaultMessage: 'Event Action',
});
exports.SOURCE = i18n_1.i18n.translate('xpack.siem.eventsTable.sourceTitle', {
    defaultMessage: 'Source',
});
exports.DESTINATION = i18n_1.i18n.translate('xpack.siem.eventsTable.destinationTitle', {
    defaultMessage: 'Destination',
});
exports.MESSAGE = i18n_1.i18n.translate('xpack.siem.eventsTable.messageTitle', {
    defaultMessage: 'Message',
});
exports.EVENT_MODULE_DATASET = i18n_1.i18n.translate('xpack.siem.eventsTable.moduleDatasetTitle', {
    defaultMessage: 'Module/Dataset',
});
exports.USER = i18n_1.i18n.translate('xpack.siem.eventsTable.userTitle', {
    defaultMessage: 'User',
});
exports.ROWS_5 = i18n_1.i18n.translate('xpack.siem.eventsTable.rows', {
    values: { numRows: 5 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_10 = i18n_1.i18n.translate('xpack.siem.eventsTable.rows', {
    values: { numRows: 10 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_20 = i18n_1.i18n.translate('xpack.siem.eventsTable.rows', {
    values: { numRows: 20 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
exports.ROWS_50 = i18n_1.i18n.translate('xpack.siem.eventsTable.rows', {
    values: { numRows: 50 },
    defaultMessage: '{numRows} {numRows, plural, =0 {rows} =1 {row} other {rows}}',
});
