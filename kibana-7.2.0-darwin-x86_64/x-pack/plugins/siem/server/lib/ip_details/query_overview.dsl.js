"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const getAggs = (type, ip) => {
    return {
        [type]: {
            filter: {
                term: {
                    [`${type}.ip`]: ip,
                },
            },
            aggs: {
                firstSeen: {
                    min: {
                        field: '@timestamp',
                    },
                },
                lastSeen: {
                    max: {
                        field: '@timestamp',
                    },
                },
                autonomous_system: {
                    filter: {
                        exists: {
                            field: 'autonomous_system',
                        },
                    },
                    aggs: {
                        results: {
                            top_hits: {
                                size: 1,
                                _source: ['autonomous_system'],
                                sort: [
                                    {
                                        '@timestamp': 'desc',
                                    },
                                ],
                            },
                        },
                    },
                },
                geo: {
                    filter: {
                        exists: {
                            field: `${type}.geo`,
                        },
                    },
                    aggs: {
                        results: {
                            top_hits: {
                                size: 1,
                                _source: [`${type}.geo`],
                                sort: [
                                    {
                                        '@timestamp': 'desc',
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    };
};
const getHostAggs = (ip) => {
    return {
        host: {
            filter: {
                term: {
                    'host.ip': ip,
                },
            },
            aggs: {
                host: {
                    filter: {
                        exists: {
                            field: 'host',
                        },
                    },
                    aggs: {
                        results: {
                            top_hits: {
                                size: 1,
                                _source: ['host'],
                                sort: [
                                    {
                                        '@timestamp': 'desc',
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
    };
};
exports.buildOverviewQuery = ({ defaultIndex, ip }) => {
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggs: {
                ...getAggs('source', ip),
                ...getAggs('destination', ip),
                ...getHostAggs(ip),
            },
            query: {
                bool: {
                    should: [],
                },
            },
            size: 0,
            track_total_hits: true,
        },
    };
    return dslQuery;
};
