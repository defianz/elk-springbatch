"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const keury_1 = require("../../../lib/keury");
const store_1 = require("../../../store");
const search_or_filter_1 = require("./search_or_filter");
const actions_1 = require("../../../store/actions");
class StatefulSearchOrFilterComponent extends React.PureComponent {
    render() {
        const { applyKqlFilterQuery, indexPattern, filterQueryDraft, isFilterQueryDraftValid, kqlMode, timelineId, setKqlFilterQueryDraft, updateKqlMode, } = this.props;
        const applyFilterQueryFromKueryExpression = (expression) => applyKqlFilterQuery({
            id: timelineId,
            filterQuery: {
                kuery: {
                    kind: 'kuery',
                    expression,
                },
                serializedQuery: keury_1.convertKueryToElasticSearchQuery(expression, indexPattern),
            },
        });
        const setFilterQueryDraftFromKueryExpression = (expression) => setKqlFilterQueryDraft({
            id: timelineId,
            filterQueryDraft: {
                kind: 'kuery',
                expression,
            },
        });
        return (React.createElement(search_or_filter_1.SearchOrFilter, { applyKqlFilterQuery: applyFilterQueryFromKueryExpression, filterQueryDraft: filterQueryDraft, indexPattern: indexPattern, isFilterQueryDraftValid: isFilterQueryDraftValid, kqlMode: kqlMode, timelineId: timelineId, updateKqlMode: updateKqlMode, setKqlFilterQueryDraft: setFilterQueryDraftFromKueryExpression }));
    }
}
const makeMapStateToProps = () => {
    const getTimeline = store_1.timelineSelectors.getTimelineByIdSelector();
    const getKqlFilterQueryDraft = store_1.timelineSelectors.getKqlFilterQueryDraftSelector();
    const isFilterQueryDraftValid = store_1.timelineSelectors.isFilterQueryDraftValidSelector();
    const mapStateToProps = (state, { timelineId }) => {
        const timeline = getTimeline(state, timelineId);
        return {
            kqlMode: fp_1.getOr('filter', 'kqlMode', timeline),
            filterQueryDraft: getKqlFilterQueryDraft(state, timelineId),
            isFilterQueryDraftValid: isFilterQueryDraftValid(state, timelineId),
        };
    };
    return mapStateToProps;
};
exports.StatefulSearchOrFilter = react_redux_1.connect(makeMapStateToProps, {
    applyKqlFilterQuery: actions_1.timelineActions.applyKqlFilterQuery,
    setKqlFilterQueryDraft: actions_1.timelineActions.setKqlFilterQueryDraft,
    updateKqlMode: actions_1.timelineActions.updateKqlMode,
})(StatefulSearchOrFilterComponent);
