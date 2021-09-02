"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const elasticsearch_fieldnames_1 = require("../../../../../../common/elasticsearch_fieldnames");
const metrics_1 = require("../../../../helpers/metrics");
const range_filter_1 = require("../../../../helpers/range_filter");
async function fetch(setup, serviceName) {
    const { start, end, uiFiltersES, client, config } = setup;
    const aggs = {
        nonHeapMemoryMax: { avg: { field: elasticsearch_fieldnames_1.METRIC_JAVA_NON_HEAP_MEMORY_MAX } },
        nonHeapMemoryCommitted: {
            avg: { field: elasticsearch_fieldnames_1.METRIC_JAVA_NON_HEAP_MEMORY_COMMITTED }
        },
        nonHeapMemoryUsed: {
            avg: { field: elasticsearch_fieldnames_1.METRIC_JAVA_NON_HEAP_MEMORY_USED }
        }
    };
    const params = {
        index: config.get('apm_oss.metricsIndices'),
        body: {
            size: 0,
            query: {
                bool: {
                    filter: [
                        { term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName } },
                        { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'metric' } },
                        { term: { [elasticsearch_fieldnames_1.SERVICE_AGENT_NAME]: 'java' } },
                        {
                            range: range_filter_1.rangeFilter(start, end)
                        },
                        ...uiFiltersES
                    ]
                }
            },
            aggs: {
                timeseriesData: {
                    date_histogram: metrics_1.getMetricsDateHistogramParams(start, end),
                    aggs
                },
                ...aggs
            }
        }
    };
    return client('search', params);
}
exports.fetch = fetch;
