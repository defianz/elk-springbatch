"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.uncommonProcessesSchema = graphql_tag_1.default `
  type UncommonProcessItem {
    _id: String!
    instances: Float!
    process: ProcessEcsFields!
    hosts: [HostEcsFields!]!
    user: UserEcsFields
  }

  type UncommonProcessesEdges {
    node: UncommonProcessItem!
    cursor: CursorType!
  }

  type UncommonProcessesData {
    edges: [UncommonProcessesEdges!]!
    totalCount: Float!
    pageInfo: PageInfo!
  }

  extend type Source {
    "Gets UncommonProcesses based on a timerange, or all UncommonProcesses if no criteria is specified"
    UncommonProcesses(
      timerange: TimerangeInput!
      pagination: PaginationInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): UncommonProcessesData!
  }
`;
