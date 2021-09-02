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
const recompose_1 = require("recompose");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const constants_1 = require("../../../../common/constants");
const helpers_1 = require("../../helpers");
const index_gql_query_1 = require("./index.gql_query");
exports.OverviewNetworkQuery = recompose_1.pure(({ id = 'overviewNetworkQuery', children, filterQuery, sourceId, startDate, endDate }) => (react_1.default.createElement(react_apollo_1.Query, { query: index_gql_query_1.overviewNetworkQuery, fetchPolicy: "cache-and-network", notifyOnNetworkStatusChange: true, variables: {
        sourceId,
        timerange: {
            interval: '12h',
            from: startDate,
            to: endDate,
        },
        filterQuery: helpers_1.createFilter(filterQuery),
        defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
    } }, ({ data, loading, refetch }) => {
    const overviewNetwork = fp_1.getOr({}, `source.OverviewNetwork`, data);
    return children({
        id,
        overviewNetwork,
        loading,
        refetch,
    });
})));
