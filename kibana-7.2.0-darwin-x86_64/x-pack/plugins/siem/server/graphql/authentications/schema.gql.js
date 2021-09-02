"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.authenticationsSchema = graphql_tag_1.default `
  type LastSourceHost {
    timestamp: Date
    source: SourceEcsFields
    host: HostEcsFields
  }

  type AuthenticationItem {
    _id: String!
    failures: Float!
    successes: Float!
    user: UserEcsFields!
    lastSuccess: LastSourceHost
    lastFailure: LastSourceHost
  }

  type AuthenticationsEdges {
    node: AuthenticationItem!
    cursor: CursorType!
  }

  type AuthenticationsData {
    edges: [AuthenticationsEdges!]!
    totalCount: Float!
    pageInfo: PageInfo!
  }

  extend type Source {
    "Gets Authentication success and failures based on a timerange"
    Authentications(
      timerange: TimerangeInput!
      pagination: PaginationInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): AuthenticationsData!
  }
`;
