"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.HostOverviewQuery = graphql_tag_1.default `
  query GetHostOverviewQuery(
    $sourceId: ID!
    $hostName: String!
    $timerange: TimerangeInput!
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      HostOverview(hostName: $hostName, timerange: $timerange, defaultIndex: $defaultIndex) {
        _id
        host {
          architecture
          id
          ip
          mac
          name
          os {
            family
            name
            platform
            version
          }
          type
        }
        cloud {
          instance {
            id
          }
          machine {
            type
          }
          provider
          region
        }
      }
    }
  }
`;
