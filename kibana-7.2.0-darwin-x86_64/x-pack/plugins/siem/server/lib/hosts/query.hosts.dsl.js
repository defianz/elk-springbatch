"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../graphql/types");
const build_query_1 = require("../../utils/build_query");
const reduce_fields_1 = require("../../utils/build_query/reduce_fields");
const ecs_fields_1 = require("../ecs_fields");
const helpers_1 = require("./helpers");
exports.buildHostsQuery = ({ fields, filterQuery, pagination: { limit, cursor }, sort, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, timerange: { from, to }, }) => {
    const esFields = reduce_fields_1.reduceFields(fields, ecs_fields_1.hostFieldsMap);
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
    const agg = { host_count: { cardinality: { field: 'host.name' } } };
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggregations: {
                ...agg,
                host_data: {
                    terms: { size: limit + 1, field: 'host.name', order: getQueryOrder(sort) },
                    aggs: {
                        lastSeen: { max: { field: '@timestamp' } },
                        ...helpers_1.buildFieldsTermAggregation(esFields.filter(field => !['@timestamp', '_id'].includes(field))),
                    },
                },
            },
            query: { bool: { filter } },
            size: 0,
            track_total_hits: false,
        },
    };
    return dslQuery;
};
const getQueryOrder = (sort) => {
    switch (sort.field) {
        case types_1.HostsFields.lastSeen:
            return { lastSeen: sort.direction };
        case types_1.HostsFields.hostName:
            return { _key: sort.direction };
        default:
            return build_query_1.assertUnreachable(sort.field);
    }
};
