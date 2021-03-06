"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPingsResolvers = (libs) => ({
    Query: {
        async allPings(resolver, { monitorId, sort, size, status, dateRangeStart, dateRangeEnd, location }, { req }) {
            return await libs.pings.getAll(req, dateRangeStart, dateRangeEnd, monitorId, status, sort, size, location);
        },
        async getDocCount(resolver, args, { req }) {
            return libs.pings.getDocCount(req);
        },
    },
});
