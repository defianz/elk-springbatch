"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const es_query_1 = require("@kbn/es-query");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const with_kuery_autocompletion_1 = require("../../containers/with_kuery_autocompletion");
const autocomplete_field_1 = require("../autocomplete_field");
function validateQuery(query) {
    try {
        es_query_1.fromKueryExpression(query);
    }
    catch (err) {
        return false;
    }
    return true;
}
exports.MetricsExplorerKueryBar = react_1.injectI18n(({ intl, derivedIndexPattern, onSubmit, value }) => {
    const [draftQuery, setDraftQuery] = react_2.useState(value || '');
    const [isValid, setValidation] = react_2.useState(true);
    // This ensures that if value changes out side this component it will update.
    react_2.useEffect(() => {
        if (value) {
            setDraftQuery(value);
        }
    }, [value]);
    const handleChange = (query) => {
        setValidation(validateQuery(query));
        setDraftQuery(query);
    };
    return (react_2.default.createElement(with_kuery_autocompletion_1.WithKueryAutocompletion, { indexPattern: derivedIndexPattern }, ({ isLoadingSuggestions, loadSuggestions, suggestions }) => (react_2.default.createElement(autocomplete_field_1.AutocompleteField, { isLoadingSuggestions: isLoadingSuggestions, isValid: isValid, loadSuggestions: loadSuggestions, onChange: handleChange, onSubmit: onSubmit, placeholder: intl.formatMessage({
            id: 'xpack.infra.homePage.toolbar.kqlSearchFieldPlaceholder',
            defaultMessage: 'Search for infrastructure data… (e.g. host.name:host-1)',
        }), suggestions: suggestions, value: draftQuery }))));
});
