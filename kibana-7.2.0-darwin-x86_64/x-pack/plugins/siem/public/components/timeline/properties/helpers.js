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
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const notes_1 = require("../../notes");
const styles_1 = require("./styles");
const i18n = tslib_1.__importStar(require("./translations"));
const notes_size_1 = require("./notes_size");
exports.historyToolTip = 'The chronological history of actions related to this timeline';
exports.streamLiveToolTip = 'Update the Timeline as new data arrives';
exports.newTimelineToolTip = 'Create a new timeline';
const NotesCountBadge = styled_components_1.default(eui_1.EuiBadge) `
  margin-left: 5px;
`;
exports.StarIcon = recompose_1.pure(({ isFavorite, timelineId: id, updateIsFavorite }) => (
// TODO: 1 error is: Visible, non-interactive elements with click handlers must have at least one keyboard listener
// TODO: 2 error is: Elements with the 'button' interactive role must be focusable
// TODO: Investigate this error
// eslint-disable-next-line
React.createElement("div", { role: "button", onClick: () => updateIsFavorite({ id, isFavorite: !isFavorite }) }, isFavorite ? (React.createElement(eui_1.EuiToolTip, { "data-test-subj": "timeline-favorite-filled-star-tool-tip", content: i18n.FAVORITE },
    React.createElement(styles_1.StyledStar, { "data-test-subj": "timeline-favorite-filled-star", type: "starFilled", size: "l" }))) : (React.createElement(eui_1.EuiToolTip, { content: i18n.NOT_A_FAVORITE },
    React.createElement(styles_1.StyledStar, { "data-test-subj": "timeline-favorite-empty-star", type: "starEmpty", size: "l" }))))));
exports.Description = recompose_1.pure(({ description, timelineId, updateDescription }) => (React.createElement(eui_1.EuiToolTip, { "data-test-subj": "timeline-description-tool-tip", content: i18n.DESCRIPTION_TOOL_TIP },
    React.createElement(styles_1.DescriptionContainer, { "data-test-subj": "description-container" },
        React.createElement(eui_1.EuiFieldText, { "aria-label": i18n.TIMELINE_DESCRIPTION, "data-test-subj": "timeline-description", fullWidth: true, onChange: e => updateDescription({ id: timelineId, description: e.target.value }), placeholder: i18n.DESCRIPTION, spellCheck: true, value: description })))));
exports.Name = recompose_1.pure(({ timelineId, title, updateTitle }) => (React.createElement(eui_1.EuiToolTip, { "data-test-subj": "timeline-title-tool-tip", content: i18n.TITLE },
    React.createElement(styles_1.NameField, { "aria-label": i18n.TIMELINE_TITLE, "data-test-subj": "timeline-title", onChange: e => updateTitle({ id: timelineId, title: e.target.value }), placeholder: i18n.UNTITLED_TIMELINE, spellCheck: true, value: title }))));
exports.NewTimeline = recompose_1.pure(({ createTimeline, onClosePopover, timelineId }) => (React.createElement(eui_1.EuiButtonEmpty, { "data-test-subj": "timeline-new", color: "text", iconSide: "left", iconType: "plusInCircle", onClick: () => {
        createTimeline({ id: timelineId, show: true });
        onClosePopover();
    } }, i18n.NEW_TIMELINE)));
const getNewNoteId = () => uuid_1.default.v4();
const NotesIcon = recompose_1.pure(({ count }) => (React.createElement(eui_1.EuiIcon, { color: count > 0 ? 'primary' : 'subdued', "data-test-subj": "timeline-notes-icon", size: "l", type: "editorComment" })));
const LargeNotesButton = recompose_1.pure(({ noteIds, text, toggleShowNotes }) => (React.createElement(eui_1.EuiButton, { "data-test-subj": "timeline-notes-button-large", onClick: () => toggleShowNotes(), size: "l" },
    React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none", justifyContent: "center" },
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(eui_1.EuiIcon, { color: "subdued", size: "m", type: "editorComment" })),
        React.createElement(eui_1.EuiFlexItem, { grow: false }, text && text.length ? React.createElement(styles_1.LabelText, null, text) : null),
        React.createElement(eui_1.EuiFlexItem, { grow: false },
            React.createElement(NotesCountBadge, { "data-test-subj": "timeline-notes-count", color: "hollow" }, noteIds.length))))));
const SmallNotesButton = recompose_1.pure(({ noteIds, toggleShowNotes }) => (React.createElement(styles_1.SmallNotesButtonContainer, { "data-test-subj": "timeline-notes-button-small", onClick: () => toggleShowNotes(), role: "button" },
    React.createElement(NotesIcon, { count: noteIds.length }))));
/**
 * The internal implementation of the `NotesButton`
 */
const NotesButtonComponent = recompose_1.pure(({ animate = true, associateNote, getNotesByIds, noteIds, showNotes, size, toggleShowNotes, text, updateNote, }) => (React.createElement(styles_1.ButtonContainer, { animate: animate, "data-test-subj": "timeline-notes-button-container" },
    React.createElement(React.Fragment, null,
        size === 'l' ? (React.createElement(LargeNotesButton, { noteIds: noteIds, text: text, toggleShowNotes: toggleShowNotes })) : (React.createElement(SmallNotesButton, { noteIds: noteIds, toggleShowNotes: toggleShowNotes })),
        size === 'l' && showNotes ? (React.createElement(eui_1.EuiOverlayMask, null,
            React.createElement(eui_1.EuiModal, { maxWidth: notes_size_1.NOTES_PANEL_WIDTH, onClose: toggleShowNotes },
                React.createElement(notes_1.Notes, { associateNote: associateNote, getNotesByIds: getNotesByIds, noteIds: noteIds, getNewNoteId: getNewNoteId, updateNote: updateNote })))) : null))));
exports.NotesButton = recompose_1.pure(({ animate = true, associateNote, getNotesByIds, noteIds, showNotes, size, toggleShowNotes, toolTip, text, updateNote, }) => showNotes ? (React.createElement(NotesButtonComponent, { animate: animate, associateNote: associateNote, getNotesByIds: getNotesByIds, noteIds: noteIds, showNotes: showNotes, size: size, toggleShowNotes: toggleShowNotes, text: text, updateNote: updateNote })) : (React.createElement(eui_1.EuiToolTip, { content: toolTip || '', "data-test-subj": "timeline-notes-tool-tip" },
    React.createElement(NotesButtonComponent, { animate: animate, associateNote: associateNote, getNotesByIds: getNotesByIds, noteIds: noteIds, showNotes: showNotes, size: size, toggleShowNotes: toggleShowNotes, text: text, updateNote: updateNote }))));
