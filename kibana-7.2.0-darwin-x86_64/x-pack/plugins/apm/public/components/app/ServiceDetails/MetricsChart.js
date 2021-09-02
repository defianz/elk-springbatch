"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
// @ts-ignore
const CustomPlot_1 = tslib_1.__importDefault(require("../../shared/charts/CustomPlot"));
const formatters_1 = require("../../../utils/formatters");
const getEmptySeries_1 = require("../../shared/charts/CustomPlot/getEmptySeries");
function MetricsChart({ start, end, chart, hoverXHandlers }) {
    const formatYValue = getYTickFormatter(chart);
    const formatTooltip = getTooltipFormatter(chart);
    const transformedSeries = chart.series.map(series => ({
        ...series,
        legendValue: formatYValue(series.overallValue)
    }));
    const noHits = chart.totalHits === 0;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
            react_1.default.createElement("span", null, chart.title)),
        react_1.default.createElement(CustomPlot_1.default, Object.assign({}, hoverXHandlers, { noHits: noHits, series: noHits ? getEmptySeries_1.getEmptySeries(start, end) : transformedSeries, tickFormatY: formatYValue, formatTooltipValue: formatTooltip, yMax: chart.yUnit === 'percent' ? 1 : 'max' }))));
}
exports.MetricsChart = MetricsChart;
function getYTickFormatter(chart) {
    switch (chart.yUnit) {
        case 'bytes': {
            const max = Math.max(...chart.series.flatMap(series => series.data.map(coord => coord.y || 0)));
            return formatters_1.getFixedByteFormatter(max);
        }
        case 'percent': {
            return (y) => formatters_1.asPercent(y || 0, 1);
        }
        default: {
            return (y) => (y === null ? y : formatters_1.asDecimal(y));
        }
    }
}
function getTooltipFormatter({ yUnit }) {
    switch (yUnit) {
        case 'bytes': {
            return (c) => formatters_1.asDynamicBytes(c.y);
        }
        case 'percent': {
            return (c) => formatters_1.asPercent(c.y || 0, 1);
        }
        default: {
            return (c) => (c.y === null ? c.y : formatters_1.asDecimal(c.y));
        }
    }
}
