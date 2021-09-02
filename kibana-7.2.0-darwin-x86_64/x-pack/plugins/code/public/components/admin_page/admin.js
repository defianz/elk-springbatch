"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = require("querystring");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const url_1 = tslib_1.__importDefault(require("url"));
const eui_1 = require("@elastic/eui");
const actions_1 = require("../../actions");
const search_bar_1 = require("../search_bar");
const empty_project_1 = require("./empty_project");
const language_server_tab_1 = require("./language_server_tab");
const project_tab_1 = require("./project_tab");
var AdminTabs;
(function (AdminTabs) {
    AdminTabs["projects"] = "Repos";
    AdminTabs["roles"] = "Roles";
    AdminTabs["languageServers"] = "LanguageServers";
})(AdminTabs || (AdminTabs = {}));
class AdminPage extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.searchBar = null;
        this.tabs = [
            {
                id: AdminTabs.projects,
                name: AdminTabs.projects,
                disabled: false,
            },
            {
                id: AdminTabs.languageServers,
                name: 'Language servers',
                disabled: false,
            },
        ];
        this.getAdminTabClickHandler = (tab) => () => {
            this.setState({ tab });
            this.props.history.push(url_1.default.format({ pathname: '/admin', query: { tab } }));
        };
        this.filterRepos = () => {
            return this.props.repositories;
        };
        this.renderTabContent = () => {
            switch (this.state.tab) {
                case AdminTabs.languageServers: {
                    return react_1.default.createElement(language_server_tab_1.LanguageSeverTab, null);
                }
                case AdminTabs.projects:
                default: {
                    const repositoriesCount = this.props.repositories.length;
                    const showEmpty = repositoriesCount === 0 && !this.props.repositoryLoading;
                    if (showEmpty) {
                        return react_1.default.createElement(empty_project_1.EmptyProject, null);
                    }
                    return react_1.default.createElement(project_tab_1.ProjectTab, null);
                }
            }
        };
        const getTab = () => {
            const { search } = props.location;
            let qs = search;
            if (search.charAt(0) === '?') {
                qs = search.substr(1);
            }
            return querystring_1.parse(qs).tab || AdminTabs.projects;
        };
        this.state = {
            tab: getTab(),
        };
    }
    static getDerivedStateFromProps(props) {
        const getTab = () => {
            const { search } = props.location;
            let qs = search;
            if (search.charAt(0) === '?') {
                qs = search.substr(1);
            }
            return querystring_1.parse(qs).tab || AdminTabs.projects;
        };
        return {
            tab: getTab(),
        };
    }
    renderTabs() {
        const tabs = this.tabs.map(tab => (react_1.default.createElement(eui_1.EuiTab, { onClick: this.getAdminTabClickHandler(tab.id), isSelected: tab.id === this.state.tab, disabled: tab.disabled, key: tab.id }, tab.name)));
        return react_1.default.createElement(eui_1.EuiTabs, null, tabs);
    }
    render() {
        return (react_1.default.createElement("div", { className: "codeContainer__root" },
            react_1.default.createElement("div", { className: "codeContainer__rootInner" },
                react_1.default.createElement("div", { className: "codeContainer__adminWrapper" },
                    react_1.default.createElement(search_bar_1.SearchBar, { searchOptions: this.props.searchOptions, query: this.props.query, onSearchScopeChanged: this.props.onSearchScopeChanged, enableSubmitWhenOptionsChanged: false, ref: element => (this.searchBar = element) }),
                    react_1.default.createElement("div", { className: "codeContainer__adminMain" },
                        this.renderTabs(),
                        this.renderTabContent())))));
    }
}
const mapStateToProps = (state) => ({
    ...state.search,
    repositories: state.repository.repositories,
    repositoryLoading: state.repository.loading,
});
const mapDispatchToProps = {
    onSearchScopeChanged: actions_1.changeSearchScope,
};
exports.Admin = react_router_dom_1.withRouter(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AdminPage));
