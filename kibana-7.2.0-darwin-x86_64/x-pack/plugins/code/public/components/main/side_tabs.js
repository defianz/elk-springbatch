"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const querystring_1 = require("querystring");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const query_string_1 = require("ui/utils/query_string");
const types_1 = require("../../common/types");
const file_tree_1 = require("../file_tree/file_tree");
const shortcuts_1 = require("../shortcuts");
const symbol_tree_1 = require("../symbol_tree/symbol_tree");
var Tabs;
(function (Tabs) {
    Tabs["file"] = "file";
    Tabs["structure"] = "structure";
})(Tabs || (Tabs = {}));
class CodeSideTabs extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.switchTab = (tab) => {
            const { history } = this.props;
            const { pathname, search } = history.location;
            // @ts-ignore
            history.push(query_string_1.QueryString.replaceParamInUrl(`${pathname}${search}`, 'sideTab', tab));
        };
        this.toggleTab = () => {
            const currentTab = this.sideTab;
            if (currentTab === Tabs.file) {
                this.switchTab(Tabs.structure);
            }
            else {
                this.switchTab(Tabs.file);
            }
        };
    }
    get sideTab() {
        const { search } = this.props.location;
        let qs = search;
        if (search.charAt(0) === '?') {
            qs = search.substr(1);
        }
        const tab = querystring_1.parse(qs).sideTab;
        return tab === Tabs.structure ? Tabs.structure : Tabs.file;
    }
    renderLoadingSpinner(text) {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" }, text),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" },
                react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "xl" }))));
    }
    get tabs() {
        const { languageServerInitializing, loadingFileTree, loadingStructureTree } = this.props;
        const fileTabContent = loadingFileTree ? (this.renderLoadingSpinner('Loading file tree')) : (react_1.default.createElement("div", { className: "codeFileTree__container" }, react_1.default.createElement(file_tree_1.FileTree, null)));
        let structureTabContent;
        if (languageServerInitializing) {
            structureTabContent = this.renderLoadingSpinner('Language server is initializing');
        }
        else if (loadingStructureTree) {
            structureTabContent = this.renderLoadingSpinner('Loading structure tree');
        }
        else {
            structureTabContent = react_1.default.createElement(symbol_tree_1.SymbolTree, null);
        }
        return [
            {
                id: Tabs.file,
                name: 'Files',
                content: fileTabContent,
                'data-test-subj': 'codeFileTreeTab',
            },
            {
                id: Tabs.structure,
                name: 'Structure',
                content: structureTabContent,
                disabled: this.props.match.params.pathType === types_1.PathTypes.tree || !this.props.hasStructure,
                'data-test-subj': 'codeStructureTreeTab',
            },
        ];
    }
    render() {
        const tabs = this.tabs;
        const selectedTab = tabs.find(t => t.id === this.sideTab);
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(eui_1.EuiTabbedContent, { className: "code-navigation__sidebar", tabs: tabs, onTabClick: tab => this.switchTab(tab.id), expand: true, selectedTab: selectedTab }),
            react_1.default.createElement(shortcuts_1.Shortcut, { keyCode: "t", help: "Toggle tree and symbol view in sidebar", onPress: this.toggleTab })));
    }
}
exports.SideTabs = react_router_dom_1.withRouter(CodeSideTabs);
