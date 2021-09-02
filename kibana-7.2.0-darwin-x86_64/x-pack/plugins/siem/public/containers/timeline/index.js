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
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../common/constants");
const helpers_1 = require("../helpers");
const query_template_1 = require("../query_template");
const index_gql_query_1 = require("./index.gql_query");
class TimelineQuery extends query_template_1.QueryTemplate {
    constructor(props) {
        super(props);
        this.updatedDate = Date.now();
        this.getUpdatedAt = () => this.updatedDate;
        this.getTimelineEvents = (variables, timelineEdges) => timelineEdges.map((e) => e.node);
        this.memoizedTimelineEvents = memoize_one_1.default(this.getTimelineEvents);
    }
    render() {
        const { children, id = 'timelineQuery', limit, fields, filterQuery, sourceId, sortField, } = this.props;
        const variables = {
            fieldRequested: fields,
            filterQuery: helpers_1.createFilter(filterQuery),
            sourceId,
            pagination: { limit, cursor: null, tiebreaker: null },
            sortField,
            defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
        };
        return (react_1.default.createElement(react_apollo_1.Query, { query: index_gql_query_1.timelineQuery, fetchPolicy: "network-only", notifyOnNetworkStatusChange: true, variables: variables }, ({ data, loading, fetchMore, refetch }) => {
            const timelineEdges = fp_1.getOr([], 'source.Timeline.edges', data);
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
                            Timeline: {
                                ...fetchMoreResult.source.Timeline,
                                edges: [
                                    ...prev.source.Timeline.edges,
                                    ...fetchMoreResult.source.Timeline.edges,
                                ],
                            },
                        },
                    };
                },
            }));
            this.updatedDate = Date.now();
            return children({
                id,
                refetch,
                loading,
                totalCount: fp_1.getOr(0, 'source.Timeline.totalCount', data),
                pageInfo: fp_1.getOr({}, 'source.Timeline.pageInfo', data),
                events: this.memoizedTimelineEvents(JSON.stringify(variables), timelineEdges),
                loadMore: this.wrappedLoadMore,
                getUpdatedAt: this.getUpdatedAt,
            });
        }));
    }
}
exports.TimelineQuery = TimelineQuery;
