"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPEN_TIMELINE_CLASS_NAME = 'open-timeline';
/** Returns a count of the pinned events in a timeline */
exports.getPinnedEventCount = ({ pinnedEventIds }) => pinnedEventIds != null ? Object.keys(pinnedEventIds).length : 0;
/** Returns the sum of all notes added to pinned events and notes applicable to the timeline */
exports.getNotesCount = ({ eventIdToNoteIds, noteIds }) => {
    const eventNoteCount = eventIdToNoteIds != null
        ? Object.keys(eventIdToNoteIds).reduce((count, eventId) => count + eventIdToNoteIds[eventId].length, 0)
        : 0;
    const globalNoteCount = noteIds != null ? noteIds.length : 0;
    return eventNoteCount + globalNoteCount;
};
/** Returns true if the timeline is untitlied */
exports.isUntitled = ({ title }) => title == null || title.trim().length === 0;
