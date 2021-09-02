"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const transaction_groups_1 = require("../services/rest/apm/transaction_groups");
const chartSelectors_1 = require("../selectors/chartSelectors");
const UrlParamsContext_1 = require("../context/UrlParamsContext");
const useFetcher_1 = require("./useFetcher");
function useTransactionDetailsCharts(urlParams) {
    const { serviceName, transactionType, start, end, transactionName } = urlParams;
    const uiFilters = UrlParamsContext_1.useUiFilters(urlParams);
    const { data, error, status } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end && transactionName && transactionType) {
            return transaction_groups_1.loadTransactionDetailsCharts({
                serviceName,
                start,
                end,
                transactionName,
                transactionType,
                uiFilters
            });
        }
    }, [serviceName, start, end, transactionName, transactionType, uiFilters]);
    const memoizedData = react_1.useMemo(() => chartSelectors_1.getTransactionCharts(urlParams, data), [
        data
    ]);
    return {
        data: memoizedData,
        status,
        error
    };
}
exports.useTransactionDetailsCharts = useTransactionDetailsCharts;
