"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_2 = require("@kbn/i18n/react");
const eui_1 = require("@elastic/eui");
const charts_1 = require("@elastic/charts");
require("@elastic/charts/dist/style.css");
const lodash_1 = require("lodash");
const formatters_1 = require("@elastic/charts/dist/utils/data/formatters");
const moment_1 = tslib_1.__importDefault(require("moment"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const create_formatter_for_metric_1 = require("./helpers/create_formatter_for_metric");
const line_series_1 = require("./line_series");
const chart_context_menu_1 = require("./chart_context_menu");
const empty_chart_1 = require("./empty_chart");
const no_metrics_1 = require("./no_metrics");
const dateFormatter = charts_1.timeFormatter(formatters_1.niceTimeFormatByDay(1));
exports.MetricsExplorerChart = react_2.injectI18n(({ source, options, series, title, onFilter, height = 200, width = '100%', timeRange, onTimeChange, }) => {
    const { metrics } = options;
    const handleTimeChange = (from, to) => {
        onTimeChange(moment_1.default(from).toISOString(), moment_1.default(to).toISOString());
    };
    const yAxisFormater = react_1.useCallback(create_formatter_for_metric_1.createFormatterForMetric(lodash_1.first(metrics)), [options]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        options.groupBy ? (react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
            react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                react_1.default.createElement(ChartTitle, null,
                    react_1.default.createElement(eui_1.EuiToolTip, { content: title },
                        react_1.default.createElement("span", null, title))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(chart_context_menu_1.MetricsExplorerChartContextMenu, { timeRange: timeRange, options: options, series: series, onFilter: onFilter, source: source }))))) : (react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "flexEnd" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(chart_context_menu_1.MetricsExplorerChartContextMenu, { options: options, series: series, source: source, timeRange: timeRange })))),
        react_1.default.createElement("div", { style: { height, width } }, series.rows.length > 0 ? (react_1.default.createElement(charts_1.Chart, null,
            metrics.map((metric, id) => (react_1.default.createElement(line_series_1.MetricLineSeries, { key: id, metric: metric, id: id, series: series }))),
            react_1.default.createElement(charts_1.Axis, { id: charts_1.getAxisId('timestamp'), position: charts_1.Position.Bottom, showOverlappingTicks: true, tickFormat: dateFormatter }),
            react_1.default.createElement(charts_1.Axis, { id: charts_1.getAxisId('values'), position: charts_1.Position.Left, tickFormat: yAxisFormater }),
            react_1.default.createElement(charts_1.Settings, { onBrushEnd: handleTimeChange }))) : options.metrics.length > 0 ? (react_1.default.createElement(empty_chart_1.MetricsExplorerEmptyChart, null)) : (react_1.default.createElement(no_metrics_1.MetricsExplorerNoMetrics, null)))));
});
const ChartTitle = eui_styled_components_1.default.div `
            width: 100%
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            flex: 1 1 auto;
            margin: 12px;
          `;
