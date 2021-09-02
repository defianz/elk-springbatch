"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const callApi_1 = require("../callApi");
const get_ui_filters_es_1 = require("../../ui_filters/get_ui_filters_es");
async function loadTransactionList({ serviceName, start, end, uiFilters, transactionType }) {
    return await callApi_1.callApi({
        pathname: `/api/apm/services/${serviceName}/transaction_groups/${transactionType}`,
        query: {
            start,
            end,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadTransactionList = loadTransactionList;
async function loadTransactionDistribution({ serviceName, start, end, transactionName, transactionType, transactionId, traceId, uiFilters }) {
    return callApi_1.callApi({
        pathname: `/api/apm/services/${serviceName}/transaction_groups/${transactionType}/${encodeURIComponent(transactionName)}/distribution`,
        query: {
            start,
            end,
            transactionId,
            traceId,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadTransactionDistribution = loadTransactionDistribution;
async function loadTransactionDetailsCharts({ serviceName, start, end, uiFilters, transactionType, transactionName }) {
    return callApi_1.callApi({
        pathname: `/api/apm/services/${serviceName}/transaction_groups/${transactionType}/${encodeURIComponent(transactionName)}/charts`,
        query: {
            start,
            end,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadTransactionDetailsCharts = loadTransactionDetailsCharts;
async function loadTransactionOverviewCharts({ serviceName, start, end, uiFilters, transactionType }) {
    const pathname = transactionType
        ? `/api/apm/services/${serviceName}/transaction_groups/${transactionType}/charts`
        : `/api/apm/services/${serviceName}/transaction_groups/charts`;
    return callApi_1.callApi({
        pathname,
        query: {
            start,
            end,
            uiFiltersES: await get_ui_filters_es_1.getUiFiltersES(uiFilters)
        }
    });
}
exports.loadTransactionOverviewCharts = loadTransactionOverviewCharts;
