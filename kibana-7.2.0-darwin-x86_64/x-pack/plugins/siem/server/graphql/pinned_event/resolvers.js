"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPinnedEventResolvers = (libs) => ({
    Query: {
        async getAllPinnedEventsByTimelineId(root, args, { req }) {
            return await libs.pinnedEvent.getAllPinnedEventsByTimelineId(req, args.timelineId);
        },
    },
    Mutation: {
        async persistPinnedEventOnTimeline(root, args, { req }) {
            return await libs.pinnedEvent.persistPinnedEventOnTimeline(req, args.pinnedEventId || null, args.eventId, args.timelineId || null);
        },
        async deletePinnedEventOnTimeline(root, args, { req }) {
            await libs.pinnedEvent.deletePinnedEventOnTimeline(req, args.id);
            return true;
        },
        async deleteAllPinnedEventsOnTimeline(root, args, { req }) {
            await libs.pinnedEvent.deleteAllPinnedEventsOnTimeline(req, args.timelineId);
            return true;
        },
    },
});
