"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const add_note_1 = require("./add_note");
const columns_1 = require("./columns");
const helpers_1 = require("./helpers");
const notes_size_1 = require("../timeline/properties/notes_size");
const NotesPanel = styled_components_1.default(eui_1.EuiPanel) `
  height: ${notes_size_1.NOTES_PANEL_HEIGHT}px;
  width: ${notes_size_1.NOTES_PANEL_WIDTH}px;

  & thead {
    display: none;
  }
`;
const InMemoryTable = styled_components_1.default(eui_1.EuiInMemoryTable) `
  overflow-x: hidden;
  overflow-y: auto;
  height: 220px;
`;
/** A view for entering and reviewing notes */
class Notes extends React.PureComponent {
    constructor(props) {
        super(props);
        this.updateNewNote = (newNote) => {
            this.setState({ newNote });
        };
        this.state = { newNote: '' };
    }
    render() {
        const { associateNote, getNotesByIds, getNewNoteId, noteIds, updateNote } = this.props;
        return (React.createElement(NotesPanel, null,
            React.createElement(eui_1.EuiModalHeader, null,
                React.createElement(helpers_1.NotesCount, { noteIds: noteIds })),
            React.createElement(eui_1.EuiModalBody, null,
                React.createElement(add_note_1.AddNote, { associateNote: associateNote, getNewNoteId: getNewNoteId, newNote: this.state.newNote, updateNewNote: this.updateNewNote, updateNote: updateNote }),
                React.createElement(eui_1.EuiSpacer, { size: "s" }),
                React.createElement(InMemoryTable, { "data-test-subj": "notes-table", items: getNotesByIds(noteIds), columns: columns_1.columns, pagination: false, search: helpers_1.search, sorting: true }))));
    }
}
exports.Notes = Notes;
