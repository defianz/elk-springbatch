"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const d3_1 = tslib_1.__importDefault(require("d3"));
exports.getEmptySeries = lodash_1.memoize((start = Date.now() - 3600000, end = Date.now()) => {
    const dates = d3_1.default.time
        .scale()
        .domain([new Date(start), new Date(end)])
        .ticks();
    return [
        {
            data: dates.map(x => ({
                x: x.getTime(),
                y: 1
            }))
        }
    ];
}, (start, end) => [start, end].join('_'));
