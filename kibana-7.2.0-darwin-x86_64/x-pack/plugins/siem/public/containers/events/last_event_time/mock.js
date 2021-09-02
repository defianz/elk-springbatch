"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../../graphql/types");
const last_event_time_gql_query_1 = require("./last_event_time.gql_query");
const getTimeTwelveDaysAgo = () => {
    const d = new Date();
    const ts = d.getTime();
    const twelveDays = ts - 12 * 24 * 60 * 60 * 1000;
    return new Date(twelveDays).toISOString();
};
exports.mockLastEventTimeQuery = [
    {
        request: {
            query: last_event_time_gql_query_1.LastEventTimeGqlQuery,
            variables: {
                sourceId: 'default',
                indexKey: types_1.LastEventIndexKey.hosts,
                details: {},
                defaultIndex: ['auditbeat-*', 'filebeat-*', 'packetbeat-*', 'winlogbeat-*'],
            },
        },
        result: {
            data: {
                source: {
                    id: 'default',
                    LastEventTime: {
                        lastSeen: getTimeTwelveDaysAgo(),
                        errorMessage: null,
                    },
                },
            },
        },
    },
];
