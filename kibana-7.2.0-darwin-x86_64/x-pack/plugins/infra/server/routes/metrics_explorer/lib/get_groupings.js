"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
exports.getGroupings = async (search, options) => {
    if (!options.groupBy) {
        return {
            series: [{ id: 'ALL', columns: [], rows: [] }],
            pageInfo: { total: 0, afterKey: null },
        };
    }
    const limit = options.limit || 9;
    const params = {
        index: options.indexPattern,
        body: {
            size: 0,
            query: {
                bool: {
                    filter: [
                        {
                            range: {
                                [options.timerange.field]: {
                                    gte: options.timerange.from,
                                    lte: options.timerange.to,
                                    format: 'epoch_millis',
                                },
                            },
                        },
                        ...options.metrics
                            .filter(m => m.field)
                            .map(m => ({
                            exists: { field: m.field },
                        })),
                    ],
                },
            },
            aggs: {
                groupingsCount: {
                    cardinality: { field: options.groupBy },
                },
                groupings: {
                    composite: {
                        size: limit,
                        sources: [{ groupBy: { terms: { field: options.groupBy, order: 'asc' } } }],
                    },
                },
            },
        },
    };
    if (options.afterKey) {
        lodash_1.set(params, 'body.aggs.groupings.composite.after', { groupBy: options.afterKey });
    }
    if (options.filterQuery) {
        try {
            const filterObject = JSON.parse(options.filterQuery);
            if (lodash_1.isObject(filterObject)) {
                params.body.query.bool.filter.push(filterObject);
            }
        }
        catch (err) {
            params.body.query.bool.filter.push({
                query_string: {
                    query: options.filterQuery,
                    analyze_wildcard: true,
                },
            });
        }
    }
    const response = await search(params);
    if (!response.aggregations) {
        throw new Error('Aggregations should be present.');
    }
    const { groupings, groupingsCount } = response.aggregations;
    const { after_key: afterKey } = groupings;
    return {
        series: groupings.buckets.map(bucket => {
            return { id: bucket.key.groupBy, rows: [], columns: [] };
        }),
        pageInfo: {
            total: groupingsCount.value,
            afterKey: afterKey && groupings.buckets.length === limit ? afterKey.groupBy : null,
        },
    };
};
