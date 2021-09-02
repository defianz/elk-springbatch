"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const elastic_idx_1 = require("@kbn/elastic-idx");
function getDefaultSample(buckets) {
    const samples = buckets
        .filter(bucket => bucket.count > 0 && bucket.sample)
        .map(bucket => bucket.sample);
    if (lodash_1.isEmpty(samples)) {
        return;
    }
    const middleIndex = Math.floor(samples.length / 2);
    return samples[middleIndex];
}
function getBucket(bucket) {
    const sampleSource = elastic_idx_1.idx(bucket, _ => _.sample.hits.hits[0]._source);
    const isSampled = elastic_idx_1.idx(sampleSource, _ => _.transaction.sampled);
    const sample = {
        traceId: elastic_idx_1.idx(sampleSource, _ => _.trace.id),
        transactionId: elastic_idx_1.idx(sampleSource, _ => _.transaction.id)
    };
    return {
        key: bucket.key,
        count: bucket.doc_count,
        sample: isSampled ? sample : undefined
    };
}
function bucketTransformer(response) {
    const buckets = response.aggregations.distribution.buckets.map(getBucket);
    return {
        totalHits: response.hits.total,
        buckets,
        defaultSample: getDefaultSample(buckets)
    };
}
exports.bucketTransformer = bucketTransformer;
