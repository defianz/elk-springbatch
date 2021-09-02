"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../components/timeline/body/helpers");
const default_headers_1 = require("../../components/timeline/body/column_headers/default_headers");
const types_1 = require("../../graphql/types");
exports.DEFAULT_PAGE_COUNT = 2; // Eui Pager will not render unless this is a minimum of 2 pages
exports.timelineDefaults = {
    columns: default_headers_1.defaultHeaders,
    dataProviders: [],
    description: '',
    eventIdToNoteIds: {},
    highlightedDropAndProviderId: '',
    historyIds: [],
    isFavorite: false,
    isLive: false,
    isLoading: false,
    isSaving: false,
    itemsPerPage: 25,
    itemsPerPageOptions: [10, 25, 50, 100],
    kqlMode: 'filter',
    kqlQuery: {
        filterQuery: null,
        filterQueryDraft: null,
    },
    title: '',
    noteIds: [],
    pinnedEventIds: {},
    pinnedEventsSaveObject: {},
    dateRange: {
        start: 0,
        end: 0,
    },
    savedObjectId: null,
    show: false,
    sort: {
        columnId: '@timestamp',
        sortDirection: types_1.Direction.desc,
    },
    width: helpers_1.DEFAULT_TIMELINE_WIDTH,
    version: null,
};
