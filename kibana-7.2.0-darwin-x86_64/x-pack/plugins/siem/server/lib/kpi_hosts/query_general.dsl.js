"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const build_query_1 = require("../../utils/build_query");
exports.buildGeneralQuery = ({ filterQuery, timerange: { from, to }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, }) => {
    const filter = [
        ...build_query_1.createQueryFilterClauses(filterQuery),
        {
            range: {
                [timestamp]: {
                    gte: from,
                    lte: to,
                },
            },
        },
    ];
    const dslQuery = [
        {
            index: defaultIndex,
            allowNoIndices: true,
            ignoreUnavailable: true,
        },
        {
            aggregations: {
                hosts: {
                    cardinality: {
                        field: 'host.name',
                    },
                },
                hosts_histogram: {
                    auto_date_histogram: {
                        field: '@timestamp',
                        buckets: '6',
                    },
                    aggs: {
                        count: {
                            cardinality: {
                                field: 'host.name',
                            },
                        },
                    },
                },
                unique_source_ips: {
                    cardinality: {
                        field: 'source.ip',
                    },
                },
                unique_source_ips_histogram: {
                    auto_date_histogram: {
                        field: '@timestamp',
                        buckets: '6',
                    },
                    aggs: {
                        count: {
                            cardinality: {
                                field: 'source.ip',
                            },
                        },
                    },
                },
                unique_destination_ips: {
                    cardinality: {
                        field: 'destination.ip',
                    },
                },
                unique_destination_ips_histogram: {
                    auto_date_histogram: {
                        field: '@timestamp',
                        buckets: '6',
                    },
                    aggs: {
                        count: {
                            cardinality: {
                                field: 'destination.ip',
                            },
                        },
                    },
                },
            },
            query: {
                bool: {
                    filter,
                },
            },
            size: 0,
            track_total_hits: false,
        },
    ];
    return dslQuery;
};
