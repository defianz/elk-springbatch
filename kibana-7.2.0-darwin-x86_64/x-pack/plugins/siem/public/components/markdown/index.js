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
const react_markdown_1 = tslib_1.__importDefault(require("react-markdown"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const TableHeader = styled_components_1.default.thead `
  font-weight: bold;
`;
/** prevents links to the new pages from accessing `window.opener` */
const REL_NOOPENER = 'noopener';
/** prevents search engine manipulation by noting the linked document is not trusted or endorsed by us */
const REL_NOFOLLOW = 'nofollow';
/** prevents the browser from sending the current address as referrer via the Referer HTTP header */
const REL_NOREFERRER = 'noreferrer';
exports.Markdown = recompose_1.pure(({ raw, size = 's' }) => {
    const markdownRenderers = {
        root: ({ children }) => (React.createElement(eui_1.EuiText, { "data-test-subj": "markdown-root", grow: true, size: size }, children)),
        table: ({ children }) => (React.createElement("table", { "data-test-subj": "markdown-table", className: "euiTable euiTable--responsive" }, children)),
        tableHead: ({ children }) => (React.createElement(TableHeader, { "data-test-subj": "markdown-table-header" }, children)),
        tableRow: ({ children }) => (React.createElement(eui_1.EuiTableRow, { "data-test-subj": "markdown-table-row" }, children)),
        tableCell: ({ children }) => (React.createElement(eui_1.EuiTableRowCell, { "data-test-subj": "markdown-table-cell" }, children)),
        link: ({ children, href }) => (React.createElement(eui_1.EuiToolTip, { content: href },
            React.createElement(eui_1.EuiLink, { href: href, "data-test-subj": "markdown-link", rel: `${REL_NOOPENER} ${REL_NOFOLLOW} ${REL_NOREFERRER}`, target: "_blank" }, children))),
    };
    return (React.createElement(react_markdown_1.default, { "data-test-subj": "markdown", linkTarget: "_blank", renderers: markdownRenderers, source: raw }));
});
