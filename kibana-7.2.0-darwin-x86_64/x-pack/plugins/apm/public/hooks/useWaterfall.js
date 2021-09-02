"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const waterfall_helpers_1 = require("../components/app/TransactionDetails/Transaction/WaterfallContainer/Waterfall/waterfall_helpers/waterfall_helpers");
const traces_1 = require("../services/rest/apm/traces");
const useFetcher_1 = require("./useFetcher");
const INITIAL_DATA = { trace: [], errorsPerTransaction: {} };
function useWaterfall(urlParams) {
    const { traceId, start, end, transactionId } = urlParams;
    const { data = INITIAL_DATA, status, error } = useFetcher_1.useFetcher(() => {
        if (traceId && start && end) {
            return traces_1.loadTrace({ traceId, start, end });
        }
    }, [traceId, start, end]);
    const waterfall = react_1.useMemo(() => waterfall_helpers_1.getWaterfall(data, transactionId), [
        data,
        transactionId
    ]);
    return { data: waterfall, status, error };
}
exports.useWaterfall = useWaterfall;
