"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const keury_1 = require("../../lib/keury");
const store_1 = require("../../store");
const actions_1 = require("../../store/actions");
const NetworkFilterComponent = recompose_1.pure(({ applyNetworkFilterQuery, children, networkFilterQueryDraft, indexPattern, isNetworkFilterQueryDraftValid, setNetworkFilterQueryDraft, type, }) => (react_1.default.createElement(react_1.default.Fragment, null, children({
    applyFilterQueryFromKueryExpression: (expression) => applyNetworkFilterQuery({
        filterQuery: {
            kuery: {
                kind: 'kuery',
                expression,
            },
            serializedQuery: keury_1.convertKueryToElasticSearchQuery(expression, indexPattern),
        },
        networkType: type,
    }),
    filterQueryDraft: networkFilterQueryDraft,
    isFilterQueryDraftValid: isNetworkFilterQueryDraftValid,
    setFilterQueryDraftFromKueryExpression: (expression) => setNetworkFilterQueryDraft({
        filterQueryDraft: {
            kind: 'kuery',
            expression,
        },
        networkType: type,
    }),
}))));
const makeMapStateToProps = () => {
    const getNetworkFilterQueryDraft = store_1.networkSelectors.networkFilterQueryDraft();
    const getIsNetworkFilterQueryDraftValid = store_1.networkSelectors.isNetworkFilterQueryDraftValid();
    const mapStateToProps = (state, { type }) => {
        return {
            networkFilterQueryDraft: getNetworkFilterQueryDraft(state, type),
            isNetworkFilterQueryDraftValid: getIsNetworkFilterQueryDraftValid(state, type),
        };
    };
    return mapStateToProps;
};
exports.NetworkFilter = react_redux_1.connect(makeMapStateToProps, {
    applyNetworkFilterQuery: actions_1.networkActions.applyNetworkFilterQuery,
    setNetworkFilterQueryDraft: actions_1.networkActions.setNetworkFilterQueryDraft,
})(NetworkFilterComponent);
