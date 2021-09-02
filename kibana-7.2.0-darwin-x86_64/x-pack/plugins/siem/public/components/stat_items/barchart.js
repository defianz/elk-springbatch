"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const experimental_1 = require("@elastic/eui/lib/experimental");
const _1 = require(".");
const auto_sizer_1 = require("../auto_sizer");
const { SCALE, ORIENTATION } = eui_1.EuiSeriesChartUtils;
const getYaxis = (value) => {
    const label = value.toString();
    const labelLength = 4;
    return label.length > labelLength ? `${label.slice(0, labelLength)}.` : label;
};
exports.BarChartBaseComponent = recompose_1.pure(({ data, ...chartConfigs }) => {
    return chartConfigs.width && chartConfigs.height ? (
    // @ts-ignore
    react_1.default.createElement(SeriesChart, Object.assign({ yType: SCALE.ORDINAL, orientation: ORIENTATION.HORIZONTAL, showDefaultAxis: false, "data-test-subj": "stat-bar-chart" }, chartConfigs),
        data.map(series => {
            return (react_1.default.createElement(experimental_1.EuiBarSeries, { key: `stat-items-areachart-${series.key}`, name: series.key, 
                // @ts-ignore
                data: series.value, color: series.color }));
        }),
        react_1.default.createElement(experimental_1.EuiXAxis, null),
        react_1.default.createElement(experimental_1.EuiYAxis, { tickFormat: getYaxis }))) : null;
});
exports.BarChartWithCustomPrompt = recompose_1.pure(({ data, height, width }) => {
    return data &&
        data.length &&
        data.some(({ value }) => value != null && value.length > 0 && value.every(chart => chart.x != null && chart.x > 0)) ? (react_1.default.createElement(exports.BarChartBaseComponent, { height: height, width: width, data: data })) : (react_1.default.createElement(_1.ChartHolder, null));
});
exports.BarChart = recompose_1.pure(({ barChart }) => (react_1.default.createElement(auto_sizer_1.AutoSizer, { detectAnyWindowResize: false, content: true }, ({ measureRef, content: { height, width } }) => (react_1.default.createElement(_1.WrappedByAutoSizer, { innerRef: measureRef },
    react_1.default.createElement(exports.BarChartWithCustomPrompt, { height: height, width: width, data: barChart }))))));
const SeriesChart = styled_components_1.default(experimental_1.EuiSeriesChart) `
  svg
    .rv-xy-plot__axis--horizontal
    .rv-xy-plot__axis__ticks
    .rv-xy-plot__axis__tick:not(:first-child):not(:last-child) {
    display: none;
  }
`;
