"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const PathReporter_1 = require("io-ts/lib/PathReporter");
const fp_1 = require("lodash/fp");
const framework_1 = require("../framework");
const types_1 = require("./types");
const saved_objects_1 = require("../../saved_objects");
const pick_saved_timeline_1 = require("../timeline/pick_saved_timeline");
const convert_saved_object_to_savedtimeline_1 = require("../timeline/convert_saved_object_to_savedtimeline");
class PinnedEvent {
    constructor(libs) {
        this.libs = libs;
    }
    async deletePinnedEventOnTimeline(request, pinnedEventIds) {
        await Promise.all(pinnedEventIds.map(pinnedEventId => this.libs.savedObjects
            .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
            .delete(saved_objects_1.pinnedEventSavedObjectType, pinnedEventId)));
    }
    async deleteAllPinnedEventsOnTimeline(request, timelineId) {
        const options = {
            search: timelineId,
            searchFields: ['timelineId'],
        };
        const pinnedEventToBeDeleted = await this.getAllSavedPinnedEvents(request, options);
        await Promise.all(pinnedEventToBeDeleted.map(pinnedEvent => this.libs.savedObjects
            .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
            .delete(saved_objects_1.pinnedEventSavedObjectType, pinnedEvent.pinnedEventId)));
    }
    async getPinnedEvent(request, pinnedEventId) {
        return await this.getSavedPinnedEvent(request, pinnedEventId);
    }
    async getAllPinnedEventsByTimelineId(request, timelineId) {
        const options = {
            search: timelineId,
            searchFields: ['timelineId'],
        };
        return await this.getAllSavedPinnedEvents(request, options);
    }
    async getAllPinnedEvents(request, pageInfo, search, sort) {
        const options = {
            perPage: pageInfo != null ? pageInfo.pageSize : undefined,
            page: pageInfo != null ? pageInfo.pageIndex : undefined,
            search: search != null ? search : undefined,
            searchFields: ['timelineId', 'eventId'],
            sortField: sort != null ? sort.sortField : undefined,
            sortOrder: sort != null ? sort.sortOrder : undefined,
        };
        return await this.getAllSavedPinnedEvents(request, options);
    }
    async persistPinnedEventOnTimeline(request, pinnedEventId, eventId, timelineId) {
        let timelineVersionSavedObject = null;
        try {
            if (timelineId == null) {
                const timelineResult = convert_saved_object_to_savedtimeline_1.convertSavedObjectToSavedTimeline(await this.libs.savedObjects
                    .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
                    .create(saved_objects_1.timelineSavedObjectType, pick_saved_timeline_1.pickSavedTimeline(null, {}, request[framework_1.internalFrameworkRequest].auth || null)));
                timelineId = timelineResult.savedObjectId;
                timelineVersionSavedObject = timelineResult.version;
            }
            if (pinnedEventId == null) {
                const allPinnedEventId = await this.getAllPinnedEventsByTimelineId(request, timelineId);
                const isPinnedAlreadyExisting = allPinnedEventId.filter(pinnedEvent => pinnedEvent.eventId === eventId);
                if (isPinnedAlreadyExisting.length === 0) {
                    const savedPinnedEvent = {
                        eventId,
                        timelineId,
                    };
                    // create Pinned Event on Timeline
                    return convertSavedObjectToSavedPinnedEvent(await this.libs.savedObjects
                        .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
                        .create(saved_objects_1.pinnedEventSavedObjectType, pickSavedPinnedEvent(pinnedEventId, savedPinnedEvent, request[framework_1.internalFrameworkRequest].auth || null)), timelineVersionSavedObject != null ? timelineVersionSavedObject : undefined);
                }
                return isPinnedAlreadyExisting[0];
            }
            // Delete Pinned Event on Timeline
            await this.deletePinnedEventOnTimeline(request, [pinnedEventId]);
            return null;
        }
        catch (err) {
            throw err;
        }
    }
    async getSavedPinnedEvent(request, pinnedEventId) {
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest]);
        const savedObject = await savedObjectsClient.get(saved_objects_1.pinnedEventSavedObjectType, pinnedEventId);
        return convertSavedObjectToSavedPinnedEvent(savedObject);
    }
    async getAllSavedPinnedEvents(request, options) {
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest]);
        const savedObjects = await savedObjectsClient.find({
            type: saved_objects_1.pinnedEventSavedObjectType,
            ...options,
        });
        return savedObjects.saved_objects.map(savedObject => convertSavedObjectToSavedPinnedEvent(savedObject));
    }
}
exports.PinnedEvent = PinnedEvent;
const convertSavedObjectToSavedPinnedEvent = (savedObject, timelineVersion) => types_1.PinnedEventSavedObjectRuntimeType.decode(savedObject)
    .map(savedPinnedEvent => ({
    pinnedEventId: savedPinnedEvent.id,
    version: savedPinnedEvent.version,
    timelineVersion,
    ...savedPinnedEvent.attributes,
}))
    .getOrElseL(errors => {
    throw new Error(PathReporter_1.failure(errors).join('\n'));
});
// we have to use any here because the SavedObjectAttributes interface is like below
// export interface SavedObjectAttributes {
//   [key: string]: SavedObjectAttributes | string | number | boolean | null;
// }
// then this interface does not allow types without index signature
// this is limiting us with our type for now so the easy way was to use any
const pickSavedPinnedEvent = (pinnedEventId, savedPinnedEvent, userInfo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    if (pinnedEventId == null) {
        savedPinnedEvent.created = new Date().valueOf();
        savedPinnedEvent.createdBy = fp_1.getOr(null, 'credentials.username', userInfo);
        savedPinnedEvent.updated = new Date().valueOf();
        savedPinnedEvent.updatedBy = fp_1.getOr(null, 'credentials.username', userInfo);
    }
    else if (pinnedEventId != null) {
        savedPinnedEvent.updated = new Date().valueOf();
        savedPinnedEvent.updatedBy = fp_1.getOr(null, 'credentials.username', userInfo);
    }
    return savedPinnedEvent;
};
