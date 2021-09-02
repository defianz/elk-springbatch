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
const clipboard_1 = require("./clipboard");
const i18n = tslib_1.__importStar(require("./translations"));
const WithCopyToClipboardContainer = styled_components_1.default.div `
  align-items: center;
  display: flex;
  flex-direction: row;
  user-select: text;
`;
/**
 * Renders `children` with an adjacent icon that when clicked, copies `text` to
 * the clipboard and displays a confirmation toast
 */
exports.WithCopyToClipboard = recompose_1.pure(({ text, titleSummary, children }) => (React.createElement(WithCopyToClipboardContainer, null,
    React.createElement(React.Fragment, null, children),
    React.createElement(clipboard_1.Clipboard, { content: text, titleSummary: titleSummary },
        React.createElement(eui_1.EuiIcon, { color: "text", type: "copyClipboard", "aria-label": `${i18n.COPY} ${text} ${i18n.TO_THE_CLIPBOARD}` })))));
