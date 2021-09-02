"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const url_1 = tslib_1.__importDefault(require("url"));
const model_1 = require("../../../model");
const actions_1 = require("../../actions");
const url_2 = require("../../utils/url");
const project_item_1 = require("../admin_page/project_item");
const search_bar_1 = require("../search_bar");
const code_result_1 = require("./code_result");
const empty_placeholder_1 = require("./empty_placeholder");
const pagination_1 = require("./pagination");
const side_bar_1 = require("./side_bar");
class SearchPage extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            uri: '',
        };
        this.searchBar = null;
        this.onLanguageFilterToggled = (lang) => {
            const { languages, repositories, query, page } = this.props;
            let tempLangs = new Set();
            if (languages && languages.has(lang)) {
                // Remove this language filter
                tempLangs = new Set(languages);
                tempLangs.delete(lang);
            }
            else {
                // Add this language filter
                tempLangs = languages ? new Set(languages) : new Set();
                tempLangs.add(lang);
            }
            const queries = querystring_1.default.parse(url_2.history.location.search.replace('?', ''));
            return () => {
                url_2.history.push(url_1.default.format({
                    pathname: '/search',
                    query: {
                        ...queries,
                        q: query,
                        p: page,
                        langs: Array.from(tempLangs).join(','),
                        repos: repositories ? Array.from(repositories).join(',') : undefined,
                    },
                }));
            };
        };
        this.onRepositoryFilterToggled = (repo) => {
            const { languages, repositories, query } = this.props;
            let tempRepos = new Set();
            if (repositories && repositories.has(repo)) {
                // Remove this repository filter
                tempRepos = new Set(repositories);
                tempRepos.delete(repo);
            }
            else {
                // Add this language filter
                tempRepos = repositories ? new Set(repositories) : new Set();
                tempRepos.add(repo);
            }
            const queries = querystring_1.default.parse(url_2.history.location.search.replace('?', ''));
            return () => {
                url_2.history.push(url_1.default.format({
                    pathname: '/search',
                    query: {
                        ...queries,
                        q: query,
                        p: 1,
                        langs: languages ? Array.from(languages).join(',') : undefined,
                        repos: Array.from(tempRepos).join(','),
                    },
                }));
            };
        };
    }
    componentDidMount() {
        chrome_1.default.breadcrumbs.push({ text: `Search` });
    }
    componentWillUnmount() {
        chrome_1.default.breadcrumbs.pop();
    }
    render() {
        const { query, scope, documentSearchResults, languages, isLoading, repositories, repositorySearchResults, } = this.props;
        let mainComp = isLoading ? (react_1.default.createElement("div", null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" }, "Loading..."),
            react_1.default.createElement(eui_1.EuiSpacer, { size: "m" }),
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" },
                react_1.default.createElement(eui_1.EuiLoadingSpinner, { size: "xl" })))) : (react_1.default.createElement(empty_placeholder_1.EmptyPlaceholder, { query: query, toggleOptionsFlyout: () => {
                this.searchBar.toggleOptionsFlyout();
            } }));
        let repoStats = [];
        let languageStats = [];
        if (scope === model_1.SearchScope.REPOSITORY &&
            repositorySearchResults &&
            repositorySearchResults.total > 0) {
            const { repositories: repos, from, total } = repositorySearchResults;
            const resultComps = repos &&
                repos.map((repo) => (react_1.default.createElement(eui_1.EuiFlexItem, { key: repo.uri },
                    react_1.default.createElement(project_item_1.ProjectItem, { key: repo.uri, project: repo, showStatus: false, enableManagement: false }))));
            const to = from + repos.length;
            const statsComp = (react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                react_1.default.createElement("h1", null,
                    "Showing ",
                    total > 0 ? from : 0,
                    " - ",
                    to,
                    " of ",
                    total,
                    " results.")));
            mainComp = (react_1.default.createElement("div", { className: "codeContainer__search--inner" },
                statsComp,
                react_1.default.createElement(eui_1.EuiSpacer, null),
                react_1.default.createElement("div", { className: "codeContainer__search--results" }, resultComps)));
        }
        else if (scope === model_1.SearchScope.DEFAULT && documentSearchResults) {
            const { stats, results } = documentSearchResults;
            const { total, from, to, page, totalPage } = stats;
            languageStats = stats.languageStats;
            repoStats = stats.repoStats;
            if (documentSearchResults.total > 0) {
                const statsComp = (react_1.default.createElement(eui_1.EuiTitle, { size: "m" },
                    react_1.default.createElement("h1", null,
                        "Showing ",
                        total > 0 ? from : 0,
                        " - ",
                        to,
                        " of ",
                        total,
                        " results.")));
                mainComp = (react_1.default.createElement("div", { className: "codeContainer__search--inner" },
                    statsComp,
                    react_1.default.createElement(eui_1.EuiSpacer, null),
                    react_1.default.createElement("div", { className: "codeContainer__search--results" },
                        react_1.default.createElement(code_result_1.CodeResult, { results: results })),
                    react_1.default.createElement(pagination_1.Pagination, { query: this.props.query, totalPage: totalPage, currentPage: page - 1 })));
            }
        }
        return (react_1.default.createElement("div", { className: "codeContainer__root" },
            react_1.default.createElement("div", { className: "codeContainer__rootInner" },
                react_1.default.createElement(side_bar_1.SideBar, { query: this.props.query, scope: scope, repositories: repositories, languages: languages, repoFacets: repoStats, langFacets: languageStats, onLanguageFilterToggled: this.onLanguageFilterToggled, onRepositoryFilterToggled: this.onRepositoryFilterToggled }),
                react_1.default.createElement("div", { className: "codeContainer__search--main" },
                    react_1.default.createElement(search_bar_1.SearchBar, { searchOptions: this.props.searchOptions, query: this.props.query, onSearchScopeChanged: this.props.onSearchScopeChanged, enableSubmitWhenOptionsChanged: true, ref: (element) => (this.searchBar = element) }),
                    mainComp))));
    }
}
const mapStateToProps = (state) => ({
    ...state.search,
});
const mapDispatchToProps = {
    onSearchScopeChanged: actions_1.changeSearchScope,
};
exports.Search = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SearchPage);
