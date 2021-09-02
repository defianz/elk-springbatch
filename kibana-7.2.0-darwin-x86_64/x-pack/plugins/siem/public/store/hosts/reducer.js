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
exports.initialHostsState = {
    page: {
        queries: {
            authentications: { limit: constants_1.DEFAULT_TABLE_LIMIT },
            hosts: {
                limit: constants_1.DEFAULT_TABLE_LIMIT,
                direction: types_1.Direction.desc,
                sortField: types_1.HostsFields.lastSeen,
            },
            events: { limit: constants_1.DEFAULT_TABLE_LIMIT },
            uncommonProcesses: { limit: constants_1.DEFAULT_TABLE_LIMIT },
        },
        filterQuery: null,
        filterQueryDraft: null,
    },
    details: {
        queries: {
            authentications: { limit: constants_1.DEFAULT_TABLE_LIMIT },
            hosts: {
                limit: constants_1.DEFAULT_TABLE_LIMIT,
                direction: types_1.Direction.desc,
                sortField: types_1.HostsFields.lastSeen,
            },
            events: { limit: constants_1.DEFAULT_TABLE_LIMIT },
            uncommonProcesses: { limit: constants_1.DEFAULT_TABLE_LIMIT },
        },
        filterQuery: null,
        filterQueryDraft: null,
    },
};
exports.hostsReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialHostsState)
    .case(actions_1.updateAuthenticationsLimit, (state, { limit, hostsType }) => ({
    ...state,
    [hostsType]: {
        ...state[hostsType],
        queries: {
            ...state[hostsType].queries,
            authentications: {
                limit,
            },
        },
    },
}))
    .case(actions_1.updateHostsLimit, (state, { limit, hostsType }) => ({
    ...state,
    [hostsType]: {
        ...state[hostsType],
        queries: {
            ...state[hostsType].queries,
            hosts: {
                ...state[hostsType].queries.hosts,
                limit,
            },
        },
    },
}))
    .case(actions_1.updateHostsSort, (state, { sort, hostsType }) => ({
    ...state,
    [hostsType]: {
        ...state[hostsType],
        queries: {
            ...state[hostsType].queries,
            hosts: {
                ...state[hostsType].queries.hosts,
                direction: sort.direction,
                sortField: sort.field,
            },
        },
    },
}))
    .case(actions_1.updateEventsLimit, (state, { limit, hostsType }) => ({
    ...state,
    [hostsType]: {
        ...state[hostsType],
        queries: {
            ...state[hostsType].queries,
            events: {
                limit,
            },
        },
    },
}))
    .case(actions_1.updateUncommonProcessesLimit, (state, { limit, hostsType }) => ({
    ...state,
    [hostsType]: {
        ...state[hostsType],
        queries: {
            ...state[hostsType].queries,
            uncommonProcesses: {
                limit,
            },
        },
    },
}))
    .case(actions_1.setHostsFilterQueryDraft, (state, { filterQueryDraft, hostsType }) => ({
    ...state,
    [hostsType]: {
        ...state[hostsType],
        filterQueryDraft,
    },
}))
    .case(actions_1.applyHostsFilterQuery, (state, { filterQuery, hostsType }) => ({
    ...state,
    [hostsType]: {
        ...state[hostsType],
        filterQueryDraft: filterQuery.kuery,
        filterQuery,
    },
}))
    .build();
