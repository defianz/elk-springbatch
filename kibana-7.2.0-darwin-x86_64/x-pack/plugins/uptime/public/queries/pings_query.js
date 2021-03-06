"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.pingsQueryString = `
query PingList(
  $dateRangeStart: String!
  $dateRangeEnd: String!
  $monitorId: String
  $status: String
  $sort: String
  $size: Int
  $location: String
) {
  allPings(
    dateRangeStart: $dateRangeStart
    dateRangeEnd: $dateRangeEnd
    monitorId: $monitorId
    status: $status
    sort: $sort
    size: $size
    location: $location
  ) {
      total
      pings {
        timestamp
        http {
          response {
            status_code
          }
        }
        error {
          message
          type
        }
        monitor {
          duration {
            us
          }
          id
          ip
          name
          scheme
          status
          type
        }
      }
    }
  }
`;
exports.pingsQuery = graphql_tag_1.default `
  ${exports.pingsQueryString}
`;
