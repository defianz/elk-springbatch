"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
const helpers_1 = require("../../components/timeline/body/helpers");
const actions_1 = require("./actions");
const helpers_2 = require("./helpers");
const EMPTY_TIMELINE_BY_ID = {}; // stable reference
exports.initialTimelineState = {
    timelineById: EMPTY_TIMELINE_BY_ID,
    autoSavedWarningMsg: {
        timelineId: null,
        newTimelineModel: null,
    },
};
/** The reducer for all timeline actions  */
exports.timelineReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialTimelineState)
    .case(actions_1.addTimeline, (state, { id, timeline }) => ({
    ...state,
    timelineById: {
        // As right now, We are not managing multiple timeline
        // for now simplification, we do not need the line below
        // ...state.timelineById,
        [id]: {
            ...timeline,
            highlightedDropAndProviderId: '',
            historyIds: [],
            isLive: false,
            isLoading: true,
            itemsPerPage: 25,
            itemsPerPageOptions: [10, 25, 50, 100],
            id: timeline.savedObjectId || '',
            dateRange: {
                start: 0,
                end: 0,
            },
            show: true,
            width: helpers_1.DEFAULT_TIMELINE_WIDTH,
            isSaving: false,
        },
    },
}))
    .case(actions_1.createTimeline, (state, { id, show, columns }) => ({
    ...state,
    timelineById: helpers_2.addNewTimeline({ columns, id, show, timelineById: state.timelineById }),
}))
    .case(actions_1.upsertColumn, (state, { column, id, index }) => ({
    ...state,
    timelineById: helpers_2.upsertTimelineColumn({ column, id, index, timelineById: state.timelineById }),
}))
    .case(actions_1.addHistory, (state, { id, historyId }) => ({
    ...state,
    timelineById: helpers_2.addTimelineHistory({ id, historyId, timelineById: state.timelineById }),
}))
    .case(actions_1.addNote, (state, { id, noteId }) => ({
    ...state,
    timelineById: helpers_2.addTimelineNote({ id, noteId, timelineById: state.timelineById }),
}))
    .case(actions_1.addNoteToEvent, (state, { id, noteId, eventId }) => ({
    ...state,
    timelineById: helpers_2.addTimelineNoteToEvent({ id, noteId, eventId, timelineById: state.timelineById }),
}))
    .case(actions_1.addProvider, (state, { id, provider }) => ({
    ...state,
    timelineById: helpers_2.addTimelineProvider({ id, provider, timelineById: state.timelineById }),
}))
    .case(actions_1.applyKqlFilterQuery, (state, { id, filterQuery }) => ({
    ...state,
    timelineById: helpers_2.applyKqlFilterQueryDraft({ id, filterQuery, timelineById: state.timelineById }),
}))
    .case(actions_1.setKqlFilterQueryDraft, (state, { id, filterQueryDraft }) => ({
    ...state,
    timelineById: helpers_2.updateKqlFilterQueryDraft({
        id,
        filterQueryDraft,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.showTimeline, (state, { id, show }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineShowTimeline({ id, show, timelineById: state.timelineById }),
}))
    .case(actions_1.applyDeltaToColumnWidth, (state, { id, columnId, delta }) => ({
    ...state,
    timelineById: helpers_2.applyDeltaToTimelineColumnWidth({
        id,
        columnId,
        delta,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.applyDeltaToWidth, (state, { id, delta, bodyClientWidthPixels, minWidthPixels, maxWidthPercent }) => ({
    ...state,
    timelineById: helpers_2.applyDeltaToCurrentWidth({
        id,
        delta,
        bodyClientWidthPixels,
        minWidthPixels,
        maxWidthPercent,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.pinEvent, (state, { id, eventId }) => ({
    ...state,
    timelineById: helpers_2.pinTimelineEvent({ id, eventId, timelineById: state.timelineById }),
}))
    .case(actions_1.removeColumn, (state, { id, columnId }) => ({
    ...state,
    timelineById: helpers_2.removeTimelineColumn({
        id,
        columnId,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.removeProvider, (state, { id, providerId, andProviderId }) => ({
    ...state,
    timelineById: helpers_2.removeTimelineProvider({
        id,
        providerId,
        timelineById: state.timelineById,
        andProviderId,
    }),
}))
    .case(actions_1.startTimelineSaving, (state, { id }) => ({
    ...state,
    timelineById: {
        ...state.timelineById,
        [id]: {
            ...state.timelineById[id],
            isSaving: true,
        },
    },
}))
    .case(actions_1.endTimelineSaving, (state, { id }) => ({
    ...state,
    timelineById: {
        ...state.timelineById,
        [id]: {
            ...state.timelineById[id],
            isSaving: false,
        },
    },
}))
    .case(actions_1.updateIsLoading, (state, { id, isLoading }) => ({
    ...state,
    timelineById: {
        ...state.timelineById,
        [id]: {
            ...state.timelineById[id],
            isLoading,
        },
    },
}))
    .case(actions_1.updateTimeline, (state, { id, timeline }) => ({
    ...state,
    timelineById: {
        ...state.timelineById,
        [id]: timeline,
    },
}))
    .case(actions_1.unPinEvent, (state, { id, eventId }) => ({
    ...state,
    timelineById: helpers_2.unPinTimelineEvent({ id, eventId, timelineById: state.timelineById }),
}))
    .case(actions_1.updateColumns, (state, { id, columns }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineColumns({
        id,
        columns,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.updateDescription, (state, { id, description }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineDescription({ id, description, timelineById: state.timelineById }),
}))
    .case(actions_1.updateIsFavorite, (state, { id, isFavorite }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineIsFavorite({ id, isFavorite, timelineById: state.timelineById }),
}))
    .case(actions_1.updateIsLive, (state, { id, isLive }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineIsLive({ id, isLive, timelineById: state.timelineById }),
}))
    .case(actions_1.updateKqlMode, (state, { id, kqlMode }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineKqlMode({ id, kqlMode, timelineById: state.timelineById }),
}))
    .case(actions_1.updateTitle, (state, { id, title }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineTitle({ id, title, timelineById: state.timelineById }),
}))
    .case(actions_1.updateProviders, (state, { id, providers }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineProviders({ id, providers, timelineById: state.timelineById }),
}))
    .case(actions_1.updateRange, (state, { id, start, end }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineRange({ id, start, end, timelineById: state.timelineById }),
}))
    .case(actions_1.updateSort, (state, { id, sort }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineSort({ id, sort, timelineById: state.timelineById }),
}))
    .case(actions_1.updateDataProviderEnabled, (state, { id, enabled, providerId, andProviderId }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineProviderEnabled({
        id,
        enabled,
        providerId,
        timelineById: state.timelineById,
        andProviderId,
    }),
}))
    .case(actions_1.updateDataProviderExcluded, (state, { id, excluded, providerId, andProviderId }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineProviderExcluded({
        id,
        excluded,
        providerId,
        timelineById: state.timelineById,
        andProviderId,
    }),
}))
    .case(actions_1.dataProviderEdited, (state, { andProviderId, excluded, field, id, operator, providerId, value }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineProviderProperties({
        andProviderId,
        excluded,
        field,
        id,
        operator,
        providerId,
        timelineById: state.timelineById,
        value,
    }),
}))
    .case(actions_1.updateDataProviderKqlQuery, (state, { id, kqlQuery, providerId }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineProviderKqlQuery({
        id,
        kqlQuery,
        providerId,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.updateItemsPerPage, (state, { id, itemsPerPage }) => ({
    ...state,
    timelineById: helpers_2.updateTimelineItemsPerPage({
        id,
        itemsPerPage,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.updatePageIndex, (state, { id, activePage }) => ({
    ...state,
    timelineById: helpers_2.updateTimelinePageIndex({
        id,
        activePage,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.updateItemsPerPageOptions, (state, { id, itemsPerPageOptions }) => ({
    ...state,
    timelineById: helpers_2.updateTimelinePerPageOptions({
        id,
        itemsPerPageOptions,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.updateHighlightedDropAndProviderId, (state, { id, providerId }) => ({
    ...state,
    timelineById: helpers_2.updateHighlightedDropAndProvider({
        id,
        providerId,
        timelineById: state.timelineById,
    }),
}))
    .case(actions_1.updateAutoSaveMsg, (state, { timelineId, newTimelineModel }) => ({
    ...state,
    autoSavedWarningMsg: {
        timelineId,
        newTimelineModel,
    },
}))
    .build();
