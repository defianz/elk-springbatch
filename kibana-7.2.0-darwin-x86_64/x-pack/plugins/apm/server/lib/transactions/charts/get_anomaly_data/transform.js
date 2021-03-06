"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const elastic_idx_1 = require("@kbn/elastic-idx");
function getBucket(bucket) {
    return {
        x: bucket.key,
        anomalyScore: bucket.anomaly_score.value,
        lower: bucket.lower.value,
        upper: bucket.upper.value
    };
}
function anomalySeriesTransform(response, mlBucketSize, bucketSize, timeSeriesDates) {
    if (!response) {
        return;
    }
    const buckets = (elastic_idx_1.idx(response, _ => _.aggregations.ml_avg_response_times.buckets) || []).map(getBucket);
    const bucketSizeInMillis = Math.max(bucketSize, mlBucketSize) * 1000;
    return {
        anomalyScore: getAnomalyScoreDataPoints(buckets, timeSeriesDates, bucketSizeInMillis),
        anomalyBoundaries: getAnomalyBoundaryDataPoints(buckets, timeSeriesDates)
    };
}
exports.anomalySeriesTransform = anomalySeriesTransform;
function getAnomalyScoreDataPoints(buckets, timeSeriesDates, bucketSizeInMillis) {
    const ANOMALY_THRESHOLD = 75;
    const firstDate = lodash_1.first(timeSeriesDates);
    const lastDate = lodash_1.last(timeSeriesDates);
    return buckets
        .filter(bucket => bucket.anomalyScore !== null && bucket.anomalyScore > ANOMALY_THRESHOLD)
        .filter(isInDateRange(firstDate, lastDate))
        .map(bucket => {
        return {
            x0: bucket.x,
            x: Math.min(bucket.x + bucketSizeInMillis, lastDate) // don't go beyond last date
        };
    });
}
exports.getAnomalyScoreDataPoints = getAnomalyScoreDataPoints;
function getAnomalyBoundaryDataPoints(buckets, timeSeriesDates) {
    return replaceFirstAndLastBucket(buckets, timeSeriesDates)
        .filter(bucket => bucket.lower !== null)
        .map(bucket => {
        return {
            x: bucket.x,
            y0: bucket.lower,
            y: bucket.upper
        };
    });
}
exports.getAnomalyBoundaryDataPoints = getAnomalyBoundaryDataPoints;
function replaceFirstAndLastBucket(buckets, timeSeriesDates) {
    const firstDate = lodash_1.first(timeSeriesDates);
    const lastDate = lodash_1.last(timeSeriesDates);
    const preBucketWithValue = buckets
        .filter(p => p.x <= firstDate)
        .reverse()
        .find(p => p.lower !== null);
    const bucketsInRange = buckets.filter(isInDateRange(firstDate, lastDate));
    // replace first bucket if it is null
    const firstBucket = lodash_1.first(bucketsInRange);
    if (preBucketWithValue && firstBucket && firstBucket.lower === null) {
        firstBucket.lower = preBucketWithValue.lower;
        firstBucket.upper = preBucketWithValue.upper;
    }
    const lastBucketWithValue = [...buckets]
        .reverse()
        .find(p => p.lower !== null);
    // replace last bucket if it is null
    const lastBucket = lodash_1.last(bucketsInRange);
    if (lastBucketWithValue && lastBucket && lastBucket.lower === null) {
        lastBucket.lower = lastBucketWithValue.lower;
        lastBucket.upper = lastBucketWithValue.upper;
    }
    return bucketsInRange;
}
exports.replaceFirstAndLastBucket = replaceFirstAndLastBucket;
// anomaly time series contain one or more buckets extra in the beginning
// these extra buckets should be removed
function isInDateRange(firstDate, lastDate) {
    return (p) => p.x >= firstDate && p.x <= lastDate;
}
