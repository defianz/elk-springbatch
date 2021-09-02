"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const empty_value_1 = require("../empty_value");
const i18n = tslib_1.__importStar(require("./translations"));
/** one millisecond (as nanoseconds) */
exports.ONE_MILLISECOND_AS_NANOSECONDS = 1000000;
exports.ONE_SECOND = 1000;
exports.ONE_MINUTE = 60000;
exports.ONE_HOUR = 3600000;
exports.ONE_DAY = 86400000; // ms
exports.ONE_MONTH = 2592000000; // ms
exports.ONE_YEAR = 31536000000; // ms
const milliseconds = (duration) => Number.isInteger(duration.milliseconds())
    ? `${duration.milliseconds()}ms`
    : `${duration.milliseconds().toFixed(6)}ms`; // nanosecond precision
const seconds = (duration) => `${duration.seconds().toFixed()}s${duration.milliseconds() > 0 ? ` ${milliseconds(duration)}` : ''}`;
const minutes = (duration) => `${duration.minutes()}m ${seconds(duration)}`;
const hours = (duration) => `${duration.hours()}h ${minutes(duration)}`;
const days = (duration) => `${duration.days()}d ${hours(duration)}`;
const months = (duration) => `${duration.years() > 0 || duration.months() > 0 ? `${duration.months()}m ` : ''}${days(duration)}`;
const years = (duration) => `${duration.years() > 0 ? `${duration.years()}y ` : ''}${months(duration)}`;
exports.getFormattedDurationString = (maybeDurationNanoseconds) => {
    const totalNanoseconds = Number(maybeDurationNanoseconds);
    if (maybeDurationNanoseconds == null) {
        return empty_value_1.getEmptyValue();
    }
    if (Number.isNaN(totalNanoseconds) || totalNanoseconds < 0) {
        return `${maybeDurationNanoseconds}`; // echo back the duration as a string
    }
    if (totalNanoseconds < exports.ONE_MILLISECOND_AS_NANOSECONDS) {
        return `${totalNanoseconds}ns`; // display the raw nanoseconds
    }
    const duration = moment_1.default.duration(totalNanoseconds / exports.ONE_MILLISECOND_AS_NANOSECONDS);
    const totalMs = duration.asMilliseconds();
    if (totalMs < exports.ONE_SECOND) {
        return milliseconds(duration);
    }
    else if (totalMs < exports.ONE_MINUTE) {
        return seconds(duration);
    }
    else if (totalMs < exports.ONE_HOUR) {
        return minutes(duration);
    }
    else if (totalMs < exports.ONE_DAY) {
        return hours(duration);
    }
    else if (totalMs < exports.ONE_MONTH) {
        return days(duration);
    }
    else if (totalMs < exports.ONE_YEAR) {
        return months(duration);
    }
    else {
        return years(duration);
    }
};
exports.getHumanizedDuration = (maybeDurationNanoseconds) => {
    if (maybeDurationNanoseconds == null) {
        return i18n.NO_DURATION;
    }
    const totalNanoseconds = Number(maybeDurationNanoseconds);
    if (Number.isNaN(totalNanoseconds) || totalNanoseconds < 0) {
        return i18n.INVALID_DURATION;
    }
    if (totalNanoseconds === 0) {
        return i18n.ZERO_NANOSECONDS;
    }
    else if (totalNanoseconds === 1) {
        return i18n.A_NANOSECOND;
    }
    else if (totalNanoseconds < exports.ONE_MILLISECOND_AS_NANOSECONDS) {
        return i18n.A_FEW_NANOSECONDS;
    }
    else if (totalNanoseconds === exports.ONE_MILLISECOND_AS_NANOSECONDS) {
        return i18n.A_MILLISECOND;
    }
    const totalMs = totalNanoseconds / exports.ONE_MILLISECOND_AS_NANOSECONDS;
    if (totalMs < exports.ONE_SECOND) {
        return i18n.A_FEW_MILLISECONDS;
    }
    else if (totalMs === exports.ONE_SECOND) {
        return i18n.A_SECOND;
    }
    else {
        return moment_1.default.duration(totalMs).humanize();
    }
};
