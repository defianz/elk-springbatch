"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function rangeFilter(start, end) {
    return {
        '@timestamp': {
            gte: start,
            lte: end,
            format: 'epoch_millis'
        }
    };
}
exports.rangeFilter = rangeFilter;
