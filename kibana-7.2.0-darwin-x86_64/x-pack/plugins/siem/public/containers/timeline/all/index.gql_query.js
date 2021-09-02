"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.allTimelinesQuery = graphql_tag_1.default `
  query GetAllTimeline(
    $pageInfo: PageInfoTimeline!
    $search: String
    $sort: SortTimeline
    $onlyUserFavorite: Boolean
  ) {
    getAllTimeline(
      pageInfo: $pageInfo
      search: $search
      sort: $sort
      onlyUserFavorite: $onlyUserFavorite
    ) {
      totalCount
      timeline {
        savedObjectId
        description
        favorite {
          fullName
          userName
          favoriteDate
        }
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
        title
        created
        createdBy
        updated
        updatedBy
        version
      }
    }
  }
`;
