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
const saved_object_mappings_1 = require("./saved_object_mappings");
const saved_objects_1 = require("../../saved_objects");
const pick_saved_timeline_1 = require("../timeline/pick_saved_timeline");
const convert_saved_object_to_savedtimeline_1 = require("../timeline/convert_saved_object_to_savedtimeline");
class Note {
    constructor(libs) {
        this.libs = libs;
    }
    async deleteNote(request, noteIds) {
        await Promise.all(noteIds.map(noteId => this.libs.savedObjects
            .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
            .delete(saved_object_mappings_1.noteSavedObjectType, noteId)));
    }
    async deleteNoteByTimelineId(request, timelineId) {
        const options = {
            search: timelineId,
            searchFields: ['timelineId'],
        };
        const notesToBeDeleted = await this.getAllSavedNote(request, options);
        await Promise.all(notesToBeDeleted.notes.map(note => this.libs.savedObjects
            .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
            .delete(saved_object_mappings_1.noteSavedObjectType, note.noteId)));
    }
    async getNote(request, noteId) {
        return await this.getSavedNote(request, noteId);
    }
    async getNotesByEventId(request, eventId) {
        const options = {
            search: eventId,
            searchFields: ['eventId'],
        };
        const notesByEventId = await this.getAllSavedNote(request, options);
        return notesByEventId.notes;
    }
    async getNotesByTimelineId(request, timelineId) {
        const options = {
            search: timelineId,
            searchFields: ['timelineId'],
        };
        const notesByTimelineId = await this.getAllSavedNote(request, options);
        return notesByTimelineId.notes;
    }
    async getAllNotes(request, pageInfo, search, sort) {
        const options = {
            perPage: pageInfo != null ? pageInfo.pageSize : undefined,
            page: pageInfo != null ? pageInfo.pageIndex : undefined,
            search: search != null ? search : undefined,
            searchFields: ['note'],
            sortField: sort != null ? sort.sortField : undefined,
            sortOrder: sort != null ? sort.sortOrder : undefined,
        };
        return await this.getAllSavedNote(request, options);
    }
    async persistNote(request, noteId, version, note) {
        let timelineVersionSavedObject = null;
        try {
            if (note.timelineId == null) {
                const timelineResult = convert_saved_object_to_savedtimeline_1.convertSavedObjectToSavedTimeline(await this.libs.savedObjects
                    .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
                    .create(saved_objects_1.timelineSavedObjectType, pick_saved_timeline_1.pickSavedTimeline(null, {}, request[framework_1.internalFrameworkRequest].auth || null)));
                note.timelineId = timelineResult.savedObjectId;
                timelineVersionSavedObject = timelineResult.version;
            }
            if (noteId == null) {
                // Create new note
                return {
                    code: 200,
                    message: 'success',
                    note: convertSavedObjectToSavedNote(await this.libs.savedObjects
                        .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
                        .create(saved_object_mappings_1.noteSavedObjectType, pickSavedNote(noteId, note, request[framework_1.internalFrameworkRequest].auth || null)), timelineVersionSavedObject != null ? timelineVersionSavedObject : undefined),
                };
            }
            // Update new note
            return {
                code: 200,
                message: 'success',
                note: convertSavedObjectToSavedNote(await this.libs.savedObjects
                    .getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest])
                    .update(saved_object_mappings_1.noteSavedObjectType, noteId, pickSavedNote(noteId, note, request[framework_1.internalFrameworkRequest].auth || null), {
                    version: version || undefined,
                })),
            };
        }
        catch (err) {
            throw err;
        }
    }
    async getSavedNote(request, NoteId) {
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest]);
        const savedObject = await savedObjectsClient.get(saved_object_mappings_1.noteSavedObjectType, NoteId);
        return convertSavedObjectToSavedNote(savedObject);
    }
    async getAllSavedNote(request, options) {
        const savedObjectsClient = this.libs.savedObjects.getScopedSavedObjectsClient(request[framework_1.internalFrameworkRequest]);
        const savedObjects = await savedObjectsClient.find({
            type: saved_object_mappings_1.noteSavedObjectType,
            ...options,
        });
        return {
            totalCount: savedObjects.total,
            notes: savedObjects.saved_objects.map(savedObject => convertSavedObjectToSavedNote(savedObject)),
        };
    }
}
exports.Note = Note;
const convertSavedObjectToSavedNote = (savedObject, timelineVersion) => types_1.NoteSavedObjectRuntimeType.decode(savedObject)
    .map(savedNote => ({
    noteId: savedNote.id,
    version: savedNote.version,
    timelineVersion,
    ...savedNote.attributes,
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
const pickSavedNote = (noteId, savedNote, userInfo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    if (noteId == null) {
        savedNote.created = new Date().valueOf();
        savedNote.createdBy = fp_1.getOr(null, 'credentials.username', userInfo);
        savedNote.updated = new Date().valueOf();
        savedNote.updatedBy = fp_1.getOr(null, 'credentials.username', userInfo);
    }
    else if (noteId != null) {
        savedNote.updated = new Date().valueOf();
        savedNote.updatedBy = fp_1.getOr(null, 'credentials.username', userInfo);
    }
    return savedNote;
};
