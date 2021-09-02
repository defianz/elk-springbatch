"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const document_title_1 = require("../../../components/document_title");
const charts_1 = require("../../../components/metrics_explorer/charts");
const toolbar_1 = require("../../../components/metrics_explorer/toolbar");
const empty_states_1 = require("../../../components/empty_states");
const use_metric_explorer_state_1 = require("./use_metric_explorer_state");
exports.MetricsExplorerPage = react_1.injectI18n(({ intl, source, derivedIndexPattern }) => {
    if (!source) {
        return null;
    }
    const { loading, error, data, currentTimerange, options, handleAggregationChange, handleMetricsChange, handleFilterQuerySubmit, handleGroupByChange, handleTimeChange, handleRefresh, handleLoadMore, } = use_metric_explorer_state_1.useMetricsExplorerState(source, derivedIndexPattern);
    return (react_2.default.createElement("div", null,
        react_2.default.createElement(document_title_1.DocumentTitle, { title: (previousTitle) => intl.formatMessage({
                id: 'xpack.infra.infrastructureMetricsExplorerPage.documentTitle',
                defaultMessage: '{previousTitle} | Metrics explorer',
            }, {
                previousTitle,
            }) }),
        react_2.default.createElement(toolbar_1.MetricsExplorerToolbar, { derivedIndexPattern: derivedIndexPattern, timeRange: currentTimerange, options: options, onRefresh: handleRefresh, onTimeChange: handleTimeChange, onGroupByChange: handleGroupByChange, onFilterQuerySubmit: handleFilterQuerySubmit, onMetricsChange: handleMetricsChange, onAggregationChange: handleAggregationChange }),
        error ? (react_2.default.createElement(empty_states_1.NoData, { titleText: "Whoops!", bodyText: intl.formatMessage({
                id: 'xpack.infra.metricsExplorer.errorMessage',
                defaultMessage: 'It looks like the request failed with "{message}"',
            }, { message: error.message }), onRefetch: handleRefresh, refetchText: "Try Again" })) : (react_2.default.createElement(charts_1.MetricsExplorerCharts, { timeRange: currentTimerange, loading: loading, data: data, source: source, options: options, onLoadMore: handleLoadMore, onFilter: handleFilterQuerySubmit, onRefetch: handleRefresh, onTimeChange: handleTimeChange }))));
});
