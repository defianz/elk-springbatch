"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
exports.pickSavedTimeline = (timelineId, savedTimeline, userInfo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    if (timelineId == null) {
        savedTimeline.created = new Date().valueOf();
        savedTimeline.createdBy = fp_1.getOr(null, 'credentials.username', userInfo);
        savedTimeline.updated = new Date().valueOf();
        savedTimeline.updatedBy = fp_1.getOr(null, 'credentials.username', userInfo);
    }
    else if (timelineId != null) {
        savedTimeline.updated = new Date().valueOf();
        savedTimeline.updatedBy = fp_1.getOr(null, 'credentials.username', userInfo);
    }
    return savedTimeline;
};
