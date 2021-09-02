"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.authenticationsQuery = graphql_tag_1.default `
  query GetAuthenticationsQuery(
    $sourceId: ID!
    $timerange: TimerangeInput!
    $pagination: PaginationInput!
    $filterQuery: String
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      Authentications(
        timerange: $timerange
        pagination: $pagination
        filterQuery: $filterQuery
        defaultIndex: $defaultIndex
      ) {
        totalCount
        edges {
          node {
            _id
            failures
            successes
            user {
              name
            }
            lastSuccess {
              timestamp
              source {
                ip
              }
              host {
                id
                name
              }
            }
            lastFailure {
              timestamp
              source {
                ip
              }
              host {
                id
                name
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
