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
const store_1 = require("../../store");
const helpers_1 = require("../helpers");
const query_template_1 = require("../query_template");
const index_gql_query_1 = require("./index.gql_query");
class UncommonProcessesComponentQuery extends query_template_1.QueryTemplate {
    render() {
        const { id = 'uncommonProcessesQuery', children, filterQuery, sourceId, startDate, endDate, limit, } = this.props;
        return (react_1.default.createElement(react_apollo_1.Query, { query: index_gql_query_1.uncommonProcessesQuery, fetchPolicy: helpers_1.getDefaultFetchPolicy(), notifyOnNetworkStatusChange: true, variables: {
                sourceId,
                timerange: {
                    interval: '12h',
                    from: startDate,
                    to: endDate,
                },
                pagination: {
                    limit,
                    cursor: null,
                    tiebreaker: null,
                },
                filterQuery: helpers_1.createFilter(filterQuery),
                defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
            } }, ({ data, loading, fetchMore, refetch }) => {
            const uncommonProcesses = fp_1.getOr([], 'source.UncommonProcesses.edges', data);
            this.setFetchMore(fetchMore);
            this.setFetchMoreOptions((newCursor) => ({
                variables: {
                    pagination: {
                        cursor: newCursor,
                        limit: limit + parseInt(newCursor, 10),
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
                            UncommonProcesses: {
                                ...fetchMoreResult.source.UncommonProcesses,
                                edges: [
                                    ...prev.source.UncommonProcesses.edges,
                                    ...fetchMoreResult.source.UncommonProcesses.edges,
                                ],
                            },
                        },
                    };
                },
            }));
            return children({
                id,
                loading,
                refetch,
                totalCount: fp_1.getOr(0, 'source.UncommonProcesses.totalCount', data),
                uncommonProcesses,
                pageInfo: fp_1.getOr({}, 'source.UncommonProcesses.pageInfo', data),
                loadMore: this.wrappedLoadMore,
            });
        }));
    }
}
const makeMapStateToProps = () => {
    const getUncommonProcessesSelector = store_1.hostsSelectors.uncommonProcessesSelector();
    const mapStateToProps = (state, { type }) => {
        return getUncommonProcessesSelector(state, type);
    };
    return mapStateToProps;
};
exports.UncommonProcessesQuery = react_redux_1.connect(makeMapStateToProps)(UncommonProcessesComponentQuery);
