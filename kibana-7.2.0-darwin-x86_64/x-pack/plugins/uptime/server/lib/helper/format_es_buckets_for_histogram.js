"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const drop_latest_bucket_1 = require("./drop_latest_bucket");
/**
 * The charting library we're currently using requires histogram data points have an
 * x and an x0 property, where x0 is the beginning of a data point and x provides
 * the size of the point from the start. This function attempts to generalize the
 * concept so any bucket that has a numeric value as its key can be put into this format.
 *
 * Additionally, histograms that stack horizontally instead of vertically need to have
 * a y and a y0 value. We're not doing this currently but with some minor modification
 * this function could provide formatting for those buckets as well.
 * @param buckets The ES data to format.
 */
function formatEsBucketsForHistogram(buckets) {
    // wait for first bucket to fill up
    if (buckets.length < 2) {
        return [];
    }
    const TERMINAL_INDEX = buckets.length - 1;
    const { key: terminalBucketTime } = buckets[TERMINAL_INDEX];
    // drop the most recent bucket to avoid returning incomplete bucket
    return drop_latest_bucket_1.dropLatestBucket(buckets).map((item, index, array) => {
        const { key } = item;
        const nextItem = array[index + 1];
        const bucketSize = nextItem ? Math.abs(nextItem.key - key) : Math.abs(terminalBucketTime - key);
        return {
            x: key + bucketSize,
            x0: key,
            ...item,
        };
    });
}
exports.formatEsBucketsForHistogram = formatEsBucketsForHistogram;
