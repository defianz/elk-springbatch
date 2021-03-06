"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const moment_1 = tslib_1.__importDefault(require("moment"));
const constants_1 = require("../../../../common/constants");
const helper_1 = require("../../helper");
const get_histogram_interval_1 = require("../../helper/get_histogram_interval");
class ElasticsearchPingsAdapter {
    constructor(database) {
        this.database = database;
    }
    /**
     * Fetches ping documents from ES
     * @param request Kibana server request
     * @param dateRangeStart timestamp bounds
     * @param dateRangeEnd timestamp bounds
     * @param monitorId optional limit by monitorId
     * @param status optional limit by check statuses
     * @param sort optional sort by timestamp
     * @param size optional limit query size
     */
    async getAll(request, dateRangeStart, dateRangeEnd, monitorId, status, sort = 'desc', size, location) {
        const sortParam = { sort: [{ '@timestamp': { order: sort } }] };
        const sizeParam = size ? { size } : undefined;
        const filter = [{ range: { '@timestamp': { gte: dateRangeStart, lte: dateRangeEnd } } }];
        if (monitorId) {
            filter.push({ term: { 'monitor.id': monitorId } });
        }
        if (status) {
            filter.push({ term: { 'monitor.status': status } });
        }
        if (location) {
            filter.push({ term: { 'observer.geo.name': location } });
        }
        const queryContext = { bool: { filter } };
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                query: {
                    ...queryContext,
                },
                ...sortParam,
                ...sizeParam,
            },
        };
        const { hits: { hits, total }, } = await this.database.search(request, params);
        const pings = hits.map(({ _source }) => {
            const timestamp = _source['@timestamp'];
            return { timestamp, ..._source };
        });
        const results = {
            total: total.value,
            pings,
        };
        return results;
    }
    /**
     * Fetch data to populate monitor status bar.
     * @param request Kibana server request
     * @param dateRangeStart timestamp bounds
     * @param dateRangeEnd timestamp bounds
     * @param monitorId optional limit to monitorId
     */
    async getLatestMonitorDocs(request, dateRangeStart, dateRangeEnd, monitorId, location) {
        // TODO: Write tests for this function
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                query: {
                    bool: {
                        filter: [
                            {
                                range: {
                                    '@timestamp': {
                                        gte: dateRangeStart,
                                        lte: dateRangeEnd,
                                    },
                                },
                            },
                            ...(monitorId ? [{ term: { 'monitor.id': monitorId } }] : []),
                            ...(location ? [{ term: { 'observer.geo.name': location } }] : []),
                        ],
                    },
                },
                size: 0,
                aggs: {
                    by_id: {
                        terms: {
                            field: 'monitor.id',
                            size: 1000,
                        },
                        aggs: {
                            latest: {
                                top_hits: {
                                    size: 1,
                                    sort: {
                                        '@timestamp': { order: 'desc' },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };
        const result = await this.database.search(request, params);
        const buckets = lodash_1.get(result, 'aggregations.by_id.buckets', []);
        // @ts-ignore TODO fix destructuring implicit any
        return buckets.map(({ latest: { hits: { hits } } }) => {
            const timestamp = hits[0]._source[`@timestamp`];
            const momentTs = moment_1.default(timestamp);
            const millisFromNow = moment_1.default().diff(momentTs);
            return {
                ...hits[0]._source,
                timestamp,
                millisFromNow,
            };
        });
    }
    /**
     * Gets data used for a composite histogram for the currently-running monitors.
     * @param request Kibana server request
     * @param dateRangeStart timestamp bounds
     * @param dateRangeEnd timestamp bounds
     * @param filters user-defined filters
     */
    async getPingHistogram(request, dateRangeStart, dateRangeEnd, filters) {
        const { statusFilter, query } = helper_1.getFilteredQueryAndStatusFilter(dateRangeStart, dateRangeEnd, filters);
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                query,
                size: 0,
                aggs: {
                    timeseries: {
                        date_histogram: {
                            field: '@timestamp',
                            fixed_interval: get_histogram_interval_1.getHistogramInterval(dateRangeStart, dateRangeEnd),
                        },
                        aggs: {
                            down: {
                                filter: {
                                    term: {
                                        'monitor.status': 'down',
                                    },
                                },
                                aggs: {
                                    bucket_count: {
                                        cardinality: {
                                            field: 'monitor.id',
                                        },
                                    },
                                },
                            },
                            bucket_total: {
                                cardinality: {
                                    field: 'monitor.id',
                                    precision_threshold: 20000,
                                },
                            },
                        },
                    },
                },
            },
        };
        const result = await this.database.search(request, params);
        const buckets = lodash_1.get(result, 'aggregations.timeseries.buckets', []);
        const mappedBuckets = buckets.map(bucket => {
            const key = lodash_1.get(bucket, 'key');
            const total = lodash_1.get(bucket, 'bucket_total.value');
            const downCount = lodash_1.get(bucket, 'down.bucket_count.value');
            return {
                key,
                downCount: statusFilter && statusFilter !== 'down' ? 0 : downCount,
                upCount: statusFilter && statusFilter !== 'up' ? 0 : total - downCount,
                y: 1,
            };
        });
        return helper_1.formatEsBucketsForHistogram(mappedBuckets);
    }
    /**
     * Count the number of documents in heartbeat indices
     * @param request Kibana server request
     */
    async getDocCount(request) {
        const { count } = await this.database.count(request, { index: constants_1.INDEX_NAMES.HEARTBEAT });
        return { count };
    }
}
exports.ElasticsearchPingsAdapter = ElasticsearchPingsAdapter;
