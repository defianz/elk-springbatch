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
const elastic_idx_1 = require("@kbn/elastic-idx");
const elasticsearch_fieldnames_1 = require("../../../../../common/elasticsearch_fieldnames");
const i18n_2 = require("../../../../../common/i18n");
const formatters_1 = require("../../../../utils/formatters");
const StickyProperties_1 = require("../../../shared/StickyProperties");
const ErrorCountBadge_1 = require("./ErrorCountBadge");
function StickyTransactionProperties({ transaction, totalDuration, errorCount }) {
    const timestamp = transaction['@timestamp'];
    const url = elastic_idx_1.idx(transaction, _ => _.context.page.url) ||
        elastic_idx_1.idx(transaction, _ => _.url.full) ||
        i18n_2.NOT_AVAILABLE_LABEL;
    const duration = transaction.transaction.duration.us;
    const noErrorsText = i18n_1.i18n.translate('xpack.apm.transactionDetails.errorsNone', {
        defaultMessage: 'None'
    });
    const stickyProperties = [
        {
            label: i18n_1.i18n.translate('xpack.apm.transactionDetails.timestampLabel', {
                defaultMessage: 'Timestamp'
            }),
            fieldName: '@timestamp',
            val: timestamp,
            truncated: true,
            width: '50%'
        },
        {
            fieldName: elasticsearch_fieldnames_1.URL_FULL,
            label: 'URL',
            val: url,
            truncated: true,
            width: '50%'
        },
        {
            label: i18n_1.i18n.translate('xpack.apm.transactionDetails.durationLabel', {
                defaultMessage: 'Duration'
            }),
            fieldName: elasticsearch_fieldnames_1.TRANSACTION_DURATION,
            val: formatters_1.asTime(duration),
            width: '25%'
        },
        {
            label: i18n_1.i18n.translate('xpack.apm.transactionDetails.percentOfTraceLabel', {
                defaultMessage: '% of trace'
            }),
            val: formatters_1.asPercent(duration, totalDuration, i18n_2.NOT_AVAILABLE_LABEL),
            width: '25%'
        },
        {
            label: i18n_1.i18n.translate('xpack.apm.transactionDetails.resultLabel', {
                defaultMessage: 'Result'
            }),
            fieldName: elasticsearch_fieldnames_1.TRANSACTION_RESULT,
            val: elastic_idx_1.idx(transaction, _ => _.transaction.result) || i18n_2.NOT_AVAILABLE_LABEL,
            width: '14%'
        },
        {
            label: i18n_1.i18n.translate('xpack.apm.transactionDetails.errorsOverviewLabel', {
                defaultMessage: 'Errors'
            }),
            val: errorCount ? (react_1.default.createElement(ErrorCountBadge_1.ErrorCountBadge, { errorCount: errorCount, transaction: transaction, verbose: true })) : (noErrorsText),
            width: '18%'
        },
        {
            label: i18n_1.i18n.translate('xpack.apm.transactionDetails.userIdLabel', {
                defaultMessage: 'User ID'
            }),
            fieldName: elasticsearch_fieldnames_1.USER_ID,
            val: elastic_idx_1.idx(transaction, _ => _.user.id) || i18n_2.NOT_AVAILABLE_LABEL,
            truncated: true,
            width: '18%'
        }
    ];
    return react_1.default.createElement(StickyProperties_1.StickyProperties, { stickyProperties: stickyProperties });
}
exports.StickyTransactionProperties = StickyTransactionProperties;
