"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const types_1 = require("../../../../server/routes/metrics_explorer/types");
const use_metrics_explorer_data_1 = require("../../../containers/metrics_explorer/use_metrics_explorer_data");
const use_metrics_explorer_options_1 = require("../../../containers/metrics_explorer/use_metrics_explorer_options");
exports.useMetricsExplorerState = (source, derivedIndexPattern) => {
    const [refreshSignal, setRefreshSignal] = react_1.useState(0);
    const [afterKey, setAfterKey] = react_1.useState(null);
    const { options, currentTimerange, setTimeRange, setOptions } = react_1.useContext(use_metrics_explorer_options_1.MetricsExplorerOptionsContainer.Context);
    const { loading, error, data } = use_metrics_explorer_data_1.useMetricsExplorerData(options, source, derivedIndexPattern, currentTimerange, afterKey, refreshSignal);
    const handleRefresh = react_1.useCallback(() => {
        setAfterKey(null);
        setRefreshSignal(refreshSignal + 1);
    }, [refreshSignal]);
    const handleTimeChange = react_1.useCallback((start, end) => {
        setAfterKey(null);
        setTimeRange({ ...currentTimerange, from: start, to: end });
    }, [currentTimerange]);
    const handleGroupByChange = react_1.useCallback((groupBy) => {
        setAfterKey(null);
        setOptions({
            ...options,
            groupBy: groupBy || void 0,
        });
    }, [options]);
    const handleFilterQuerySubmit = react_1.useCallback((query) => {
        setAfterKey(null);
        setOptions({
            ...options,
            filterQuery: query,
        });
    }, [options]);
    const handleMetricsChange = react_1.useCallback((metrics) => {
        setAfterKey(null);
        setOptions({
            ...options,
            metrics,
        });
    }, [options]);
    const handleAggregationChange = react_1.useCallback((aggregation) => {
        setAfterKey(null);
        const metrics = aggregation === types_1.MetricsExplorerAggregation.count
            ? [{ aggregation }]
            : options.metrics
                .filter(metric => metric.aggregation !== types_1.MetricsExplorerAggregation.count)
                .map(metric => ({
                ...metric,
                aggregation,
            }));
        setOptions({ ...options, aggregation, metrics });
    }, [options]);
    return {
        loading,
        error,
        data,
        currentTimerange,
        options,
        handleAggregationChange,
        handleMetricsChange,
        handleFilterQuerySubmit,
        handleGroupByChange,
        handleTimeChange,
        handleRefresh,
        handleLoadMore: setAfterKey,
    };
};
