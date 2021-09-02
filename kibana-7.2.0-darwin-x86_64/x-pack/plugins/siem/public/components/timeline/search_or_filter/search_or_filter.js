"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importStar(require("styled-components"));
const kuery_autocompletion_1 = require("../../../containers/kuery_autocompletion");
const autocomplete_field_1 = require("../../autocomplete_field");
const helpers_1 = require("./helpers");
const i18n = tslib_1.__importStar(require("./translations"));
const timelineSelectModeItemsClassName = 'timelineSelectModeItemsClassName';
// SIDE EFFECT: the following creates a global class selector
// eslint-disable-next-line no-unused-expressions
styled_components_1.injectGlobal `
  .${timelineSelectModeItemsClassName} {
    width: 350px !important;
  }
`;
const SearchOrFilterContainer = styled_components_1.default.div `
  margin: 5px 0 10px 0;
  user-select: none;
`;
const ModeFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  user-select: none;
`;
exports.SearchOrFilter = recompose_1.pure(({ applyKqlFilterQuery, indexPattern, isFilterQueryDraftValid, filterQueryDraft, kqlMode, timelineId, setKqlFilterQueryDraft, updateKqlMode, }) => (React.createElement(SearchOrFilterContainer, null,
    React.createElement(eui_1.EuiFlexGroup, { "data-test-subj": "timeline-search-or-filter", gutterSize: "xs" },
        React.createElement(ModeFlexItem, { grow: false },
            React.createElement(eui_1.EuiToolTip, { content: i18n.FILTER_OR_SEARCH_WITH_KQL },
                React.createElement(eui_1.EuiSuperSelect, { "data-test-subj": "timeline-select-search-or-filter", hasDividers: true, itemLayoutAlign: "top", itemClassName: timelineSelectModeItemsClassName, onChange: (mode) => updateKqlMode({ id: timelineId, kqlMode: mode }), options: helpers_1.options, valueOfSelected: kqlMode }))),
        React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "timeline-search-or-filter-search-container" },
            React.createElement(eui_1.EuiToolTip, { content: helpers_1.modes[kqlMode].kqlBarTooltip },
                React.createElement(kuery_autocompletion_1.KueryAutocompletion, { indexPattern: indexPattern }, ({ isLoadingSuggestions, loadSuggestions, suggestions }) => (React.createElement(autocomplete_field_1.AutocompleteField, { isLoadingSuggestions: isLoadingSuggestions, isValid: isFilterQueryDraftValid, loadSuggestions: loadSuggestions, onChange: setKqlFilterQueryDraft, onSubmit: applyKqlFilterQuery, placeholder: helpers_1.getPlaceholderText(kqlMode), suggestions: suggestions, value: filterQueryDraft ? filterQueryDraft.expression : '' })))))))));
