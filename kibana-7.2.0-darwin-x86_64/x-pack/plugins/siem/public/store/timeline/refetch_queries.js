"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_gql_query_1 = require("../../containers/timeline/all/index.gql_query");
const types_1 = require("../../graphql/types");
const constants_1 = require("../../components/open_timeline/constants");
exports.refetchQueries = [
    {
        query: index_gql_query_1.allTimelinesQuery,
        variables: {
            search: '',
            pageInfo: {
                pageIndex: 1,
                pageSize: 10,
            },
            sort: { sortField: constants_1.DEFAULT_SORT_FIELD, sortOrder: types_1.Direction.desc },
            onlyUserFavorite: false,
        },
    },
];
