"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.sourceConfigurationFieldsFragment = graphql_tag_1.default `
  fragment SourceConfigurationFields on InfraSourceConfiguration {
    name
    description
    logAlias
    metricAlias
    fields {
      container
      host
      message
      pod
      tiebreaker
      timestamp
    }
    logColumns {
      ... on InfraSourceTimestampLogColumn {
        timestampColumn {
          id
        }
      }
      ... on InfraSourceMessageLogColumn {
        messageColumn {
          id
        }
      }
      ... on InfraSourceFieldLogColumn {
        fieldColumn {
          id
          field
        }
      }
    }
  }
`;
exports.sourceStatusFieldsFragment = graphql_tag_1.default `
  fragment SourceStatusFields on InfraSourceStatus {
    indexFields {
      name
      type
      searchable
      aggregatable
    }
    logIndicesExist
    metricIndicesExist
  }
`;
