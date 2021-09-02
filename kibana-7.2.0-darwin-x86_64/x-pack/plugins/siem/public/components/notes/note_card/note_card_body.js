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
const with_copy_to_clipboard_1 = require("../../../lib/clipboard/with_copy_to_clipboard");
const markdown_1 = require("../../markdown");
const with_hover_actions_1 = require("../../with_hover_actions");
const i18n = tslib_1.__importStar(require("../translations"));
const BodyContainer = styled_components_1.default(eui_1.EuiPanel) `
  border: none;
`;
const HoverActionsContainer = styled_components_1.default(eui_1.EuiPanel) `
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 25px;
  justify-content: center;
  left: 5px;
  position: absolute;
  top: -5px;
  width: 30px;
`;
exports.NoteCardBody = recompose_1.pure(({ rawNote }) => (React.createElement(BodyContainer, { "data-test-subj": "note-card-body", hasShadow: false, paddingSize: "s" },
    React.createElement(with_hover_actions_1.WithHoverActions, { hoverContent: React.createElement(HoverActionsContainer, { "data-test-subj": "hover-actions-container" },
            React.createElement(eui_1.EuiToolTip, { content: i18n.COPY_TO_CLIPBOARD },
                React.createElement(with_copy_to_clipboard_1.WithCopyToClipboard, { text: rawNote, titleSummary: i18n.NOTE.toLowerCase() }))), render: () => React.createElement(markdown_1.Markdown, { raw: rawNote }) }))));
