"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../common/constants");
const shortcuts_1 = require("../shortcuts");
const content_1 = require("./content");
const side_tabs_1 = require("./side_tabs");
const selectors_1 = require("../../selectors");
class CodeMain extends react_1.default.Component {
    componentDidMount() {
        this.setBreadcrumbs();
    }
    componentDidUpdate() {
        this.setBreadcrumbs();
    }
    setBreadcrumbs() {
        const { resource, org, repo } = this.props.match.params;
        chrome_1.default.breadcrumbs.set([
            { text: constants_1.APP_TITLE, href: '#/' },
            {
                text: `${org} → ${repo}`,
                href: `#/${resource}/${org}/${repo}`,
            },
        ]);
    }
    componentWillUnmount() {
        chrome_1.default.breadcrumbs.set([{ text: constants_1.APP_TITLE, href: '#/' }]);
    }
    render() {
        const { loadingFileTree, loadingStructureTree, hasStructure, languageServerInitializing, } = this.props;
        return (react_1.default.createElement("div", { className: "codeContainer__root" },
            react_1.default.createElement("div", { className: "codeContainer__rootInner" },
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(side_tabs_1.SideTabs, { loadingFileTree: loadingFileTree, loadingStructureTree: loadingStructureTree, hasStructure: hasStructure, languageServerInitializing: languageServerInitializing }),
                    react_1.default.createElement(content_1.Content, null))),
            react_1.default.createElement(shortcuts_1.ShortcutsProvider, null)));
    }
}
const mapStateToProps = (state) => ({
    loadingFileTree: state.file.fileTreeLoadingPaths.includes(''),
    loadingStructureTree: state.symbol.loading,
    hasStructure: selectors_1.structureSelector(state).length > 0 && !state.symbol.error,
    languageServerInitializing: state.symbol.languageServerInitializing,
});
exports.Main = react_redux_1.connect(mapStateToProps)(CodeMain);
