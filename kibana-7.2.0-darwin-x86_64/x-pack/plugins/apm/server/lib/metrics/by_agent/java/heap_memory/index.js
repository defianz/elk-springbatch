"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const i18n_1 = require("@kbn/i18n");
const fetcher_1 = require("./fetcher");
const transform_metrics_chart_1 = require("../../../transform_metrics_chart");
// TODO: i18n for titles
const chartBase = {
    title: i18n_1.i18n.translate('xpack.apm.agentMetrics.java.heapMemoryChartTitle', {
        defaultMessage: 'Heap Memory'
    }),
    key: 'heap_memory_area_chart',
    type: 'area',
    yUnit: 'bytes',
    series: {
        heapMemoryUsed: {
            title: i18n_1.i18n.translate('xpack.apm.agentMetrics.java.heapMemorySeriesUsed', {
                defaultMessage: 'Avg. used'
            }),
            color: eui_theme_light_json_1.default.euiColorVis0
        },
        heapMemoryCommitted: {
            title: i18n_1.i18n.translate('xpack.apm.agentMetrics.java.heapMemorySeriesCommitted', {
                defaultMessage: 'Avg. committed'
            }),
            color: eui_theme_light_json_1.default.euiColorVis1
        },
        heapMemoryMax: {
            title: i18n_1.i18n.translate('xpack.apm.agentMetrics.java.heapMemorySeriesMax', {
                defaultMessage: 'Avg. limit'
            }),
            color: eui_theme_light_json_1.default.euiColorVis2
        }
    }
};
async function getHeapMemoryChart(setup, serviceName) {
    const result = await fetcher_1.fetch(setup, serviceName);
    return transform_metrics_chart_1.transformDataToMetricsChart(result, chartBase);
}
exports.getHeapMemoryChart = getHeapMemoryChart;
