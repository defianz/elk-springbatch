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
const i18n = tslib_1.__importStar(require("./translations"));
const Heading = styled_components_1.default.span `
  margin-right: 5px;
`;
const Bold = styled_components_1.default.span `
  font-weight: bold;
  margin-right: 5px;
`;
const MarkdownHintContainer = styled_components_1.default(eui_1.EuiText) `
  visibility: ${({ visibility }) => visibility};
`;
const ImageUrl = styled_components_1.default.span `
  margin-left: 5px;
`;
const Italic = styled_components_1.default.span `
  font-style: italic;
  margin-right: 5px;
`;
const Strikethrough = styled_components_1.default.span `
  text-decoration: line-through;
`;
const Code = styled_components_1.default.span `
  font-family: monospace;
  margin-right: 5px;
`;
const TrailingWhitespace = styled_components_1.default.span `
  margin-right: 5px;
`;
exports.MarkdownHint = recompose_1.pure(({ show }) => (React.createElement(MarkdownHintContainer, { color: "subdued", "data-test-subj": "markdown-hint", size: "xs", visibility: show ? 'inline' : 'hidden' },
    React.createElement(Heading, { "data-test-subj": "heading-hint" }, i18n.MARKDOWN_HINT_HEADING),
    React.createElement(Bold, { "data-test-subj": "bold-hint" }, i18n.MARKDOWN_HINT_BOLD),
    React.createElement(Italic, { "data-test-subj": "italic-hint" }, i18n.MARKDOWN_HINT_ITALICS),
    React.createElement(Code, { "data-test-subj": "code-hint" }, i18n.MARKDOWN_HINT_CODE),
    React.createElement(TrailingWhitespace, null, i18n.MARKDOWN_HINT_URL),
    React.createElement(TrailingWhitespace, null, i18n.MARKDOWN_HINT_BULLET),
    React.createElement(Code, { "data-test-subj": "preformatted-hint" }, i18n.MARKDOWN_HINT_PREFORMATTED),
    React.createElement(TrailingWhitespace, null, i18n.MARKDOWN_HINT_QUOTE),
    '~~',
    React.createElement(Strikethrough, { "data-test-subj": "strikethrough-hint" }, i18n.MARKDOWN_HINT_STRIKETHROUGH),
    '~~',
    React.createElement(ImageUrl, null, i18n.MARKDOWN_HINT_IMAGE_URL))));
