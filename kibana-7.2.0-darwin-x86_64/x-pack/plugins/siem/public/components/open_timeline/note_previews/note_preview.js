"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const formatted_date_1 = require("../../formatted_date");
const empty_value_1 = require("../../empty_value");
const markdown_1 = require("../../markdown");
const i18n = tslib_1.__importStar(require("../translations"));
exports.Avatar = styled_components_1.default(eui_1.EuiAvatar) `
  margin-right: 12px;
  user-select: none;
`;
const UpdatedBy = styled_components_1.default.div `
  font-weight: bold;
`;
const NotePreviewFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  margin: 16px 0;
  width: 100%;
`;
/**
 * Renders a preview of a note in the All / Open Timelines table
 */
exports.NotePreview = recompose_1.pure(({ note, updated, updatedBy }) => (React.createElement(NotePreviewFlexGroup, { direction: "row", gutterSize: "none" },
    React.createElement(eui_1.EuiFlexItem, { grow: false },
        React.createElement(exports.Avatar, { "data-test-subj": "avatar", size: "m", name: updatedBy != null ? updatedBy : '?' })),
    React.createElement(eui_1.EuiFlexItem, { grow: true },
        React.createElement(UpdatedBy, { "data-test-subj": "updated-by" }, empty_value_1.defaultToEmptyTag(updatedBy)),
        React.createElement("div", { "data-test-subj": "posted" },
            React.createElement(eui_1.EuiText, { color: "subdued", grow: true, size: "xs" },
                i18n.POSTED,
                ' ',
                updated != null ? (React.createElement(eui_1.EuiToolTip, { content: React.createElement(formatted_date_1.FormattedDate, { fieldName: "", value: updated }) },
                    React.createElement(react_1.FormattedRelative, { "data-test-subj": "updated", value: new Date(updated) }))) : (empty_value_1.getEmptyValue()))),
        React.createElement(eui_1.EuiSpacer, { "data-test-subj": "posted-spacer", size: "s" }),
        React.createElement(markdown_1.Markdown, { raw: note || '', size: "xs" })))));
