"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const memoize_one_1 = tslib_1.__importDefault(require("memoize-one"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const react_redux_1 = require("react-redux");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../common/constants");
const store_1 = require("../../store");
const helpers_1 = require("../helpers");
const query_template_1 = require("../query_template");
const hosts_table_gql_query_1 = require("./hosts_table.gql_query");
var filter_1 = require("./filter");
exports.HostsFilter = filter_1.HostsFilter;
class HostsComponentQuery extends query_template_1.QueryTemplate {
    constructor(props) {
        super(props);
        this.getHosts = (variables, source) => fp_1.getOr([], 'Hosts.edges', source);
        this.memoizedHosts = memoize_one_1.default(this.getHosts);
    }
    render() {
        const { id = 'hostsQuery', children, direction, filterQuery, endDate, limit, startDate, sourceId, sortField, } = this.props;
        const variables = {
            sourceId,
            timerange: {
                interval: '12h',
                from: startDate,
                to: endDate,
            },
            sort: {
                direction,
                field: sortField,
            },
            pagination: {
                limit,
                cursor: null,
                tiebreaker: null,
            },
            filterQuery: helpers_1.createFilter(filterQuery),
            defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
        };
        return (react_1.default.createElement(react_apollo_1.Query, { query: hosts_table_gql_query_1.HostsTableQuery, fetchPolicy: "cache-first", notifyOnNetworkStatusChange: true, variables: variables }, ({ data, loading, fetchMore, refetch }) => {
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
                            Hosts: {
                                ...fetchMoreResult.source.Hosts,
                                edges: [...prev.source.Hosts.edges, ...fetchMoreResult.source.Hosts.edges],
                            },
                        },
                    };
                },
            }));
            return children({
                id,
                refetch,
                loading,
                totalCount: fp_1.getOr(0, 'source.Hosts.totalCount', data),
                hosts: this.memoizedHosts(JSON.stringify(variables), fp_1.get('source', data)),
                startDate,
                endDate,
                pageInfo: fp_1.getOr({}, 'source.Hosts.pageInfo', data),
                loadMore: this.wrappedLoadMore,
            });
        }));
    }
}
const makeMapStateToProps = () => {
    const getHostsSelector = store_1.hostsSelectors.hostsSelector();
    const mapStateToProps = (state, { type }) => {
        return getHostsSelector(state, type);
    };
    return mapStateToProps;
};
exports.HostsQuery = react_redux_1.connect(makeMapStateToProps)(HostsComponentQuery);
