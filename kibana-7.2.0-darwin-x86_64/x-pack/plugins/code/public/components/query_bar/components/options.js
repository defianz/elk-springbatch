"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_2 = require("@elastic/eui");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
class SearchOptions extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            query: '',
            isFlyoutOpen: false,
            repoScope: this.props.searchOptions.repoScope,
            defaultRepoScopeOn: this.props.searchOptions.defaultRepoScopeOn,
        };
        this.applyAndClose = () => {
            if (this.state.defaultRepoScopeOn && this.props.defaultSearchScope) {
                this.props.saveSearchOptions({
                    repoScope: lodash_1.unique([...this.state.repoScope, this.props.defaultSearchScope], r => r.uri),
                    defaultRepoScopeOn: this.state.defaultRepoScopeOn,
                });
            }
            else {
                this.props.saveSearchOptions({
                    repoScope: this.state.repoScope,
                    defaultRepoScopeOn: this.state.defaultRepoScopeOn,
                });
            }
            this.setState({ isFlyoutOpen: false });
        };
        this.removeRepoScope = (r) => () => {
            this.setState(prevState => {
                const nextState = {
                    repoScope: prevState.repoScope.filter(rs => rs.uri !== r),
                };
                if (this.props.defaultSearchScope && r === this.props.defaultSearchScope.uri) {
                    nextState.defaultRepoScopeOn = false;
                }
                return nextState;
            });
        };
        this.onRepoSearchChange = (searchValue) => {
            this.setState({ query: searchValue });
            if (searchValue) {
                this.props.repositorySearch({
                    query: searchValue,
                });
            }
        };
        this.onRepoChange = (repos) => {
            this.setState(prevState => ({
                repoScope: lodash_1.unique([
                    ...prevState.repoScope,
                    ...repos.map((r) => [...this.props.repoSearchResults, ...this.props.defaultRepoOptions].find(rs => rs.name === r.label)),
                ]),
            }));
        };
        this.toggleOptionsFlyout = () => {
            this.setState({
                isFlyoutOpen: !this.state.isFlyoutOpen,
            });
        };
        this.closeOptionsFlyout = () => {
            this.setState({
                isFlyoutOpen: false,
                repoScope: this.props.searchOptions.repoScope,
                defaultRepoScopeOn: this.props.searchOptions.defaultRepoScopeOn,
            });
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.searchOptions.defaultRepoScopeOn !== prevProps.searchOptions.defaultRepoScopeOn) {
            this.setState({ defaultRepoScopeOn: this.props.searchOptions.defaultRepoScopeOn });
        }
    }
    render() {
        let optionsFlyout;
        const repoScope = this.state.defaultRepoScopeOn && this.props.defaultSearchScope
            ? lodash_1.unique([...this.state.repoScope, this.props.defaultSearchScope], r => r.uri)
            : this.state.repoScope;
        if (this.state.isFlyoutOpen) {
            const selectedRepos = repoScope.map(r => {
                return (react_1.default.createElement("div", { key: r.uri },
                    react_1.default.createElement(eui_1.EuiPanel, { paddingSize: "s" },
                        react_1.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none", justifyContent: "spaceBetween", alignItems: "center" },
                            react_1.default.createElement("div", { className: "codeQueryBar" },
                                react_1.default.createElement(eui_1.EuiText, null,
                                    react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued" },
                                        r.org,
                                        "/"),
                                    react_1.default.createElement("b", null, r.name))),
                            react_1.default.createElement(eui_2.EuiIcon, { className: "codeUtility__cursor--pointer", type: "cross", onClick: this.removeRepoScope(r.uri) }))),
                    react_1.default.createElement(eui_1.EuiSpacer, { size: "s" })));
            });
            optionsFlyout = (react_1.default.createElement(eui_1.EuiFlyout, { onClose: this.closeOptionsFlyout, size: "s", "aria-labelledby": "flyoutSmallTitle", className: "codeSearchSettings__flyout" },
                react_1.default.createElement(eui_1.EuiFlyoutHeader, null,
                    react_1.default.createElement(eui_1.EuiTitle, { size: "s" },
                        react_1.default.createElement("h2", { id: "flyoutSmallTitle", className: "" },
                            react_1.default.createElement(eui_1.EuiNotificationBadge, { size: "m", className: "code-notification-badge" }, repoScope.length),
                            react_1.default.createElement(eui_1.EuiTextColor, { color: "secondary", className: "code-flyout-title" },
                                ' ',
                                "Search Filters",
                                ' ')))),
                react_1.default.createElement(eui_1.EuiFlyoutBody, null,
                    react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
                        react_1.default.createElement("h3", null, "Repo Scope")),
                    react_1.default.createElement(eui_1.EuiText, { size: "xs" }, "Add indexed repos to your search scope"),
                    react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                    react_1.default.createElement(eui_1.EuiComboBox, { placeholder: "Search to add repos", async: true, options: this.state.query
                            ? this.props.repoSearchResults.map(repo => ({
                                label: repo.name,
                            }))
                            : this.props.defaultRepoOptions.map(repo => ({
                                label: repo.name,
                            })), selectedOptions: [], isLoading: this.props.searchLoading, onChange: this.onRepoChange, onSearchChange: this.onRepoSearchChange, isClearable: true }),
                    react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
                    selectedRepos,
                    react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                    react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "flexEnd", gutterSize: "none" },
                        react_1.default.createElement(eui_1.EuiButton, { onClick: this.applyAndClose, fill: true, iconSide: "right" }, "Apply and Close")))));
        }
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "kuiLocalSearchAssistedInput__assistance" },
                react_1.default.createElement(eui_1.EuiButtonEmpty, { size: "xs", onClick: this.toggleOptionsFlyout },
                    react_1.default.createElement(eui_1.EuiNotificationBadge, { size: "m", className: "code-notification-badge" }, repoScope.length),
                    react_1.default.createElement(eui_1.EuiTextColor, { color: "secondary" }, " Search Filters "))),
            optionsFlyout));
    }
}
exports.SearchOptions = SearchOptions;
