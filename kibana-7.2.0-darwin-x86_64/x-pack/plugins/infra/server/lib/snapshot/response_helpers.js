"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const moment_1 = tslib_1.__importDefault(require("moment"));
const get_interval_in_seconds_1 = require("../../utils/get_interval_in_seconds");
const constants_1 = require("../constants");
exports.isIPv4 = (subject) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(subject);
exports.getIPFromBucket = (nodeType, bucket) => {
    const ip = lodash_1.get(bucket, `ip.hits.hits[0]._source.${constants_1.IP_FIELDS[nodeType]}`, null);
    if (Array.isArray(ip)) {
        return ip.find(exports.isIPv4) || null;
    }
    return ip;
};
exports.getNodePath = (groupBucket, options) => {
    const node = groupBucket.key;
    const path = options.groupBy.map(gb => {
        return { value: node[`${gb.field}`], label: node[`${gb.field}`] };
    });
    const ip = exports.getIPFromBucket(options.nodeType, groupBucket);
    path.push({ value: node.id, label: node.name, ip });
    return path;
};
exports.getNodeMetricsForLookup = (metrics) => {
    return metrics.reduce((acc, metric) => {
        acc[`${metric.key.id}`] = metric.histogram.buckets;
        return acc;
    }, {});
};
// In the returned object,
// value contains the value from the last bucket spanning a full interval
// max and avg are calculated from all buckets returned for the timerange
exports.getNodeMetrics = (nodeBuckets, options) => {
    if (!nodeBuckets) {
        return {
            name: options.metric.type,
            value: null,
            max: null,
            avg: null,
        };
    }
    const lastBucket = findLastFullBucket(nodeBuckets, options);
    const result = {
        name: options.metric.type,
        value: getMetricValueFromBucket(options.metric.type, lastBucket),
        max: calculateMax(nodeBuckets, options.metric.type),
        avg: calculateAvg(nodeBuckets, options.metric.type),
    };
    return result;
};
const findLastFullBucket = (buckets, options) => {
    const to = moment_1.default.utc(options.timerange.to);
    const bucketSize = get_interval_in_seconds_1.getIntervalInSeconds(options.timerange.interval);
    return buckets.reduce((current, item) => {
        const itemKey = lodash_1.isNumber(item.key) ? item.key : parseInt(item.key, 10);
        const date = moment_1.default.utc(itemKey + bucketSize * 1000);
        if (!date.isAfter(to) && item.doc_count > 0) {
            return item;
        }
        return current;
    }, lodash_1.last(buckets));
};
const getMetricValueFromBucket = (type, bucket) => {
    const metric = bucket[type];
    return (metric && (metric.normalized_value || metric.value)) || 0;
};
function calculateMax(buckets, type) {
    return lodash_1.max(buckets.map(bucket => getMetricValueFromBucket(type, bucket))) || 0;
}
function calculateAvg(buckets, type) {
    return lodash_1.sum(buckets.map(bucket => getMetricValueFromBucket(type, bucket))) / buckets.length || 0;
}
