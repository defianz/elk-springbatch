"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimelineResolvers = (libs) => ({
    Query: {
        async getOneTimeline(root, args, { req }) {
            return await libs.timeline.getTimeline(req, args.id);
        },
        async getAllTimeline(root, args, { req }) {
            return await libs.timeline.getAllTimeline(req, args.onlyUserFavorite || null, args.pageInfo || null, args.search || null, args.sort || null);
        },
    },
    Mutation: {
        async deleteTimeline(root, args, { req }) {
            await libs.timeline.deleteTimeline(req, args.id);
            return true;
        },
        async persistFavorite(root, args, { req }) {
            return await libs.timeline.persistFavorite(req, args.timelineId || null);
        },
        async persistTimeline(root, args, { req }) {
            return await libs.timeline.persistTimeline(req, args.id || null, args.version || null, args.timeline);
        },
    },
});
