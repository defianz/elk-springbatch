"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.oneTimelineQuery = graphql_tag_1.default `
  query GetOneTimeline($id: ID!) {
    getOneTimeline(id: $id) {
      savedObjectId
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
      dateRange {
        start
        end
      }
      description
      eventIdToNoteIds {
        eventId
        note
        timelineId
        noteId
        created
        createdBy
        timelineVersion
        updated
        updatedBy
        version
      }
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
      notes {
        eventId
        note
        timelineId
        timelineVersion
        noteId
        created
        createdBy
        updated
        updatedBy
        version
      }
      noteIds
      pinnedEventIds
      pinnedEventsSaveObject {
        pinnedEventId
        eventId
        timelineId
        created
        createdBy
        updated
        updatedBy
        version
      }
      title
      sort {
        columnId
        sortDirection
      }
      created
      createdBy
      updated
      updatedBy
      version
    }
  }
`;
