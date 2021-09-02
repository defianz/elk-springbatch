"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const fetcher_1 = require("./fetcher");
const transform_metrics_chart_1 = require("../../../transform_metrics_chart");
const chartBase = {
    title: i18n_1.i18n.translate('xpack.apm.serviceDetails.metrics.memoryUsageChartTitle', {
        defaultMessage: 'System memory usage'
    }),
    key: 'memory_usage_chart',
    type: 'linemark',
    yUnit: 'percent',
    series: {
        memoryUsedMax: {
            title: i18n_1.i18n.translate('xpack.apm.chart.memorySeries.systemMaxLabel', {
                defaultMessage: 'Max'
            })
        },
        memoryUsedAvg: {
            title: i18n_1.i18n.translate('xpack.apm.chart.memorySeries.systemAverageLabel', {
                defaultMessage: 'Average'
            })
        }
    }
};
async function getMemoryChartData(setup, serviceName) {
    const result = await fetcher_1.fetch(setup, serviceName);
    return transform_metrics_chart_1.transformDataToMetricsChart(result, chartBase);
}
exports.getMemoryChartData = getMemoryChartData;
