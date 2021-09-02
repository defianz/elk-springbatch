"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../graphql/types");
const build_query_1 = require("../../utils/build_query");
const getQueryOrder = (networkDnsSortField) => {
    switch (networkDnsSortField.field) {
        case types_1.NetworkDnsFields.queryCount:
            return { _count: networkDnsSortField.direction };
        case types_1.NetworkDnsFields.dnsName:
            return { _key: networkDnsSortField.direction };
        case types_1.NetworkDnsFields.uniqueDomains:
            return { unique_domains: networkDnsSortField.direction };
        case types_1.NetworkDnsFields.dnsBytesIn:
            return { dns_bytes_in: networkDnsSortField.direction };
        case types_1.NetworkDnsFields.dnsBytesOut:
            return { dns_bytes_out: networkDnsSortField.direction };
    }
    build_query_1.assertUnreachable(networkDnsSortField.field);
};
const getCountAgg = () => ({
    dns_count: {
        cardinality: {
            field: 'dns.question.etld_plus_one',
        },
    },
});
const createIncludePTRFilter = (isPtrIncluded) => isPtrIncluded
    ? {}
    : {
        must_not: [
            {
                match_phrase: {
                    'dns.question.type': {
                        query: 'PTR',
                    },
                },
            },
        ],
    };
const getDnsFilter = () => ({
    must: [
        {
            match_phrase: {
                'network.protocol': {
                    query: 'dns',
                },
            },
        },
    ],
});
exports.buildDnsQuery = ({ fields, filterQuery, isPtrIncluded, networkDnsSortField, timerange: { from, to }, pagination: { limit }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, }) => {
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
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggregations: {
                ...getCountAgg(),
                dns_name_query_count: {
                    terms: {
                        field: 'dns.question.etld_plus_one',
                        size: limit + 1,
                        order: {
                            ...getQueryOrder(networkDnsSortField),
                        },
                    },
                    aggs: {
                        unique_domains: {
                            cardinality: {
                                field: 'dns.question.name',
                            },
                        },
                        dns_bytes_in: {
                            sum: {
                                field: 'source.bytes',
                            },
                        },
                        dns_bytes_out: {
                            sum: {
                                field: 'destination.bytes',
                            },
                        },
                        timestamp: {
                            max: {
                                field: '@timestamp',
                            },
                        },
                    },
                },
            },
            query: {
                bool: {
                    filter,
                    ...getDnsFilter(),
                    ...createIncludePTRFilter(isPtrIncluded),
                },
            },
        },
        size: 0,
        track_total_hits: false,
    };
    return dslQuery;
};
