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
const elasticsearch_fieldnames_1 = require("../../../../../../../common/elasticsearch_fieldnames");
const APMLink_1 = require("../../../../../shared/Links/APMLink");
const TransactionLink_1 = require("../../../../../shared/Links/TransactionLink");
const StickyProperties_1 = require("../../../../../shared/StickyProperties");
function FlyoutTopLevelProperties({ transaction }) {
    if (!transaction) {
        return null;
    }
    const stickyProperties = [
        {
            label: i18n_1.i18n.translate('xpack.apm.transactionDetails.serviceLabel', {
                defaultMessage: 'Service'
            }),
            fieldName: elasticsearch_fieldnames_1.SERVICE_NAME,
            val: (react_1.default.createElement(APMLink_1.APMLink, { path: `/${transaction.service.name}` }, transaction.service.name)),
            width: '50%'
        },
        {
            label: i18n_1.i18n.translate('xpack.apm.transactionDetails.transactionLabel', {
                defaultMessage: 'Transaction'
            }),
            fieldName: elasticsearch_fieldnames_1.TRANSACTION_NAME,
            val: (react_1.default.createElement(TransactionLink_1.TransactionLink, { transaction: transaction }, transaction.transaction.name)),
            width: '50%'
        }
    ];
    return react_1.default.createElement(StickyProperties_1.StickyProperties, { stickyProperties: stickyProperties });
}
exports.FlyoutTopLevelProperties = FlyoutTopLevelProperties;
