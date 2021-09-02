"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const moment_1 = tslib_1.__importDefault(require("moment"));
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const i18n = tslib_1.__importStar(require("./translations"));
const page_1 = require("../page");
/**
 * Defines the behavior of the search input that appears above the table of data
 */
exports.search = {
    box: {
        incremental: true,
        placeholder: i18n.SEARCH_PLACEHOLDER,
        schema: {
            user: {
                type: 'string',
            },
            note: {
                type: 'string',
            },
        },
    },
};
const TitleText = styled_components_1.default.h3 `
  margin: 0 5px;
  cursor: default;
  user-select: none;
`;
/** Displays a count of the existing notes */
exports.NotesCount = recompose_1.pure(({ noteIds }) => (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none" },
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(eui_1.EuiIcon, { color: "text", size: "l", type: "editorComment" })),
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(eui_1.EuiTitle, { size: "s" },
            React.createElement(TitleText, null, i18n.NOTES))),
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(page_1.CountBadge, { color: "hollow" }, noteIds.length)))));
/** Creates a new instance of a `note` */
exports.createNote = ({ newNote, getNewNoteId, }) => ({
    created: moment_1.default.utc().toDate(),
    id: getNewNoteId(),
    lastEdit: null,
    note: newNote.trim(),
    saveObjectId: null,
    user: 'elastic',
    version: null,
});
exports.updateAndAssociateNode = ({ associateNote, getNewNoteId, newNote, updateNewNote, updateNote, }) => {
    const note = exports.createNote({ newNote, getNewNoteId });
    updateNote(note); // perform IO to store the newly-created note
    associateNote(note.id); // associate the note with the (opaque) thing
    updateNewNote(''); // clear the input
};
