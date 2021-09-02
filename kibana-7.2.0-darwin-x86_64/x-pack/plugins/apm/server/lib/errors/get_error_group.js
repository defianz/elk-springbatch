"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_idx_1 = require("@kbn/elastic-idx");
const elasticsearch_fieldnames_1 = require("../../../common/elasticsearch_fieldnames");
const range_filter_1 = require("../helpers/range_filter");
const get_transaction_1 = require("../transactions/get_transaction");
// TODO: rename from "getErrorGroup"  to "getErrorGroupSample" (since a single error is returned, not an errorGroup)
async function getErrorGroup({ serviceName, groupId, setup }) {
    const { start, end, uiFiltersES, client, config } = setup;
    const params = {
        index: config.get('apm_oss.errorIndices'),
        body: {
            size: 1,
            query: {
                bool: {
                    filter: [
                        { term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName } },
                        { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'error' } },
                        { term: { [elasticsearch_fieldnames_1.ERROR_GROUP_ID]: groupId } },
                        { range: range_filter_1.rangeFilter(start, end) },
                        ...uiFiltersES
                    ],
                    should: [{ term: { [elasticsearch_fieldnames_1.TRANSACTION_SAMPLED]: true } }]
                }
            },
            sort: [
                { _score: 'desc' },
                { '@timestamp': { order: 'desc' } } // sort by timestamp to get the most recent error
            ]
        }
    };
    const resp = await client('search', params);
    const error = elastic_idx_1.idx(resp, _ => _.hits.hits[0]._source);
    const transactionId = elastic_idx_1.idx(error, _ => _.transaction.id);
    const traceId = elastic_idx_1.idx(error, _ => _.trace.id);
    let transaction;
    if (transactionId && traceId) {
        transaction = await get_transaction_1.getTransaction(transactionId, traceId, setup);
    }
    return {
        transaction,
        error,
        occurrencesCount: resp.hits.total
    };
}
exports.getErrorGroup = getErrorGroup;
