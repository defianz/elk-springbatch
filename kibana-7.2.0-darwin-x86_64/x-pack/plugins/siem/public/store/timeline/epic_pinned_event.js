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
const persist_gql_query_1 = require("../../containers/timeline/pinned_event/persist.gql_query");
const actions_1 = require("./actions");
const my_epic_timeline_id_1 = require("./my_epic_timeline_id");
const refetch_queries_1 = require("./refetch_queries");
const epic_dispatcher_timeline_persistence_queue_1 = require("./epic_dispatcher_timeline_persistence_queue");
exports.timelinePinnedEventActionsType = [actions_1.pinEvent.type, actions_1.unPinEvent.type];
exports.epicPersistPinnedEvent = (apolloClient, action, timeline, action$, timeline$
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => rxjs_1.from(apolloClient.mutate({
    mutation: persist_gql_query_1.persistTimelinePinnedEventMutation,
    fetchPolicy: 'no-cache',
    variables: {
        pinnedEventId: timeline[fp_1.get('payload.id', action)].pinnedEventsSaveObject[fp_1.get('payload.eventId', action)] != null
            ? timeline[fp_1.get('payload.id', action)].pinnedEventsSaveObject[fp_1.get('payload.eventId', action)].pinnedEventId
            : null,
        eventId: fp_1.get('payload.eventId', action),
        timelineId: my_epic_timeline_id_1.myEpicTimelineId.getTimelineId(),
    },
    refetchQueries: refetch_queries_1.refetchQueries,
})).pipe(operators_1.withLatestFrom(timeline$), operators_1.mergeMap(([result, recentTimeline]) => {
    const savedTimeline = recentTimeline[fp_1.get('payload.id', action)];
    const response = fp_1.get('data.persistPinnedEventOnTimeline', result);
    return [
        response != null
            ? actions_1.updateTimeline({
                id: fp_1.get('payload.id', action),
                timeline: {
                    ...savedTimeline,
                    savedObjectId: savedTimeline.savedObjectId == null && response.timelineId != null
                        ? response.timelineId
                        : savedTimeline.savedObjectId,
                    version: savedTimeline.version == null && response.timelineVersion != null
                        ? response.timelineVersion
                        : savedTimeline.version,
                    pinnedEventsSaveObject: {
                        ...savedTimeline.pinnedEventsSaveObject,
                        [fp_1.get('payload.eventId', action)]: response,
                    },
                },
            })
            : actions_1.updateTimeline({
                id: fp_1.get('payload.id', action),
                timeline: {
                    ...savedTimeline,
                    pinnedEventsSaveObject: fp_1.omit(fp_1.get('payload.eventId', action), savedTimeline.pinnedEventsSaveObject),
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
exports.createTimelinePinnedEventEpic = () => action$ => action$.pipe(operators_1.filter(action => exports.timelinePinnedEventActionsType.includes(action.type)), operators_1.mergeMap(action => {
    epic_dispatcher_timeline_persistence_queue_1.dispatcherTimelinePersistQueue.next({ action });
    return rxjs_1.empty();
}));
