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
const lodash_1 = require("lodash");
const lodash_mean_1 = tslib_1.__importDefault(require("lodash.mean"));
const polished_1 = require("polished");
const formatters_1 = require("../utils/formatters");
const INITIAL_DATA = {
    apmTimeseries: {
        totalHits: 0,
        responseTimes: {
            avg: [],
            p95: [],
            p99: []
        },
        tpmBuckets: [],
        overallAvgDuration: undefined
    },
    anomalyTimeseries: undefined
};
function getTransactionCharts({ transactionType }, { apmTimeseries, anomalyTimeseries } = INITIAL_DATA) {
    const noHits = apmTimeseries.totalHits === 0;
    const tpmSeries = getTpmSeries(apmTimeseries, transactionType);
    const responseTimeSeries = getResponseTimeSeries({
        apmTimeseries,
        anomalyTimeseries
    });
    return {
        noHits,
        tpmSeries,
        responseTimeSeries
    };
}
exports.getTransactionCharts = getTransactionCharts;
function getResponseTimeSeries({ apmTimeseries, anomalyTimeseries }) {
    const { overallAvgDuration } = apmTimeseries;
    const { avg, p95, p99 } = apmTimeseries.responseTimes;
    const series = [
        {
            title: i18n_1.i18n.translate('xpack.apm.transactions.chart.averageLabel', {
                defaultMessage: 'Avg.'
            }),
            data: avg,
            legendValue: formatters_1.asMillis(overallAvgDuration),
            type: 'linemark',
            color: eui_theme_light_json_1.default.euiColorVis1
        },
        {
            title: i18n_1.i18n.translate('xpack.apm.transactions.chart.95thPercentileLabel', {
                defaultMessage: '95th percentile'
            }),
            titleShort: '95th',
            data: p95,
            type: 'linemark',
            color: eui_theme_light_json_1.default.euiColorVis5
        },
        {
            title: i18n_1.i18n.translate('xpack.apm.transactions.chart.99thPercentileLabel', {
                defaultMessage: '99th percentile'
            }),
            titleShort: '99th',
            data: p99,
            type: 'linemark',
            color: eui_theme_light_json_1.default.euiColorVis7
        }
    ];
    if (anomalyTimeseries) {
        // insert after Avg. series
        series.splice(1, 0, getAnomalyBoundariesSeries(anomalyTimeseries.anomalyBoundaries), getAnomalyScoreSeries(anomalyTimeseries.anomalyScore));
    }
    return series;
}
exports.getResponseTimeSeries = getResponseTimeSeries;
function getAnomalyScoreSeries(data) {
    return {
        title: i18n_1.i18n.translate('xpack.apm.transactions.chart.anomalyScoreLabel', {
            defaultMessage: 'Anomaly score'
        }),
        hideLegend: true,
        hideTooltipValue: true,
        data,
        type: 'areaMaxHeight',
        color: 'none',
        areaColor: polished_1.rgba(eui_theme_light_json_1.default.euiColorVis9, 0.1)
    };
}
exports.getAnomalyScoreSeries = getAnomalyScoreSeries;
function getAnomalyBoundariesSeries(data) {
    return {
        title: i18n_1.i18n.translate('xpack.apm.transactions.chart.anomalyBoundariesLabel', {
            defaultMessage: 'Anomaly Boundaries'
        }),
        hideLegend: true,
        hideTooltipValue: true,
        data,
        type: 'area',
        color: 'none',
        areaColor: polished_1.rgba(eui_theme_light_json_1.default.euiColorVis1, 0.1)
    };
}
function getTpmSeries(apmTimeseries, transactionType) {
    const { tpmBuckets } = apmTimeseries;
    const bucketKeys = tpmBuckets.map(({ key }) => key);
    const getColor = getColorByKey(bucketKeys);
    return tpmBuckets.map(bucket => {
        const avg = lodash_mean_1.default(bucket.dataPoints.map(p => p.y));
        return {
            title: bucket.key,
            data: bucket.dataPoints,
            legendValue: `${formatters_1.asDecimal(avg)} ${formatters_1.tpmUnit(transactionType || '')}`,
            type: 'linemark',
            color: getColor(bucket.key)
        };
    });
}
exports.getTpmSeries = getTpmSeries;
function getColorByKey(keys) {
    const assignedColors = {
        'HTTP 2xx': eui_theme_light_json_1.default.euiColorVis0,
        'HTTP 3xx': eui_theme_light_json_1.default.euiColorVis5,
        'HTTP 4xx': eui_theme_light_json_1.default.euiColorVis7,
        'HTTP 5xx': eui_theme_light_json_1.default.euiColorVis2
    };
    const unknownKeys = lodash_1.difference(keys, Object.keys(assignedColors));
    const unassignedColors = lodash_1.zipObject(unknownKeys, [
        eui_theme_light_json_1.default.euiColorVis1,
        eui_theme_light_json_1.default.euiColorVis3,
        eui_theme_light_json_1.default.euiColorVis4,
        eui_theme_light_json_1.default.euiColorVis6,
        eui_theme_light_json_1.default.euiColorVis2,
        eui_theme_light_json_1.default.euiColorVis8
    ]);
    return (key) => assignedColors[key] || unassignedColors[key];
}
