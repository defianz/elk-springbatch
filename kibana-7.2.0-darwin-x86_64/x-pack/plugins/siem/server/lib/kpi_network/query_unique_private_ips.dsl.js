"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const build_query_1 = require("../../utils/build_query");
const getUniquePrivateIpsFilter = (attrQuery) => [
    {
        bool: {
            should: [
                {
                    bool: {
                        should: [
                            {
                                match: {
                                    [`${attrQuery}.ip`]: '10.0.0.0/8',
                                },
                            },
                        ],
                        minimum_should_match: 1,
                    },
                },
                {
                    bool: {
                        should: [
                            {
                                bool: {
                                    should: [
                                        {
                                            match: {
                                                [`${attrQuery}.ip`]: '192.168.0.0/16',
                                            },
                                        },
                                    ],
                                    minimum_should_match: 1,
                                },
                            },
                            {
                                bool: {
                                    should: [
                                        {
                                            bool: {
                                                should: [
                                                    {
                                                        match: {
                                                            [`${attrQuery}.ip`]: '172.16.0.0/12',
                                                        },
                                                    },
                                                ],
                                                minimum_should_match: 1,
                                            },
                                        },
                                        {
                                            bool: {
                                                should: [
                                                    {
                                                        match_phrase: {
                                                            [`${attrQuery}.ip`]: 'fd00::/8',
                                                        },
                                                    },
                                                ],
                                                minimum_should_match: 1,
                                            },
                                        },
                                    ],
                                    minimum_should_match: 1,
                                },
                            },
                        ],
                        minimum_should_match: 1,
                    },
                },
            ],
            minimum_should_match: 1,
        },
    },
];
exports.buildUniquePrvateIpQuery = (attrQuery, { filterQuery, timerange: { from, to }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, }) => {
    const filter = [
        ...build_query_1.createQueryFilterClauses(filterQuery),
        ...getUniquePrivateIpsFilter(attrQuery),
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
            allowNoIndices: true,
            index: defaultIndex,
            ignoreUnavailable: true,
        },
        {
            aggregations: {
                unique_private_ips: {
                    cardinality: {
                        field: `${attrQuery}.ip`,
                    },
                },
            },
            query: {
                bool: {
                    filter,
                },
            },
            size: 0,
            track_total_hits: true,
        },
    ];
    return dslQuery;
};
