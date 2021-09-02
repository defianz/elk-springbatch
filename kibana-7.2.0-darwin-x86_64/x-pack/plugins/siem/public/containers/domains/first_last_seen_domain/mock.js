"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../graphql/types");
const first_last_seen_gql_query_1 = require("./first_last_seen.gql_query");
exports.mockFirstLastSeenDomainQuery = [
    {
        request: {
            query: first_last_seen_gql_query_1.DomainFirstLastSeenGqlQuery,
            variables: {
                sourceId: 'default',
                ip: '10.10.10.10',
                domainName: 'example.com',
                flowTarget: types_1.FlowTarget.source,
                defaultIndex: ['auditbeat-*', 'filebeat-*', 'packetbeat-*', 'winlogbeat-*'],
            },
        },
        result: {
            data: {
                source: {
                    id: 'default',
                    DomainFirstLastSeen: {
                        firstSeen: '2019-04-08T16:09:40.692Z',
                        lastSeen: '2019-04-08T18:35:45.064Z',
                    },
                },
            },
        },
    },
];
