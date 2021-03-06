"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class UMMonitorsDomain {
    constructor(adapter, libs) {
        this.adapter = adapter;
        this.adapter = adapter;
    }
    async getMonitorChartsData(request, monitorId, dateRangeStart, dateRangeEnd, location) {
        return this.adapter.getMonitorChartsData(request, monitorId, dateRangeStart, dateRangeEnd, location);
    }
    async getMonitors(request, dateRangeStart, dateRangeEnd, filters) {
        return this.adapter.getMonitors(request, dateRangeStart, dateRangeEnd, filters);
    }
    async getSnapshotCount(request, dateRangeStart, dateRangeEnd, filters) {
        return this.adapter.getSnapshotCount(request, dateRangeStart, dateRangeEnd, filters);
    }
    async getFilterBar(request, dateRangeStart, dateRangeEnd) {
        return this.adapter.getFilterBar(request, dateRangeStart, dateRangeEnd);
    }
    async getErrorsList(request, dateRangeStart, dateRangeEnd, filters) {
        return this.adapter.getErrorsList(request, dateRangeStart, dateRangeEnd, filters);
    }
    async getMonitorPageTitle(request, monitorId) {
        return await this.adapter.getMonitorPageTitle(request, monitorId);
    }
}
exports.UMMonitorsDomain = UMMonitorsDomain;
