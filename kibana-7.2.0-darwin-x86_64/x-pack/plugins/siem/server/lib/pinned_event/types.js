"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-empty-interface */
const runtimeTypes = tslib_1.__importStar(require("io-ts"));
const framework_1 = require("../framework");
/*
 *  Note Types
 */
exports.SavedPinnedEventRuntimeType = runtimeTypes.intersection([
    runtimeTypes.type({
        timelineId: runtimeTypes.string,
        eventId: runtimeTypes.string,
    }),
    runtimeTypes.partial({
        created: framework_1.unionWithNullType(runtimeTypes.number),
        createdBy: framework_1.unionWithNullType(runtimeTypes.string),
        updated: framework_1.unionWithNullType(runtimeTypes.number),
        updatedBy: framework_1.unionWithNullType(runtimeTypes.string),
    }),
]);
/**
 * Note Saved object type with metadata
 */
exports.PinnedEventSavedObjectRuntimeType = runtimeTypes.intersection([
    runtimeTypes.type({
        id: runtimeTypes.string,
        attributes: exports.SavedPinnedEventRuntimeType,
        version: runtimeTypes.string,
    }),
    runtimeTypes.partial({
        pinnedEventId: framework_1.unionWithNullType(runtimeTypes.string),
        timelineVersion: runtimeTypes.union([
            runtimeTypes.string,
            runtimeTypes.null,
            runtimeTypes.undefined,
        ]),
    }),
]);
exports.PinnedEventToReturnSavedObjectRuntimeType = runtimeTypes.intersection([
    runtimeTypes.type({
        pinnedEventId: runtimeTypes.string,
        version: runtimeTypes.string,
    }),
    exports.SavedPinnedEventRuntimeType,
    runtimeTypes.partial({
        timelineVersion: runtimeTypes.union([
            runtimeTypes.string,
            runtimeTypes.null,
            runtimeTypes.undefined,
        ]),
    }),
]);
