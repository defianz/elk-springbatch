"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_1 = require("../services/rest/apm/metrics");
const UrlParamsContext_1 = require("../context/UrlParamsContext");
const useFetcher_1 = require("./useFetcher");
const INITIAL_DATA = {
    charts: []
};
function useServiceMetricCharts(urlParams, agentName) {
    const { serviceName, start, end } = urlParams;
    const uiFilters = UrlParamsContext_1.useUiFilters(urlParams);
    const { data = INITIAL_DATA, error, status } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end && agentName) {
            return metrics_1.loadMetricsChartData({
                serviceName,
                start,
                end,
                agentName,
                uiFilters
            });
        }
    }, [serviceName, start, end, agentName, uiFilters]);
    return {
        data,
        status,
        error
    };
}
exports.useServiceMetricCharts = useServiceMetricCharts;
