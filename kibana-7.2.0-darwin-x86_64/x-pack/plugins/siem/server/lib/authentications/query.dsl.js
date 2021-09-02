"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const build_query_1 = require("../../utils/build_query");
const reduce_fields_1 = require("../../utils/build_query/reduce_fields");
const ecs_fields_1 = require("../ecs_fields");
const extend_map_1 = require("../ecs_fields/extend_map");
exports.auditdFieldsMap = {
    latest: '@timestamp',
    'lastSuccess.timestamp': 'lastSuccess.@timestamp',
    'lastFailure.timestamp': 'lastFailure.@timestamp',
    ...{ ...extend_map_1.extendMap('lastSuccess', ecs_fields_1.sourceFieldsMap) },
    ...{ ...extend_map_1.extendMap('lastSuccess', ecs_fields_1.hostFieldsMap) },
    ...{ ...extend_map_1.extendMap('lastFailure', ecs_fields_1.sourceFieldsMap) },
    ...{ ...extend_map_1.extendMap('lastFailure', ecs_fields_1.hostFieldsMap) },
};
exports.buildQuery = ({ fields, filterQuery, timerange: { from, to }, pagination: { limit }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, }) => {
    const esFields = reduce_fields_1.reduceFields(fields, { ...ecs_fields_1.hostFieldsMap, ...ecs_fields_1.sourceFieldsMap });
    const filter = [
        ...build_query_1.createQueryFilterClauses(filterQuery),
        { term: { 'event.category': 'authentication' } },
        {
            range: {
                [timestamp]: {
                    gte: from,
                    lte: to,
                },
            },
        },
    ];
    const agg = {
        user_count: {
            cardinality: {
                field: 'user.name',
            },
        },
    };
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggregations: {
                ...agg,
                group_by_users: {
                    terms: {
                        size: limit + 1,
                        field: 'user.name',
                        order: [{ 'successes.doc_count': 'desc' }, { 'failures.doc_count': 'desc' }],
                    },
                    aggs: {
                        failures: {
                            filter: {
                                term: {
                                    'event.type': 'authentication_failure',
                                },
                            },
                            aggs: {
                                lastFailure: {
                                    top_hits: {
                                        size: 1,
                                        _source: esFields,
                                        sort: [{ '@timestamp': { order: 'desc' } }],
                                    },
                                },
                            },
                        },
                        successes: {
                            filter: {
                                term: {
                                    'event.type': 'authentication_success',
                                },
                            },
                            aggs: {
                                lastSuccess: {
                                    top_hits: {
                                        size: 1,
                                        _source: esFields,
                                        sort: [{ '@timestamp': { order: 'desc' } }],
                                    },
                                },
                            },
                        },
                        authentication: {
                            top_hits: {
                                size: 1,
                                _source: esFields,
                                sort: [{ '@timestamp': { order: 'desc' } }],
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
        },
        size: 0,
        track_total_hits: false,
    };
    return dslQuery;
};
