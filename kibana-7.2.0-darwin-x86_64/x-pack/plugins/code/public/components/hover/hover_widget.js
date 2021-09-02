"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const react_markdown_1 = tslib_1.__importDefault(require("react-markdown"));
// @ts-ignore
const textToHtmlTokenizer_1 = require("monaco-editor/esm/vs/editor/common/modes/textToHtmlTokenizer");
var HoverState;
(function (HoverState) {
    HoverState[HoverState["LOADING"] = 0] = "LOADING";
    HoverState[HoverState["INITIALIZING"] = 1] = "INITIALIZING";
    HoverState[HoverState["READY"] = 2] = "READY";
})(HoverState = exports.HoverState || (exports.HoverState = {}));
class HoverWidget extends react_1.default.PureComponent {
    render() {
        let contents;
        switch (this.props.state) {
            case HoverState.READY:
                contents = this.renderContents();
                break;
            case HoverState.INITIALIZING:
                contents = this.renderInitialting();
                break;
            case HoverState.LOADING:
            default:
                contents = this.renderLoading();
        }
        return react_1.default.createElement(react_1.default.Fragment, null, contents);
    }
    renderLoading() {
        return (react_1.default.createElement("div", { className: "hover-row" },
            react_1.default.createElement("div", { className: "text-placeholder gradient" }),
            react_1.default.createElement("div", { className: "text-placeholder gradient", style: { width: '90%' } }),
            react_1.default.createElement("div", { className: "text-placeholder gradient", style: { width: '75%' } })));
    }
    renderContents() {
        const markdownRenderers = {
            link: ({ children, href }) => (react_1.default.createElement(eui_1.EuiLink, { href: href, target: "_blank" }, children)),
            code: ({ value, language }) => {
                const code = textToHtmlTokenizer_1.tokenizeToString(value, language);
                return react_1.default.createElement("div", { className: "code", dangerouslySetInnerHTML: { __html: code } });
            },
        };
        return this.props
            .contents.filter(content => !!content)
            .map((markedString, idx) => {
            let markdown;
            if (typeof markedString === 'string') {
                markdown = markedString;
            }
            else if (markedString.language) {
                markdown = '```' + markedString.language + '\n' + markedString.value + '\n```';
            }
            else {
                markdown = markedString.value;
            }
            return (react_1.default.createElement("div", { className: "hover-row", key: `hover_${idx}` },
                react_1.default.createElement(react_markdown_1.default, { source: markdown, escapeHtml: true, skipHtml: true, renderers: markdownRenderers })));
        });
    }
    renderInitialting() {
        return (react_1.default.createElement("div", { className: "hover-row" },
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" },
                react_1.default.createElement("h4", null, "Language Server is initializing\u2026"),
                react_1.default.createElement(eui_1.EuiText, { size: "xs", color: "subdued" },
                    react_1.default.createElement("p", null, "Depending on the size of your repo, this could take a few minutes.")))));
    }
}
exports.HoverWidget = HoverWidget;
