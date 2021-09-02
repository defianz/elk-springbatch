"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const framework_1 = require("../framework");
const saved_object_1 = require("../note/saved_object");
const saved_object_2 = require("../pinned_event/saved_object");
const saved_object_mappings_1 = require("./saved_object_mappings");
const pick_saved_timeline_1 = require("./pick_saved_timeline");
const convert_saved_object_to_savedtimeline_1 = require("./convert_saved_object_to_savedtimeline");
class Timeline {
    constructor(libs) {
        this.libs = libs;
        this.note = new saved_object_1.Note({ savedObjects: this.libs.savedObjects });
        this.pinnedEvent = new saved_object_2.PinnedEvent({ savedObjects: this.libs.savedObjects });
    }
    async getTimeline(request, timelineId) {
        return await this.getSavedTimeline(request, timelineId);
    }
    async getAllTimeline(request, onlyUserFavorite, pageInfo, search, sort) {
        const options = {
            perPage: pageInfo != null ? pageInfo.pageSize : undefined,
            page: pageInfo != null ? pageInfo.pageIndex : undefined,
            search: search != null ? search : undefined,
            searchFields: onlyUserFavorite
                ? ['title', 'description', 'favorite.keySearch']
                : ['title', 'description'],
            sortField: sort != null ? sort.sortField : undefined,
            sortOrder: sort != null ? sort.sortOrder : undefined,
        };
        return await this.getAllSavedTimeline(request, options);
    }
    async persistFavorite(request, timelineId) {
        let timeline = {};
        if (timelineId != null) {
            const { eventIdToNoteIds, notes, noteIds, pinnedEventIds, pinnedEventsSaveObject, savedObjectId, version, ...savedTimeline } = await this.getBasicSavedTimeline(request, timelineId);
            timelineId = savedObjectId;
            timeline = savedTimeline;
        }
        const userName = fp_1.getOr(null, 'credentials.username', request[framework_1.internalFrameworkRequest].auth);
        const fullName = fp_1.getOr(null, 'credentials.fullname', request[framework_1.internalFrameworkRequest].auth);
        const userFavoriteTimeline = {
            keySearch: userName != null ? exports.convertStringToBase64(userName) : null,
            favoriteDate: new Date().valueOf(),
            fullName,
            userName,
        };
        if (timeline.favorite != null) {
            const alreadyExistsTimelineFavoriteByUser = timeline.favorite.findIndex(user => user.userName === userName);
            timeline.favorite =
                alreadyExistsTimelineFavoriteByUser > -1
                    ? [
                        ...timeline.favorite.slice(0, alreadyExistsTimelineFavoriteByUser),
                        ...timeline.favorite.slice(alreadyExistsTimelineFavoriteByUser + 1),
                    ]
                    : [...timeline.favorite, userFavoriteTimeline];
        }
        else if (timeline.favorite == null) {
            timeline.favorite = [userFavoriteTimeline];
        }
        const persistResponse = await this.persistTimeline(request, timelineId, null, timeline);
        return {
            savedObjectId: persistResponse.timeline.savedObjectId,
            version: persistResponse.timeline.version,
            favorite: persistResponse.timeline.favorite != null
                ? persistResponse.timeline.favorite.filter(fav => fav.userName === userName)
                : [],
        };
    }
    async persistTimeline(request, timelineId, version, timeline) {
        if (timelineId == null) {
            // Create new timeline
            return {
                code: 200,
                message: 'success',
                timeline: convert_saved_object_to_savedtimeline_1.convertSavedObjectToSavedTimeline(await this.libs.savedObjects
                    .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
                    .create(saved_object_mappings_1.timelineSavedObjectType, pick_saved_timeline_1.pickSavedTimeline(timelineId, timeline, request[framework_1.internalFrameworkRequest].auth || null))),
            };
        }
        try {
            // Update Timeline
            await this.libs.savedObjects
                .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
                .update(saved_object_mappings_1.timelineSavedObjectType, timelineId, pick_saved_timeline_1.pickSavedTimeline(timelineId, timeline, request[framework_1.internalFrameworkRequest].auth || null), {
                version: version || undefined,
            });
            return {
                code: 200,
                message: 'success',
                timeline: await this.getSavedTimeline(request, timelineId),
            };
        }
        catch (err) {
            if (this.libs.savedObjects.SavedObjectsClient.errors.isConflictError(err)) {
                return {
                    code: 409,
                    message: err.message,
                    timeline: await this.getSavedTimeline(request, timelineId),
                };
            }
            throw err;
        }
    }
    async deleteTimeline(request, timelineIds) {
        await Promise.all(timelineIds.map(timelineId => Promise.all([
            this.libs.savedObjects
                .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
                .delete(saved_object_mappings_1.timelineSavedObjectType, timelineId),
            this.note.deleteNoteByTimelineId(request, timelineId),
            this.pinnedEvent.deleteAllPinnedEventsOnTimeline(request, timelineId),
        ])));
    }
    async getBasicSavedTimeline(request, timelineId) {
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest]);
        const savedObject = await savedObjectsClient.get(saved_object_mappings_1.timelineSavedObjectType, timelineId);
        return convert_saved_object_to_savedtimeline_1.convertSavedObjectToSavedTimeline(savedObject);
    }
    async getSavedTimeline(request, timelineId) {
        const userName = fp_1.getOr(null, 'credentials.username', request[framework_1.internalFrameworkRequest].auth);
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest]);
        const savedObject = await savedObjectsClient.get(saved_object_mappings_1.timelineSavedObjectType, timelineId);
        const timelineSaveObject = convert_saved_object_to_savedtimeline_1.convertSavedObjectToSavedTimeline(savedObject);
        const timelineWithNotesAndPinnedEvents = await Promise.all([
            this.note.getNotesByTimelineId(request, timelineSaveObject.savedObjectId),
            this.pinnedEvent.getAllPinnedEventsByTimelineId(request, timelineSaveObject.savedObjectId),
            Promise.resolve(timelineSaveObject),
        ]);
        const [notes, pinnedEvents, timeline] = timelineWithNotesAndPinnedEvents;
        return timelineWithReduxProperties(notes, pinnedEvents, timeline, userName);
    }
    async getAllSavedTimeline(request, options) {
        const userName = fp_1.getOr(null, 'credentials.username', request[framework_1.internalFrameworkRequest].auth);
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest]);
        if (options.searchFields != null && options.searchFields.includes('favorite.keySearch')) {
            options.search = `${options.search != null ? options.search : ''} ${userName != null ? exports.convertStringToBase64(userName) : null}`;
        }
        const savedObjects = await savedObjectsClient.find({
            type: saved_object_mappings_1.timelineSavedObjectType,
            ...options,
        });
        const timelinesWithNotesAndPinnedEvents = await Promise.all(savedObjects.saved_objects.map(async (savedObject) => {
            const timelineSaveObject = convert_saved_object_to_savedtimeline_1.convertSavedObjectToSavedTimeline(savedObject);
            return Promise.all([
                this.note.getNotesByTimelineId(request, timelineSaveObject.savedObjectId),
                this.pinnedEvent.getAllPinnedEventsByTimelineId(request, timelineSaveObject.savedObjectId),
                Promise.resolve(timelineSaveObject),
            ]);
        }));
        return {
            totalCount: savedObjects.total,
            timeline: timelinesWithNotesAndPinnedEvents.map(([notes, pinnedEvents, timeline]) => timelineWithReduxProperties(notes, pinnedEvents, timeline, userName)),
        };
    }
}
exports.Timeline = Timeline;
exports.convertStringToBase64 = (text) => Buffer.from(text).toString('base64');
// we have to use any here because the SavedObjectAttributes interface is like below
// export interface SavedObjectAttributes {
//   [key: string]: SavedObjectAttributes | string | number | boolean | null;
// }
// then this interface does not allow types without index signature
// this is limiting us with our type for now so the easy way was to use any
const timelineWithReduxProperties = (notes, pinnedEvents, timeline, userName) => ({
    ...timeline,
    favorite: timeline.favorite != null ? timeline.favorite.filter(fav => fav.userName === userName) : [],
    eventIdToNoteIds: notes.filter(note => note.eventId != null),
    noteIds: notes
        .filter(note => note.eventId == null && note.noteId != null)
        .map(note => note.noteId),
    notes,
    pinnedEventIds: pinnedEvents.map(pinnedEvent => pinnedEvent.eventId),
    pinnedEventsSaveObject: pinnedEvents,
});
