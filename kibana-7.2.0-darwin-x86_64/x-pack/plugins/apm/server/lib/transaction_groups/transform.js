"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const elastic_idx_1 = require("@kbn/elastic-idx");
function calculateRelativeImpacts(transactionGroups) {
    const values = transactionGroups.map(({ impact }) => impact);
    const max = Math.max(...values);
    const min = Math.min(...values);
    return transactionGroups.map(bucket => ({
        ...bucket,
        impact: ((bucket.impact - min) / (max - min)) * 100 || 0
    }));
}
function getTransactionGroup(bucket, minutes) {
    const averageResponseTime = bucket.avg.value;
    const transactionsPerMinute = bucket.doc_count / minutes;
    const impact = bucket.sum.value;
    const sample = bucket.sample.hits.hits[0]._source;
    return {
        name: bucket.key,
        sample,
        p95: bucket.p95.values['95.0'],
        averageResponseTime,
        transactionsPerMinute,
        impact
    };
}
function transactionGroupsTransformer({ response, start, end }) {
    const buckets = elastic_idx_1.idx(response, _ => _.aggregations.transactions.buckets) || [];
    const duration = moment_1.default.duration(end - start);
    const minutes = duration.asMinutes();
    const transactionGroups = buckets.map(bucket => getTransactionGroup(bucket, minutes));
    return calculateRelativeImpacts(transactionGroups);
}
exports.transactionGroupsTransformer = transactionGroupsTransformer;
