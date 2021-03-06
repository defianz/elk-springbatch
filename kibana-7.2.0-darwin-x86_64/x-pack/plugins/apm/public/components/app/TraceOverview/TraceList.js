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
const variables_1 = require("../../../style/variables");
const formatters_1 = require("../../../utils/formatters");
const EmptyMessage_1 = require("../../shared/EmptyMessage");
const ImpactBar_1 = require("../../shared/ImpactBar");
const TransactionLink_1 = require("../../shared/Links/TransactionLink");
const ManagedTable_1 = require("../../shared/ManagedTable");
const StyledTransactionLink = styled_components_1.default(TransactionLink_1.TransactionLink) `
  font-size: ${variables_1.fontSizes.large};
  ${variables_1.truncate('100%')};
`;
const traceListColumns = [
    {
        field: 'name',
        name: i18n_1.i18n.translate('xpack.apm.tracesTable.nameColumnLabel', {
            defaultMessage: 'Name'
        }),
        width: '40%',
        sortable: true,
        render: (name, group) => (react_1.default.createElement(eui_1.EuiToolTip, { id: "trace-transaction-link-tooltip", content: name },
            react_1.default.createElement(StyledTransactionLink, { transaction: group.sample }, name)))
    },
    {
        field: 'sample.service.name',
        name: i18n_1.i18n.translate('xpack.apm.tracesTable.originatingServiceColumnLabel', {
            defaultMessage: 'Originating service'
        }),
        sortable: true
    },
    {
        field: 'averageResponseTime',
        name: i18n_1.i18n.translate('xpack.apm.tracesTable.avgResponseTimeColumnLabel', {
            defaultMessage: 'Avg. response time'
        }),
        sortable: true,
        dataType: 'number',
        render: (value) => formatters_1.asMillis(value)
    },
    {
        field: 'transactionsPerMinute',
        name: i18n_1.i18n.translate('xpack.apm.tracesTable.tracesPerMinuteColumnLabel', {
            defaultMessage: 'Traces per minute'
        }),
        sortable: true,
        dataType: 'number',
        render: (value) => `${value.toLocaleString()} ${i18n_1.i18n.translate('xpack.apm.tracesTable.tracesPerMinuteUnitLabel', {
            defaultMessage: 'tpm'
        })}`
    },
    {
        field: 'impact',
        name: i18n_1.i18n.translate('xpack.apm.tracesTable.impactColumnLabel', {
            defaultMessage: 'Impact'
        }),
        width: '20%',
        align: 'right',
        sortable: true,
        render: (value) => react_1.default.createElement(ImpactBar_1.ImpactBar, { value: value })
    }
];
const noItemsMessage = (react_1.default.createElement(EmptyMessage_1.EmptyMessage, { heading: i18n_1.i18n.translate('xpack.apm.tracesTable.notFoundLabel', {
        defaultMessage: 'No traces found for this query'
    }) }));
function TraceList({ items = [], isLoading }) {
    const noItems = isLoading ? null : noItemsMessage;
    return (react_1.default.createElement(ManagedTable_1.ManagedTable, { columns: traceListColumns, items: items, initialSort: { field: 'impact', direction: 'desc' }, noItemsMessage: noItems, initialPageSize: 25 }));
}
exports.TraceList = TraceList;
