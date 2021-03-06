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
const ImpactBar_1 = require("../../../shared/ImpactBar");
const APMLink_1 = require("../../../shared/Links/APMLink");
const url_helpers_1 = require("../../../shared/Links/url_helpers");
const ManagedTable_1 = require("../../../shared/ManagedTable");
const TransactionNameLink = styled_components_1.default(APMLink_1.APMLink) `
  ${variables_1.truncate('100%')};
  font-family: ${variables_1.fontFamilyCode};
`;
function TransactionList({ items, serviceName, ...rest }) {
    const columns = [
        {
            field: 'name',
            name: i18n_1.i18n.translate('xpack.apm.transactionsTable.nameColumnLabel', {
                defaultMessage: 'Name'
            }),
            width: '50%',
            sortable: true,
            render: (transactionName, data) => {
                const encodedType = url_helpers_1.legacyEncodeURIComponent(data.sample.transaction.type);
                const encodedName = url_helpers_1.legacyEncodeURIComponent(transactionName);
                const transactionPath = `/${serviceName}/transactions/${encodedType}/${encodedName}`;
                return (react_1.default.createElement(eui_1.EuiToolTip, { id: "transaction-name-link-tooltip", content: transactionName || i18n_2.NOT_AVAILABLE_LABEL },
                    react_1.default.createElement(TransactionNameLink, { path: transactionPath }, transactionName || i18n_2.NOT_AVAILABLE_LABEL)));
            }
        },
        {
            field: 'averageResponseTime',
            name: i18n_1.i18n.translate('xpack.apm.transactionsTable.avgDurationColumnLabel', {
                defaultMessage: 'Avg. duration'
            }),
            sortable: true,
            dataType: 'number',
            render: (value) => formatters_1.asMillis(value)
        },
        {
            field: 'p95',
            name: i18n_1.i18n.translate('xpack.apm.transactionsTable.95thPercentileColumnLabel', {
                defaultMessage: '95th percentile'
            }),
            sortable: true,
            dataType: 'number',
            render: (value) => formatters_1.asMillis(value)
        },
        {
            field: 'transactionsPerMinute',
            name: i18n_1.i18n.translate('xpack.apm.transactionsTable.transactionsPerMinuteColumnLabel', {
                defaultMessage: 'Trans. per minute'
            }),
            sortable: true,
            dataType: 'number',
            render: (value) => `${formatters_1.asDecimal(value)} ${i18n_1.i18n.translate('xpack.apm.transactionsTable.transactionsPerMinuteUnitLabel', {
                defaultMessage: 'tpm'
            })}`
        },
        {
            field: 'impact',
            name: i18n_1.i18n.translate('xpack.apm.transactionsTable.impactColumnLabel', {
                defaultMessage: 'Impact'
            }),
            sortable: true,
            dataType: 'number',
            render: (value) => react_1.default.createElement(ImpactBar_1.ImpactBar, { value: value })
        }
    ];
    return (react_1.default.createElement(ManagedTable_1.ManagedTable, Object.assign({ columns: columns, items: items, initialSort: { field: 'impact', direction: 'desc' }, initialPageSize: 25 }, rest)));
}
exports.TransactionList = TransactionList;
