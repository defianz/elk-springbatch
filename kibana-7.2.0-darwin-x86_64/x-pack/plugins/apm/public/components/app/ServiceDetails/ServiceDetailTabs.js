"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const HistoryTabs_1 = require("../../shared/HistoryTabs");
const ErrorGroupOverview_1 = require("../ErrorGroupOverview");
const TransactionOverview_1 = require("../TransactionOverview");
const ServiceMetrics_1 = require("./ServiceMetrics");
const useLocation_1 = require("../../../hooks/useLocation");
function ServiceDetailTabs({ transactionTypes, urlParams, isRumAgent, agentName }) {
    const location = useLocation_1.useLocation();
    const { serviceName } = urlParams;
    const headTransactionType = transactionTypes[0];
    const transactionsTab = {
        name: i18n_1.i18n.translate('xpack.apm.serviceDetails.transactionsTabLabel', {
            defaultMessage: 'Transactions'
        }),
        path: headTransactionType
            ? `/${serviceName}/transactions/${headTransactionType}`
            : `/${serviceName}/transactions`,
        routePath: `/${serviceName}/transactions/:transactionType?`,
        render: () => (react_1.default.createElement(TransactionOverview_1.TransactionOverview, { urlParams: urlParams, serviceTransactionTypes: transactionTypes }))
    };
    const errorsTab = {
        name: i18n_1.i18n.translate('xpack.apm.serviceDetails.errorsTabLabel', {
            defaultMessage: 'Errors'
        }),
        path: `/${serviceName}/errors`,
        render: () => {
            return react_1.default.createElement(ErrorGroupOverview_1.ErrorGroupOverview, { urlParams: urlParams, location: location });
        }
    };
    const metricsTab = {
        name: i18n_1.i18n.translate('xpack.apm.serviceDetails.metricsTabLabel', {
            defaultMessage: 'Metrics'
        }),
        path: `/${serviceName}/metrics`,
        render: () => react_1.default.createElement(ServiceMetrics_1.ServiceMetrics, { urlParams: urlParams, agentName: agentName })
    };
    const tabs = isRumAgent
        ? [transactionsTab, errorsTab]
        : [transactionsTab, errorsTab, metricsTab];
    return react_1.default.createElement(HistoryTabs_1.HistoryTabs, { tabs: tabs });
}
exports.ServiceDetailTabs = ServiceDetailTabs;
