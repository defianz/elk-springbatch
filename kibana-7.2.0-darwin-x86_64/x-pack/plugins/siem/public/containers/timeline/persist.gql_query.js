"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.persistTimelineMutation = graphql_tag_1.default `
  mutation PersistTimelineMutation($timelineId: ID, $version: String, $timeline: TimelineInput!) {
    persistTimeline(id: $timelineId, version: $version, timeline: $timeline) {
      code
      message
      timeline {
        savedObjectId
        version
        columns {
          aggregatable
          category
          columnHeaderType
          description
          example
          indexes
          id
          name
          searchable
          type
        }
        dataProviders {
          id
          name
          enabled
          excluded
          kqlQuery
          queryMatch {
            field
            displayField
            value
            displayValue
            operator
          }
          and {
            id
            name
            enabled
            excluded
            kqlQuery
            queryMatch {
              field
              displayField
              value
              displayValue
              operator
            }
          }
        }
        description
        favorite {
          fullName
          userName
          favoriteDate
        }
        kqlMode
        kqlQuery {
          filterQuery {
            kuery {
              kind
              expression
            }
            serializedQuery
          }
        }
        title
        dateRange {
          start
          end
        }
        sort {
          columnId
          sortDirection
        }
        created
        createdBy
        updated
        updatedBy
      }
    }
  }
`;
