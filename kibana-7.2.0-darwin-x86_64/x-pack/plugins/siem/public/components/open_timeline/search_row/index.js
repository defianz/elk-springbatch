"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const i18n = tslib_1.__importStar(require("../translations"));
const ShowingContainer = styled_components_1.default.div `
  user-select: none;
`;
const SearchRowFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  user-select: none;
`;
const FilterGroupFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-left: 24px;
`;
const SelectableQueryText = styled_components_1.default.span `
  margin-left: 3px;
  user-select: text;
`;
/**
 * Renders the row containing the search input and Only Favorites filter
 */
exports.SearchRow = recompose_1.pure(({ onlyFavorites, onQueryChange, onToggleOnlyFavorites, query, totalSearchResultsCount }) => (React.createElement(React.Fragment, null,
    React.createElement(SearchRowFlexGroup, { alignItems: "flexStart", direction: "row", gutterSize: "none", justifyContent: "spaceBetween" },
        React.createElement(eui_1.EuiFlexItem, { grow: true },
            React.createElement(eui_1.EuiSearchBar, { "data-test-subj": "search-bar", box: {
                    placeholder: i18n.SEARCH_PLACEHOLDER,
                    incremental: false,
                }, onChange: onQueryChange })),
        React.createElement(FilterGroupFlexItem, { grow: false },
            React.createElement(eui_1.EuiFilterGroup, null,
                React.createElement(eui_1.EuiFilterButton, { "data-test-subj": "only-favorites-toggle", hasActiveFilters: onlyFavorites, onClick: onToggleOnlyFavorites }, i18n.ONLY_FAVORITES)))),
    React.createElement(eui_1.EuiSpacer, { size: "s" }),
    React.createElement(ShowingContainer, { "data-test-subj": "showing" },
        React.createElement(eui_1.EuiText, { color: "subdued", size: "xs" },
            React.createElement(react_1.FormattedMessage, { "data-test-subj": "query-message", id: "xpack.siem.open.timeline.showingNTimelinesLabel", defaultMessage: "Showing {totalSearchResultsCount} {totalSearchResultsCount, plural, one {Timeline} other {Timelines}} {with}", values: {
                    totalSearchResultsCount,
                    with: query.trim().length ? i18n.WITH : '',
                } }),
            React.createElement(SelectableQueryText, { "data-test-subj": "selectable-query-text" }, query.trim()))))));
