"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../../graphql/types");
exports.mockData = {
    NetworkTopNFlow: {
        totalCount: 524,
        edges: [
            {
                node: {
                    source: {
                        ip: '8.8.8.8',
                        domain: ['test.domain.com'],
                        count: 1,
                    },
                    destination: null,
                    network: {
                        bytes: 3826633497,
                        packets: 4185805,
                        direction: [types_1.NetworkDirectionEcs.inbound],
                    },
                },
                cursor: {
                    value: '8.8.8.8',
                },
            },
            {
                node: {
                    source: {
                        ip: '9.9.9.9',
                        domain: ['test.domain.net', 'test.old.domain.net'],
                    },
                    destination: null,
                    network: {
                        bytes: 325909849,
                        packets: 221494,
                        direction: [types_1.NetworkDirectionEcs.inbound, types_1.NetworkDirectionEcs.outbound],
                    },
                },
                cursor: {
                    value: '9.9.9.9',
                },
            },
        ],
        pageInfo: {
            endCursor: {
                value: '10',
            },
            hasNextPage: true,
        },
    },
};
