"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const recompose_1 = require("recompose");
const autocomplete_field_1 = require("../../components/autocomplete_field");
const kuery_autocompletion_1 = require("../../containers/kuery_autocompletion");
const network_1 = require("../../containers/network");
const i18n = tslib_1.__importStar(require("./translations"));
exports.NetworkKql = recompose_1.pure(({ indexPattern, type }) => (react_1.default.createElement(kuery_autocompletion_1.KueryAutocompletion, { indexPattern: indexPattern }, ({ isLoadingSuggestions, loadSuggestions, suggestions }) => (react_1.default.createElement(network_1.NetworkFilter, { indexPattern: indexPattern, type: type }, ({ applyFilterQueryFromKueryExpression, filterQueryDraft, isFilterQueryDraftValid, setFilterQueryDraftFromKueryExpression, }) => (react_1.default.createElement(autocomplete_field_1.AutocompleteField, { isLoadingSuggestions: isLoadingSuggestions, isValid: isFilterQueryDraftValid, loadSuggestions: loadSuggestions, onChange: setFilterQueryDraftFromKueryExpression, onSubmit: applyFilterQueryFromKueryExpression, placeholder: i18n.KQL_PLACEHOLDER, suggestions: suggestions, value: filterQueryDraft ? filterQueryDraft.expression : '' })))))));
