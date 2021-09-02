"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const actions_1 = require("../../actions");
// import { SearchBar } from '../search_bar';
const diff_editor_1 = require("./diff_editor");
const COMMIT_ID_LENGTH = 16;
const B = styled_components_1.default.b `
  font-weight: bold;
`;
const PrimaryB = styled_components_1.default(B) `
  color: ${eui_theme_light_json_1.default.euiColorPrimary};
`;
const CommitId = styled_components_1.default.span `
  display: inline-block;
  padding: 0 ${eui_theme_light_json_1.default.paddingSizes.xs};
  border: ${eui_theme_light_json_1.default.euiBorderThin};
`;
const Addition = styled_components_1.default.div `
  padding: ${eui_theme_light_json_1.default.paddingSizes.xs} ${eui_theme_light_json_1.default.paddingSizes.s};
  border-radius: ${eui_theme_light_json_1.default.euiSizeXS};
  color: white;
  margin-right: ${eui_theme_light_json_1.default.euiSizeS};
  background-color: ${eui_theme_light_json_1.default.euiColorDanger};
`;
const Deletion = styled_components_1.default(Addition) `
  background-color: ${eui_theme_light_json_1.default.euiColorVis0};
`;
const Container = styled_components_1.default.div `
  padding: ${eui_theme_light_json_1.default.paddingSizes.xs} ${eui_theme_light_json_1.default.paddingSizes.m};
`;
const TopBarContainer = styled_components_1.default.div `
  height: calc(48rem / 14);
  border-bottom: ${eui_theme_light_json_1.default.euiBorderThin};
  padding: 0 ${eui_theme_light_json_1.default.paddingSizes.m};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Accordion = styled_components_1.default(eui_1.EuiAccordion) `
  border: ${eui_theme_light_json_1.default.euiBorderThick};
  border-radius: ${eui_theme_light_json_1.default.euiSizeS};
  margin-bottom: ${eui_theme_light_json_1.default.euiSize};
`;
const Icon = styled_components_1.default(eui_1.EuiIcon) `
  margin-right: ${eui_theme_light_json_1.default.euiSizeS};
`;
const Parents = styled_components_1.default.div `
  border-left: ${eui_theme_light_json_1.default.euiBorderThin};
  height: calc(32rem / 14);
  line-height: calc(32rem / 14);
  padding-left: ${eui_theme_light_json_1.default.paddingSizes.s};
  margin: ${eui_theme_light_json_1.default.euiSizeS} 0;
`;
const H4 = styled_components_1.default.h4 `
  height: 100%;
  line-height: calc(48rem / 14);
`;
const ButtonContainer = styled_components_1.default.div `
  cursor: default;
`;
var DiffLayout;
(function (DiffLayout) {
    DiffLayout[DiffLayout["Unified"] = 0] = "Unified";
    DiffLayout[DiffLayout["Split"] = 1] = "Split";
})(DiffLayout = exports.DiffLayout || (exports.DiffLayout = {}));
const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
const Difference = (props) => (react_1.default.createElement(Accordion, { initialIsOpen: true, id: props.fileDiff.path, buttonContent: react_1.default.createElement(ButtonContainer, { role: "button", onClick: onClick },
        react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween", gutterSize: "none", alignItems: "center" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
                    react_1.default.createElement(Addition, null, props.fileDiff.additions),
                    react_1.default.createElement(Deletion, null, props.fileDiff.deletions))),
            react_1.default.createElement(eui_1.EuiFlexItem, null, props.fileDiff.path),
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement("div", { className: "euiButton euiButton--primary euiButton--small", role: "button" },
                    react_1.default.createElement("span", { className: "euiButton__content" },
                        react_1.default.createElement(react_router_dom_1.Link, { to: `/${props.repoUri}/blob/${props.revision}/${props.fileDiff.path}` }, "View File")))))) },
    react_1.default.createElement(diff_editor_1.DiffEditor, { originCode: props.fileDiff.originCode, modifiedCode: props.fileDiff.modifiedCode, language: props.fileDiff.language, renderSideBySide: true })));
class DiffPage extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            diffLayout: DiffLayout.Split,
        };
        this.setLayoutUnified = () => {
            this.setState({ diffLayout: DiffLayout.Unified });
        };
        this.setLayoutSplit = () => {
            this.setState({ diffLayout: DiffLayout.Split });
        };
    }
    render() {
        const { commit, match } = this.props;
        const { repo, org, resource } = match.params;
        const repoUri = `${resource}/${org}/${repo}`;
        if (!commit) {
            return null;
        }
        const { additions, deletions, files } = commit;
        const { parents } = commit.commit;
        const title = commit.commit.message.split('\n')[0];
        let parentsLinks = null;
        if (parents.length > 1) {
            const [p1, p2] = parents;
            parentsLinks = (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_router_dom_1.Link, { to: `/${repoUri}/commit/${p1}` }, p1),
                "+",
                react_1.default.createElement(react_router_dom_1.Link, { to: `/${repoUri}/commit/${p2}` }, p2)));
        }
        else if (parents.length === 1) {
            parentsLinks = react_1.default.createElement(react_router_dom_1.Link, { to: `/${repoUri}/commit/${parents[0]}` }, parents[0]);
        }
        const topBar = (react_1.default.createElement(TopBarContainer, null,
            react_1.default.createElement("div", null,
                react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                    react_1.default.createElement(H4, null, title))),
            react_1.default.createElement("div", null,
                react_1.default.createElement(Parents, null,
                    "Parents: ",
                    parentsLinks))));
        const fileCount = files.length;
        const diffs = commit.files.map(file => (react_1.default.createElement(Difference, { repoUri: repoUri, revision: commit.commit.id, fileDiff: file, key: file.path })));
        return (react_1.default.createElement("div", { className: "diff" },
            topBar,
            react_1.default.createElement(Container, null,
                react_1.default.createElement(eui_1.EuiText, null, commit.commit.message)),
            react_1.default.createElement(Container, null,
                react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none", justifyContent: "spaceBetween" },
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiText, null,
                            react_1.default.createElement(Icon, { type: "dataVisualizer" }),
                            "Showing",
                            react_1.default.createElement(PrimaryB, null,
                                " ",
                                fileCount,
                                " Changed files "),
                            "with",
                            react_1.default.createElement(B, null,
                                " ",
                                additions,
                                " additions"),
                            " and ",
                            react_1.default.createElement(B, null,
                                deletions,
                                " deletions "))),
                    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiText, null,
                            "Committed by",
                            react_1.default.createElement(PrimaryB, null,
                                " ",
                                commit.commit.committer,
                                " "),
                            react_1.default.createElement(CommitId, null, commit.commit.id.substr(0, COMMIT_ID_LENGTH)))))),
            react_1.default.createElement(Container, null, diffs)));
    }
}
exports.DiffPage = DiffPage;
const mapStateToProps = (state) => ({
    commit: state.commit.commit,
    query: state.search.query,
    repoScope: state.search.searchOptions.repoScope.map(r => r.uri),
});
const mapDispatchToProps = {
    onSearchScopeChanged: actions_1.changeSearchScope,
};
exports.Diff = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DiffPage));
