"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../../common/elasticsearch_fieldnames");
const range_filter_1 = require("../../helpers/range_filter");
async function getBuckets({ serviceName, groupId, bucketSize, setup }) {
    const { start, end, uiFiltersES, client, config } = setup;
    const filter = [
        { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'error' } },
        { term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName } },
        { range: range_filter_1.rangeFilter(start, end) },
        ...uiFiltersES
    ];
    if (groupId) {
        filter.push({ term: { [elasticsearch_fieldnames_1.ERROR_GROUP_ID]: groupId } });
    }
    const params = {
        index: config.get('apm_oss.errorIndices'),
        body: {
            size: 0,
            query: {
                bool: {
                    filter
                }
            },
            aggs: {
                distribution: {
                    histogram: {
                        field: '@timestamp',
                        min_doc_count: 0,
                        interval: bucketSize,
                        extended_bounds: {
                            min: start,
                            max: end
                        }
                    }
                }
            }
        }
    };
    const resp = await client('search', params);
    const buckets = resp.aggregations.distribution.buckets.map(bucket => ({
        key: bucket.key,
        count: bucket.doc_count
    }));
    return {
        totalHits: resp.hits.total,
        buckets
    };
}
exports.getBuckets = getBuckets;
