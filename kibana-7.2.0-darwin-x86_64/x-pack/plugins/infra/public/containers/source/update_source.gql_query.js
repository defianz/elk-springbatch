"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const shared_1 = require("../../../common/graphql/shared");
const source_fields_fragment_gql_query_1 = require("./source_fields_fragment.gql_query");
exports.updateSourceMutation = graphql_tag_1.default `
  mutation UpdateSourceMutation($sourceId: ID = "default", $sourceProperties: UpdateSourceInput!) {
    updateSource(id: $sourceId, sourceProperties: $sourceProperties) {
      source {
        ...InfraSourceFields
        configuration {
          ...SourceConfigurationFields
        }
        status {
          ...SourceStatusFields
        }
      }
    }
  }

  ${shared_1.sharedFragments.InfraSourceFields}
  ${source_fields_fragment_gql_query_1.sourceConfigurationFieldsFragment}
  ${source_fields_fragment_gql_query_1.sourceStatusFieldsFragment}
`;
