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
const add_note_1 = require("../add_note");
const note_card_1 = require("../note_card");
const AddNoteContainer = styled_components_1.default.div ``;
const NoteContainer = styled_components_1.default.div `
  margin-top: 5px;
`;
const NoteCardsContainer = styled_components_1.default(eui_1.EuiPanel) `
  border: none;
  width: ${({ width = '100%' }) => width};
`;
const NotesContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  padding: 0 5px;
  margin-bottom: 5px;
`;
/** A view for entering and reviewing notes */
class NoteCards extends React.PureComponent {
    constructor(props) {
        super(props);
        this.associateNoteAndToggleShow = (noteId) => {
            this.props.associateNote(noteId);
            this.props.toggleShowAddNote();
        };
        this.updateNewNote = (newNote) => {
            this.setState({ newNote });
        };
        this.state = { newNote: '' };
    }
    render() {
        const { getNotesByIds, getNewNoteId, noteIds, showAddNote, toggleShowAddNote, updateNote, width, } = this.props;
        return (React.createElement(NoteCardsContainer, { "data-test-subj": "note-cards", hasShadow: false, paddingSize: "none", width: width },
            noteIds.length ? (React.createElement(NotesContainer, { "data-test-subj": "notes", direction: "column", gutterSize: "none" }, getNotesByIds(noteIds).map(note => (React.createElement(NoteContainer, { "data-test-subj": "note-container", key: note.id },
                React.createElement(note_card_1.NoteCard, { created: note.created, rawNote: note.note, user: note.user })))))) : null,
            showAddNote ? (React.createElement(AddNoteContainer, { "data-test-subj": "add-note-container" },
                React.createElement(add_note_1.AddNote, { associateNote: this.associateNoteAndToggleShow, getNewNoteId: getNewNoteId, newNote: this.state.newNote, onCancelAddNote: toggleShowAddNote, updateNewNote: this.updateNewNote, updateNote: updateNote }))) : null));
    }
}
exports.NoteCards = NoteCards;
