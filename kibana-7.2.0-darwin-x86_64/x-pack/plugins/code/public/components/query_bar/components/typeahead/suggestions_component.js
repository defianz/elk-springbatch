"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const url_1 = tslib_1.__importDefault(require("url"));
const __1 = require("../..");
const suggestion_component_1 = require("./suggestion_component");
class SuggestionsComponent extends react_1.Component {
    constructor() {
        super(...arguments);
        this.childNodes = [];
        this.parentNode = null;
        this.scrollIntoView = () => {
            if (this.props.groupIndex === null || this.props.itemIndex === null) {
                return;
            }
            const parent = this.parentNode;
            const child = this.childNodes[this.props.itemIndex];
            if (this.props.groupIndex == null || this.props.itemIndex === null || !parent || !child) {
                return;
            }
            const scrollTop = Math.max(Math.min(parent.scrollTop, child.offsetTop), child.offsetTop + child.offsetHeight - parent.offsetHeight);
            parent.scrollTop = scrollTop;
        };
        this.handleScroll = () => {
            if (!this.props.loadMore || !this.parentNode) {
                return;
            }
            const position = this.parentNode.scrollTop + this.parentNode.offsetHeight;
            const height = this.parentNode.scrollHeight;
            const remaining = height - position;
            const margin = 50;
            if (!height || !position) {
                return;
            }
            if (remaining <= margin) {
                this.props.loadMore();
            }
        };
    }
    viewMoreUrl() {
        return url_1.default.format({
            pathname: '/search',
            query: {
                q: this.props.query,
            },
        });
    }
    render() {
        if (!this.props.show || lodash_1.isEmpty(this.props.suggestionGroups)) {
            return null;
        }
        return (react_1.default.createElement("div", { className: "reactSuggestionTypeahead" },
            react_1.default.createElement("div", { className: "kbnTypeahead" },
                react_1.default.createElement("div", { className: "kbnTypeahead__popover" },
                    this.renderSuggestionGroups(),
                    react_1.default.createElement(react_router_dom_1.Link, { to: this.viewMoreUrl() },
                        react_1.default.createElement("div", { className: "codeSearch__full-text-button" }, "Press \u2B90 Return for Full Text Search"))))));
    }
    componentDidUpdate(prevProps) {
        if (prevProps.groupIndex !== this.props.groupIndex ||
            prevProps.itemIndex !== this.props.itemIndex) {
            this.scrollIntoView();
        }
    }
    renderSuggestionGroups() {
        return this.props.suggestionGroups
            .filter((group) => group.suggestions.length > 0)
            .map((group, groupIndex) => {
            const { suggestions, total, type, hasMore } = group;
            const suggestionComps = suggestions.map((suggestion, itemIndex) => {
                const innerRef = (node) => (this.childNodes[itemIndex] = node);
                const mouseEnter = () => this.props.onMouseEnter(groupIndex, itemIndex);
                const isSelected = groupIndex === this.props.groupIndex && itemIndex === this.props.itemIndex;
                return (react_1.default.createElement(suggestion_component_1.SuggestionComponent, { query: this.props.query, innerRef: innerRef, selected: isSelected, suggestion: suggestion, onClick: this.props.onClick, onMouseEnter: mouseEnter, ariaId: `suggestion-${groupIndex}-${itemIndex}`, key: `${suggestion.tokenType} - ${groupIndex}-${itemIndex} - ${suggestion.text}` }));
            });
            const groupHeader = (react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "spaceBetween", className: "codeSearch-suggestion__group-header" },
                react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "row", gutterSize: "none", alignItems: "center" },
                    react_1.default.createElement(eui_1.EuiToken, { iconType: this.getGroupTokenType(group.type) }),
                    react_1.default.createElement(eui_1.EuiText, { className: "codeSearch-suggestion__group-title" }, this.getGroupTitle(group.type))),
                react_1.default.createElement("div", { className: "codeSearch-suggestion__group-result" },
                    total,
                    " Result",
                    total === 1 ? '' : 's')));
            const viewMore = (react_1.default.createElement("div", { className: "codeSearch-suggestion__link" },
                react_1.default.createElement(react_router_dom_1.Link, { to: this.viewMoreUrl() }, "View More")));
            return (react_1.default.createElement("div", { id: "kbnTypeahead__items", className: "kbnTypeahead__items codeSearch-suggestion__group", role: "listbox", "data-test-subj": `codeTypeaheadList-${type}`, ref: node => (this.parentNode = node), onScroll: this.handleScroll, key: `${type}-suggestions` },
                groupHeader,
                suggestionComps,
                hasMore ? viewMore : null));
        });
    }
    getGroupTokenType(type) {
        switch (type) {
            case __1.AutocompleteSuggestionType.FILE:
                return 'tokenFile';
            case __1.AutocompleteSuggestionType.REPOSITORY:
                return 'tokenRepo';
            case __1.AutocompleteSuggestionType.SYMBOL:
                return 'tokenSymbol';
        }
    }
    getGroupTitle(type) {
        switch (type) {
            case __1.AutocompleteSuggestionType.FILE:
                return 'Files';
            case __1.AutocompleteSuggestionType.REPOSITORY:
                return 'Repos';
            case __1.AutocompleteSuggestionType.SYMBOL:
                return 'Symbols';
        }
    }
}
exports.SuggestionsComponent = SuggestionsComponent;
