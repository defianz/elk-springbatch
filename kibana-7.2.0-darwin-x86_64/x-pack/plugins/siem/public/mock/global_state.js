"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../components/timeline/body/helpers");
const types_1 = require("../graphql/types");
const header_1 = require("./header");
exports.mockGlobalState = {
    app: {
        notesById: {},
        errors: [
            { id: 'error-id-1', title: 'title-1', message: 'error-message-1' },
            { id: 'error-id-2', title: 'title-2', message: 'error-message-2' },
        ],
    },
    hosts: {
        page: {
            queries: {
                authentications: { limit: 10 },
                hosts: {
                    limit: 10,
                    direction: types_1.Direction.desc,
                    sortField: types_1.HostsFields.lastSeen,
                },
                events: { limit: 10 },
                uncommonProcesses: { limit: 10 },
            },
            filterQuery: null,
            filterQueryDraft: null,
        },
        details: {
            queries: {
                authentications: { limit: 10 },
                hosts: {
                    limit: 10,
                    direction: types_1.Direction.desc,
                    sortField: types_1.HostsFields.lastSeen,
                },
                events: { limit: 10 },
                uncommonProcesses: { limit: 10 },
            },
            filterQuery: null,
            filterQueryDraft: null,
        },
    },
    network: {
        page: {
            queries: {
                topNFlow: {
                    limit: 10,
                    flowTarget: types_1.FlowTarget.source,
                    flowDirection: types_1.FlowDirection.uniDirectional,
                    topNFlowSort: { field: types_1.NetworkTopNFlowFields.bytes, direction: types_1.Direction.desc },
                },
                dns: {
                    limit: 10,
                    dnsSortField: { field: types_1.NetworkDnsFields.queryCount, direction: types_1.Direction.desc },
                    isPtrIncluded: false,
                },
            },
            filterQuery: null,
            filterQueryDraft: null,
        },
        details: {
            filterQuery: null,
            filterQueryDraft: null,
            flowTarget: types_1.FlowTarget.source,
            queries: {
                domains: {
                    limit: 10,
                    flowDirection: types_1.FlowDirection.uniDirectional,
                    domainsSortField: { field: types_1.DomainsFields.bytes, direction: types_1.Direction.desc },
                },
                tls: {
                    limit: 10,
                    tlsSortField: { field: types_1.TlsFields._id, direction: types_1.Direction.desc },
                },
                users: {
                    limit: 10,
                    usersSortField: { field: types_1.UsersFields.name, direction: types_1.Direction.asc },
                },
            },
        },
    },
    inputs: {
        global: {
            timerange: { kind: 'relative', fromStr: 'now-24h', toStr: 'now', from: 0, to: 1 },
            linkTo: ['timeline'],
            query: [],
            policy: { kind: 'manual', duration: 300000 },
        },
        timeline: {
            timerange: { kind: 'relative', fromStr: 'now-24h', toStr: 'now', from: 0, to: 1 },
            linkTo: ['global'],
            query: [],
            policy: { kind: 'manual', duration: 300000 },
        },
    },
    dragAndDrop: { dataProviders: {} },
    timeline: {
        autoSavedWarningMsg: {
            timelineId: null,
            newTimelineModel: null,
        },
        timelineById: {
            test: {
                id: 'test',
                savedObjectId: null,
                columns: header_1.defaultHeaders,
                itemsPerPage: 5,
                dataProviders: [],
                description: '',
                eventIdToNoteIds: {},
                highlightedDropAndProviderId: '',
                historyIds: [],
                isFavorite: false,
                isLive: false,
                isLoading: false,
                kqlMode: 'filter',
                kqlQuery: { filterQuery: null, filterQueryDraft: null },
                title: '',
                noteIds: [],
                dateRange: {
                    start: 0,
                    end: 0,
                },
                show: false,
                pinnedEventIds: {},
                pinnedEventsSaveObject: {},
                itemsPerPageOptions: [5, 10, 20],
                sort: { columnId: '@timestamp', sortDirection: types_1.Direction.desc },
                width: helpers_1.DEFAULT_TIMELINE_WIDTH,
                isSaving: false,
                version: null,
            },
        },
    },
};
