"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const saved_object_mappings_1 = require("./lib/note/saved_object_mappings");
exports.noteSavedObjectType = saved_object_mappings_1.noteSavedObjectType;
const saved_object_mappings_2 = require("./lib/pinned_event/saved_object_mappings");
exports.pinnedEventSavedObjectType = saved_object_mappings_2.pinnedEventSavedObjectType;
const saved_object_mappings_3 = require("./lib/timeline/saved_object_mappings");
exports.timelineSavedObjectType = saved_object_mappings_3.timelineSavedObjectType;
exports.savedObjectMappings = {
    ...saved_object_mappings_3.timelineSavedObjectMappings,
    ...saved_object_mappings_1.noteSavedObjectMappings,
    ...saved_object_mappings_2.pinnedEventSavedObjectMappings,
};
