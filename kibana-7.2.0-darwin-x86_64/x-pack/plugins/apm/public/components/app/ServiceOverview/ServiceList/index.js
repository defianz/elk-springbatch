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
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const i18n_2 = require("../../../../../common/i18n");
const variables_1 = require("../../../../style/variables");
const formatters_1 = require("../../../../utils/formatters");
const APMLink_1 = require("../../../shared/Links/APMLink");
const ManagedTable_1 = require("../../../shared/ManagedTable");
const TruncatedAnchorEuiToolTip_1 = require("./TruncatedAnchorEuiToolTip");
function formatNumber(value) {
    if (value === 0) {
        return '0';
    }
    else if (value <= 0.1) {
        return '< 0.1';
    }
    else {
        return formatters_1.asDecimal(value);
    }
}
function formatString(value) {
    return value || i18n_2.NOT_AVAILABLE_LABEL;
}
const AppLink = styled_components_1.default(APMLink_1.APMLink) `
  font-size: ${variables_1.fontSizes.large};
  ${variables_1.truncate('100%')};
`;
exports.SERVICE_COLUMNS = [
    {
        field: 'serviceName',
        name: i18n_1.i18n.translate('xpack.apm.servicesTable.nameColumnLabel', {
            defaultMessage: 'Name'
        }),
        width: '40%',
        sortable: true,
        render: (serviceName) => (react_1.default.createElement(eui_1.EuiToolTip, { content: formatString(serviceName), id: "service-name-tooltip" },
            react_1.default.createElement(AppLink, { path: `/${serviceName}/transactions` }, formatString(serviceName))))
    },
    {
        field: 'environments',
        name: i18n_1.i18n.translate('xpack.apm.servicesTable.environmentColumnLabel', {
            defaultMessage: 'Environment'
        }),
        width: '20%',
        sortable: true,
        render: (environments) => (react_1.default.createElement(TruncatedAnchorEuiToolTip_1.TruncatedAnchorEuiToolTip, { id: "service-environments-tooltip", content: environments.map(env => (react_1.default.createElement(react_1.default.Fragment, { key: env },
                env,
                react_1.default.createElement("br", null)))) },
            react_1.default.createElement(react_1.default.Fragment, null, environments.join(', '))))
    },
    {
        field: 'agentName',
        name: i18n_1.i18n.translate('xpack.apm.servicesTable.agentColumnLabel', {
            defaultMessage: 'Agent'
        }),
        sortable: true,
        render: (agentName) => formatString(agentName)
    },
    {
        field: 'avgResponseTime',
        name: i18n_1.i18n.translate('xpack.apm.servicesTable.avgResponseTimeColumnLabel', {
            defaultMessage: 'Avg. response time'
        }),
        sortable: true,
        dataType: 'number',
        render: (value) => formatters_1.asMillis(value)
    },
    {
        field: 'transactionsPerMinute',
        name: i18n_1.i18n.translate('xpack.apm.servicesTable.transactionsPerMinuteColumnLabel', {
            defaultMessage: 'Trans. per minute'
        }),
        sortable: true,
        dataType: 'number',
        render: (value) => `${formatNumber(value)} ${i18n_1.i18n.translate('xpack.apm.servicesTable.transactionsPerMinuteUnitLabel', {
            defaultMessage: 'tpm'
        })}`
    },
    {
        field: 'errorsPerMinute',
        name: i18n_1.i18n.translate('xpack.apm.servicesTable.errorsPerMinuteColumnLabel', {
            defaultMessage: 'Errors per minute'
        }),
        sortable: true,
        dataType: 'number',
        render: (value) => `${formatNumber(value)} ${i18n_1.i18n.translate('xpack.apm.servicesTable.errorsPerMinuteUnitLabel', {
            defaultMessage: 'err.'
        })}`
    }
];
function ServiceList({ items = [], noItemsMessage }) {
    return (react_1.default.createElement(ManagedTable_1.ManagedTable, { columns: exports.SERVICE_COLUMNS, items: items, noItemsMessage: noItemsMessage, initialSort: { field: 'serviceName', direction: 'asc' }, initialPageSize: 50 }));
}
exports.ServiceList = ServiceList;
