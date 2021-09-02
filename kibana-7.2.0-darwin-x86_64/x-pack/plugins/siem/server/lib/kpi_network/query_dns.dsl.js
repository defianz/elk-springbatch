"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const build_query_1 = require("../../utils/build_query");
const getDnsQueryFilter = () => [
    {
        bool: {
            filter: [
                {
                    bool: {
                        should: [
                            {
                                bool: {
                                    should: [
                                        {
                                            exists: {
                                                field: 'dns.question.name',
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
                                                            'suricata.eve.dns.type': 'query',
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
                                                        exists: {
                                                            field: 'zeek.dns.query',
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
        },
    },
];
exports.buildDnsQuery = ({ filterQuery, timerange: { from, to }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, }) => {
    const filter = [
        ...build_query_1.createQueryFilterClauses(filterQuery),
        ...getDnsQueryFilter(),
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
