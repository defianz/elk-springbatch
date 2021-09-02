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
const chartBase = {
    title: i18n_1.i18n.translate('xpack.apm.serviceDetails.metrics.cpuUsageChartTitle', {
        defaultMessage: 'CPU usage'
    }),
    key: 'cpu_usage_chart',
    type: 'linemark',
    yUnit: 'percent',
    series: {
        systemCPUMax: {
            title: i18n_1.i18n.translate('xpack.apm.chart.cpuSeries.systemMaxLabel', {
                defaultMessage: 'System max'
            }),
            color: eui_theme_light_json_1.default.euiColorVis1
        },
        systemCPUAverage: {
            title: i18n_1.i18n.translate('xpack.apm.chart.cpuSeries.systemAverageLabel', {
                defaultMessage: 'System average'
            }),
            color: eui_theme_light_json_1.default.euiColorVis0
        },
        processCPUMax: {
            title: i18n_1.i18n.translate('xpack.apm.chart.cpuSeries.processMaxLabel', {
                defaultMessage: 'Process max'
            }),
            color: eui_theme_light_json_1.default.euiColorVis7
        },
        processCPUAverage: {
            title: i18n_1.i18n.translate('xpack.apm.chart.cpuSeries.processAverageLabel', {
                defaultMessage: 'Process average'
            }),
            color: eui_theme_light_json_1.default.euiColorVis5
        }
    }
};
async function getCPUChartData(setup, serviceName) {
    const result = await fetcher_1.fetch(setup, serviceName);
    return transform_metrics_chart_1.transformDataToMetricsChart(result, chartBase);
}
exports.getCPUChartData = getCPUChartData;
