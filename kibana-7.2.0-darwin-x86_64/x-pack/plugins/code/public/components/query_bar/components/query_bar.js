"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
const react_redux_1 = require("react-redux");
const actions_1 = require("../../../actions");
const match_pairs_1 = require("../lib/match_pairs");
const suggestions_component_1 = require("./typeahead/suggestions_component");
const types_1 = require("../../../common/types");
const options_1 = require("./options");
const scope_selector_1 = require("./scope_selector");
const KEY_CODES = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    ESC: 27,
    TAB: 9,
    HOME: 36,
    END: 35,
};
class CodeQueryBar extends react_1.Component {
    constructor() {
        super(...arguments);
        /*
         Keep the "draft" value in local state until the user actually submits the query. There are a couple advantages:
      
          1. Each app doesn't have to maintain its own "draft" value if it wants to put off updating the query in app state
          until the user manually submits their changes. Most apps have watches on the query value in app state so we don't
          want to trigger those on every keypress. Also, some apps (e.g. dashboard) already juggle multiple query values,
          each with slightly different semantics and I'd rather not add yet another variable to the mix.
      
          2. Changes to the local component state won't trigger an Angular digest cycle. Triggering digest cycles on every
          keypress has been a major source of performance issues for us in previous implementations of the query bar.
          See https://github.com/elastic/kibana/issues/14086
        */
        this.state = {
            query: this.props.query,
            inputIsPristine: true,
            isSuggestionsVisible: false,
            groupIndex: null,
            itemIndex: null,
            suggestionGroups: [],
            showOptions: false,
        };
        this.updateSuggestions = lodash_1.debounce(async () => {
            const suggestionGroups = (await this.getSuggestions()) || [];
            if (!this.componentIsUnmounting) {
                this.setState({ suggestionGroups });
            }
        }, 100);
        this.inputRef = null;
        this.optionFlyout = null;
        this.componentIsUnmounting = false;
        this.isDirty = () => {
            return this.state.query !== this.props.query;
        };
        this.loadMore = () => {
            // TODO(mengwei): Add action for load more.
        };
        this.incrementIndex = (currGroupIndex, currItemIndex) => {
            let nextItemIndex = currItemIndex + 1;
            if (currGroupIndex === null) {
                currGroupIndex = 0;
            }
            let nextGroupIndex = currGroupIndex;
            const group = this.state.suggestionGroups[currGroupIndex];
            if (currItemIndex === null || nextItemIndex >= group.suggestions.length) {
                nextItemIndex = 0;
                nextGroupIndex = currGroupIndex + 1;
                if (nextGroupIndex >= this.state.suggestionGroups.length) {
                    nextGroupIndex = 0;
                }
            }
            this.setState({
                groupIndex: nextGroupIndex,
                itemIndex: nextItemIndex,
            });
        };
        this.decrementIndex = (currGroupIndex, currItemIndex) => {
            let prevItemIndex = currItemIndex - 1;
            if (currGroupIndex === null) {
                currGroupIndex = this.state.suggestionGroups.length - 1;
            }
            let prevGroupIndex = currGroupIndex;
            if (currItemIndex === null || prevItemIndex < 0) {
                prevGroupIndex = currGroupIndex - 1;
                if (prevGroupIndex < 0) {
                    prevGroupIndex = this.state.suggestionGroups.length - 1;
                }
                const group = this.state.suggestionGroups[prevGroupIndex];
                prevItemIndex = group.suggestions.length - 1;
            }
            this.setState({
                groupIndex: prevGroupIndex,
                itemIndex: prevItemIndex,
            });
        };
        this.getSuggestions = async () => {
            if (!this.inputRef) {
                return;
            }
            const { query } = this.state;
            if (query.length === 0) {
                return [];
            }
            if (!this.props.suggestionProviders || this.props.suggestionProviders.length === 0) {
                return [];
            }
            const { selectionStart, selectionEnd } = this.inputRef;
            if (selectionStart === null || selectionEnd === null) {
                return;
            }
            if (this.props.onSuggestionQuerySubmitted) {
                this.props.onSuggestionQuerySubmitted(query);
            }
            const res = await Promise.all(this.props.suggestionProviders.map((provider) => {
                // Merge the default repository scope if necessary.
                const repoScopes = this.props.searchOptions.repoScope.map(repo => repo.uri);
                if (this.props.searchOptions.defaultRepoScopeOn &&
                    this.props.searchOptions.defaultRepoScope) {
                    repoScopes.push(this.props.searchOptions.defaultRepoScope.uri);
                }
                return provider.getSuggestions(query, this.props.searchScope, repoScopes);
            }));
            return res.filter((group) => group.suggestions.length > 0);
        };
        this.selectSuggestion = (item) => {
            if (!this.inputRef) {
                return;
            }
            const { selectionStart, selectionEnd } = this.inputRef;
            if (selectionStart === null || selectionEnd === null) {
                return;
            }
            this.setState({
                query: this.state.query,
                groupIndex: null,
                itemIndex: null,
                isSuggestionsVisible: false,
            }, () => {
                if (item) {
                    this.props.onSelect(item, this.state.query);
                }
            });
        };
        this.onOutsideClick = () => {
            this.setState({ isSuggestionsVisible: false, groupIndex: null, itemIndex: null });
        };
        this.onClickInput = (event) => {
            if (event.target instanceof HTMLInputElement) {
                this.onInputChange(event.target.value);
            }
        };
        this.onClickSubmitButton = (event) => {
            this.onSubmit(() => event.preventDefault());
        };
        this.onClickSuggestion = (suggestion) => {
            if (!this.inputRef) {
                return;
            }
            this.selectSuggestion(suggestion);
            this.inputRef.focus();
        };
        this.onMouseEnterSuggestion = (groupIndex, itemIndex) => {
            this.setState({ groupIndex, itemIndex });
        };
        this.onInputChange = (value) => {
            const hasValue = Boolean(value.trim());
            this.setState({
                query: value,
                inputIsPristine: false,
                isSuggestionsVisible: hasValue,
                groupIndex: null,
                itemIndex: null,
            });
        };
        this.onChange = (event) => {
            this.updateSuggestions();
            this.onInputChange(event.target.value);
        };
        this.onKeyUp = (event) => {
            if ([KEY_CODES.LEFT, KEY_CODES.RIGHT, KEY_CODES.HOME, KEY_CODES.END].includes(event.keyCode)) {
                this.setState({ isSuggestionsVisible: true });
                if (event.target instanceof HTMLInputElement) {
                    this.onInputChange(event.target.value);
                }
            }
        };
        this.onKeyDown = (event) => {
            if (event.target instanceof HTMLInputElement) {
                const { isSuggestionsVisible, groupIndex, itemIndex } = this.state;
                const preventDefault = event.preventDefault.bind(event);
                const { target, key, metaKey } = event;
                const { value, selectionStart, selectionEnd } = target;
                const updateQuery = (query, newSelectionStart, newSelectionEnd) => {
                    this.setState({
                        query,
                    }, () => {
                        target.setSelectionRange(newSelectionStart, newSelectionEnd);
                    });
                };
                switch (event.keyCode) {
                    case KEY_CODES.DOWN:
                        event.preventDefault();
                        if (isSuggestionsVisible && groupIndex !== null && itemIndex !== null) {
                            this.incrementIndex(groupIndex, itemIndex);
                        }
                        else {
                            this.setState({ isSuggestionsVisible: true, groupIndex: 0, itemIndex: 0 });
                        }
                        break;
                    case KEY_CODES.UP:
                        event.preventDefault();
                        if (isSuggestionsVisible && groupIndex !== null && itemIndex !== null) {
                            this.decrementIndex(groupIndex, itemIndex);
                        }
                        else {
                            const lastGroupIndex = this.state.suggestionGroups.length - 1;
                            const group = this.state.suggestionGroups[lastGroupIndex];
                            if (group !== null) {
                                const lastItemIndex = group.suggestions.length - 1;
                                this.setState({
                                    isSuggestionsVisible: true,
                                    groupIndex: lastGroupIndex,
                                    itemIndex: lastItemIndex,
                                });
                            }
                        }
                        break;
                    case KEY_CODES.ENTER:
                        event.preventDefault();
                        if (isSuggestionsVisible &&
                            groupIndex !== null &&
                            itemIndex !== null &&
                            this.state.suggestionGroups[groupIndex]) {
                            const group = this.state.suggestionGroups[groupIndex];
                            this.selectSuggestion(group.suggestions[itemIndex]);
                        }
                        else {
                            this.onSubmit(() => event.preventDefault());
                        }
                        break;
                    case KEY_CODES.ESC:
                        event.preventDefault();
                        this.setState({ isSuggestionsVisible: false, groupIndex: null, itemIndex: null });
                        break;
                    case KEY_CODES.TAB:
                        this.setState({ isSuggestionsVisible: false, groupIndex: null, itemIndex: null });
                        break;
                    default:
                        if (selectionStart !== null && selectionEnd !== null) {
                            match_pairs_1.matchPairs({
                                value,
                                selectionStart,
                                selectionEnd,
                                key,
                                metaKey,
                                updateQuery,
                                preventDefault,
                            });
                        }
                        break;
                }
            }
        };
        this.onSubmit = (preventDefault) => {
            if (preventDefault) {
                preventDefault();
            }
            this.props.onSubmit(this.state.query);
            this.setState({ isSuggestionsVisible: false });
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (lodash_1.isEqual(prevState.currentProps, nextProps)) {
            return null;
        }
        const nextState = {
            currentProps: nextProps,
        };
        if (nextProps.query !== prevState.query) {
            nextState.query = nextProps.query;
        }
        return nextState;
    }
    componentDidMount() {
        this.updateSuggestions();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.query !== this.props.query) {
            this.updateSuggestions();
        }
        // When search options (e.g. repository scopes) change,
        // submit the search query again to refresh the search result.
        if (this.props.enableSubmitWhenOptionsChanged &&
            !_.isEqual(prevProps.searchOptions, this.props.searchOptions)) {
            this.onSubmit();
        }
    }
    componentWillUnmount() {
        this.updateSuggestions.cancel();
        this.componentIsUnmounting = true;
    }
    focusInput() {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }
    toggleOptionsFlyout() {
        if (this.optionFlyout) {
            this.optionFlyout.toggleOptionsFlyout();
        }
    }
    render() {
        const inputRef = (node) => {
            if (node) {
                this.inputRef = node;
            }
        };
        const activeDescendant = this.state.isSuggestionsVisible
            ? `suggestion-${this.state.groupIndex}-${this.state.itemIndex}`
            : '';
        return (react_1.default.createElement(eui_1.EuiFlexGroup, { responsive: false, gutterSize: "none" },
            react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                react_1.default.createElement(scope_selector_1.ScopeSelector, { scope: this.props.searchScope, onScopeChanged: this.props.onSearchScopeChanged })),
            react_1.default.createElement(eui_1.EuiFlexItem, null,
                react_1.default.createElement(eui_1.EuiOutsideClickDetector, { onOutsideClick: this.onOutsideClick },
                    react_1.default.createElement("div", { style: { position: 'relative' }, role: "combobox", "aria-haspopup": "true", "aria-expanded": this.state.isSuggestionsVisible, "aria-owns": "typeahead-items", "aria-controls": "typeahead-items" },
                        react_1.default.createElement("form", { name: "queryBarForm" },
                            react_1.default.createElement("div", { className: "kuiLocalSearch", role: "search" },
                                react_1.default.createElement("div", { className: "kuiLocalSearchAssistedInput" },
                                    react_1.default.createElement(eui_1.EuiFieldText, { className: "kuiLocalSearchAssistedInput__input", placeholder: types_1.SearchScopePlaceholderText[this.props.searchScope], value: this.state.query, onKeyDown: this.onKeyDown, onKeyUp: this.onKeyUp, onChange: this.onChange, onClick: this.onClickInput, fullWidth: true, autoFocus: !this.props.disableAutoFocus, inputRef: inputRef, autoComplete: "off", spellCheck: false, "aria-label": "Search input", type: "text", "data-test-subj": "queryInput", "aria-autocomplete": "list", "aria-controls": "typeahead-items", "aria-activedescendant": activeDescendant, role: "textbox" }),
                                    react_1.default.createElement(options_1.SearchOptions, { defaultRepoOptions: this.props.defaultRepoOptions, defaultSearchScope: this.props.currentRepository, repositorySearch: this.props.repositorySearch, saveSearchOptions: this.props.saveSearchOptions, repoSearchResults: this.props.repoSearchResults, searchLoading: this.props.searchLoading, searchOptions: this.props.searchOptions, ref: element => (this.optionFlyout = element) })))),
                        react_1.default.createElement(suggestions_component_1.SuggestionsComponent, { query: this.state.query, show: this.state.isSuggestionsVisible, suggestionGroups: this.state.suggestionGroups, groupIndex: this.state.groupIndex, itemIndex: this.state.itemIndex, onClick: this.onClickSuggestion, onMouseEnter: this.onMouseEnterSuggestion, loadMore: this.loadMore }))))));
    }
}
exports.CodeQueryBar = CodeQueryBar;
const mapStateToProps = (state) => ({
    repoSearchResults: state.search.scopeSearchResults.repositories,
    searchLoading: state.search.isScopeSearchLoading,
    searchScope: state.search.scope,
    searchOptions: state.search.searchOptions,
    defaultRepoOptions: state.repository.repositories.slice(0, 5),
    currentRepository: state.repository.currentRepository,
});
const mapDispatchToProps = {
    repositorySearch: actions_1.searchReposForScope,
    saveSearchOptions: actions_1.saveSearchOptions,
    onSuggestionQuerySubmitted: actions_1.suggestionSearch,
};
exports.QueryBar = react_redux_1.connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(CodeQueryBar);
