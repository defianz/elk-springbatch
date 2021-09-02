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
const react_router_dom_1 = require("react-router-dom");
const repository_utils_1 = require("../../../common/repository_utils");
const url_1 = require("../../utils/url");
const codeblock_1 = require("../codeblock/codeblock");
class CodeResult extends react_1.default.PureComponent {
    render() {
        return this.props.results.map(item => {
            const { uri, filePath, hits, compositeContent } = item;
            const { content, lineMapping, ranges } = compositeContent;
            const repoLinkUrl = `/${uri}/tree/HEAD/`;
            const fileLinkUrl = `/${uri}/blob/HEAD/${filePath}`;
            const key = `${uri}${filePath}`;
            const lineMappingFunc = (l) => {
                return lineMapping[l - 1];
            };
            return (react_1.default.createElement("div", { key: `resultitem${key}`, "data-test-subj": "codeSearchResultList" },
                react_1.default.createElement("div", { style: { marginBottom: '.5rem' } },
                    react_1.default.createElement(react_router_dom_1.Link, { to: repoLinkUrl },
                        react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "row", alignItems: "center", justifyContent: "flexStart", gutterSize: "none" },
                            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                                react_1.default.createElement(eui_1.EuiText, { size: "s", color: "subdued" },
                                    repository_utils_1.RepositoryUtils.orgNameFromUri(uri),
                                    "/")),
                            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                                react_1.default.createElement(eui_1.EuiText, { size: "s", color: "default" },
                                    react_1.default.createElement("strong", null, repository_utils_1.RepositoryUtils.repoNameFromUri(uri))))))),
                react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", justifyContent: "flexStart", gutterSize: "xs", style: { marginBottom: '1rem' } },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiBadge, { color: "default" }, hits)),
                    react_1.default.createElement(eui_1.EuiText, { size: "s" },
                        "\u00A0hits from\u00A0",
                        react_1.default.createElement(react_router_dom_1.Link, { to: fileLinkUrl, "data-test-subj": "codeSearchResultFileItem" }, filePath))),
                react_1.default.createElement(codeblock_1.CodeBlock, { key: `code${key}`, language: item.language, startLine: 0, code: content, highlightRanges: ranges, folding: false, lineNumbersFunc: lineMappingFunc, onClick: this.onCodeClick.bind(this, lineMapping, fileLinkUrl) })));
        });
    }
    onCodeClick(lineNumbers, fileUrl, pos) {
        const line = parseInt(lineNumbers[pos.lineNumber - 1], 10);
        if (!isNaN(line)) {
            url_1.history.push(`${fileUrl}!L${line}:0`);
        }
    }
}
exports.CodeResult = CodeResult;
