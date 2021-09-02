"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_groups_1 = require("../services/rest/apm/transaction_groups");
const useFetcher_1 = require("./useFetcher");
const UrlParamsContext_1 = require("../context/UrlParamsContext");
const INITIAL_DATA = {
    buckets: [],
    totalHits: 0,
    bucketSize: 0,
    defaultSample: undefined
};
function useTransactionDistribution(urlParams) {
    const { serviceName, start, end, transactionType, transactionId, traceId, transactionName } = urlParams;
    const uiFilters = UrlParamsContext_1.useUiFilters(urlParams);
    const { data = INITIAL_DATA, status, error } = useFetcher_1.useFetcher(() => {
        if (serviceName && start && end && transactionType && transactionName) {
            return transaction_groups_1.loadTransactionDistribution({
                serviceName,
                start,
                end,
                transactionType,
                transactionName,
                transactionId,
                traceId,
                uiFilters
            });
        }
    }, [
        serviceName,
        start,
        end,
        transactionType,
        transactionName,
        transactionId,
        traceId,
        uiFilters
    ]);
    return { data, status, error };
}
exports.useTransactionDistribution = useTransactionDistribution;
