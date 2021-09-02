"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.persistTimelineNoteMutation = graphql_tag_1.default `
  mutation PersistTimelineNoteMutation($noteId: ID, $version: String, $note: NoteInput!) {
    persistNote(noteId: $noteId, version: $version, note: $note) {
      code
      message
      note {
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
    }
  }
`;
