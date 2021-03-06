"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMonitorsResolvers = (libs) => ({
    Query: {
        // @ts-ignore TODO update typings and remove this comment
        async getMonitors(resolver, { dateRangeStart, dateRangeEnd, filters }, { req }) {
            const result = await libs.monitors.getMonitors(req, dateRangeStart, dateRangeEnd, filters);
            return {
                monitors: result,
            };
        },
        async getSnapshot(resolver, { dateRangeStart, dateRangeEnd, filters }, { req }) {
            const { up, down, total } = await libs.monitors.getSnapshotCount(req, dateRangeStart, dateRangeEnd, filters);
            return {
                up,
                down,
                total,
                histogram: await libs.pings.getPingHistogram(req, dateRangeStart, dateRangeEnd, filters),
            };
        },
        async getMonitorChartsData(resolver, { monitorId, dateRangeStart, dateRangeEnd, location }, { req }) {
            return await libs.monitors.getMonitorChartsData(req, monitorId, dateRangeStart, dateRangeEnd, location);
        },
        async getLatestMonitors(resolver, { dateRangeStart, dateRangeEnd, monitorId, location }, { req }) {
            return await libs.pings.getLatestMonitorDocs(req, dateRangeStart, dateRangeEnd, monitorId, location);
        },
        async getFilterBar(resolver, { dateRangeStart, dateRangeEnd }, { req }) {
            return await libs.monitors.getFilterBar(req, dateRangeStart, dateRangeEnd);
        },
        async getErrorsList(resolver, { dateRangeStart, dateRangeEnd, filters }, { req }) {
            return await libs.monitors.getErrorsList(req, dateRangeStart, dateRangeEnd, filters);
        },
        async getMonitorPageTitle(resolver, { monitorId }, { req }) {
            return await libs.monitors.getMonitorPageTitle(req, monitorId);
        },
    },
});
