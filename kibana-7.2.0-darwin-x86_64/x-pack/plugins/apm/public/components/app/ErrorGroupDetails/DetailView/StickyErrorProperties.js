"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importStar(require("react"));
const elastic_idx_1 = require("@kbn/elastic-idx");
const elasticsearch_fieldnames_1 = require("../../../../../common/elasticsearch_fieldnames");
const i18n_2 = require("../../../../../common/i18n");
const APMLink_1 = require("../../../shared/Links/APMLink");
const url_helpers_1 = require("../../../shared/Links/url_helpers");
const StickyProperties_1 = require("../../../shared/StickyProperties");
function TransactionLink({ transaction }) {
    if (!transaction) {
        return react_1.default.createElement(react_1.Fragment, null, i18n_2.NOT_AVAILABLE_LABEL);
    }
    const isSampled = transaction.transaction.sampled;
    if (!isSampled) {
        return react_1.default.createElement(react_1.Fragment, null, transaction.transaction.id);
    }
    const path = `/${transaction.service.name}/transactions/${url_helpers_1.legacyEncodeURIComponent(transaction.transaction.type)}/${url_helpers_1.legacyEncodeURIComponent(transaction.transaction.name)}`;
    return (react_1.default.createElement(APMLink_1.APMLink, { path: path, query: {
            transactionId: transaction.transaction.id,
            traceId: transaction.trace.id,
            banana: 'ok'
        } }, transaction.transaction.id));
}
function StickyErrorProperties({ error, transaction }) {
    const stickyProperties = [
        {
            fieldName: '@timestamp',
            label: i18n_1.i18n.translate('xpack.apm.errorGroupDetails.timestampLabel', {
                defaultMessage: 'Timestamp'
            }),
            val: error['@timestamp'],
            width: '50%'
        },
        {
            fieldName: elasticsearch_fieldnames_1.URL_FULL,
            label: 'URL',
            val: elastic_idx_1.idx(error, _ => _.context.page.url) ||
                elastic_idx_1.idx(error, _ => _.url.full) ||
                i18n_2.NOT_AVAILABLE_LABEL,
            truncated: true,
            width: '50%'
        },
        {
            fieldName: elasticsearch_fieldnames_1.HTTP_REQUEST_METHOD,
            label: i18n_1.i18n.translate('xpack.apm.errorGroupDetails.requestMethodLabel', {
                defaultMessage: 'Request method'
            }),
            val: elastic_idx_1.idx(error, _ => _.http.request.method) || i18n_2.NOT_AVAILABLE_LABEL,
            width: '25%'
        },
        {
            fieldName: elasticsearch_fieldnames_1.ERROR_EXC_HANDLED,
            label: i18n_1.i18n.translate('xpack.apm.errorGroupDetails.handledLabel', {
                defaultMessage: 'Handled'
            }),
            val: String(elastic_idx_1.idx(error, _ => _.error.exception[0].handled)) ||
                i18n_2.NOT_AVAILABLE_LABEL,
            width: '25%'
        },
        {
            fieldName: elasticsearch_fieldnames_1.TRANSACTION_ID,
            label: i18n_1.i18n.translate('xpack.apm.errorGroupDetails.transactionSampleIdLabel', {
                defaultMessage: 'Transaction sample ID'
            }),
            val: react_1.default.createElement(TransactionLink, { transaction: transaction }),
            width: '25%'
        },
        {
            fieldName: elasticsearch_fieldnames_1.USER_ID,
            label: i18n_1.i18n.translate('xpack.apm.errorGroupDetails.userIdLabel', {
                defaultMessage: 'User ID'
            }),
            val: elastic_idx_1.idx(error, _ => _.user.id) || i18n_2.NOT_AVAILABLE_LABEL,
            width: '25%'
        }
    ];
    return react_1.default.createElement(StickyProperties_1.StickyProperties, { stickyProperties: stickyProperties });
}
exports.StickyErrorProperties = StickyErrorProperties;
