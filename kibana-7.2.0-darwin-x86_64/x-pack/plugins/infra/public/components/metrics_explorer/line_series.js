"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const charts_1 = require("@elastic/charts");
require("@elastic/charts/dist/style.css");
const color_palette_1 = require("../../../common/color_palette");
const create_metric_label_1 = require("./helpers/create_metric_label");
exports.MetricLineSeries = ({ metric, id, series }) => {
    const color = (metric.color && color_palette_1.colorTransformer(metric.color)) ||
        color_palette_1.colorTransformer(color_palette_1.MetricsExplorerColor.color0);
    const seriesLineStyle = {
        line: {
            stroke: color,
            strokeWidth: 2,
            visible: true,
        },
        border: {
            visible: false,
            strokeWidth: 2,
            stroke: color,
        },
        point: {
            visible: false,
            radius: 0.2,
            stroke: color,
            strokeWidth: 2,
            opacity: 1,
        },
    };
    const yAccessor = `metric_${id}`;
    const specId = charts_1.getSpecId(yAccessor);
    const colors = {
        colorValues: [],
        specId,
    };
    const customColors = new Map();
    customColors.set(colors, color);
    return (react_1.default.createElement(charts_1.LineSeries, { key: `series-${series.id}-${yAccessor}`, id: specId, name: create_metric_label_1.createMetricLabel(metric), xScaleType: "time" /* Time */, yScaleType: "linear" /* Linear */, xAccessor: "timestamp", yAccessors: [yAccessor], data: series.rows, lineSeriesStyle: seriesLineStyle, customSeriesColors: customColors }));
};
