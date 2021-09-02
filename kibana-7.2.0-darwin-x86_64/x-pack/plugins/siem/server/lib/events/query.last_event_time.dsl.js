"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../graphql/types");
const build_query_1 = require("../../utils/build_query");
exports.buildLastEventTimeQuery = ({ indexKey, details, defaultIndex, }) => {
    const indicesToQuery = {
        hosts: defaultIndex,
        network: defaultIndex,
    };
    const getHostDetailsFilter = (hostName) => [{ term: { 'host.name': hostName } }];
    const getIpDetailsFilter = (ip) => [
        { term: { 'source.ip': ip } },
        { term: { 'destination.ip': ip } },
    ];
    const getQuery = (eventIndexKey) => {
        switch (eventIndexKey) {
            case types_1.LastEventIndexKey.ipDetails:
                if (details.ip) {
                    return {
                        allowNoIndices: true,
                        index: indicesToQuery.network,
                        ignoreUnavailable: true,
                        body: {
                            aggregations: {
                                last_seen_event: { max: { field: '@timestamp' } },
                            },
                            query: { bool: { should: getIpDetailsFilter(details.ip) } },
                            size: 0,
                            track_total_hits: false,
                        },
                    };
                }
                throw new Error('buildLastEventTimeQuery - no IP argument provided');
            case types_1.LastEventIndexKey.hostDetails:
                if (details.hostName) {
                    return {
                        allowNoIndices: true,
                        index: indicesToQuery.hosts,
                        ignoreUnavailable: true,
                        body: {
                            aggregations: {
                                last_seen_event: { max: { field: '@timestamp' } },
                            },
                            query: { bool: { filter: getHostDetailsFilter(details.hostName) } },
                            size: 0,
                            track_total_hits: false,
                        },
                    };
                }
                throw new Error('buildLastEventTimeQuery - no hostName argument provided');
            case types_1.LastEventIndexKey.hosts:
            case types_1.LastEventIndexKey.network:
                return {
                    allowNoIndices: true,
                    index: indicesToQuery[indexKey],
                    ignoreUnavailable: true,
                    body: {
                        aggregations: {
                            last_seen_event: { max: { field: '@timestamp' } },
                        },
                        query: { match_all: {} },
                        size: 0,
                        track_total_hits: false,
                    },
                };
            default:
                return build_query_1.assertUnreachable(eventIndexKey);
        }
    };
    return getQuery(indexKey);
};
