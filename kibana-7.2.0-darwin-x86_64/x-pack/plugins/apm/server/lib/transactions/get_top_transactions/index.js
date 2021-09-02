"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../../common/elasticsearch_fieldnames");
const range_filter_1 = require("../../helpers/range_filter");
const transaction_groups_1 = require("../../transaction_groups");
async function getTopTransactions({ setup, transactionType, serviceName }) {
    const { start, end, uiFiltersES } = setup;
    const bodyQuery = {
        bool: {
            filter: [
                { term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName } },
                { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'transaction' } },
                { range: range_filter_1.rangeFilter(start, end) },
                ...uiFiltersES
            ]
        }
    };
    if (transactionType) {
        bodyQuery.bool.filter.push({
            term: { [elasticsearch_fieldnames_1.TRANSACTION_TYPE]: transactionType }
        });
    }
    return transaction_groups_1.getTransactionGroups(setup, bodyQuery);
}
exports.getTopTransactions = getTopTransactions;
