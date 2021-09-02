"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const formatted_date_1 = require("../../formatted_date");
const empty_value_1 = require("../../empty_value");
const helpers_1 = require("../helpers");
const note_previews_1 = require("../note_previews");
const i18n = tslib_1.__importStar(require("../translations"));
/** the width of the description column when showing extended columns */
exports.EXTENDED_COLUMNS_DESCRIPTION_WIDTH = '30%';
exports.DESCRIPTION_WIDTH = '45%';
const ExpandButtonContainer = styled_components_1.default.div `
  position: relative;
  top -4px;
`;
/**
 * Returns the column definitions (passed as the `columns` prop to
 * `EuiBasicTable`) that are common to the compact `Open Timeline` modal view,
 * and the full view shown in the `All Timelines` view of the `Timelines` page
 */
exports.getCommonColumns = ({ itemIdToExpandedNotesRowMap, onOpenTimeline, onToggleShowNotes, showExtendedColumnsAndActions, }) => [
    {
        isExpander: true,
        render: ({ notes, savedObjectId }) => notes != null && notes.length > 0 && savedObjectId != null ? (React.createElement(ExpandButtonContainer, null,
            React.createElement(eui_1.EuiButtonIcon, { "data-test-subj": "expand-notes", onClick: () => itemIdToExpandedNotesRowMap[savedObjectId] != null
                    ? onToggleShowNotes(fp_1.omit(savedObjectId, itemIdToExpandedNotesRowMap))
                    : onToggleShowNotes({
                        ...itemIdToExpandedNotesRowMap,
                        [savedObjectId]: (React.createElement(note_previews_1.NotePreviews, { notes: notes, isModal: !showExtendedColumnsAndActions })),
                    }), "aria-label": itemIdToExpandedNotesRowMap[savedObjectId] ? i18n.COLLAPSE : i18n.EXPAND, iconType: itemIdToExpandedNotesRowMap[savedObjectId] ? 'arrowDown' : 'arrowRight' }))) : null,
        width: '32px',
    },
    {
        dataType: 'string',
        field: 'title',
        name: i18n.TIMELINE_NAME,
        render: (title, timelineResult) => timelineResult.savedObjectId != null ? (React.createElement(eui_1.EuiLink, { "data-test-subj": `title-${timelineResult.savedObjectId}`, onClick: () => onOpenTimeline({
                duplicate: false,
                timelineId: `${timelineResult.savedObjectId}`,
            }) }, helpers_1.isUntitled(timelineResult) ? i18n.UNTITLED_TIMELINE : title)) : (React.createElement("div", { "data-test-subj": `title-no-saved-object-id-${title || 'no-title'}` }, helpers_1.isUntitled(timelineResult) ? i18n.UNTITLED_TIMELINE : title)),
        sortable: false,
    },
    {
        dataType: 'string',
        field: 'description',
        name: i18n.DESCRIPTION,
        render: (description) => (React.createElement("span", { "data-test-subj": "description" }, description != null && description.trim().length > 0 ? description : empty_value_1.getEmptyTagValue())),
        sortable: false,
        width: showExtendedColumnsAndActions ? exports.EXTENDED_COLUMNS_DESCRIPTION_WIDTH : exports.DESCRIPTION_WIDTH,
    },
    {
        dataType: 'date',
        field: 'updated',
        name: i18n.LAST_MODIFIED,
        render: (date, timelineResult) => (React.createElement("div", { "data-test-subj": "updated" }, timelineResult.updated != null ? (React.createElement(formatted_date_1.FormattedDate, { fieldName: "", value: date })) : (empty_value_1.getEmptyTagValue()))),
        sortable: true,
    },
];
