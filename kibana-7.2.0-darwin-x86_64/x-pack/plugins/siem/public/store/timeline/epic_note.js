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
const persist_gql_query_1 = require("../../containers/timeline/notes/persist.gql_query");
const actions_1 = require("../app/actions");
const actions_2 = require("./actions");
const my_epic_timeline_id_1 = require("./my_epic_timeline_id");
const refetch_queries_1 = require("./refetch_queries");
const epic_dispatcher_timeline_persistence_queue_1 = require("./epic_dispatcher_timeline_persistence_queue");
exports.timelineNoteActionsType = [actions_2.addNote.type, actions_2.addNoteToEvent.type];
exports.epicPersistNote = (apolloClient, action, timeline, notes, action$, timeline$, notes$
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => rxjs_1.from(apolloClient.mutate({
    mutation: persist_gql_query_1.persistTimelineNoteMutation,
    fetchPolicy: 'no-cache',
    variables: {
        noteId: null,
        version: null,
        note: {
            eventId: fp_1.get('payload.eventId', action),
            note: getNote(fp_1.get('payload.noteId', action), notes),
            timelineId: my_epic_timeline_id_1.myEpicTimelineId.getTimelineId(),
        },
    },
    refetchQueries: refetch_queries_1.refetchQueries,
})).pipe(operators_1.withLatestFrom(timeline$, notes$), operators_1.mergeMap(([result, recentTimeline, recentNotes]) => {
    const noteIdRedux = fp_1.get('payload.noteId', action);
    const response = fp_1.get('data.persistNote', result);
    return [
        recentTimeline[fp_1.get('payload.id', action)].savedObjectId == null
            ? actions_2.updateTimeline({
                id: fp_1.get('payload.id', action),
                timeline: {
                    ...recentTimeline[fp_1.get('payload.id', action)],
                    savedObjectId: response.note.timelineId || null,
                    version: response.note.timelineVersion || null,
                },
            })
            : null,
        actions_1.updateNote({
            note: {
                ...recentNotes[noteIdRedux],
                created: response.note.updated != null
                    ? new Date(response.note.updated)
                    : recentNotes[noteIdRedux].created,
                user: response.note.updatedBy != null
                    ? response.note.updatedBy
                    : recentNotes[noteIdRedux].user,
                saveObjectId: response.note.noteId,
                version: response.note.version,
            },
        }),
        actions_2.endTimelineSaving({
            id: fp_1.get('payload.id', action),
        }),
    ].filter(item => item != null);
}), operators_1.startWith(actions_2.startTimelineSaving({ id: fp_1.get('payload.id', action) })), operators_1.takeUntil(action$.pipe(operators_1.withLatestFrom(timeline$), operators_1.filter(([checkAction, updatedTimeline]) => {
    if (checkAction.type === actions_2.endTimelineSaving.type &&
        updatedTimeline[fp_1.get('payload.id', checkAction)].savedObjectId != null) {
        my_epic_timeline_id_1.myEpicTimelineId.setTimelineId(updatedTimeline[fp_1.get('payload.id', checkAction)].savedObjectId);
        my_epic_timeline_id_1.myEpicTimelineId.setTimelineVersion(updatedTimeline[fp_1.get('payload.id', checkAction)].version);
        return true;
    }
    return false;
}))));
exports.createTimelineNoteEpic = () => action$ => action$.pipe(operators_1.withLatestFrom(), operators_1.filter(([action]) => exports.timelineNoteActionsType.includes(action.type)), operators_1.switchMap(([action]) => {
    epic_dispatcher_timeline_persistence_queue_1.dispatcherTimelinePersistQueue.next({ action });
    return rxjs_1.empty();
}));
const getNote = (noteId, notes) => {
    if (noteId != null) {
        return notes[noteId].note;
    }
    return '';
};
