"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const PathReporter_1 = require("io-ts/lib/PathReporter");
const types_1 = require("./types");
exports.convertSavedObjectToSavedTimeline = (savedObject) => {
    return types_1.TimelineSavedObjectRuntimeType.decode(savedObject)
        .map(savedTimeline => ({
        savedObjectId: savedTimeline.id,
        version: savedTimeline.version,
        ...savedTimeline.attributes,
    }))
        .getOrElseL(errors => {
        throw new Error(PathReporter_1.failure(errors).join('\n'));
    });
};
