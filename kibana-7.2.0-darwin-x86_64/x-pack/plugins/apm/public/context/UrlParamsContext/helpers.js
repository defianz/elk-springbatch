"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const datemath_1 = tslib_1.__importDefault(require("@elastic/datemath"));
function getParsedDate(rawDate, opts = {}) {
    if (rawDate) {
        const parsed = datemath_1.default.parse(rawDate, opts);
        if (parsed) {
            return parsed.toISOString();
        }
    }
}
exports.getParsedDate = getParsedDate;
function getStart(prevState, rangeFrom) {
    if (prevState.rangeFrom !== rangeFrom) {
        return getParsedDate(rangeFrom);
    }
    return prevState.start;
}
exports.getStart = getStart;
function getEnd(prevState, rangeTo) {
    if (prevState.rangeTo !== rangeTo) {
        return getParsedDate(rangeTo, { roundUp: true });
    }
    return prevState.end;
}
exports.getEnd = getEnd;
function toNumber(value) {
    if (value !== undefined) {
        return parseInt(value, 10);
    }
}
exports.toNumber = toNumber;
function toString(value) {
    if (value === '' || value === 'null' || value === 'undefined') {
        return;
    }
    return value;
}
exports.toString = toString;
function toBoolean(value) {
    return value === 'true';
}
exports.toBoolean = toBoolean;
function getPathAsArray(pathname = '') {
    return lodash_1.compact(pathname.split('/'));
}
exports.getPathAsArray = getPathAsArray;
function removeUndefinedProps(obj) {
    return lodash_1.pick(obj, value => value !== undefined);
}
exports.removeUndefinedProps = removeUndefinedProps;
function getPathParams(pathname = '') {
    const paths = getPathAsArray(pathname);
    const pageName = paths.length > 1 ? paths[1] : paths[0];
    // TODO: use react router's real match params instead of guessing the path order
    switch (pageName) {
        case 'transactions':
            return {
                processorEvent: 'transaction',
                serviceName: paths[0],
                transactionType: paths[2],
                transactionName: paths[3]
            };
        case 'errors':
            return {
                processorEvent: 'error',
                serviceName: paths[0],
                errorGroupId: paths[2]
            };
        case 'metrics':
            return {
                processorEvent: 'metric',
                serviceName: paths[0]
            };
        case 'services': // fall thru since services and traces share path params
        case 'traces':
            return {
                processorEvent: 'transaction',
                serviceName: undefined
            };
        default:
            return {
                processorEvent: 'transaction',
                serviceName: paths[0]
            };
    }
}
exports.getPathParams = getPathParams;
