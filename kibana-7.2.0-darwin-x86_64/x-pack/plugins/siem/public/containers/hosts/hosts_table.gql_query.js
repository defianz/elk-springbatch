"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.HostsTableQuery = graphql_tag_1.default `
  query GetHostsTableQuery(
    $sourceId: ID!
    $timerange: TimerangeInput!
    $pagination: PaginationInput!
    $sort: HostsSortField!
    $filterQuery: String
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      Hosts(
        timerange: $timerange
        pagination: $pagination
        sort: $sort
        filterQuery: $filterQuery
        defaultIndex: $defaultIndex
      ) {
        totalCount
        edges {
          node {
            _id
            lastSeen
            host {
              id
              name
              os {
                name
                version
              }
            }
          }
          cursor {
            value
          }
        }
        pageInfo {
          endCursor {
            value
          }
          hasNextPage
        }
      }
    }
  }
`;
