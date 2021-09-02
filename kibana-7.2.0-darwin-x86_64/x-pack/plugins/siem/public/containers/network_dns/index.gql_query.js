"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.networkDnsQuery = graphql_tag_1.default `
  query GetNetworkDnsQuery(
    $sourceId: ID!
    $sort: NetworkDnsSortField!
    $isPtrIncluded: Boolean!
    $timerange: TimerangeInput!
    $pagination: PaginationInput!
    $filterQuery: String
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      NetworkDns(
        isPtrIncluded: $isPtrIncluded
        sort: $sort
        timerange: $timerange
        pagination: $pagination
        filterQuery: $filterQuery
        defaultIndex: $defaultIndex
      ) {
        totalCount
        edges {
          node {
            _id
            dnsBytesIn
            dnsBytesOut
            dnsName
            queryCount
            uniqueDomains
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
