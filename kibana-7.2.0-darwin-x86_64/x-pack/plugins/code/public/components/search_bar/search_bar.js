"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const react_1 = tslib_1.__importDefault(require("react"));
const url_1 = tslib_1.__importDefault(require("url"));
const model_1 = require("../../../model");
const types_1 = require("../../common/types");
const url_2 = require("../../utils/url");
const shortcuts_1 = require("../shortcuts");
const query_bar_1 = require("../query_bar");
class SearchBar extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.queryBar = null;
        this.onSearchChanged = (query) => {
            // Merge the default repository scope if necessary.
            const repoScopes = this.props.searchOptions.repoScope.map(repo => repo.uri);
            if (this.props.searchOptions.defaultRepoScopeOn && this.props.searchOptions.defaultRepoScope) {
                repoScopes.push(this.props.searchOptions.defaultRepoScope.uri);
            }
            // Update the url and push to history as well.
            const previousQueries = querystring_1.default.parse(url_2.history.location.search.replace('?', ''));
            const queries = repoScopes.length === 0
                ? {
                    ...previousQueries,
                    q: query,
                }
                : {
                    ...previousQueries,
                    q: query,
                    repoScope: repoScopes,
                };
            url_2.history.push(url_1.default.format({
                pathname: '/search',
                query: queries,
            }));
        };
        this.onSubmit = (q) => {
            // ignore empty query
            if (q.trim().length > 0) {
                this.onSearchChanged(q);
            }
        };
        this.onSelect = (item) => {
            url_2.history.push(item.selectUrl);
        };
        this.suggestionProviders = [
            new query_bar_1.SymbolSuggestionsProvider(),
            new query_bar_1.FileSuggestionsProvider(),
            new query_bar_1.RepositorySuggestionsProvider(),
        ];
    }
    toggleOptionsFlyout() {
        if (this.queryBar) {
            this.queryBar.toggleOptionsFlyout();
        }
    }
    render() {
        return (react_1.default.createElement("div", { className: "codeSearchbar__container" },
            react_1.default.createElement(shortcuts_1.ShortcutsProvider, null),
            react_1.default.createElement(shortcuts_1.Shortcut, { keyCode: "p", help: types_1.SearchScopeText[model_1.SearchScope.REPOSITORY], onPress: () => {
                    this.props.onSearchScopeChanged(model_1.SearchScope.REPOSITORY);
                    if (this.queryBar) {
                        this.queryBar.focusInput();
                    }
                } }),
            react_1.default.createElement(shortcuts_1.Shortcut, { keyCode: "y", help: types_1.SearchScopeText[model_1.SearchScope.SYMBOL], onPress: () => {
                    this.props.onSearchScopeChanged(model_1.SearchScope.SYMBOL);
                    if (this.queryBar) {
                        this.queryBar.focusInput();
                    }
                } }),
            react_1.default.createElement(shortcuts_1.Shortcut, { keyCode: "s", help: types_1.SearchScopeText[model_1.SearchScope.DEFAULT], onPress: () => {
                    this.props.onSearchScopeChanged(model_1.SearchScope.DEFAULT);
                    if (this.queryBar) {
                        this.queryBar.focusInput();
                    }
                } }),
            react_1.default.createElement(query_bar_1.QueryBar, { query: this.props.query, onSubmit: this.onSubmit, onSelect: this.onSelect, appName: "code", suggestionProviders: this.suggestionProviders, onSearchScopeChanged: this.props.onSearchScopeChanged, enableSubmitWhenOptionsChanged: this.props.enableSubmitWhenOptionsChanged, ref: instance => {
                    if (instance) {
                        // @ts-ignore
                        this.queryBar = instance.getWrappedInstance();
                    }
                } })));
    }
}
exports.SearchBar = SearchBar;
