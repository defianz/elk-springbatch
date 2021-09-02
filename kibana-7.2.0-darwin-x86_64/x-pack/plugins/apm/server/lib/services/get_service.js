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
async function getService(serviceName, setup) {
    const { start, end, uiFiltersES, client, config } = setup;
    const params = {
        index: [
            config.get('apm_oss.errorIndices'),
            config.get('apm_oss.transactionIndices')
        ],
        body: {
            size: 0,
            query: {
                bool: {
                    filter: [
                        { term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName } },
                        { terms: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: ['error', 'transaction'] } },
                        { range: range_filter_1.rangeFilter(start, end) },
                        ...uiFiltersES
                    ]
                }
            },
            aggs: {
                types: {
                    terms: { field: elasticsearch_fieldnames_1.TRANSACTION_TYPE, size: 100 }
                },
                agents: {
                    terms: { field: elasticsearch_fieldnames_1.SERVICE_AGENT_NAME, size: 1 }
                }
            }
        }
    };
    const { aggregations } = await client('search', params);
    const buckets = elastic_idx_1.idx(aggregations, _ => _.types.buckets) || [];
    const types = buckets.map(bucket => bucket.key);
    const agentName = elastic_idx_1.idx(aggregations, _ => _.agents.buckets[0].key);
    return {
        serviceName,
        types,
        agentName
    };
}
exports.getService = getService;
