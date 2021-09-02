"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const fp_1 = require("lodash/fp");
const i18n = tslib_1.__importStar(require("./translations"));
/** The (fixed) width of the Actions column */
exports.ACTIONS_COLUMN_WIDTH = 115; // px;
/** The default minimum width of a column (when a width for the column type is not specified) */
exports.DEFAULT_COLUMN_MIN_WIDTH = 180; // px
/** The default minimum width of a column of type `date` */
exports.DEFAULT_DATE_COLUMN_MIN_WIDTH = 240; // px
exports.DEFAULT_TIMELINE_WIDTH = 1100; // px
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.omitTypenameAndEmpty = (k, v) => k !== '__typename' && v != null ? v : undefined;
exports.stringifyEvent = (ecs) => JSON.stringify(ecs, exports.omitTypenameAndEmpty, 2);
exports.eventHasNotes = (noteIds) => !fp_1.isEmpty(noteIds);
exports.getPinTooltip = ({ isPinned, 
// eslint-disable-next-line no-shadow
eventHasNotes, }) => (isPinned && eventHasNotes ? i18n.PINNED_WITH_NOTES : isPinned ? i18n.PINNED : i18n.UNPINNED);
exports.eventIsPinned = ({ eventId, pinnedEventIds }) => pinnedEventIds[eventId] === true;
exports.getPinOnClick = ({ allowUnpinning, eventId, onPinEvent, onUnPinEvent, pinnedEventIds, }) => {
    if (!allowUnpinning) {
        return fp_1.noop;
    }
    return exports.eventIsPinned({ eventId, pinnedEventIds })
        ? () => onUnPinEvent(eventId)
        : () => onPinEvent(eventId);
};
exports.getColumnWidthFromType = (type) => type !== 'date' ? exports.DEFAULT_COLUMN_MIN_WIDTH : exports.DEFAULT_DATE_COLUMN_MIN_WIDTH;
/** Enriches the column headers with field details from the specified browserFields */
exports.getColumnHeaders = (headers, browserFields) => {
    return headers.map(header => {
        const splitHeader = header.id.split('.'); // source.geo.city_name -> [source, geo, city_name]
        return {
            ...header,
            ...fp_1.get([splitHeader.length > 1 ? splitHeader[0] : 'base', 'fields', header.id], browserFields),
        };
    });
};
