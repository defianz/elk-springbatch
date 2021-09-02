"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.sharedFragments = {
    InfraTimeKey: graphql_tag_1.default `
    fragment InfraTimeKeyFields on InfraTimeKey {
      time
      tiebreaker
    }
  `,
    InfraSourceFields: graphql_tag_1.default `
    fragment InfraSourceFields on InfraSource {
      id
      version
      updatedAt
      origin
    }
  `,
    InfraLogEntryFields: graphql_tag_1.default `
    fragment InfraLogEntryFields on InfraLogEntry {
      gid
      key {
        time
        tiebreaker
      }
      columns {
        ... on InfraLogEntryTimestampColumn {
          timestamp
        }
        ... on InfraLogEntryMessageColumn {
          message {
            ... on InfraLogMessageFieldSegment {
              field
              value
            }
            ... on InfraLogMessageConstantSegment {
              constant
            }
          }
        }
        ... on InfraLogEntryFieldColumn {
          field
          value
        }
      }
    }
  `,
};
