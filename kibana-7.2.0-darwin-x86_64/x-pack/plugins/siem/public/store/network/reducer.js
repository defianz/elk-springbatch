"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
const types_1 = require("../../graphql/types");
const constants_1 = require("../constants");
const actions_1 = require("./actions");
const helper_1 = require("./helper");
const model_1 = require("./model");
exports.initialNetworkState = {
    page: {
        queries: {
            topNFlow: {
                limit: constants_1.DEFAULT_TABLE_LIMIT,
                topNFlowSort: {
                    field: types_1.NetworkTopNFlowFields.bytes,
                    direction: types_1.Direction.desc,
                },
                flowTarget: types_1.FlowTarget.source,
                flowDirection: types_1.FlowDirection.uniDirectional,
            },
            dns: {
                limit: constants_1.DEFAULT_TABLE_LIMIT,
                dnsSortField: {
                    field: types_1.NetworkDnsFields.uniqueDomains,
                    direction: types_1.Direction.desc,
                },
                isPtrIncluded: false,
            },
        },
        filterQuery: null,
        filterQueryDraft: null,
    },
    details: {
        queries: {
            domains: {
                flowDirection: types_1.FlowDirection.uniDirectional,
                limit: constants_1.DEFAULT_TABLE_LIMIT,
                domainsSortField: {
                    field: types_1.DomainsFields.bytes,
                    direction: types_1.Direction.desc,
                },
            },
            tls: {
                limit: constants_1.DEFAULT_TABLE_LIMIT,
                tlsSortField: {
                    field: types_1.TlsFields._id,
                    direction: types_1.Direction.desc,
                },
            },
            users: {
                limit: constants_1.DEFAULT_TABLE_LIMIT,
                usersSortField: {
                    field: types_1.UsersFields.name,
                    direction: types_1.Direction.asc,
                },
            },
        },
        filterQuery: null,
        filterQueryDraft: null,
        flowTarget: types_1.FlowTarget.source,
    },
};
exports.networkReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialNetworkState)
    .case(actions_1.updateDnsLimit, (state, { limit, networkType }) => ({
    ...state,
    [networkType]: {
        ...state[networkType],
        queries: {
            ...state[networkType].queries,
            dns: {
                ...state[model_1.NetworkType.page].queries.dns,
                limit,
            },
        },
    },
}))
    .case(actions_1.updateDnsSort, (state, { dnsSortField, networkType }) => ({
    ...state,
    [networkType]: {
        ...state[networkType],
        queries: {
            ...state[networkType].queries,
            dns: {
                ...state[model_1.NetworkType.page].queries.dns,
                dnsSortField,
            },
        },
    },
}))
    .case(actions_1.updateIsPtrIncluded, (state, { isPtrIncluded, networkType }) => ({
    ...state,
    [networkType]: {
        ...state[networkType],
        queries: {
            ...state[networkType].queries,
            dns: {
                ...state[model_1.NetworkType.page].queries.dns,
                isPtrIncluded,
            },
        },
    },
}))
    .case(actions_1.updateTopNFlowLimit, (state, { limit, networkType }) => ({
    ...state,
    [networkType]: {
        ...state[networkType],
        queries: {
            ...state[networkType].queries,
            topNFlow: {
                ...state[model_1.NetworkType.page].queries.topNFlow,
                limit,
            },
        },
    },
}))
    .case(actions_1.updateTopNFlowDirection, (state, { flowDirection, networkType }) => ({
    ...state,
    [networkType]: {
        ...state[networkType],
        queries: {
            ...state[networkType].queries,
            topNFlow: {
                ...state[model_1.NetworkType.page].queries.topNFlow,
                ...helper_1.helperUpdateTopNFlowDirection(state[model_1.NetworkType.page].queries.topNFlow.flowTarget, flowDirection),
            },
        },
    },
}))
    .case(actions_1.updateTopNFlowSort, (state, { topNFlowSort, networkType }) => ({
    ...state,
    [networkType]: {
        ...state[networkType],
        queries: {
            ...state[networkType].queries,
            topNFlow: {
                ...state[model_1.NetworkType.page].queries.topNFlow,
                topNFlowSort,
            },
        },
    },
}))
    .case(actions_1.updateTopNFlowTarget, (state, { flowTarget }) => ({
    ...state,
    [model_1.NetworkType.page]: {
        ...state[model_1.NetworkType.page],
        queries: {
            ...state[model_1.NetworkType.page].queries,
            topNFlow: {
                ...state[model_1.NetworkType.page].queries.topNFlow,
                flowTarget,
                topNFlowSort: {
                    field: types_1.NetworkTopNFlowFields.bytes,
                    direction: types_1.Direction.desc,
                },
            },
        },
    },
}))
    .case(actions_1.setNetworkFilterQueryDraft, (state, { filterQueryDraft, networkType }) => ({
    ...state,
    [networkType]: {
        ...state[networkType],
        filterQueryDraft,
    },
}))
    .case(actions_1.applyNetworkFilterQuery, (state, { filterQuery, networkType }) => ({
    ...state,
    [networkType]: {
        ...state[networkType],
        filterQueryDraft: filterQuery.kuery,
        filterQuery,
    },
}))
    .case(actions_1.updateIpDetailsFlowTarget, (state, { flowTarget }) => ({
    ...state,
    [model_1.NetworkType.details]: {
        ...state[model_1.NetworkType.details],
        flowTarget,
    },
}))
    .case(actions_1.updateDomainsLimit, (state, { limit }) => ({
    ...state,
    [model_1.NetworkType.details]: {
        ...state[model_1.NetworkType.details],
        queries: {
            ...state[model_1.NetworkType.details].queries,
            domains: {
                ...state[model_1.NetworkType.details].queries.domains,
                limit,
            },
        },
    },
}))
    .case(actions_1.updateTlsLimit, (state, { limit }) => ({
    ...state,
    [model_1.NetworkType.details]: {
        ...state[model_1.NetworkType.details],
        queries: {
            ...state[model_1.NetworkType.details].queries,
            tls: {
                ...state[model_1.NetworkType.details].queries.tls,
                limit,
            },
        },
    },
}))
    .case(actions_1.updateDomainsFlowDirection, (state, { flowDirection }) => ({
    ...state,
    [model_1.NetworkType.details]: {
        ...state[model_1.NetworkType.details],
        queries: {
            ...state[model_1.NetworkType.details].queries,
            domains: {
                ...state[model_1.NetworkType.details].queries.domains,
                flowDirection,
            },
        },
    },
}))
    .case(actions_1.updateDomainsSort, (state, { domainsSortField }) => ({
    ...state,
    [model_1.NetworkType.details]: {
        ...state[model_1.NetworkType.details],
        queries: {
            ...state[model_1.NetworkType.details].queries,
            domains: {
                ...state[model_1.NetworkType.details].queries.domains,
                domainsSortField,
            },
        },
    },
}))
    .case(actions_1.updateTlsSort, (state, { tlsSortField }) => ({
    ...state,
    [model_1.NetworkType.details]: {
        ...state[model_1.NetworkType.details],
        queries: {
            ...state[model_1.NetworkType.details].queries,
            tls: {
                ...state[model_1.NetworkType.details].queries.tls,
                tlsSortField,
            },
        },
    },
}))
    .case(actions_1.updateUsersLimit, (state, { limit }) => ({
    ...state,
    [model_1.NetworkType.details]: {
        ...state[model_1.NetworkType.details],
        queries: {
            ...state[model_1.NetworkType.details].queries,
            users: {
                ...state[model_1.NetworkType.details].queries.users,
                limit,
            },
        },
    },
}))
    .case(actions_1.updateUsersSort, (state, { usersSortField }) => ({
    ...state,
    [model_1.NetworkType.details]: {
        ...state[model_1.NetworkType.details],
        queries: {
            ...state[model_1.NetworkType.details].queries,
            users: {
                ...state[model_1.NetworkType.details].queries.users,
                usersSortField,
            },
        },
    },
}))
    .build();
