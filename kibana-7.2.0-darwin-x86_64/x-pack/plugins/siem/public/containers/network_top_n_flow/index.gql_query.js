"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.networkTopNFlowQuery = graphql_tag_1.default `
  query GetNetworkTopNFlowQuery(
    $sourceId: ID!
    $flowDirection: FlowDirection!
    $filterQuery: String
    $pagination: PaginationInput!
    $sort: NetworkTopNFlowSortField!
    $flowTarget: FlowTarget!
    $timerange: TimerangeInput!
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      NetworkTopNFlow(
        filterQuery: $filterQuery
        flowDirection: $flowDirection
        flowTarget: $flowTarget
        pagination: $pagination
        sort: $sort
        timerange: $timerange
        defaultIndex: $defaultIndex
      ) {
        totalCount
        edges {
          node {
            source {
              count
              ip
              domain
            }
            destination {
              count
              ip
              domain
            }
            client {
              count
              ip
              domain
            }
            server {
              count
              ip
              domain
            }
            network {
              bytes
              direction
              packets
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
