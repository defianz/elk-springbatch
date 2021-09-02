"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.uncommonProcessesQuery = graphql_tag_1.default `
  query GetUncommonProcessesQuery(
    $sourceId: ID!
    $timerange: TimerangeInput!
    $pagination: PaginationInput!
    $filterQuery: String
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      UncommonProcesses(
        timerange: $timerange
        pagination: $pagination
        filterQuery: $filterQuery
        defaultIndex: $defaultIndex
      ) {
        totalCount
        edges {
          node {
            _id
            instances
            process {
              args
              name
            }
            user {
              id
              name
            }
            hosts {
              name
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
