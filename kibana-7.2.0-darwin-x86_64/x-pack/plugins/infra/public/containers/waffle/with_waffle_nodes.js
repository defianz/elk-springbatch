"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_apollo_1 = require("react-apollo");
const waffle_nodes_gql_query_1 = require("./waffle_nodes.gql_query");
exports.WithWaffleNodes = ({ children, filterQuery, metric, groupBy, nodeType, sourceId, timerange, }) => (react_1.default.createElement(react_apollo_1.Query, { query: waffle_nodes_gql_query_1.waffleNodesQuery, fetchPolicy: "no-cache", notifyOnNetworkStatusChange: true, variables: {
        sourceId,
        metric,
        groupBy: [...groupBy],
        type: nodeType,
        timerange,
        filterQuery,
    } }, ({ data, loading, refetch }) => children({
    loading,
    nodes: data && data.source && data.source.snapshot && data.source.snapshot.nodes
        ? data.source.snapshot.nodes
        : [],
    refetch,
})));
