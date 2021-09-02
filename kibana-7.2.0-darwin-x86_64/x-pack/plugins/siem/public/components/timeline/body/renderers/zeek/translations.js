"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
// English Text for these codes are shortened from
// https://docs.zeek.org/en/stable/scripts/base/protocols/conn/main.bro.html
exports.S0 = i18n_1.i18n.translate('xpack.siem.zeek.s0Description', {
    defaultMessage: 'Connection attempt seen, no reply',
});
exports.S1 = i18n_1.i18n.translate('xpack.siem.zeek.s1Description', {
    defaultMessage: 'Connection established, not terminated',
});
exports.S2 = i18n_1.i18n.translate('xpack.siem.zeek.s2Description', {
    defaultMessage: 'Connection established and close attempt by originator seen (but no reply from responder)',
});
exports.S3 = i18n_1.i18n.translate('xpack.siem.zeek.s3Description', {
    defaultMessage: 'Connection established and close attempt by responder seen (but no reply from originator)',
});
exports.SF = i18n_1.i18n.translate('xpack.siem.zeek.sfDescription', {
    defaultMessage: 'Normal SYN/FIN completion',
});
exports.REJ = i18n_1.i18n.translate('xpack.siem.zeek.rejDescription', {
    defaultMessage: 'Connection attempt rejected',
});
exports.RSTO = i18n_1.i18n.translate('xpack.siem.zeek.rstoODescription', {
    defaultMessage: 'Connection established, originator aborted (sent a RST)',
});
exports.RSTR = i18n_1.i18n.translate('xpack.siem.zeek.rstrDescription', {
    defaultMessage: 'Established, responder aborted',
});
exports.RSTOS0 = i18n_1.i18n.translate('xpack.siem.zeek.rstosoDescription', {
    defaultMessage: 'Originator sent a SYN followed by a RST, no SYN-ACK from the responder',
});
exports.RSTRH = i18n_1.i18n.translate('xpack.siem.zeek.rstrhDescription', {
    defaultMessage: 'Responder sent a SYN ACK followed by a RST, no SYN from the (purported) originator',
});
exports.SH = i18n_1.i18n.translate('xpack.siem.zeek.shDescription', {
    defaultMessage: 'Originator sent a SYN followed by a FIN, no SYN ACK from the responder',
});
exports.SHR = i18n_1.i18n.translate('xpack.siem.zeek.shrDescription', {
    defaultMessage: 'Responder sent a SYN ACK followed by a FIN, no SYN from the originator',
});
exports.OTH = i18n_1.i18n.translate('xpack.siem.zeek.othDescription', {
    defaultMessage: 'No SYN seen, just midstream traffic',
});
