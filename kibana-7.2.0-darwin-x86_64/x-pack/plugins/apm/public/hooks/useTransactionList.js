"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const transaction_groups_1 = require("../services/rest/apm/transaction_groups");
const UrlParamsContext_1 = require("../context/UrlParamsContext");
const useFetcher_1 = require("./useFetcher");
const getRelativeImpact = (impact, impactMin, impactMax) => Math.max(((impact - impactMin) / Math.max(impactMax - impactMin, 1)) * 100, 1);
function getWithRelativeImpact(items) {
    const impacts = items.map(({ impact }) => impact);
    const impactMin = Math.min(...impacts);
    const impactMax = Math.max(...impacts);
    return items.map(item => {
        return {
            ...item,
            impactRelative: getRelativeImpact(item.impact, impactMin, impactMax)
        };
    });
}
function useTransactionList(urlParams) {
    const { serviceName, transactionType, start, end } = urlParams;
    const uiFilters = UrlParamsContext_1.useUiFilters(urlParams);
    const { data = [], error, status } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end && transactionType) {
            return transaction_groups_1.loadTransactionList({
                serviceName,
                start,
                end,
                transactionType,
                uiFilters
            });
        }
    }, [serviceName, start, end, transactionType, uiFilters]);
    const memoizedData = react_1.useMemo(() => getWithRelativeImpact(data), [data]);
    return {
        data: memoizedData,
        status,
        error
    };
}
exports.useTransactionList = useTransactionList;
