"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const react_redux_1 = require("react-redux");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../common/constants");
const types_1 = require("../../graphql/types");
const store_1 = require("../../store");
const helpers_1 = require("../helpers");
const query_template_1 = require("../query_template");
const index_gql_query_1 = require("./index.gql_query");
class EventsComponentQuery extends query_template_1.QueryTemplate {
    render() {
        const { children, filterQuery, id = 'eventsQuery', limit, sourceId, startDate, endDate, } = this.props;
        return (react_1.default.createElement(react_apollo_1.Query, { query: index_gql_query_1.eventsQuery, fetchPolicy: helpers_1.getDefaultFetchPolicy(), notifyOnNetworkStatusChange: true, variables: {
                filterQuery: helpers_1.createFilter(filterQuery),
                sourceId,
                pagination: {
                    limit,
                    cursor: null,
                    tiebreaker: null,
                },
                sortField: {
                    sortFieldId: 'timestamp',
                    direction: types_1.Direction.desc,
                },
                timerange: {
                    interval: '12h',
                    from: startDate,
                    to: endDate,
                },
                defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
            } }, ({ data, loading, fetchMore, refetch }) => {
            const events = fp_1.getOr([], 'source.Events.edges', data);
            this.setFetchMore(fetchMore);
            this.setFetchMoreOptions((newCursor, tiebreaker) => ({
                variables: {
                    pagination: {
                        cursor: newCursor,
                        tiebreaker,
                        limit,
                    },
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                        return prev;
                    }
                    return {
                        ...fetchMoreResult,
                        source: {
                            ...fetchMoreResult.source,
                            Events: {
                                ...fetchMoreResult.source.Events,
                                edges: [...prev.source.Events.edges, ...fetchMoreResult.source.Events.edges],
                            },
                        },
                    };
                },
            }));
            return children({
                id,
                refetch,
                loading,
                totalCount: fp_1.getOr(0, 'source.Events.totalCount', data),
                pageInfo: fp_1.getOr({}, 'source.Events.pageInfo', data),
                events,
                loadMore: this.wrappedLoadMore,
            });
        }));
    }
}
const makeMapStateToProps = () => {
    const getEventsSelector = store_1.hostsSelectors.eventsSelector();
    const mapStateToProps = (state, { type }) => {
        return getEventsSelector(state, type);
    };
    return mapStateToProps;
};
exports.EventsQuery = react_redux_1.connect(makeMapStateToProps)(EventsComponentQuery);
