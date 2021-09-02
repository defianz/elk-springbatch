"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const useServiceMetricCharts_1 = require("../../../hooks/useServiceMetricCharts");
const SyncChartGroup_1 = require("../../shared/charts/SyncChartGroup");
const MetricsChart_1 = require("./MetricsChart");
function ServiceMetrics({ urlParams, agentName }) {
    const { data } = useServiceMetricCharts_1.useServiceMetricCharts(urlParams, agentName);
    const { start, end } = urlParams;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(SyncChartGroup_1.SyncChartGroup, { render: hoverXHandlers => (react_1.default.createElement(eui_1.EuiFlexGrid, { columns: 2, gutterSize: "s" }, data.charts.map(chart => (react_1.default.createElement(eui_1.EuiFlexItem, { key: chart.key },
                react_1.default.createElement(eui_1.EuiPanel, null,
                    react_1.default.createElement(MetricsChart_1.MetricsChart, { start: start, end: end, chart: chart, hoverXHandlers: hoverXHandlers }))))))) }),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xxl" })));
}
exports.ServiceMetrics = ServiceMetrics;
