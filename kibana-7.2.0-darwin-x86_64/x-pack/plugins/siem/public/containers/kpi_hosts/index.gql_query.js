"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.kpiHostsQuery = graphql_tag_1.default `
  fragment ChartFields on KpiHostHistogramData {
    x: key_as_string
    y: count {
      value
      doc_count
    }
  }

  query GetKpiHostsQuery(
    $sourceId: ID!
    $timerange: TimerangeInput!
    $filterQuery: String
    $defaultIndex: [String!]!
  ) {
    source(id: $sourceId) {
      id
      KpiHosts(timerange: $timerange, filterQuery: $filterQuery, defaultIndex: $defaultIndex) {
        hosts
        hostsHistogram {
          ...ChartFields
        }
        authSuccess
        authSuccessHistogram {
          ...ChartFields
        }
        authFailure
        authFailureHistogram {
          ...ChartFields
        }
        uniqueSourceIps
        uniqueSourceIpsHistogram {
          ...ChartFields
        }
        uniqueDestinationIps
        uniqueDestinationIpsHistogram {
          ...ChartFields
        }
      }
    }
  }
`;
