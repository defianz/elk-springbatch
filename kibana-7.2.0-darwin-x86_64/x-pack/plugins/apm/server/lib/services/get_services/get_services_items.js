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
async function getServicesItems(setup) {
    const { start, end, uiFiltersES, client, config } = setup;
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
                    filter: [
                        {
                            terms: { [elasticsearch_fieldnames_1.PROCESSOR_EVENT]: ['transaction', 'error', 'metric'] }
                        },
                        { range: range_filter_1.rangeFilter(start, end) },
                        ...uiFiltersES
                    ]
                }
            },
            aggs: {
                services: {
                    terms: {
                        field: elasticsearch_fieldnames_1.SERVICE_NAME,
                        size: 500
                    },
                    aggs: {
                        avg: {
                            avg: { field: elasticsearch_fieldnames_1.TRANSACTION_DURATION }
                        },
                        agents: {
                            terms: { field: elasticsearch_fieldnames_1.SERVICE_AGENT_NAME, size: 1 }
                        },
                        events: {
                            terms: { field: elasticsearch_fieldnames_1.PROCESSOR_EVENT, size: 2 }
                        },
                        environments: {
                            terms: { field: elasticsearch_fieldnames_1.SERVICE_ENVIRONMENT }
                        }
                    }
                }
            }
        }
    };
    const resp = await client('search', params);
    const aggs = resp.aggregations;
    const serviceBuckets = elastic_idx_1.idx(aggs, _ => _.services.buckets) || [];
    const items = serviceBuckets.map(bucket => {
        const eventTypes = bucket.events.buckets;
        const transactions = eventTypes.find(e => e.key === 'transaction');
        const totalTransactions = elastic_idx_1.idx(transactions, _ => _.doc_count) || 0;
        const errors = eventTypes.find(e => e.key === 'error');
        const totalErrors = elastic_idx_1.idx(errors, _ => _.doc_count) || 0;
        const deltaAsMinutes = (end - start) / 1000 / 60;
        const transactionsPerMinute = totalTransactions / deltaAsMinutes;
        const errorsPerMinute = totalErrors / deltaAsMinutes;
        const environmentsBuckets = bucket.environments.buckets;
        const environments = environmentsBuckets.map(environmentBucket => environmentBucket.key);
        return {
            serviceName: bucket.key,
            agentName: elastic_idx_1.idx(bucket, _ => _.agents.buckets[0].key),
            transactionsPerMinute,
            errorsPerMinute,
            avgResponseTime: bucket.avg.value,
            environments
        };
    });
    return items;
}
exports.getServicesItems = getServicesItems;
