"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const experimental_1 = require("@elastic/eui/lib/experimental");
const _1 = require(".");
const auto_sizer_1 = require("../auto_sizer");
exports.AreaChartBaseComponent = recompose_1.pure(({ data, ...chartConfigs }) => chartConfigs.width && chartConfigs.height ? (react_1.default.createElement(SeriesChart, Object.assign({}, chartConfigs, { showDefaultAxis: false, xType: "ordinal", "data-test-subj": "stat-area-chart" }),
    data.map(series => (
    /**
     * Placing ts-ignore here for fillOpacity
     * */
    // @ts-ignore
    react_1.default.createElement(experimental_1.EuiAreaSeries, { key: `stat-items-areachart-${series.key}`, name: series.key.replace('Histogram', ''), 
        // @ts-ignore
        data: series.value, fillOpacity: 0.04, color: series.color }))),
    react_1.default.createElement(experimental_1.EuiXAxis, { tickFormat: timestamp => timestamp.split('T')[0] }),
    react_1.default.createElement(experimental_1.EuiYAxis, null))) : null);
exports.AreaChartWithCustomPrompt = recompose_1.pure(({ data, height, width }) => {
    return data != null &&
        data.length &&
        data.every(({ value }) => value != null &&
            value.length > 0 &&
            value.every(chart => chart.x != null && chart.y != null)) ? (react_1.default.createElement(exports.AreaChartBaseComponent, { height: height, width: width, data: data })) : (react_1.default.createElement(_1.ChartHolder, null));
});
exports.AreaChart = recompose_1.pure(({ areaChart }) => (react_1.default.createElement(auto_sizer_1.AutoSizer, { detectAnyWindowResize: false, content: true }, ({ measureRef, content: { height, width } }) => (react_1.default.createElement(_1.WrappedByAutoSizer, { innerRef: measureRef },
    react_1.default.createElement(exports.AreaChartWithCustomPrompt, { data: areaChart, height: height, width: width }))))));
const SeriesChart = styled_components_1.default(experimental_1.EuiSeriesChart) `
  svg .rv-xy-plot__axis__ticks .rv-xy-plot__axis__tick:not(:first-child):not(:last-child) {
    display: none;
  }
`;
