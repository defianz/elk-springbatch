"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datemath_1 = tslib_1.__importDefault(require("@elastic/datemath"));
const constants_1 = require("../../../common/constants");
exports.getHistogramInterval = (dateRangeStart, dateRangeEnd, bucketCount) => {
    const from = datemath_1.default.parse(dateRangeStart);
    const to = datemath_1.default.parse(dateRangeEnd);
    if (from === undefined) {
        throw Error('Invalid dateRangeStart value');
    }
    if (to === undefined) {
        throw Error('Invalid dateRangeEnd value');
    }
    return `${Math.round((to.valueOf() - from.valueOf()) / (bucketCount || constants_1.QUERY.DEFAULT_BUCKET_COUNT))}ms`;
};
