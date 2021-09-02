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
const persist_gql_query_1 = require("../../containers/timeline/favorite/persist.gql_query");
const actions_1 = require("./actions");
const epic_dispatcher_timeline_persistence_queue_1 = require("./epic_dispatcher_timeline_persistence_queue");
const refetch_queries_1 = require("./refetch_queries");
const my_epic_timeline_id_1 = require("./my_epic_timeline_id");
exports.timelineFavoriteActionsType = [actions_1.updateIsFavorite.type];
exports.epicPersistTimelineFavorite = (apolloClient, action, timeline, action$, timeline$
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => rxjs_1.from(apolloClient.mutate({
    mutation: persist_gql_query_1.persistTimelineFavoriteMutation,
    fetchPolicy: 'no-cache',
    variables: {
        timelineId: my_epic_timeline_id_1.myEpicTimelineId.getTimelineId(),
    },
    refetchQueries: refetch_queries_1.refetchQueries,
})).pipe(operators_1.withLatestFrom(timeline$), operators_1.mergeMap(([result, recentTimelines]) => {
    const savedTimeline = recentTimelines[fp_1.get('payload.id', action)];
    const response = fp_1.get('data.persistFavorite', result);
    return [
        actions_1.updateTimeline({
            id: fp_1.get('payload.id', action),
            timeline: {
                ...savedTimeline,
                isFavorite: response.favorite != null && response.favorite.length > 0,
                savedObjectId: response.savedObjectId || null,
                version: response.version || null,
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
exports.createTimelineFavoriteEpic = () => action$ => {
    return action$.pipe(operators_1.filter(action => exports.timelineFavoriteActionsType.includes(action.type)), operators_1.mergeMap(action => {
        epic_dispatcher_timeline_persistence_queue_1.dispatcherTimelinePersistQueue.next({ action });
        return rxjs_1.empty();
    }));
};
