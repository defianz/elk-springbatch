"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
const note = `
  eventId: String
  note: String
  timelineId: String
`;
exports.noteSchema = graphql_tag_1.default `
  ###############
  #### INPUT ####
  ###############

  input NoteInput {
    ${note}
  }

  input PageInfoNote {
    pageIndex: Float!
    pageSize: Float!
  }

  enum SortFieldNote {
    updatedBy
    updated
  }
  
  input SortNote {
    sortField: SortFieldNote!
    sortOrder: Direction!
  }

  ###############
  #### QUERY ####
  ###############
  type NoteResult {
    ${note}
    noteId: String!
    created: Float
    createdBy: String
    timelineVersion: String
    updated: Float
    updatedBy: String
    version: String
  }

  type ResponseNote {
    code: Float
    message: String
    note: NoteResult!
  }

  type ResponseNotes {
    notes: [NoteResult!]!
    totalCount: Float
  }

  #########################
  ####  Mutation/Query ####
  #########################

  extend type Query {
    getNote(id: ID!): NoteResult!
    getNotesByTimelineId(timelineId: ID!): [NoteResult!]!
    getNotesByEventId(eventId: ID!): [NoteResult!]!
    getAllNotes(pageInfo: PageInfoNote, search: String, sort: SortNote): ResponseNotes!
  }

  extend type Mutation {
    "Persists a note"
    persistNote(noteId: ID, version: String, note: NoteInput!): ResponseNote!
    deleteNote(id: [ID!]!, version: String):Boolean
    deleteNoteByTimelineId(timelineId: ID!, version: String):Boolean
  }
`;
