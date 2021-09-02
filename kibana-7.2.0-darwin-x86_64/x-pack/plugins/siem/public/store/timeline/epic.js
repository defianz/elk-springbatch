"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const persist_gql_query_1 = require("../../containers/timeline/persist.gql_query");
const actions_1 = require("./actions");
const epic_note_1 = require("./epic_note");
const epic_pinned_event_1 = require("./epic_pinned_event");
const epic_favorite_1 = require("./epic_favorite");
const helpers_1 = require("./helpers");
const epic_dispatcher_timeline_persistence_queue_1 = require("./epic_dispatcher_timeline_persistence_queue");
const refetch_queries_1 = require("./refetch_queries");
const my_epic_timeline_id_1 = require("./my_epic_timeline_id");
const timelineActionsType = [
    actions_1.applyKqlFilterQuery.type,
    actions_1.addProvider.type,
    actions_1.dataProviderEdited.type,
    actions_1.removeColumn.type,
    actions_1.removeProvider.type,
    actions_1.updateColumns.type,
    actions_1.updateDataProviderEnabled.type,
    actions_1.updateDataProviderExcluded.type,
    actions_1.updateDataProviderKqlQuery.type,
    actions_1.updateDescription.type,
    actions_1.updateKqlMode.type,
    actions_1.updateProviders.type,
    actions_1.updateSort.type,
    actions_1.updateTitle.type,
    actions_1.updateRange.type,
    actions_1.upsertColumn.type,
];
exports.createTimelineEpic = () => (action$, state$, { selectNotesByIdSelector, timelineByIdSelector, timelineTimeRangeSelector, apolloClient$ }) => {
    const timeline$ = state$.pipe(operators_1.map(timelineByIdSelector), operators_1.filter(helpers_1.isNotNull));
    const notes$ = state$.pipe(operators_1.map(selectNotesByIdSelector), operators_1.filter(helpers_1.isNotNull));
    const timelineTimeRange$ = state$.pipe(operators_1.map(timelineTimeRangeSelector), operators_1.filter(helpers_1.isNotNull));
    return rxjs_1.merge(action$.pipe(operators_1.withLatestFrom(timeline$), operators_1.filter(([action, timeline]) => {
        const timelineId = timeline[fp_1.get('payload.id', action)];
        if (action.type === actions_1.createTimeline.type) {
            my_epic_timeline_id_1.myEpicTimelineId.setTimelineId(null);
            my_epic_timeline_id_1.myEpicTimelineId.setTimelineVersion(null);
        }
        else if (action.type === actions_1.addTimeline.type) {
            const addNewTimeline = fp_1.get('payload.timeline', action);
            my_epic_timeline_id_1.myEpicTimelineId.setTimelineId(addNewTimeline.savedObjectId);
            my_epic_timeline_id_1.myEpicTimelineId.setTimelineVersion(addNewTimeline.version);
        }
        else if (timelineActionsType.includes(action.type) && !timelineId.isLoading) {
            return true;
        }
        return false;
    }), operators_1.debounceTime(500), operators_1.mergeMap(([action]) => {
        epic_dispatcher_timeline_persistence_queue_1.dispatcherTimelinePersistQueue.next({ action });
        return rxjs_1.empty();
    })), epic_dispatcher_timeline_persistence_queue_1.dispatcherTimelinePersistQueue.pipe(operators_1.delay(500), operators_1.withLatestFrom(timeline$, apolloClient$, notes$, timelineTimeRange$), operators_1.concatMap(([objAction, timeline, apolloClient, notes, timelineTimeRange]) => {
        const action = fp_1.get('action', objAction);
        const timelineId = my_epic_timeline_id_1.myEpicTimelineId.getTimelineId();
        const version = my_epic_timeline_id_1.myEpicTimelineId.getTimelineVersion();
        if (epic_note_1.timelineNoteActionsType.includes(action.type)) {
            return epic_note_1.epicPersistNote(apolloClient, action, timeline, notes, action$, timeline$, notes$);
        }
        else if (epic_pinned_event_1.timelinePinnedEventActionsType.includes(action.type)) {
            return epic_pinned_event_1.epicPersistPinnedEvent(apolloClient, action, timeline, action$, timeline$);
        }
        else if (epic_favorite_1.timelineFavoriteActionsType.includes(action.type)) {
            return epic_favorite_1.epicPersistTimelineFavorite(apolloClient, action, timeline, action$, timeline$);
        }
        else if (timelineActionsType.includes(action.type)) {
            return rxjs_1.from(apolloClient.mutate({
                mutation: persist_gql_query_1.persistTimelineMutation,
                fetchPolicy: 'no-cache',
                variables: {
                    timelineId,
                    version,
                    timeline: convertTimelineAsInput(timeline[fp_1.get('payload.id', action)], timelineTimeRange),
                },
                refetchQueries: refetch_queries_1.refetchQueries,
            })).pipe(operators_1.withLatestFrom(timeline$), operators_1.mergeMap(([result, recentTimeline]) => {
                const savedTimeline = recentTimeline[fp_1.get('payload.id', action)];
                const response = fp_1.get('data.persistTimeline', result);
                return [
                    response.code === 409
                        ? actions_1.updateAutoSaveMsg({
                            timelineId: fp_1.get('payload.id', action),
                            newTimelineModel: omitTypenameInTimeline(savedTimeline, response.timeline),
                        })
                        : actions_1.updateTimeline({
                            id: fp_1.get('payload.id', action),
                            timeline: {
                                ...savedTimeline,
                                savedObjectId: response.timeline.savedObjectId,
                                version: response.timeline.version,
                                isSaving: false,
                            },
                        }),
                    actions_1.endTimelineSaving({
                        id: fp_1.get('payload.id', action),
                    }),
                ];
            }), operators_1.startWith(actions_1.startTimelineSaving({ id: fp_1.get('payload.id', action) })), operators_1.takeUntil(action$.pipe(operators_1.withLatestFrom(timeline$), operators_1.filter(([checkAction, updatedTimeline]) => {
                if (checkAction.type === actions_1.endTimelineSaving.type &&
                    updatedTimeline[fp_1.get('payload.id', checkAction)].savedObjectId != null) {
                    my_epic_timeline_id_1.myEpicTimelineId.setTimelineId(updatedTimeline[fp_1.get('payload.id', checkAction)].savedObjectId);
                    my_epic_timeline_id_1.myEpicTimelineId.setTimelineVersion(updatedTimeline[fp_1.get('payload.id', checkAction)].version);
                    return true;
                }
                return false;
            }))));
        }
        return rxjs_1.empty();
    })));
};
const timelineInput = {
    columns: null,
    dataProviders: null,
    description: null,
    kqlMode: null,
    kqlQuery: null,
    title: null,
    dateRange: null,
    sort: null,
};
const convertTimelineAsInput = (timeline, timelineTimeRange) => Object.keys(timelineInput).reduce((acc, key) => {
    if (fp_1.has(key, timeline)) {
        if (key === 'kqlQuery') {
            return fp_1.set(`${key}.filterQuery`, fp_1.get(`${key}.filterQuery`, timeline), acc);
        }
        else if (key === 'dateRange') {
            return fp_1.set(`${key}`, { start: timelineTimeRange.from, end: timelineTimeRange.to }, acc);
        }
        else if (key === 'columns' && fp_1.get(key, timeline) != null) {
            return fp_1.set(key, fp_1.get(key, timeline).map((col) => fp_1.omit(['width', '__typename'], col)), acc);
        }
        return fp_1.set(key, fp_1.get(key, timeline), acc);
    }
    return acc;
}, timelineInput);
const omitTypename = (key, value) => key === '__typename' ? undefined : value;
const omitTypenameInTimeline = (oldTimeline, newTimeline) => JSON.parse(JSON.stringify(fp_1.merge(oldTimeline, newTimeline)), omitTypename);
