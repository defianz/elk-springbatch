"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function isEqual(time1, time2) {
    return time1.time === time2.time && time1.tiebreaker === time2.tiebreaker;
}
exports.isEqual = isEqual;
function isLess(time1, time2) {
    return (time1.time < time2.time || (time1.time === time2.time && time1.tiebreaker < time2.tiebreaker));
}
exports.isLess = isLess;
function isLessOrEqual(time1, time2) {
    return (time1.time < time2.time || (time1.time === time2.time && time1.tiebreaker <= time2.tiebreaker));
}
exports.isLessOrEqual = isLessOrEqual;
function isBetween(min, max, operand) {
    return isLessOrEqual(min, operand) && isLessOrEqual(operand, max);
}
exports.isBetween = isBetween;
