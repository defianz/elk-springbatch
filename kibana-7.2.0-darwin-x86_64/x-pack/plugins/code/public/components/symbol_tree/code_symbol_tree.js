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
const url_1 = tslib_1.__importDefault(require("url"));
const main_1 = require("vscode-languageserver-types/lib/umd/main");
const lodash_1 = require("lodash");
const repository_utils_1 = require("../../../common/repository_utils");
const sortSymbol = (a, b) => {
    const lineDiff = a.location.range.start.line - b.location.range.start.line;
    if (lineDiff === 0) {
        return a.location.range.start.character - b.location.range.start.character;
    }
    else {
        return lineDiff;
    }
};
class CodeSymbolTree extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {};
        this.getClickHandler = (symbol) => () => {
            this.setState({ activeSymbol: symbol });
        };
        this.getStructureTreeItemRenderer = (location, name, kind, isContainer = false, forceOpen = false, path = '') => () => {
            let tokenType = 'tokenFile';
            // @ts-ignore
            tokenType = `token${Object.keys(main_1.SymbolKind).find(k => main_1.SymbolKind[k] === kind)}`;
            let bg = null;
            if (this.state.activeSymbol &&
                this.state.activeSymbol.name === name &&
                lodash_1.isEqual(this.state.activeSymbol.location, location)) {
                bg = react_1.default.createElement("div", { className: "code-full-width-node" });
            }
            const queries = url_1.default.parse(this.props.location.search, true).query;
            return (react_1.default.createElement("div", { className: "code-symbol-container" },
                bg,
                react_1.default.createElement("div", { className: isContainer ? 'codeSymbol' : 'codeSymbol codeSymbol--nested' },
                    isContainer &&
                        (forceOpen ? (react_1.default.createElement(eui_1.EuiIcon, { type: "arrowDown", size: "s", color: "subdued", className: "codeStructureTree--icon", onClick: () => this.props.closeSymbolPath(path) })) : (react_1.default.createElement(eui_1.EuiIcon, { type: "arrowRight", size: "s", color: "subdued", className: "codeStructureTree--icon", onClick: () => this.props.openSymbolPath(path) }))),
                    react_1.default.createElement(react_router_dom_1.Link, { to: url_1.default.format({
                            pathname: repository_utils_1.RepositoryUtils.locationToUrl(location),
                            query: { sideTab: 'structure', ...queries },
                        }), className: "code-symbol-link", onClick: this.getClickHandler({ name, location }) },
                        react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none", alignItems: "center", className: "code-structure-node" },
                            react_1.default.createElement(eui_1.EuiToken, { iconType: tokenType }),
                            react_1.default.createElement(eui_1.EuiText, { "data-test-subj": `codeStructureTreeNode-${name}`, size: "s" }, name))))));
        };
        this.symbolsToSideNavItems = (symbolsWithMembers) => {
            return symbolsWithMembers.sort(sortSymbol).map((s, index) => {
                const item = {
                    name: s.name,
                    id: `${s.name}_${index}`,
                    onClick: () => void 0,
                };
                if (s.members) {
                    item.forceOpen = !this.props.closedPaths.includes(s.path);
                    if (item.forceOpen) {
                        item.items = this.symbolsToSideNavItems(s.members);
                    }
                    item.renderItem = this.getStructureTreeItemRenderer(s.location, s.name, s.kind, true, item.forceOpen, s.path);
                }
                else {
                    item.renderItem = this.getStructureTreeItemRenderer(s.location, s.name, s.kind, false, false, s.path);
                }
                return item;
            });
        };
    }
    render() {
        const items = [
            { name: '', id: '', items: this.symbolsToSideNavItems(this.props.structureTree) },
        ];
        return (react_1.default.createElement("div", { className: "codeContainer__sideTabTree" },
            react_1.default.createElement(eui_1.EuiSideNav, { items: items })));
    }
}
exports.CodeSymbolTree = CodeSymbolTree;
