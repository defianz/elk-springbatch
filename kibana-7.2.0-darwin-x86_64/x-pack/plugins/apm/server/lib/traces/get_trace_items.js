"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../common/elasticsearch_fieldnames");
const range_filter_1 = require("../helpers/range_filter");
async function getTraceItems(traceId, setup) {
    const { start, end, client, config } = setup;
    const params = {
        index: [
            config.get('apm_oss.spanIndices'),
            config.get('apm_oss.transactionIndices')
        ],
        body: {
            size: 1000,
            query: {
                bool: {
                    filter: [
                        { term: { [elasticsearch_fieldnames_1.TRACE_ID]: traceId } },
                        { terms: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: ['span', 'transaction'] } },
                        { range: range_filter_1.rangeFilter(start, end) }
                    ]
                }
            }
        }
    };
    const resp = await client('search', params);
    return resp.hits.hits.map(hit => hit._source);
}
exports.getTraceItems = getTraceItems;
