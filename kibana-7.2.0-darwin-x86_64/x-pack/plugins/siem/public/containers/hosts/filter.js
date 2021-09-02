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
const HostsFilterComponent = recompose_1.pure(({ applyHostsFilterQuery, children, hostsFilterQueryDraft, indexPattern, isHostFilterQueryDraftValid, setHostsFilterQueryDraft, type, }) => (react_1.default.createElement(react_1.default.Fragment, null, children({
    applyFilterQueryFromKueryExpression: (expression) => applyHostsFilterQuery({
        filterQuery: {
            kuery: {
                kind: 'kuery',
                expression,
            },
            serializedQuery: keury_1.convertKueryToElasticSearchQuery(expression, indexPattern),
        },
        hostsType: type,
    }),
    filterQueryDraft: hostsFilterQueryDraft,
    isFilterQueryDraftValid: isHostFilterQueryDraftValid,
    setFilterQueryDraftFromKueryExpression: (expression) => setHostsFilterQueryDraft({
        filterQueryDraft: {
            kind: 'kuery',
            expression,
        },
        hostsType: type,
    }),
}))));
const makeMapStateToProps = () => {
    const getHostsFilterQueryDraft = store_1.hostsSelectors.hostsFilterQueryDraft();
    const getIsHostFilterQueryDraftValid = store_1.hostsSelectors.isHostFilterQueryDraftValid();
    const mapStateToProps = (state, { type }) => {
        return {
            hostsFilterQueryDraft: getHostsFilterQueryDraft(state, type),
            isHostFilterQueryDraftValid: getIsHostFilterQueryDraftValid(state, type),
        };
    };
    return mapStateToProps;
};
exports.HostsFilter = react_redux_1.connect(makeMapStateToProps, {
    applyHostsFilterQuery: actions_1.hostsActions.applyHostsFilterQuery,
    setHostsFilterQueryDraft: actions_1.hostsActions.setHostsFilterQueryDraft,
})(HostsFilterComponent);
