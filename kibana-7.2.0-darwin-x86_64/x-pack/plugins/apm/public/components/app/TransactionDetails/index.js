"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const useTransactionDetailsCharts_1 = require("../../../hooks/useTransactionDetailsCharts");
const useTransactionDistribution_1 = require("../../../hooks/useTransactionDistribution");
const useWaterfall_1 = require("../../../hooks/useWaterfall");
const TransactionCharts_1 = require("../../shared/charts/TransactionCharts");
const ApmHeader_1 = require("../../shared/ApmHeader");
const Distribution_1 = require("./Distribution");
const Transaction_1 = require("./Transaction");
const useLocation_1 = require("../../../hooks/useLocation");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
const useFetcher_1 = require("../../../hooks/useFetcher");
function TransactionDetails() {
    const location = useLocation_1.useLocation();
    const { urlParams } = useUrlParams_1.useUrlParams();
    const { data: distributionData, status: distributionStatus } = useTransactionDistribution_1.useTransactionDistribution(urlParams);
    const { data: transactionDetailsChartsData } = useTransactionDetailsCharts_1.useTransactionDetailsCharts(urlParams);
    const { data: waterfall } = useWaterfall_1.useWaterfall(urlParams);
    const transaction = waterfall.getTransactionById(urlParams.transactionId);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(ApmHeader_1.ApmHeader, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "l" },
                react_1.default.createElement("h1", null, urlParams.transactionName))),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(TransactionCharts_1.TransactionCharts, { hasMLJob: false, charts: transactionDetailsChartsData, urlParams: urlParams, location: location }),
        react_1.default.createElement(eui_1.EuiHorizontalRule, { size: "full", margin: "l" }),
        react_1.default.createElement(eui_1.EuiPanel, null,
            react_1.default.createElement(Distribution_1.TransactionDistribution, { distribution: distributionData, loading: distributionStatus === useFetcher_1.FETCH_STATUS.LOADING ||
                    distributionStatus === undefined, urlParams: urlParams })),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        transaction && (react_1.default.createElement(Transaction_1.Transaction, { location: location, transaction: transaction, urlParams: urlParams, waterfall: waterfall }))));
}
exports.TransactionDetails = TransactionDetails;
