"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../graphql/types");
const build_query_1 = require("../../utils/build_query");
exports.buildUsersQuery = ({ ip, usersSortField, filterQuery, flowTarget, pagination: { limit }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, timerange: { from, to }, }) => {
    const filter = [
        ...build_query_1.createQueryFilterClauses(filterQuery),
        { range: { [timestamp]: { gte: from, lte: to } } },
        { term: { [`${flowTarget}.ip`]: ip } },
    ];
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggs: {
                user_count: {
                    cardinality: {
                        field: 'user.name',
                    },
                },
                users: {
                    terms: {
                        field: 'user.name',
                        size: limit + 1,
                        order: {
                            ...getQueryOrder(usersSortField),
                        },
                    },
                    aggs: {
                        id: {
                            terms: {
                                field: 'user.id',
                            },
                        },
                        groupId: {
                            terms: {
                                field: 'user.group.id',
                            },
                        },
                        groupName: {
                            terms: {
                                field: 'user.group.name',
                            },
                        },
                    },
                },
            },
            query: {
                bool: {
                    filter,
                    must_not: [
                        {
                            term: {
                                'event.category': 'authentication',
                            },
                        },
                    ],
                },
            },
            size: 0,
            track_total_hits: false,
        },
    };
    return dslQuery;
};
const getQueryOrder = (usersSortField) => {
    switch (usersSortField.field) {
        case types_1.UsersFields.name:
            return { _key: usersSortField.direction };
        case types_1.UsersFields.count:
            return { _count: usersSortField.direction };
        default:
            return build_query_1.assertUnreachable(usersSortField.field);
    }
};
