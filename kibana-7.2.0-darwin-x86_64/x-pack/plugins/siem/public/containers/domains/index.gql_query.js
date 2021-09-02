"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.domainsQuery = graphql_tag_1.default `
  query GetDomainsQuery(
    $sourceId: ID!
    $filterQuery: String
    $flowDirection: FlowDirection!
    $flowTarget: FlowTarget!
    $ip: String!
    $pagination: PaginationInput!
    $sort: DomainsSortField!
    $timerange: TimerangeInput!
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      Domains(
        filterQuery: $filterQuery
        flowDirection: $flowDirection
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
            source {
              uniqueIpCount
              domainName
              firstSeen
              lastSeen
            }
            destination {
              uniqueIpCount
              domainName
              firstSeen
              lastSeen
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
