"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../common/elasticsearch_fieldnames");
const range_filter_1 = require("../helpers/range_filter");
async function getTraceErrorsPerTransaction(traceId, setup) {
    const { start, end, client, config } = setup;
    const params = {
        index: [config.get('apm_oss.errorIndices')],
        body: {
            size: 0,
            query: {
                bool: {
                    filter: [
                        { term: { [elasticsearch_fieldnames_1.TRACE_ID]: traceId } },
                        { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'error' } },
                        { range: range_filter_1.rangeFilter(start, end) }
                    ]
                }
            },
            aggs: {
                transactions: {
                    terms: {
                        field: elasticsearch_fieldnames_1.TRANSACTION_ID
                    }
                }
            }
        }
    };
    const resp = await client('search', params);
    return resp.aggregations.transactions.buckets.reduce((acc, bucket) => ({
        ...acc,
        [bucket.key]: bucket.doc_count
    }), {});
}
exports.getTraceErrorsPerTransaction = getTraceErrorsPerTransaction;
