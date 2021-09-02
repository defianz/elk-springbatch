"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const build_query_1 = require("../../utils/build_query");
const types_1 = require("../../graphql/types");
const getAggs = (limit, tlsSortField) => ({
    count: {
        cardinality: {
            field: 'tls.server_certificate.fingerprint.sha1',
        },
    },
    sha1: {
        terms: {
            field: 'tls.server_certificate.fingerprint.sha1',
            size: limit + 1,
            order: {
                ...getQueryOrder(tlsSortField),
            },
        },
        aggs: {
            issuer_names: {
                terms: {
                    field: 'tls.server_certificate.issuer.common_name',
                },
            },
            common_names: {
                terms: {
                    field: 'tls.server_certificate.subject.common_name',
                },
            },
            alternative_names: {
                terms: {
                    field: 'tls.server_certificate.alternative_names',
                },
            },
            not_after: {
                terms: {
                    field: 'tls.server_certificate.not_after',
                },
            },
            ja3: {
                terms: {
                    field: 'tls.fingerprints.ja3.hash',
                },
            },
        },
    },
});
exports.buildTlsQuery = ({ ip, tlsSortField, filterQuery, flowTarget, pagination: { limit }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, timerange: { from, to }, }) => {
    const filter = [
        ...build_query_1.createQueryFilterClauses(filterQuery),
        { range: { [timestamp]: { gte: from, lte: to } } },
        { term: { [`${flowTarget}.ip`]: ip } },
        { term: { 'event.dataset': 'tls' } },
    ];
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggs: {
                ...getAggs(limit, tlsSortField),
            },
            query: {
                bool: {
                    filter,
                },
            },
            size: 0,
            track_total_hits: true,
        },
    };
    return dslQuery;
};
const getQueryOrder = (tlsSortField) => {
    switch (tlsSortField.field) {
        case types_1.TlsFields._id:
            return { _key: tlsSortField.direction };
        default:
            return build_query_1.assertUnreachable(tlsSortField.field);
    }
};
