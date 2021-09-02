"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const query_helpers_1 = require("./query_helpers");
const response_helpers_1 = require("./response_helpers");
const constants_2 = require("../constants");
class InfraSnapshot {
    constructor(libs) {
        this.libs = libs;
    }
    async getNodes(request, options) {
        // Both requestGroupedNodes and requestNodeMetrics may send several requests to elasticsearch
        // in order to page through the results of their respective composite aggregations.
        // Both chains of requests are supposed to run in parallel, and their results be merged
        // when they have both been completed.
        const groupedNodesPromise = requestGroupedNodes(request, options, this.libs.framework);
        const nodeMetricsPromise = requestNodeMetrics(request, options, this.libs.framework);
        const groupedNodeBuckets = await groupedNodesPromise;
        const nodeMetricBuckets = await nodeMetricsPromise;
        return mergeNodeBuckets(groupedNodeBuckets, nodeMetricBuckets, options);
    }
}
exports.InfraSnapshot = InfraSnapshot;
const requestGroupedNodes = async (request, options, framework) => {
    const query = {
        allowNoIndices: true,
        index: `${options.sourceConfiguration.logAlias},${options.sourceConfiguration.metricAlias}`,
        ignoreUnavailable: true,
        body: {
            query: {
                bool: {
                    filter: [
                        ...createQueryFilterClauses(options.filterQuery),
                        {
                            range: {
                                [options.sourceConfiguration.fields.timestamp]: {
                                    gte: options.timerange.from,
                                    lte: options.timerange.to,
                                    format: 'epoch_millis',
                                },
                            },
                        },
                    ],
                },
            },
            size: 0,
            aggregations: {
                nodes: {
                    composite: {
                        size: constants_1.SNAPSHOT_COMPOSITE_REQUEST_SIZE,
                        sources: query_helpers_1.getGroupedNodesSources(options),
                    },
                    aggs: {
                        ip: {
                            top_hits: {
                                sort: [{ [options.sourceConfiguration.fields.timestamp]: { order: 'desc' } }],
                                _source: {
                                    includes: [constants_2.IP_FIELDS[options.nodeType]],
                                },
                                size: 1,
                            },
                        },
                    },
                },
            },
        },
    };
    return await getAllCompositeAggregationData(framework, request, query);
};
const requestNodeMetrics = async (request, options, framework) => {
    const index = options.metric.type === 'logRate'
        ? `${options.sourceConfiguration.logAlias}`
        : `${options.sourceConfiguration.metricAlias}`;
    const query = {
        allowNoIndices: true,
        index,
        ignoreUnavailable: true,
        body: {
            query: {
                bool: {
                    filter: [
                        {
                            range: {
                                [options.sourceConfiguration.fields.timestamp]: {
                                    gte: options.timerange.from,
                                    lte: options.timerange.to,
                                    format: 'epoch_millis',
                                },
                            },
                        },
                    ],
                },
            },
            size: 0,
            aggregations: {
                nodes: {
                    composite: {
                        size: constants_1.SNAPSHOT_COMPOSITE_REQUEST_SIZE,
                        sources: query_helpers_1.getMetricsSources(options),
                    },
                    aggregations: {
                        histogram: {
                            date_histogram: {
                                field: options.sourceConfiguration.fields.timestamp,
                                interval: options.timerange.interval || '1m',
                                offset: query_helpers_1.getDateHistogramOffset(options),
                                extended_bounds: {
                                    min: options.timerange.from,
                                    max: options.timerange.to,
                                },
                            },
                            aggregations: query_helpers_1.getMetricsAggregations(options),
                        },
                    },
                },
            },
        },
    };
    return await getAllCompositeAggregationData(framework, request, query);
};
const getAllCompositeAggregationData = async (framework, request, query, previousBuckets = []) => {
    const response = await framework.callWithRequest(request, 'search', query);
    // Nothing available, return the previous buckets.
    if (response.hits.total.value === 0) {
        return previousBuckets;
    }
    // if ES doesn't return an aggregations key, something went seriously wrong.
    if (!response.aggregations) {
        throw new Error('Whoops!, `aggregations` key must always be returned.');
    }
    const currentBuckets = response.aggregations.nodes.buckets;
    // if there are no currentBuckets then we are finished paginating through the results
    if (currentBuckets.length === 0) {
        return previousBuckets;
    }
    // There is possibly more data, concat previous and current buckets and call ourselves recursively.
    const newQuery = { ...query };
    newQuery.body.aggregations.nodes.composite.after = response.aggregations.nodes.after_key;
    return getAllCompositeAggregationData(framework, request, query, previousBuckets.concat(currentBuckets));
};
const mergeNodeBuckets = (nodeGroupByBuckets, nodeMetricsBuckets, options) => {
    const nodeMetricsForLookup = response_helpers_1.getNodeMetricsForLookup(nodeMetricsBuckets);
    return nodeGroupByBuckets.map(node => {
        return {
            path: response_helpers_1.getNodePath(node, options),
            metric: response_helpers_1.getNodeMetrics(nodeMetricsForLookup[node.key.id], options),
        };
    });
};
const createQueryFilterClauses = (filterQuery) => filterQuery ? [filterQuery] : [];
