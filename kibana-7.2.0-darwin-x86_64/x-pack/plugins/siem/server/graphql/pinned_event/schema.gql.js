"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_tag_1 = tslib_1.__importDefault(require("graphql-tag"));
exports.pinnedEventSchema = graphql_tag_1.default `
  #########################
  ####  Mutation/Query ####
  #########################

  type PinnedEvent {
    pinnedEventId: ID!
    eventId: ID
    timelineId: ID
    timelineVersion: String
    created: Float
    createdBy: String
    updated: Float
    updatedBy: String
    version: String
  }

  extend type Query {
    getAllPinnedEventsByTimelineId(timelineId: ID!): [PinnedEvent!]!
  }

  extend type Mutation {
    "Persists a pinned event in a timeline"
    persistPinnedEventOnTimeline(pinnedEventId: ID, eventId: ID!, timelineId: ID): PinnedEvent
    "Remove a pinned events in a timeline"
    deletePinnedEventOnTimeline(id: [ID!]!): Boolean!
    "Remove all pinned events in a timeline"
    deleteAllPinnedEventsOnTimeline(timelineId: ID!): Boolean!
  }
`;
