"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importDefault(require("react"));
const useTransactionList_1 = require("../../../hooks/useTransactionList");
const useTransactionOverviewCharts_1 = require("../../../hooks/useTransactionOverviewCharts");
const TransactionCharts_1 = require("../../shared/charts/TransactionCharts");
const url_helpers_1 = require("../../shared/Links/url_helpers");
const List_1 = require("./List");
const useRedirect_1 = require("./useRedirect");
const useFetcher_1 = require("../../../hooks/useFetcher");
const ml_1 = require("../../../services/rest/ml");
const history_1 = require("../../../utils/history");
const useLocation_1 = require("../../../hooks/useLocation");
function getRedirectLocation({ urlParams, location, serviceTransactionTypes }) {
    const { serviceName, transactionType } = urlParams;
    const firstTransactionType = lodash_1.first(serviceTransactionTypes);
    if (!transactionType && firstTransactionType) {
        return {
            ...location,
            pathname: `/${serviceName}/transactions/${firstTransactionType}`
        };
    }
}
function TransactionOverview({ urlParams, serviceTransactionTypes }) {
    const location = useLocation_1.useLocation();
    const { serviceName, transactionType } = urlParams;
    // redirect to first transaction type
    useRedirect_1.useRedirect(history_1.history, getRedirectLocation({
        urlParams,
        location,
        serviceTransactionTypes
    }));
    const { data: transactionOverviewCharts } = useTransactionOverviewCharts_1.useTransactionOverviewCharts(urlParams);
    // TODO: improve urlParams typings.
    // `serviceName` or `transactionType` will never be undefined here, and this check should not be needed
    if (!serviceName || !transactionType) {
        return null;
    }
    const { data: transactionListData } = useTransactionList_1.useTransactionList(urlParams);
    const { data: hasMLJob = false } = useFetcher_1.useFetcher(() => ml_1.getHasMLJob({ serviceName, transactionType }), [serviceName, transactionType]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        serviceTransactionTypes.length > 1 ? (react_1.default.createElement(eui_1.EuiFormRow, { id: "transaction-type-select-row", label: i18n_1.i18n.translate('xpack.apm.transactionsTable.filterByTypeLabel', {
                defaultMessage: 'Filter by type'
            }) },
            react_1.default.createElement(eui_1.EuiSelect, { options: serviceTransactionTypes.map(type => ({
                    text: `${type}`,
                    value: type
                })), value: transactionType, onChange: event => {
                    const type = url_helpers_1.legacyEncodeURIComponent(event.target.value);
                    history_1.history.push({
                        ...location,
                        pathname: `/${urlParams.serviceName}/transactions/${type}`
                    });
                } }))) : null,
        react_1.default.createElement(TransactionCharts_1.TransactionCharts, { hasMLJob: hasMLJob, charts: transactionOverviewCharts, location: location, urlParams: urlParams }),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(eui_1.EuiPanel, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                react_1.default.createElement("h3", null, "Transactions")),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(List_1.TransactionList, { items: transactionListData, serviceName: serviceName }))));
}
exports.TransactionOverview = TransactionOverview;
