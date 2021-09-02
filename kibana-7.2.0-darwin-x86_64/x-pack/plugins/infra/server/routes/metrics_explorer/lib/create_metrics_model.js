"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../../../lib/adapters/metrics");
const types_1 = require("../types");
exports.createMetricModel = (options) => {
    return {
        id: 'custom',
        requires: [],
        index_pattern: options.indexPattern,
        interval: options.timerange.interval,
        time_field: options.timerange.field,
        type: 'timeseries',
        // Create one series per metric requested. The series.id will be used to identify the metric
        // when the responses are processed and combined with the grouping request.
        series: options.metrics.map((metric, index) => {
            // If the metric is a rate then we need to add TSVB metrics for calculating the derivative
            if (metric.aggregation === types_1.MetricsExplorerAggregation.rate) {
                const aggType = metrics_1.InfraMetricModelMetricType.max;
                return {
                    id: `metric_${index}`,
                    split_mode: 'everything',
                    metrics: [
                        {
                            id: `metric_${aggType}_${index}`,
                            field: metric.field,
                            type: aggType,
                        },
                        {
                            id: `metric_deriv_${aggType}_${index}`,
                            field: `metric_${aggType}_${index}`,
                            type: metrics_1.InfraMetricModelMetricType.derivative,
                            unit: '1s',
                        },
                        {
                            id: `metric_posonly_deriv_${aggType}_${index}`,
                            type: metrics_1.InfraMetricModelMetricType.calculation,
                            variables: [
                                { id: 'var-rate', name: 'rate', field: `metric_deriv_${aggType}_${index}` },
                            ],
                            script: 'params.rate > 0.0 ? params.rate : 0.0',
                        },
                    ],
                };
            }
            // Create a basic TSVB series with a single metric
            const aggregation = types_1.MetricsExplorerAggregation[metric.aggregation] || types_1.MetricsExplorerAggregation.avg;
            return {
                id: `metric_${index}`,
                split_mode: 'everything',
                metrics: [
                    {
                        field: metric.field,
                        id: `metric_${aggregation}_${index}`,
                        type: metrics_1.InfraMetricModelMetricType[aggregation],
                    },
                ],
            };
        }),
    };
};
