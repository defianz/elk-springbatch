"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinnedEventSavedObjectType = 'siem-ui-timeline-pinned-event';
exports.pinnedEventSavedObjectMappings = {
    [exports.pinnedEventSavedObjectType]: {
        properties: {
            timelineId: {
                type: 'keyword',
            },
            eventId: {
                type: 'keyword',
            },
            created: {
                type: 'date',
            },
            createdBy: {
                type: 'text',
            },
            updated: {
                type: 'date',
            },
            updatedBy: {
                type: 'text',
            },
        },
    },
};
