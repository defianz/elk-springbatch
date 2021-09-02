"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const types_1 = require("../../../server/routes/metrics_explorer/types");
const toolbar_1 = require("../eui/toolbar");
const kuery_bar_1 = require("./kuery_bar");
const metrics_1 = require("./metrics");
const group_by_1 = require("./group_by");
const aggregation_1 = require("./aggregation");
exports.MetricsExplorerToolbar = react_1.injectI18n(({ timeRange, derivedIndexPattern, options, onTimeChange, onRefresh, onGroupByChange, onFilterQuerySubmit, onMetricsChange, onAggregationChange, }) => {
    const isDefaultOptions = options.aggregation === types_1.MetricsExplorerAggregation.avg && options.metrics.length === 0;
    return (react_2.default.createElement(toolbar_1.Toolbar, null,
        react_2.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
            react_2.default.createElement(eui_1.EuiFlexItem, { grow: options.aggregation === types_1.MetricsExplorerAggregation.count ? 2 : false },
                react_2.default.createElement(aggregation_1.MetricsExplorerAggregationPicker, { fullWidth: true, options: options, onChange: onAggregationChange })),
            options.aggregation !== types_1.MetricsExplorerAggregation.count && (react_2.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.metricsExplorer.aggregationLabel", defaultMessage: "of" }))),
            options.aggregation !== types_1.MetricsExplorerAggregation.count && (react_2.default.createElement(eui_1.EuiFlexItem, { grow: 2 },
                react_2.default.createElement(metrics_1.MetricsExplorerMetrics, { autoFocus: isDefaultOptions, fields: derivedIndexPattern.fields, options: options, onChange: onMetricsChange }))),
            react_2.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.infra.metricsExplorer.groupByToolbarLabel", defaultMessage: "graph per" })),
            react_2.default.createElement(eui_1.EuiFlexItem, { grow: 1 },
                react_2.default.createElement(group_by_1.MetricsExplorerGroupBy, { onChange: onGroupByChange, fields: derivedIndexPattern.fields, options: options }))),
        react_2.default.createElement(eui_1.EuiFlexGroup, null,
            react_2.default.createElement(eui_1.EuiFlexItem, null,
                react_2.default.createElement(kuery_bar_1.MetricsExplorerKueryBar, { derivedIndexPattern: derivedIndexPattern, onSubmit: onFilterQuerySubmit, value: options.filterQuery })),
            react_2.default.createElement(eui_1.EuiFlexItem, { grow: false, style: { marginRight: 5 } },
                react_2.default.createElement(eui_1.EuiSuperDatePicker, { start: timeRange.from, end: timeRange.to, onTimeChange: ({ start, end }) => onTimeChange(start, end), onRefresh: onRefresh })))));
});
