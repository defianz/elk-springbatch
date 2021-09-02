"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function getSavedObjectsClient(server) {
    const { SavedObjectsClient, getSavedObjectsRepository } = server.savedObjects;
    const { callWithInternalUser } = server.plugins.elasticsearch.getCluster('admin');
    const internalRepository = getSavedObjectsRepository(callWithInternalUser);
    return new SavedObjectsClient(internalRepository);
}
exports.getSavedObjectsClient = getSavedObjectsClient;
