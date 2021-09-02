"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.kpiHostsSchema = graphql_tag_1.default `
  type Count {
    value: Float
    doc_count: Float
  }

  type KpiHostHistogramData {
    key: Float
    key_as_string: String
    count: Count
  }

  type KpiHostsData {
    hosts: Float
    hostsHistogram: [KpiHostHistogramData!]
    authSuccess: Float
    authSuccessHistogram: [KpiHostHistogramData!]
    authFailure: Float
    authFailureHistogram: [KpiHostHistogramData!]
    uniqueSourceIps: Float
    uniqueSourceIpsHistogram: [KpiHostHistogramData!]
    uniqueDestinationIps: Float
    uniqueDestinationIpsHistogram: [KpiHostHistogramData!]
  }

  extend type Source {
    KpiHosts(
      id: String
      timerange: TimerangeInput!
      filterQuery: String
      defaultIndex: [String!]!
    ): KpiHostsData!
  }
`;
