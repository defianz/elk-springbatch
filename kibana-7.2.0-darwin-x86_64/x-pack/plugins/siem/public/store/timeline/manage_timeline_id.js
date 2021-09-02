"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ManageEpicTimelineId {
    constructor() {
        this.timelineId = null;
        this.version = null;
    }
    getTimelineId() {
        return this.timelineId;
    }
    getTimelineVersion() {
        return this.version;
    }
    setTimelineId(timelineId) {
        this.timelineId = timelineId;
    }
    setTimelineVersion(version) {
        this.version = version;
    }
}
exports.ManageEpicTimelineId = ManageEpicTimelineId;
