"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constants_1 = require("../../../../common/constants");
const helper_1 = require("../../helper");
const formatStatusBuckets = (time, buckets, docCount) => {
    let up = null;
    let down = null;
    buckets.forEach((bucket) => {
        if (bucket.key === 'up') {
            up = bucket.doc_count;
        }
        else if (bucket.key === 'down') {
            down = bucket.doc_count;
        }
    });
    return {
        x: time,
        up,
        down,
        total: docCount,
    };
};
class ElasticsearchMonitorsAdapter {
    constructor(database) {
        this.database = database;
        this.database = database;
    }
    /**
     * Fetches data used to populate monitor charts
     * @param request Kibana request
     * @param monitorId ID value for the selected monitor
     * @param dateRangeStart timestamp bounds
     * @param dateRangeEnd timestamp bounds
     */
    async getMonitorChartsData(request, monitorId, dateRangeStart, dateRangeEnd, location) {
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                query: {
                    bool: {
                        filter: [
                            { range: { '@timestamp': { gte: dateRangeStart, lte: dateRangeEnd } } },
                            { term: { 'monitor.id': monitorId } },
                            // if location is truthy, add it as a filter. otherwise add nothing
                            ...(!!location ? [{ term: { 'observer.geo.name': location } }] : []),
                        ],
                    },
                },
                size: 0,
                aggs: {
                    timeseries: {
                        date_histogram: {
                            field: '@timestamp',
                            fixed_interval: helper_1.getHistogramInterval(dateRangeStart, dateRangeEnd),
                        },
                        aggs: {
                            status: { terms: { field: 'monitor.status', size: 2, shard_size: 2 } },
                            duration: { stats: { field: 'monitor.duration.us' } },
                        },
                    },
                },
            },
        };
        const result = await this.database.search(request, params);
        const buckets = helper_1.dropLatestBucket(lodash_1.get(result, 'aggregations.timeseries.buckets', []));
        /**
         * The code below is responsible for formatting the aggregation data we fetched above in a way
         * that the chart components used by the client understands.
         * There are five required values. Two are lists of points that conform to a simple (x,y) structure.
         *
         * The third list is for an area chart expressing a range, and it requires an (x,y,y0) structure,
         * where y0 is the min value for the point and y is the max.
         *
         * Additionally, we supply the maximum value for duration and status, so the corresponding charts know
         * what the domain size should be.
         */
        const monitorChartsData = {
            durationArea: [],
            durationLine: [],
            status: [],
            durationMaxValue: 0,
            statusMaxCount: 0,
        };
        buckets.forEach(bucket => {
            const x = lodash_1.get(bucket, 'key');
            const docCount = lodash_1.get(bucket, 'doc_count', 0);
            // update the maximum value for each point
            monitorChartsData.statusMaxCount = Math.max(docCount, monitorChartsData.statusMaxCount);
            monitorChartsData.durationMaxValue = Math.max(monitorChartsData.durationMaxValue, lodash_1.get(bucket, 'duration.max', 0));
            // these points express a range that will be displayed as an area chart
            monitorChartsData.durationArea.push({
                x,
                yMin: lodash_1.get(bucket, 'duration.min', null),
                yMax: lodash_1.get(bucket, 'duration.max', null),
            });
            monitorChartsData.durationLine.push({ x, y: lodash_1.get(bucket, 'duration.avg', null) });
            monitorChartsData.status.push(formatStatusBuckets(x, lodash_1.get(bucket, 'status.buckets', []), docCount));
        });
        return monitorChartsData;
    }
    /**
     * Provides a count of the current monitors
     * @param request Kibana request
     * @param dateRangeStart timestamp bounds
     * @param dateRangeEnd timestamp bounds
     * @param filters filters defined by client
     */
    async getSnapshotCount(request, dateRangeStart, dateRangeEnd, filters) {
        const { statusFilter, query } = helper_1.getFilteredQueryAndStatusFilter(dateRangeStart, dateRangeEnd, filters);
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                query,
                size: 0,
                aggs: {
                    ids: {
                        composite: {
                            sources: [
                                {
                                    id: {
                                        terms: {
                                            field: 'monitor.id',
                                        },
                                    },
                                },
                                {
                                    location: {
                                        terms: {
                                            field: 'observer.geo.name',
                                            missing_bucket: true,
                                        },
                                    },
                                },
                            ],
                            size: 10000,
                        },
                        aggs: {
                            latest: {
                                top_hits: {
                                    sort: [
                                        {
                                            '@timestamp': { order: 'desc' },
                                        },
                                    ],
                                    size: 1,
                                },
                            },
                        },
                    },
                },
            },
        };
        let up = 0;
        let down = 0;
        let searchAfter = null;
        do {
            if (searchAfter) {
                lodash_1.set(params, 'body.aggs.ids.composite.after', searchAfter);
            }
            const queryResult = await this.database.search(request, params);
            const idBuckets = lodash_1.get(queryResult, 'aggregations.ids.buckets', []);
            idBuckets.forEach(bucket => {
                // We only get the latest doc
                const status = lodash_1.get(bucket, 'latest.hits.hits[0]._source.monitor.status', null);
                if (!statusFilter || (statusFilter && statusFilter === status)) {
                    if (status === 'up') {
                        up++;
                    }
                    else {
                        down++;
                    }
                }
            });
            searchAfter = lodash_1.get(queryResult, 'aggregations.ids.after_key');
        } while (searchAfter);
        return { up, down, total: up + down };
    }
    /**
     * Fetch the latest status for a monitors list
     * @param request Kibana request
     * @param dateRangeStart timestamp bounds
     * @param dateRangeEnd timestamp bounds
     * @param filters filters defined by client
     */
    async getMonitors(request, dateRangeStart, dateRangeEnd, filters) {
        const { statusFilter, query } = helper_1.getFilteredQueryAndStatusFilter(dateRangeStart, dateRangeEnd, filters);
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                query,
                size: 0,
                aggs: {
                    hosts: {
                        composite: {
                            sources: [
                                {
                                    id: {
                                        terms: {
                                            field: 'monitor.id',
                                        },
                                    },
                                },
                                {
                                    url: {
                                        terms: {
                                            field: 'url.full',
                                        },
                                    },
                                },
                                {
                                    location: {
                                        terms: {
                                            field: 'observer.geo.name',
                                            missing_bucket: true,
                                        },
                                    },
                                },
                            ],
                            size: 40,
                        },
                        aggs: {
                            latest: {
                                top_hits: {
                                    sort: [
                                        {
                                            '@timestamp': { order: 'desc' },
                                        },
                                    ],
                                    size: 1,
                                },
                            },
                            histogram: {
                                date_histogram: {
                                    field: '@timestamp',
                                    fixed_interval: helper_1.getHistogramInterval(dateRangeStart, dateRangeEnd),
                                    missing: 0,
                                },
                                aggs: {
                                    status: {
                                        terms: {
                                            field: 'monitor.status',
                                            size: 2,
                                            shard_size: 2,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        };
        const queryResult = await this.database.search(request, params);
        const aggBuckets = lodash_1.get(queryResult, 'aggregations.hosts.buckets', []);
        const latestMonitors = aggBuckets
            .filter(bucket => (statusFilter &&
            lodash_1.get(bucket, 'latest.hits.hits[0]._source.monitor.status', undefined) ===
                statusFilter) ||
            !statusFilter)
            .map((bucket) => {
            const key = lodash_1.get(bucket, 'key.id');
            const url = lodash_1.get(bucket, 'key.url', null);
            const upSeries = [];
            const downSeries = [];
            const histogramBuckets = lodash_1.get(bucket, 'histogram.buckets', []);
            const ping = lodash_1.get(bucket, 'latest.hits.hits[0]._source');
            const timestamp = lodash_1.get(bucket, 'latest.hits.hits[0]._source.@timestamp');
            histogramBuckets.forEach(histogramBucket => {
                const status = lodash_1.get(histogramBucket, 'status.buckets', []);
                // @ts-ignore TODO update typings and remove this comment
                const up = status.find(f => f.key === 'up');
                // @ts-ignore TODO update typings and remove this comment
                const down = status.find(f => f.key === 'down');
                // @ts-ignore TODO update typings and remove this comment
                upSeries.push({ x: histogramBucket.key, y: up ? up.doc_count : null });
                // @ts-ignore TODO update typings and remove this comment
                downSeries.push({ x: histogramBucket.key, y: down ? down.doc_count : null });
            });
            return {
                id: { key, url },
                ping: {
                    ...ping,
                    timestamp,
                },
                upSeries,
                downSeries,
            };
        });
        return latestMonitors;
    }
    /**
     * Fetch options for the filter bar.
     * @param request Kibana request object
     * @param dateRangeStart timestamp bounds
     * @param dateRangeEnd timestamp bounds
     */
    async getFilterBar(request, dateRangeStart, dateRangeEnd) {
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                _source: [
                    'monitor.id',
                    'monitor.type',
                    'url.full',
                    'url.port',
                    'monitor.name',
                    'observer.geo.name',
                ],
                size: 1000,
                query: {
                    range: {
                        '@timestamp': {
                            gte: dateRangeStart,
                            lte: dateRangeEnd,
                        },
                    },
                },
                collapse: {
                    field: 'monitor.id',
                },
                sort: {
                    '@timestamp': 'desc',
                },
            },
        };
        const result = await this.database.search(request, params);
        const ids = [];
        const ports = new Set();
        const types = new Set();
        const names = new Set();
        const locations = new Set();
        const hits = lodash_1.get(result, 'hits.hits', []);
        hits.forEach((hit) => {
            const key = lodash_1.get(hit, '_source.monitor.id');
            const url = lodash_1.get(hit, '_source.url.full', null);
            const port = lodash_1.get(hit, '_source.url.port', undefined);
            const type = lodash_1.get(hit, '_source.monitor.type', undefined);
            const name = lodash_1.get(hit, '_source.monitor.name', null);
            const location = lodash_1.get(hit, '_source.observer.geo.name', null);
            if (key) {
                ids.push({ key, url });
            }
            if (port) {
                ports.add(port);
            }
            if (type) {
                types.add(type);
            }
            if (name) {
                names.add(name);
            }
            if (location) {
                locations.add(location);
            }
        });
        return {
            ids,
            locations: Array.from(locations),
            names: Array.from(names),
            ports: Array.from(ports),
            schemes: Array.from(types),
            statuses: ['up', 'down'],
        };
    }
    /**
     * Fetch summaries of recent errors for monitors.
     * @example getErrorsList({}, 'now-15m', 'now', '{bool: { must: [{'term': {'monitor.status': {value: 'down'}}}]}})
     * @param request Request to send ES
     * @param dateRangeStart timestamp bounds
     * @param dateRangeEnd timestamp bounds
     * @param filters any filters specified on the client
     */
    async getErrorsList(request, dateRangeStart, dateRangeEnd, filters) {
        const statusDown = {
            term: {
                'monitor.status': {
                    value: 'down',
                },
            },
        };
        const query = helper_1.getFilteredQuery(dateRangeStart, dateRangeEnd, filters);
        if (lodash_1.get(query, 'bool.filter', undefined)) {
            query.bool.filter.push(statusDown);
        }
        else {
            lodash_1.set(query, 'bool.filter', [statusDown]);
        }
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                query,
                size: 0,
                aggs: {
                    errors: {
                        composite: {
                            sources: [
                                {
                                    id: {
                                        terms: {
                                            field: 'monitor.id',
                                        },
                                    },
                                },
                                {
                                    error_type: {
                                        terms: {
                                            field: 'error.type',
                                        },
                                    },
                                },
                                {
                                    location: {
                                        terms: {
                                            field: 'observer.geo.name',
                                            missing_bucket: true,
                                        },
                                    },
                                },
                            ],
                            size: 50,
                        },
                        aggs: {
                            latest: {
                                top_hits: {
                                    sort: [
                                        {
                                            '@timestamp': {
                                                order: 'desc',
                                            },
                                        },
                                    ],
                                    size: 1,
                                },
                            },
                        },
                    },
                },
            },
        };
        const result = await this.database.search(request, params);
        const buckets = lodash_1.get(result, 'aggregations.errors.buckets', []);
        const errorsList = [];
        buckets.forEach((bucket) => {
            const count = lodash_1.get(bucket, 'doc_count', 0);
            const monitorId = lodash_1.get(bucket, 'key.id', null);
            const errorType = lodash_1.get(bucket, 'key.error_type', null);
            const location = lodash_1.get(bucket, 'key.location', null);
            const source = lodash_1.get(bucket, 'latest.hits.hits[0]._source', null);
            const errorMessage = lodash_1.get(source, 'error.message', null);
            const statusCode = lodash_1.get(source, 'http.response.status_code', null);
            const timestamp = lodash_1.get(source, '@timestamp', null);
            const name = lodash_1.get(source, 'monitor.name', null);
            errorsList.push({
                count,
                latestMessage: errorMessage,
                location,
                monitorId,
                name: name === '' ? null : name,
                statusCode,
                timestamp,
                type: errorType || '',
            });
        });
        return errorsList.sort(({ count: A }, { count: B }) => B - A);
    }
    /**
     * Fetch data for the monitor page title.
     * @param request Kibana server request
     * @param monitorId the ID to query
     */
    async getMonitorPageTitle(request, monitorId) {
        const params = {
            index: constants_1.INDEX_NAMES.HEARTBEAT,
            body: {
                query: {
                    bool: {
                        filter: {
                            term: {
                                'monitor.id': monitorId,
                            },
                        },
                    },
                },
                sort: [
                    {
                        '@timestamp': {
                            order: 'desc',
                        },
                    },
                ],
                size: 1,
            },
        };
        const result = await this.database.search(request, params);
        const pageTitle = lodash_1.get(result, 'hits.hits[0]._source', null);
        if (pageTitle === null) {
            return null;
        }
        return {
            id: lodash_1.get(pageTitle, 'monitor.id', null) || monitorId,
            url: lodash_1.get(pageTitle, 'url.full', null),
            name: lodash_1.get(pageTitle, 'monitor.name', null),
        };
    }
}
exports.ElasticsearchMonitorsAdapter = ElasticsearchMonitorsAdapter;
