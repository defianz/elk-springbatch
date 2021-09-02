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
const markdown_1 = require("../../markdown");
const i18n = tslib_1.__importStar(require("../translations"));
const NewNoteTabs = styled_components_1.default(eui_1.EuiTabbedContent) `
  width: 100%;
`;
const MarkdownContainer = styled_components_1.default(eui_1.EuiPanel) `
  height: ${({ height }) => height}px;
  overflow: auto;
`;
const TextArea = styled_components_1.default(eui_1.EuiTextArea) `
  min-height: ${({ height }) => `${height}px`};
  width: 100%;
`;
/** An input for entering a new note  */
exports.NewNote = recompose_1.pure(({ note, noteInputHeight, updateNewNote }) => {
    const tabs = [
        {
            id: 'note',
            name: i18n.NOTE,
            content: (React.createElement(TextArea, { autoFocus: true, "aria-label": i18n.NOTE, "data-test-subj": "add-a-note", fullWidth: true, height: noteInputHeight, onChange: e => updateNewNote(e.target.value), placeholder: i18n.ADD_A_NOTE, spellCheck: true, value: note })),
        },
        {
            id: 'preview',
            name: i18n.PREVIEW_MARKDOWN,
            content: (React.createElement(MarkdownContainer, { "data-test-subj": "markdown-container", height: noteInputHeight, paddingSize: "s" },
                React.createElement(markdown_1.Markdown, { raw: note }))),
        },
    ];
    return React.createElement(NewNoteTabs, { "data-test-subj": "new-note-tabs", tabs: tabs, initialSelectedTab: tabs[0] });
});
