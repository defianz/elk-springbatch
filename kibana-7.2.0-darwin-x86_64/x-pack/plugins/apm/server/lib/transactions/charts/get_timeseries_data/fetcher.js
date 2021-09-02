"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_fieldnames_1 = require("../../../../../common/elasticsearch_fieldnames");
const get_bucket_size_1 = require("../../../helpers/get_bucket_size");
const range_filter_1 = require("../../../helpers/range_filter");
function timeseriesFetcher({ serviceName, transactionType, transactionName, setup }) {
    const { start, end, uiFiltersES, client, config } = setup;
    const { intervalString } = get_bucket_size_1.getBucketSize(start, end, 'auto');
    const filter = [
        { term: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: 'transaction' } },
        { term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName } },
        { range: range_filter_1.rangeFilter(start, end) },
        ...uiFiltersES
    ];
    if (transactionName) {
        filter.push({ term: { [elasticsearch_fieldnames_1.TRANSACTION_NAME]: transactionName } });
    }
    // TODO reimplement these as uiFilters
    if (transactionType) {
        filter.push({ term: { [elasticsearch_fieldnames_1.TRANSACTION_TYPE]: transactionType } });
    }
    const params = {
        index: config.get('apm_oss.transactionIndices'),
        body: {
            size: 0,
            query: { bool: { filter } },
            aggs: {
                response_times: {
                    date_histogram: {
                        field: '@timestamp',
                        interval: intervalString,
                        min_doc_count: 0,
                        extended_bounds: { min: start, max: end }
                    },
                    aggs: {
                        avg: { avg: { field: elasticsearch_fieldnames_1.TRANSACTION_DURATION } },
                        pct: {
                            percentiles: { field: elasticsearch_fieldnames_1.TRANSACTION_DURATION, percents: [95, 99] }
                        }
                    }
                },
                overall_avg_duration: { avg: { field: elasticsearch_fieldnames_1.TRANSACTION_DURATION } },
                transaction_results: {
                    terms: { field: elasticsearch_fieldnames_1.TRANSACTION_RESULT, missing: '' },
                    aggs: {
                        timeseries: {
                            date_histogram: {
                                field: '@timestamp',
                                interval: intervalString,
                                min_doc_count: 0,
                                extended_bounds: { min: start, max: end }
                            }
                        }
                    }
                }
            }
        }
    };
    return client('search', params);
}
exports.timeseriesFetcher = timeseriesFetcher;
