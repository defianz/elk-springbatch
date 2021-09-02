"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
function aggregateIndexStats(stats) {
    const res = new Map()
        .set(model_1.IndexStatsKey.File, 0)
        .set(model_1.IndexStatsKey.Symbol, 0)
        .set(model_1.IndexStatsKey.Reference, 0);
    stats.forEach((s) => {
        s.forEach((value, key) => {
            res.set(key, res.get(key) + value);
        });
    });
    return res;
}
exports.aggregateIndexStats = aggregateIndexStats;
