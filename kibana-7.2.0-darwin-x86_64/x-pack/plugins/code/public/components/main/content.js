"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
require("github-markdown-css/github-markdown.css");
const react_1 = tslib_1.__importDefault(require("react"));
const react_markdown_1 = tslib_1.__importDefault(require("react-markdown"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const repository_utils_1 = require("../../../common/repository_utils");
const model_1 = require("../../../model");
const actions_1 = require("../../actions");
const types_1 = require("../../common/types");
const reducers_1 = require("../../reducers");
const selectors_1 = require("../../selectors");
const url_1 = require("../../utils/url");
const editor_1 = require("../editor/editor");
const clone_status_1 = require("./clone_status");
const commit_history_1 = require("./commit_history");
const directory_1 = require("./directory");
const error_panel_1 = require("./error_panel");
const not_found_1 = require("./not_found");
const top_bar_1 = require("./top_bar");
const LANG_MD = 'markdown';
var ButtonOption;
(function (ButtonOption) {
    ButtonOption["Code"] = "Code";
    ButtonOption["Blame"] = "Blame";
    ButtonOption["History"] = "History";
    ButtonOption["Folder"] = "Directory";
})(ButtonOption || (ButtonOption = {}));
var ButtonLabel;
(function (ButtonLabel) {
    ButtonLabel["Code"] = "Code";
    ButtonLabel["Content"] = "Content";
    ButtonLabel["Download"] = "Download";
    ButtonLabel["Raw"] = "Raw";
})(ButtonLabel || (ButtonLabel = {}));
class CodeContent extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.findNode = (pathSegments, node) => {
            if (!node) {
                return undefined;
            }
            else if (pathSegments.length === 0) {
                return node;
            }
            else if (pathSegments.length === 1) {
                return (node.children || []).find(n => n.name === pathSegments[0]);
            }
            else {
                const currentFolder = pathSegments.shift();
                const nextNode = (node.children || []).find(n => n.name === currentFolder);
                if (nextNode) {
                    return this.findNode(pathSegments, nextNode);
                }
                else {
                    return undefined;
                }
            }
        };
        this.switchButton = (id) => {
            const { path, resource, org, repo, revision } = this.props.match.params;
            const repoUri = `${resource}/${org}/${repo}`;
            switch (id) {
                case ButtonOption.Code:
                    url_1.history.push(`/${repoUri}/${types_1.PathTypes.blob}/${url_1.encodeRevisionString(revision)}/${path || ''}`);
                    break;
                case ButtonOption.Folder:
                    url_1.history.push(`/${repoUri}/${types_1.PathTypes.tree}/${url_1.encodeRevisionString(revision)}/${path || ''}`);
                    break;
                case ButtonOption.Blame:
                    url_1.history.push(`/${repoUri}/${types_1.PathTypes.blame}/${url_1.encodeRevisionString(revision)}/${path || ''}`);
                    break;
                case ButtonOption.History:
                    url_1.history.push(`/${repoUri}/${types_1.PathTypes.commits}/${url_1.encodeRevisionString(revision)}/${path || ''}`);
                    break;
            }
        };
        this.openRawFile = () => {
            const { path, resource, org, repo, revision } = this.props.match.params;
            const repoUri = `${resource}/${org}/${repo}`;
            window.open(chrome_1.default.addBasePath(`/app/code/repo/${repoUri}/raw/${url_1.encodeRevisionString(revision)}/${path}`));
        };
        this.renderButtons = () => {
            let buttonId;
            switch (this.props.match.params.pathType) {
                case types_1.PathTypes.blame:
                    buttonId = ButtonOption.Blame;
                    break;
                case types_1.PathTypes.blob:
                    buttonId = ButtonOption.Code;
                    break;
                case types_1.PathTypes.tree:
                    buttonId = ButtonOption.Folder;
                    break;
                case types_1.PathTypes.commits:
                    buttonId = ButtonOption.History;
                    break;
                default:
                    break;
            }
            const currentTree = this.props.currentTree;
            if (this.props.file &&
                currentTree &&
                (currentTree.type === model_1.FileTreeItemType.File || currentTree.type === model_1.FileTreeItemType.Link)) {
                const { isUnsupported, isOversize, isImage, lang } = this.props.file;
                const isMarkdown = lang === LANG_MD;
                const isText = !isUnsupported && !isOversize && !isImage;
                const buttonOptions = [
                    {
                        id: ButtonOption.Code,
                        label: isText && !isMarkdown ? ButtonLabel.Code : ButtonLabel.Content,
                    },
                    {
                        id: ButtonOption.Blame,
                        label: ButtonOption.Blame,
                        isDisabled: isUnsupported || isImage || isOversize,
                    },
                    {
                        id: ButtonOption.History,
                        label: ButtonOption.History,
                    },
                ];
                const rawButtonOptions = [
                    { id: 'Raw', label: isText ? ButtonLabel.Raw : ButtonLabel.Download },
                ];
                return (react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "row", alignItems: "center", gutterSize: "none" },
                    react_1.default.createElement(eui_1.EuiButtonGroup, { buttonSize: "s", color: "primary", options: buttonOptions, type: "single", idSelected: buttonId, onChange: this.switchButton, className: "codeButtonGroup" }),
                    react_1.default.createElement(eui_1.EuiButtonGroup, { buttonSize: "s", color: "primary", options: rawButtonOptions, type: "single", idSelected: '', onChange: this.openRawFile, className: "codeButtonGroup" })));
            }
            else {
                return (react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "row", alignItems: "center", gutterSize: "none" },
                    react_1.default.createElement(eui_1.EuiButtonGroup, { buttonSize: "s", color: "primary", options: [
                            {
                                id: ButtonOption.Folder,
                                label: ButtonOption.Folder,
                            },
                            {
                                id: ButtonOption.History,
                                label: ButtonOption.History,
                            },
                        ], type: "single", idSelected: buttonId, onChange: this.switchButton })));
            }
        };
    }
    render() {
        return (react_1.default.createElement("div", { className: "codeContainer__main" },
            react_1.default.createElement(top_bar_1.TopBar, { routeParams: this.props.match.params, onSearchScopeChanged: this.props.onSearchScopeChanged, buttons: this.renderButtons(), searchOptions: this.props.searchOptions, branches: this.props.branches, query: this.props.query }),
            this.renderContent()));
    }
    shouldRenderCloneProgress() {
        if (!this.props.repoStatus) {
            return false;
        }
        const { progress, cloneProgress, state } = this.props.repoStatus;
        return (!!progress &&
            state === reducers_1.RepoState.CLONING &&
            progress < model_1.WorkerReservedProgress.COMPLETED &&
            !repository_utils_1.RepositoryUtils.hasFullyCloned(cloneProgress));
    }
    renderCloneProgress() {
        if (!this.props.repoStatus) {
            return null;
        }
        const { progress, cloneProgress } = this.props.repoStatus;
        const { org, repo } = this.props.match.params;
        return (react_1.default.createElement(clone_status_1.CloneStatus, { repoName: `${org}/${repo}`, progress: progress ? progress : 0, cloneProgress: cloneProgress }));
    }
    renderContent() {
        const { file, match, tree, fileTreeLoadingPaths, isNotFound, notFoundDirs } = this.props;
        const { path, pathType, resource, org, repo, revision } = match.params;
        // The clone progress rendering should come before the NotFound rendering.
        if (this.shouldRenderCloneProgress()) {
            return this.renderCloneProgress();
        }
        if (isNotFound || notFoundDirs.includes(path || '')) {
            return react_1.default.createElement(not_found_1.NotFound, null);
        }
        const repoUri = `${resource}/${org}/${repo}`;
        switch (pathType) {
            case types_1.PathTypes.tree:
                const node = this.findNode(path ? path.split('/') : [], tree);
                return (react_1.default.createElement("div", { className: "codeContainer__directoryView" },
                    react_1.default.createElement(directory_1.Directory, { node: node, loading: fileTreeLoadingPaths.includes(path) }),
                    react_1.default.createElement(commit_history_1.CommitHistory, { repoUri: repoUri, header: react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(eui_1.EuiTitle, { size: "s", className: "codeMargin__title" },
                                react_1.default.createElement("h3", null, "Recent Commits")),
                            react_1.default.createElement(eui_1.EuiButton, { size: "s", href: `#/${resource}/${org}/${repo}/${types_1.PathTypes.commits}/${url_1.encodeRevisionString(revision)}/${path || ''}` }, "View All")) })));
            case types_1.PathTypes.blob:
                if (!file) {
                    return null;
                }
                const { lang: fileLanguage, content: fileContent, isUnsupported, isOversize, isImage, } = file;
                if (isUnsupported) {
                    return (react_1.default.createElement(error_panel_1.ErrorPanel, { title: react_1.default.createElement("h2", null, "Unsupported File"), content: "Unfortunately that\u2019s an unsupported file type and we\u2019re unable to render it here." }));
                }
                if (isOversize) {
                    return (react_1.default.createElement(error_panel_1.ErrorPanel, { title: react_1.default.createElement("h2", null, "File is too big"), content: "Sorry about that, but we can\u2019t show files that are this big right now." }));
                }
                if (fileLanguage === LANG_MD) {
                    const markdownRenderers = {
                        link: ({ children, href }) => (react_1.default.createElement(eui_1.EuiLink, { href: href, target: "_blank" }, children)),
                    };
                    return (react_1.default.createElement("div", { className: "markdown-body code-markdown-container kbnMarkdown__body" },
                        react_1.default.createElement(react_markdown_1.default, { source: fileContent, escapeHtml: true, skipHtml: true, renderers: markdownRenderers })));
                }
                else if (isImage) {
                    const rawUrl = chrome_1.default.addBasePath(`/app/code/repo/${repoUri}/raw/${revision}/${path}`);
                    return (react_1.default.createElement("div", { className: "code-auto-margin" },
                        react_1.default.createElement("img", { src: rawUrl, alt: rawUrl })));
                }
                return (react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "row", className: "codeContainer__blame", gutterSize: "none" },
                    react_1.default.createElement(editor_1.Editor, { showBlame: false })));
            case types_1.PathTypes.blame:
                return (react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "row", className: "codeContainer__blame", gutterSize: "none" },
                    react_1.default.createElement(editor_1.Editor, { showBlame: true })));
            case types_1.PathTypes.commits:
                return (react_1.default.createElement("div", { className: "codeContainer__history" },
                    react_1.default.createElement(commit_history_1.CommitHistory, { repoUri: repoUri, header: react_1.default.createElement(eui_1.EuiTitle, { className: "codeMargin__title" },
                            react_1.default.createElement("h3", null, "Commit History")), showPagination: true })));
        }
    }
}
const mapStateToProps = (state) => ({
    isNotFound: state.file.isNotFound,
    notFoundDirs: state.file.notFoundDirs,
    file: state.file.file,
    tree: state.file.tree,
    fileTreeLoadingPaths: state.file.fileTreeLoadingPaths,
    currentTree: selectors_1.currentTreeSelector(state),
    branches: state.file.branches,
    hasMoreCommits: selectors_1.hasMoreCommitsSelector(state),
    loadingCommits: state.file.loadingCommits,
    repoStatus: selectors_1.statusSelector(state, selectors_1.repoUriSelector(state)),
    searchOptions: state.search.searchOptions,
    query: state.search.query,
});
const mapDispatchToProps = {
    onSearchScopeChanged: actions_1.changeSearchScope,
};
exports.Content = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps
// @ts-ignore
)(CodeContent));
