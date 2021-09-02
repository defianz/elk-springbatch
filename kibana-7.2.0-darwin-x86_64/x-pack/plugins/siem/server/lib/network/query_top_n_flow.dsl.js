"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../../graphql/types");
const build_query_1 = require("../../utils/build_query");
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
const getCountAgg = (flowTarget) => ({
    top_n_flow_count: {
        cardinality: {
            field: `${flowTarget}.ip`,
        },
    },
});
exports.buildTopNFlowQuery = ({ fields, filterQuery, flowDirection, networkTopNFlowSort, flowTarget, timerange: { from, to }, pagination: { limit }, defaultIndex, sourceConfiguration: { fields: { timestamp }, }, }) => {
    const filter = [
        ...build_query_1.createQueryFilterClauses(filterQuery),
        { range: { [timestamp]: { gte: from, lte: to } } },
    ];
    const dslQuery = {
        allowNoIndices: true,
        index: defaultIndex,
        ignoreUnavailable: true,
        body: {
            aggregations: {
                ...getCountAgg(flowTarget),
                ...getUniDirectionAggs(flowDirection, networkTopNFlowSort, flowTarget, limit),
                ...getBiDirectionAggs(flowDirection, networkTopNFlowSort, flowTarget, limit),
            },
            query: {
                bool: {
                    filter,
                    ...getUniDirectionalFilter(flowDirection),
                    ...getBiDirectionalFilter(flowDirection, flowTarget),
                },
            },
        },
        size: 0,
        track_total_hits: false,
    };
    return dslQuery;
};
const getUniDirectionAggs = (flowDirection, networkTopNFlowSortField, flowTarget, limit) => flowDirection === types_1.FlowDirection.uniDirectional
    ? {
        top_uni_flow: {
            terms: {
                field: `${flowTarget}.ip`,
                size: limit + 1,
                order: {
                    ...getQueryOrder(networkTopNFlowSortField),
                },
            },
            aggs: {
                bytes: {
                    sum: {
                        field: 'network.bytes',
                    },
                },
                direction: {
                    terms: {
                        field: 'network.direction',
                    },
                },
                domain: {
                    terms: {
                        field: `${flowTarget}.domain`,
                        order: {
                            timestamp: 'desc',
                        },
                    },
                    aggs: {
                        timestamp: {
                            max: {
                                field: '@timestamp',
                            },
                        },
                    },
                },
                ip_count: {
                    cardinality: {
                        field: `${flowTarget === types_1.FlowTarget.source ? types_1.FlowTarget.destination : types_1.FlowTarget.source}.ip`,
                    },
                },
                packets: {
                    sum: {
                        field: 'network.packets',
                    },
                },
                timestamp: {
                    max: {
                        field: '@timestamp',
                    },
                },
            },
        },
    }
    : {};
const getBiDirectionAggs = (flowDirection, networkTopNFlowSortField, flowTarget, limit) => flowDirection === types_1.FlowDirection.biDirectional
    ? {
        top_bi_flow: {
            terms: {
                field: `${flowTarget}.ip`,
                size: limit + 1,
                order: {
                    ...getQueryOrder(networkTopNFlowSortField),
                },
            },
            aggs: {
                bytes: {
                    sum: {
                        field: `${flowTarget}.bytes`,
                    },
                },
                direction: {
                    terms: {
                        field: 'network.direction',
                    },
                },
                domain: {
                    terms: {
                        field: `${flowTarget}.domain`,
                        order: {
                            timestamp: 'desc',
                        },
                    },
                    aggs: {
                        timestamp: {
                            max: {
                                field: '@timestamp',
                            },
                        },
                    },
                },
                ip_count: {
                    cardinality: {
                        field: `${getOppositeField(flowTarget)}.ip`,
                    },
                },
                packets: {
                    sum: {
                        field: `${flowTarget}.packets`,
                    },
                },
                timestamp: {
                    max: {
                        field: '@timestamp',
                    },
                },
            },
        },
    }
    : {};
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
    }
    build_query_1.assertUnreachable(flowTarget);
};
const getQueryOrder = (networkTopNFlowSortField) => {
    switch (networkTopNFlowSortField.field) {
        case types_1.NetworkTopNFlowFields.bytes:
            return { bytes: networkTopNFlowSortField.direction };
        case types_1.NetworkTopNFlowFields.packets:
            return { packets: networkTopNFlowSortField.direction };
        case types_1.NetworkTopNFlowFields.ipCount:
            return { ip_count: networkTopNFlowSortField.direction };
    }
    build_query_1.assertUnreachable(networkTopNFlowSortField.field);
};
