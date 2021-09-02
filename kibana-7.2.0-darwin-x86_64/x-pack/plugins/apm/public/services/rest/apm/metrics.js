"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const callApi_1 = require("../callApi");
const get_ui_filters_es_1 = require("../../ui_filters/get_ui_filters_es");
async function loadMetricsChartData({ serviceName, agentName, start, end, uiFilters }) {
    return callApi_1.callApi({
        pathname: `/api/apm/services/${serviceName}/metrics/charts`,
        query: {
            start,
            end,
            agentName,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadMetricsChartData = loadMetricsChartData;
