"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const rison_node_1 = require("rison-node");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const color_palette_1 = require("../../../../common/color_palette");
const types_1 = require("../../../../server/routes/metrics_explorer/types");
const metric_to_format_1 = require("./metric_to_format");
const lib_1 = require("../../../lib/lib");
const create_metric_label_1 = require("./create_metric_label");
exports.metricsExplorerMetricToTSVBMetric = (metric) => {
    if (metric.aggregation === types_1.MetricsExplorerAggregation.rate) {
        const metricId = uuid_1.default.v1();
        const positiveOnlyId = uuid_1.default.v1();
        const derivativeId = uuid_1.default.v1();
        return [
            {
                id: metricId,
                type: 'max',
                field: metric.field || void 0,
            },
            {
                id: derivativeId,
                type: 'derivative',
                field: metricId,
                unit: '1s',
            },
            {
                id: positiveOnlyId,
                type: 'positive_only',
                field: derivativeId,
            },
        ];
    }
    else {
        return [
            {
                id: uuid_1.default.v1(),
                type: metric.aggregation,
                field: metric.field || void 0,
            },
        ];
    }
};
const mapMetricToSeries = (metric) => {
    const format = metric_to_format_1.metricToFormat(metric);
    return {
        label: create_metric_label_1.createMetricLabel(metric),
        axis_position: 'right',
        chart_type: 'line',
        color: encodeURIComponent((metric.color && color_palette_1.colorTransformer(metric.color)) ||
            color_palette_1.colorTransformer(color_palette_1.MetricsExplorerColor.color0)),
        fill: 0,
        formatter: format === lib_1.InfraFormatterType.bits ? lib_1.InfraFormatterType.bytes : format,
        value_template: types_1.MetricsExplorerAggregation.rate === metric.aggregation ? '{{value}}/s' : '{{value}}',
        id: uuid_1.default.v1(),
        line_width: 2,
        metrics: exports.metricsExplorerMetricToTSVBMetric(metric),
        point_size: 0,
        separate_axis: 0,
        split_mode: 'everything',
        stacked: 'none',
    };
};
const createFilterFromOptions = (options, series) => {
    const filters = [];
    if (options.filterQuery) {
        filters.push(options.filterQuery);
    }
    if (options.groupBy) {
        filters.push(`${options.groupBy}: ${series.id}`);
    }
    return filters.join(' AND ');
};
exports.createTSVBLink = (source, options, series, timeRange) => {
    const appState = {
        filters: [],
        linked: false,
        query: { language: 'kuery', query: '' },
        uiState: {},
        vis: {
            aggs: [],
            params: {
                axis_formatter: 'number',
                axis_position: 'left',
                axis_scale: 'normal',
                id: uuid_1.default.v1(),
                default_index_pattern: (source && source.metricAlias) || 'metricbeat-*',
                index_pattern: (source && source.metricAlias) || 'metricbeat-*',
                interval: 'auto',
                series: options.metrics.map(mapMetricToSeries),
                show_grid: 1,
                show_legend: 1,
                time_field: (source && source.fields.timestamp) || '@timestamp',
                type: 'timeseries',
                filter: createFilterFromOptions(options, series),
            },
            title: series.id,
            type: 'metrics',
        },
    };
    const globalState = {
        refreshInterval: { pause: true, value: 0 },
        time: { from: timeRange.from, to: timeRange.to },
    };
    return `../app/kibana#/visualize/create?type=metrics&_g=${rison_node_1.encode(globalState)}&_a=${rison_node_1.encode(appState)}`;
};
