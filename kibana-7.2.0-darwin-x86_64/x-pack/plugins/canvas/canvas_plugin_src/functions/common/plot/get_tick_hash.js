"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.getTickHash = (columns, rows) => {
    const ticks = {
        x: {
            hash: {},
            counter: 0,
        },
        y: {
            hash: {},
            counter: 0,
        },
    };
    if (lodash_1.get(columns, 'x.type') === 'string') {
        lodash_1.sortBy(rows, ['x']).forEach(row => {
            if (!ticks.x.hash[row.x]) {
                ticks.x.hash[row.x] = ticks.x.counter++;
            }
        });
    }
    if (lodash_1.get(columns, 'y.type') === 'string') {
        lodash_1.sortBy(rows, ['y'])
            .reverse()
            .forEach(row => {
            if (!ticks.y.hash[row.y]) {
                ticks.y.hash[row.y] = ticks.y.counter++;
            }
        });
    }
    return ticks;
};
