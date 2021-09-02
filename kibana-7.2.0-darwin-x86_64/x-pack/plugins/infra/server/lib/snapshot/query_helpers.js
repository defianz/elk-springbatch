"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metric_aggregation_creators_1 = require("./metric_aggregation_creators");
const constants_1 = require("../constants");
const get_interval_in_seconds_1 = require("../../utils/get_interval_in_seconds");
exports.getGroupedNodesSources = (options) => {
    const sources = options.groupBy.map(gb => {
        return { [`${gb.field}`]: { terms: { field: gb.field } } };
    });
    sources.push({
        id: {
            terms: { field: options.sourceConfiguration.fields[options.nodeType] },
        },
    });
    sources.push({
        name: { terms: { field: constants_1.NAME_FIELDS[options.nodeType] } },
    });
    return sources;
};
exports.getMetricsSources = (options) => {
    return [{ id: { terms: { field: options.sourceConfiguration.fields[options.nodeType] } } }];
};
exports.getMetricsAggregations = (options) => {
    return metric_aggregation_creators_1.metricAggregationCreators[options.metric.type](options.nodeType);
};
exports.getDateHistogramOffset = (options) => {
    const { from, interval } = options.timerange;
    const fromInSeconds = Math.floor(from / 1000);
    const bucketSizeInSeconds = get_interval_in_seconds_1.getIntervalInSeconds(interval);
    // negative offset to align buckets with full intervals (e.g. minutes)
    const offset = (fromInSeconds % bucketSizeInSeconds) - bucketSizeInSeconds;
    return `${offset}s`;
};
