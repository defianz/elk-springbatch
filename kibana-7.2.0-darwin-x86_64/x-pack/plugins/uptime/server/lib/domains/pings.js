"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class UMPingsDomain {
    constructor(adapter, libs) {
        this.adapter = adapter;
        this.adapter = adapter;
    }
    async getAll(request, dateRangeStart, dateRangeEnd, monitorId, status, sort, size, location) {
        return this.adapter.getAll(request, dateRangeStart, dateRangeEnd, monitorId, status, sort, size, location);
    }
    async getLatestMonitorDocs(request, dateRangeStart, dateRangeEnd, monitorId, location) {
        return this.adapter.getLatestMonitorDocs(request, dateRangeStart, dateRangeEnd, monitorId, location);
    }
    async getPingHistogram(request, dateRangeStart, dateRangeEnd, filters) {
        return this.adapter.getPingHistogram(request, dateRangeStart, dateRangeEnd, filters);
    }
    async getDocCount(request) {
        return this.adapter.getDocCount(request);
    }
}
exports.UMPingsDomain = UMPingsDomain;
