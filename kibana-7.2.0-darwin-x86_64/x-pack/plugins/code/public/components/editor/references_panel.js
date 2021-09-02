"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const classnames_1 = tslib_1.__importDefault(require("classnames"));
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const react_1 = tslib_1.__importDefault(require("react"));
const uri_util_1 = require("../../../common/uri_util");
const url_1 = require("../../utils/url");
const codeblock_1 = require("../codeblock/codeblock");
class ReferencesPanel extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.close = () => {
            this.props.onClose();
        };
        this.toggleExpand = () => {
            this.setState({ expanded: !this.state.expanded });
        };
        this.state = {
            expanded: false,
        };
    }
    render() {
        const body = this.props.isLoading ? react_1.default.createElement(eui_1.EuiLoadingKibana, { size: "xl" }) : this.renderGroupByRepo();
        const styles = {};
        const expanded = this.state.expanded;
        return (react_1.default.createElement(eui_1.EuiPanel, { grow: false, className: classnames_1.default(['code-editor-references-panel', expanded ? 'expanded' : '']), style: styles },
            react_1.default.createElement(eui_1.EuiButtonIcon, { size: "s", onClick: this.toggleExpand, iconType: expanded ? 'arrowDown' : 'arrowUp', "aria-label": "Next", className: "expandButton" }),
            !expanded && (react_1.default.createElement(eui_1.EuiButtonIcon, { className: "euiFlyout__closeButton", size: "s", onClick: this.close, iconType: "cross", "aria-label": "Next" })),
            react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                react_1.default.createElement("h3", null, this.props.title)),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement("div", { className: "code-auto-overflow-y" }, body)));
    }
    renderGroupByRepo() {
        return this.props.references.map((ref) => {
            return this.renderReferenceRepo(ref);
        });
    }
    renderReferenceRepo({ repo, files }) {
        const [org, name] = repo.split('/').slice(1);
        const buttonContent = (react_1.default.createElement("span", null,
            react_1.default.createElement("span", null, org),
            "/",
            react_1.default.createElement("b", null, name)));
        return (react_1.default.createElement(eui_1.EuiAccordion, { id: repo, key: repo, buttonContentClassName: "code-editor-reference-accordion-button", buttonContent: buttonContent, paddingSize: "s", initialIsOpen: true }, files.map(file => this.renderReference(file))));
    }
    renderReference(file) {
        const key = `${file.uri}`;
        const lineNumberFn = (l) => {
            return file.lineNumbers[l - 1];
        };
        const fileComponent = (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(eui_1.EuiText, null,
                react_1.default.createElement("a", { href: `#${this.computeUrl(file.uri)}` }, file.file)),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" })));
        return (react_1.default.createElement(codeblock_1.CodeBlock, { key: key, language: file.language, startLine: 0, code: file.code, folding: false, lineNumbersFunc: lineNumberFn, highlightRanges: file.highlights, fileComponent: fileComponent, onClick: this.onCodeClick.bind(this, file.lineNumbers, file.uri) }));
    }
    onCodeClick(lineNumbers, url, pos) {
        const line = parseInt(lineNumbers[pos.lineNumber - 1], 10);
        url_1.history.push(this.computeUrl(url, line));
    }
    computeUrl(url, line) {
        const { uri } = uri_util_1.parseSchema(url);
        let search = url_1.history.location.search;
        if (search.startsWith('?')) {
            search = search.substring(1);
        }
        const queries = querystring_1.default.parse(search);
        const query = querystring_1.default.stringify({
            ...queries,
            tab: 'references',
            refUrl: this.props.refUrl,
        });
        return line !== undefined ? `${uri}!L${line}:0?${query}` : `${uri}?${query}`;
    }
}
exports.ReferencesPanel = ReferencesPanel;
