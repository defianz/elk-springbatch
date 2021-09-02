"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../common/elasticsearch_fieldnames");
const range_filter_1 = require("../helpers/range_filter");
const transaction_groups_1 = require("../transaction_groups");
async function getTopTraces(setup) {
    const { start, end, uiFiltersES } = setup;
    const bodyQuery = {
        bool: {
            // no parent ID means this transaction is a "root" transaction, i.e. a trace
            must_not: { exists: { field: elasticsearch_fieldnames_1.PARENT_ID } },
            filter: [
                { range: range_filter_1.rangeFilter(start, end) },
                { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'transaction' } },
                ...uiFiltersES
            ],
            should: [{ term: { [elasticsearch_fieldnames_1.TRANSACTION_SAMPLED]: true } }]
        }
    };
    return transaction_groups_1.getTransactionGroups(setup, bodyQuery);
}
exports.getTopTraces = getTopTraces;
