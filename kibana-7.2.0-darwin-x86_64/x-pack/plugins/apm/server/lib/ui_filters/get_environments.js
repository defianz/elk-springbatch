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
const environment_filter_values_1 = require("../../../common/environment_filter_values");
async function getEnvironments(setup, serviceName) {
    const { start, end, client, config } = setup;
    const filter = [
        { terms: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: ['transaction', 'error', 'metric'] } },
        { range: range_filter_1.rangeFilter(start, end) }
    ];
    if (serviceName) {
        filter.push({
            term: { [elasticsearch_fieldnames_1.SERVICE_NAME]: serviceName }
        });
    }
    const params = {
        index: [
            config.get('apm_oss.metricsIndices'),
            config.get('apm_oss.errorIndices'),
            config.get('apm_oss.transactionIndices')
        ],
        body: {
            size: 0,
            query: {
                bool: {
                    filter
                }
            },
            aggs: {
                environments: {
                    terms: {
                        field: elasticsearch_fieldnames_1.SERVICE_ENVIRONMENT,
                        missing: environment_filter_values_1.ENVIRONMENT_NOT_DEFINED
                    }
                }
            }
        }
    };
    const resp = await client('search', params);
    const aggs = resp.aggregations;
    const environmentsBuckets = elastic_idx_1.idx(aggs, _ => _.environments.buckets) || [];
    const environments = environmentsBuckets.map(environmentBucket => environmentBucket.key);
    return environments;
}
exports.getEnvironments = getEnvironments;
