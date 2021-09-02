"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
exports.encodeIpv6 = (ip) => ip.replace(/:/g, '-');
exports.decodeIpv6 = (ip) => ip.replace(/-/g, ':');
/**
 * Wraps `value` in an array if `value` is not already an array, and returns
 * `undefined` if `value` is `undefined`
 */
exports.asArrayIfExists = value => !fp_1.isUndefined(value) ? fp_1.castArray(value) : undefined;
exports.wait = (delay = 0) => {
    return new Promise(resolve => {
        return setTimeout(resolve, delay);
    });
};
/**
 * Unreachable Assertion helper for scenarios like exhaustive switches
 *
 * @param x Unreachable field
 * @param message Message of error thrown
 */
exports.assertUnreachable = (x, message = 'Unknown Field in switch statement') => {
    throw new Error(`${message}: ${x}`);
};
