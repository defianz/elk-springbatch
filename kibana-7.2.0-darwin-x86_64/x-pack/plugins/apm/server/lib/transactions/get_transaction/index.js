"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elastic_idx_1 = require("@kbn/elastic-idx");
const elasticsearch_fieldnames_1 = require("../../../../common/elasticsearch_fieldnames");
const range_filter_1 = require("../../helpers/range_filter");
async function getTransaction(transactionId, traceId, setup) {
    const { start, end, uiFiltersES, client, config } = setup;
    const params = {
        index: config.get('apm_oss.transactionIndices'),
        body: {
            size: 1,
            query: {
                bool: {
                    filter: [
                        { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'transaction' } },
                        { term: { [elasticsearch_fieldnames_1.TRANSACTION_ID]: transactionId } },
                        { term: { [elasticsearch_fieldnames_1.TRACE_ID]: traceId } },
                        { range: range_filter_1.rangeFilter(start, end) },
                        ...uiFiltersES
                    ]
                }
            }
        }
    };
    const resp = await client('search', params);
    return elastic_idx_1.idx(resp, _ => _.hits.hits[0]._source);
}
exports.getTransaction = getTransaction;
