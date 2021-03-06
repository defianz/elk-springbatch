"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../../../common/elasticsearch_fieldnames");
const range_filter_1 = require("../../../helpers/range_filter");
function bucketFetcher(serviceName, transactionName, transactionType, transactionId, traceId, bucketSize, setup) {
    const { start, end, uiFiltersES, client, config } = setup;
    const bucketTargetCount = config.get('xpack.apm.bucketTargetCount');
    const params = {
        index: config.get('apm_oss.transactionIndices'),
        body: {
            size: 0,
            query: {
                bool: {
                    filter: [
                        { term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName } },
                        { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'transaction' } },
                        { term: { [elasticsearch_fieldnames_1.TRANSACTION_TYPE]: transactionType } },
                        { term: { [elasticsearch_fieldnames_1.TRANSACTION_NAME]: transactionName } },
                        { range: range_filter_1.rangeFilter(start, end) },
                        ...uiFiltersES
                    ],
                    should: [
                        { term: { [elasticsearch_fieldnames_1.TRACE_ID]: traceId } },
                        { term: { [elasticsearch_fieldnames_1.TRANSACTION_ID]: transactionId } },
                        { term: { [elasticsearch_fieldnames_1.TRANSACTION_SAMPLED]: true } }
                    ]
                }
            },
            aggs: {
                distribution: {
                    histogram: {
                        field: elasticsearch_fieldnames_1.TRANSACTION_DURATION,
                        interval: bucketSize,
                        min_doc_count: 0,
                        extended_bounds: {
                            min: 0,
                            max: bucketSize * bucketTargetCount
                        }
                    },
                    aggs: {
                        sample: {
                            top_hits: {
                                _source: [elasticsearch_fieldnames_1.TRANSACTION_ID, elasticsearch_fieldnames_1.TRANSACTION_SAMPLED, elasticsearch_fieldnames_1.TRACE_ID],
                                size: 1
                            }
                        }
                    }
                }
            }
        }
    };
    return client('search', params);
}
exports.bucketFetcher = bucketFetcher;
