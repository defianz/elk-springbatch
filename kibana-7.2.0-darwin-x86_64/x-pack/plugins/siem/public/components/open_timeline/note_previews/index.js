"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const note_preview_1 = require("./note_preview");
const NotePreviewsContainer = styled_components_1.default.div `
  padding-left: ${({ paddingLeft }) => `${paddingLeft}px`};
`;
/** The default left-padding of a notes preview */
const DEFAULT_NOTES_PREVIEW_LEFT_PADDING = 28; // px
/** The left padding of a notes preview in a modal */
const MODAL_NOTES_PREVIEW_LEFT_PADDING = 31; // px
/**
 * Renders a preview of a note in the All / Open Timelines table
 */
exports.NotePreviews = recompose_1.pure(({ notes, isModal }) => {
    if (notes == null || notes.length === 0) {
        return null;
    }
    const uniqueNotes = fp_1.uniqBy('savedObjectId', notes);
    return (React.createElement(NotePreviewsContainer, { "data-test-subj": "note-previews-container", paddingLeft: isModal ? MODAL_NOTES_PREVIEW_LEFT_PADDING : DEFAULT_NOTES_PREVIEW_LEFT_PADDING }, uniqueNotes.map(({ note, savedObjectId, updated, updatedBy }) => savedObjectId != null ? (React.createElement(note_preview_1.NotePreview, { "data-test-subj": `note-preview-${savedObjectId}`, key: savedObjectId, note: note, updated: updated, updatedBy: updatedBy })) : null)));
});
