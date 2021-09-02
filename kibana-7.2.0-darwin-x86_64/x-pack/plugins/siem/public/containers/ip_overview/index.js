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
const constants_1 = require("../../../common/constants");
const helpers_1 = require("../helpers");
const index_gql_query_1 = require("./index.gql_query");
exports.IpOverviewQuery = recompose_1.pure(({ id = 'ipOverviewQuery', children, filterQuery, sourceId, ip }) => (react_1.default.createElement(react_apollo_1.Query, { query: index_gql_query_1.ipOverviewQuery, fetchPolicy: "cache-and-network", notifyOnNetworkStatusChange: true, variables: {
        sourceId,
        filterQuery: helpers_1.createFilter(filterQuery),
        ip,
        defaultIndex: chrome_1.default.getUiSettingsClient().get(constants_1.DEFAULT_INDEX_KEY),
    } }, ({ data, loading }) => {
    const init = { host: {} };
    const ipOverviewData = fp_1.getOr(init, 'source.IpOverview', data);
    return children({
        id,
        ipOverviewData,
        loading,
    });
})));
