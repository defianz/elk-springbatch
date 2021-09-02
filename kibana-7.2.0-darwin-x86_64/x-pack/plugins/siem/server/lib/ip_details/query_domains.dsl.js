"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../graphql/types");
const build_query_1 = require("../../utils/build_query");
const getAggs = (ip, flowTarget, flowDirection, domainsSortField, limit) => {
    return {
        domain_count: {
            cardinality: {
                field: `${flowTarget}.domain`,
            },
        },
        [`${flowTarget}_domains`]: {
            terms: {
                field: `${flowTarget}.domain`,
                size: limit + 1,
                order: {
                    ...getQueryOrder(domainsSortField),
                },
            },
            aggs: {
                firstSeen: {
                    min: {
                        field: '@timestamp',
                    },
                },
                lastSeen: {
                    max: {
                        field: '@timestamp',
                    },
                },
                bytes: {
                    sum: {
                        field: flowDirection === types_1.FlowDirection.uniDirectional
                            ? 'network.bytes'
                            : `${flowTarget}.bytes`,
                    },
                },
                direction: {
                    terms: {
                        field: 'network.direction',
                    },
                },
                uniqueIpCount: {
                    cardinality: {
                        field: `${getOppositeField(flowTarget)}.ip`,
                    },
                },
                packets: {
                    sum: {
                        field: flowDirection === types_1.FlowDirection.uniDirectional
                            ? 'network.packets'
                            : `${flowTarget}.packets`,
                    },
                },
            },
        },
    };
};
const getUniDirectionalFilter = (flowDirection) => flowDirection === types_1.FlowDirection.uniDirectional
    ? {
        must_not: [
            {
                exists: {
                    field: 'destination.bytes',
                },
            },
        ],
    }
    : {};
const getBiDirectionalFilter = (flowDirection, flowTarget) => {
    if (flowDirection === types_1.FlowDirection.biDirectional &&
        [types_1.FlowTarget.source, types_1.FlowTarget.destination].includes(flowTarget)) {
        return {
            must: [
                {
                    exists: {
                        field: 'source.bytes',
                    },
                },
                {
                    exists: {
                        field: 'destination.bytes',
                    },
                },
            ],
        };
    }
    else if (flowDirection === types_1.FlowDirection.biDirectional &&
        [types_1.FlowTarget.client, types_1.FlowTarget.server].includes(flowTarget)) {
        return {
            must: [
                {
                    exists: {
                        field: 'client.bytes',
                    },
                },
                {
                    exists: {
                        field: 'server.bytes',
                    },
                },
            ],
        };
    }
    return [];
};
exports.buildDomainsQuery = ({ ip, domainsSortField, filterQuery, flowDirection, flowTarget, pagination: { limit }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, timerange: { from, to }, }) => {
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
                ...getAggs(ip, flowTarget, flowDirection, domainsSortField, limit),
            },
            query: {
                bool: {
                    filter,
                    ...getUniDirectionalFilter(flowDirection),
                    ...getBiDirectionalFilter(flowDirection, flowTarget),
                },
            },
            size: 0,
            track_total_hits: true,
        },
    };
    return dslQuery;
};
const getOppositeField = (flowTarget) => {
    switch (flowTarget) {
        case types_1.FlowTarget.source:
            return types_1.FlowTarget.destination;
        case types_1.FlowTarget.destination:
            return types_1.FlowTarget.source;
        case types_1.FlowTarget.server:
            return types_1.FlowTarget.client;
        case types_1.FlowTarget.client:
            return types_1.FlowTarget.server;
        default:
            return build_query_1.assertUnreachable(flowTarget);
    }
};
const getQueryOrder = (domainsSortField) => {
    switch (domainsSortField.field) {
        case types_1.DomainsFields.bytes:
            return { bytes: domainsSortField.direction };
        case types_1.DomainsFields.packets:
            return { packets: domainsSortField.direction };
        case types_1.DomainsFields.uniqueIpCount:
            return { uniqueIpCount: domainsSortField.direction };
        case types_1.DomainsFields.domainName:
            return { _key: domainsSortField.direction };
        case types_1.DomainsFields.direction:
            return { _key: domainsSortField.direction };
        default:
            return build_query_1.assertUnreachable(domainsSortField.field);
    }
};
