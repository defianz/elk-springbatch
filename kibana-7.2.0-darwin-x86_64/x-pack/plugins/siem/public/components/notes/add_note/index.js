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
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const markdown_hint_1 = require("../../markdown/markdown_hint");
const helpers_1 = require("../helpers");
const i18n = tslib_1.__importStar(require("../translations"));
const new_note_1 = require("./new_note");
const AddNotesContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  margin-bottom: 5px;
  user-select: none;
`;
const ButtonsContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  margin-top: 5px;
`;
exports.CancelButton = recompose_1.pure(({ onCancelAddNote }) => (React.createElement(eui_1.EuiButtonEmpty, { "data-test-subj": "cancel", onClick: onCancelAddNote }, i18n.CANCEL)));
/** Displays an input for entering a new note, with an adjacent "Add" button */
exports.AddNote = recompose_1.pure(({ associateNote, getNewNoteId, newNote, onCancelAddNote, updateNewNote, updateNote }) => (React.createElement(AddNotesContainer, { alignItems: "flexEnd", direction: "column", gutterSize: "none" },
    React.createElement(new_note_1.NewNote, { note: newNote, noteInputHeight: 200, updateNewNote: updateNewNote }),
    React.createElement(eui_1.EuiFlexItem, { grow: true },
        React.createElement(markdown_hint_1.MarkdownHint, { show: newNote.trim().length > 0 })),
    React.createElement(ButtonsContainer, { gutterSize: "none" },
        onCancelAddNote != null ? (React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(exports.CancelButton, { onCancelAddNote: onCancelAddNote }))) : null,
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(eui_1.EuiButton, { "data-test-subj": "add-note", isDisabled: newNote.trim().length === 0, fill: true, onClick: () => helpers_1.updateAndAssociateNode({
                    associateNote,
                    getNewNoteId,
                    newNote,
                    updateNewNote,
                    updateNote,
                }) }, i18n.ADD_NOTE))))));
