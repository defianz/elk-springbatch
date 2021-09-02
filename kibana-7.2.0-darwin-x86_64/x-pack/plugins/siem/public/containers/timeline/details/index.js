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
const constants_1 = require("../../../../common/constants");
const index_gql_query_1 = require("./index.gql_query");
class TimelineDetailsComponentQuery extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.getDetailsEvent = (variables, detail) => detail;
        this.memoizedDetailsEvents = memoize_one_1.default(this.getDetailsEvent);
    }
    render() {
        const { children, indexName, eventId, executeQuery, sourceId } = this.props;
        const variables = {
            sourceId,
            indexName,
            eventId,
            defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
        };
        return executeQuery ? (react_1.default.createElement(react_apollo_1.Query, { query: index_gql_query_1.timelineDetailsQuery, fetchPolicy: "network-only", notifyOnNetworkStatusChange: true, variables: variables }, ({ data, loading, refetch }) => {
            return children({
                loading,
                detailsData: this.memoizedDetailsEvents(JSON.stringify(variables), fp_1.getOr([], 'source.TimelineDetails.data', data)),
            });
        })) : (children({ loading: false, detailsData: null }));
    }
}
exports.TimelineDetailsComponentQuery = TimelineDetailsComponentQuery;
