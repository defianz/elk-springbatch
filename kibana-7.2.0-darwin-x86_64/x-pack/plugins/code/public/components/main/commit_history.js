"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const commit_link_1 = require("../diff_page/commit_link");
const selectors_1 = require("../../selectors");
const actions_1 = require("../../actions");
const COMMIT_ID_LENGTH = 8;
const Commit = (props) => {
    const { date, commit } = props;
    const { message, committer, id } = commit;
    const commitId = id
        .split('')
        .slice(0, COMMIT_ID_LENGTH)
        .join('');
    return (react_1.default.createElement(eui_1.EuiPanel, { className: "code-timeline__commit--root" },
        react_1.default.createElement("div", { className: "eui-textTruncate" },
            react_1.default.createElement(eui_1.EuiText, { size: "s" },
                react_1.default.createElement("p", { className: "eui-textTruncate" }, message)),
            react_1.default.createElement(eui_1.EuiText, { size: "xs" },
                react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued" },
                    committer,
                    " \u00B7 ",
                    date))),
        react_1.default.createElement("div", { className: "code-commit-id" },
            react_1.default.createElement(commit_link_1.CommitLink, { repoUri: props.repoUri, commit: commitId }))));
};
const CommitGroup = (props) => {
    const commitList = props.commits.map(commit => (react_1.default.createElement(Commit, { commit: commit, key: commit.id, date: props.date, repoUri: props.repoUri })));
    return (react_1.default.createElement("div", { className: "code-timeline__commit-container" },
        react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "flexStart", gutterSize: "s" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement("div", { className: "code-timeline__marker" })),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiText, null,
                    react_1.default.createElement("h4", null,
                        react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued" },
                            "Commits on ",
                            props.date))))),
        react_1.default.createElement("div", { className: "code-timeline" }, commitList)));
};
exports.CommitHistoryLoading = () => (react_1.default.createElement("div", { className: "codeLoader" },
    react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "xl" })));
exports.PageButtons = (props) => (react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceAround" },
    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_1.EuiButton, { onClick: props.onClick, iconType: "arrowDown", isLoading: props.loading, isDisabled: props.disabled, size: "s" }, "More"))));
exports.CommitHistoryComponent = (props) => {
    const commits = lodash_1.default.groupBy(props.commits, commit => moment_1.default(commit.updated).format('YYYYMMDD'));
    const commitDates = Object.keys(commits).sort((a, b) => b.localeCompare(a)); // sort desc
    const commitList = commitDates.map(cd => (react_1.default.createElement(CommitGroup, { commits: commits[cd], date: moment_1.default(cd).format('MMMM Do, YYYY'), key: cd, repoUri: props.repoUri })));
    return (react_1.default.createElement("div", { className: "codeContainer__commitMessages" },
        react_1.default.createElement("div", { className: "codeHeader__commit" }, props.header),
        commitList,
        !props.showPagination && props.loadingCommits && react_1.default.createElement(exports.CommitHistoryLoading, null),
        props.showPagination && (react_1.default.createElement(exports.PageButtons, { disabled: !props.hasMoreCommit || props.commits.length < 10, onClick: () => props.fetchMoreCommits(props.repoUri), loading: props.loadingCommits }))));
};
const mapStateToProps = (state) => ({
    file: state.file.file,
    commits: selectors_1.treeCommitsSelector(state) || [],
    loadingCommits: state.file.loadingCommits,
    hasMoreCommit: selectors_1.hasMoreCommitsSelector(state),
});
const mapDispatchToProps = {
    fetchMoreCommits: actions_1.fetchMoreCommits,
};
exports.CommitHistory = react_redux_1.connect(mapStateToProps, mapDispatchToProps
// @ts-ignore
)(exports.CommitHistoryComponent);
