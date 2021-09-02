"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.tlsQuery = graphql_tag_1.default `
  query GetTlsQuery(
    $sourceId: ID!
    $filterQuery: String
    $flowTarget: FlowTarget!
    $ip: String!
    $pagination: PaginationInput!
    $sort: TlsSortField!
    $timerange: TimerangeInput!
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      Tls(
        filterQuery: $filterQuery
        flowTarget: $flowTarget
        ip: $ip
        pagination: $pagination
        sort: $sort
        timerange: $timerange
        defaultIndex: $defaultIndex
      ) {
        totalCount
        edges {
          node {
            _id
            alternativeNames
            commonNames
            ja3
            issuerNames
            notAfter
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
