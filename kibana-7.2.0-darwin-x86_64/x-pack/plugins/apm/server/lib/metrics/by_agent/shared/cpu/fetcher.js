"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../../../../common/elasticsearch_fieldnames");
const metrics_1 = require("../../../../helpers/metrics");
const range_filter_1 = require("../../../../helpers/range_filter");
async function fetch(setup, serviceName) {
    const { start, end, uiFiltersES, client, config } = setup;
    const aggs = {
        systemCPUAverage: { avg: { field: elasticsearch_fieldnames_1.METRIC_SYSTEM_CPU_PERCENT } },
        systemCPUMax: { max: { field: elasticsearch_fieldnames_1.METRIC_SYSTEM_CPU_PERCENT } },
        processCPUAverage: { avg: { field: elasticsearch_fieldnames_1.METRIC_PROCESS_CPU_PERCENT } },
        processCPUMax: { max: { field: elasticsearch_fieldnames_1.METRIC_PROCESS_CPU_PERCENT } }
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
