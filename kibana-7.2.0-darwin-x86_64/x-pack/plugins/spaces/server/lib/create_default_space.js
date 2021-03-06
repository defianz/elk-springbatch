"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@kbn/i18n");
const get_client_shield_1 = require("../../../../server/lib/get_client_shield");
const constants_1 = require("../../common/constants");
async function createDefaultSpace(server) {
    const { callWithInternalUser: callCluster } = get_client_shield_1.getClient(server);
    const { getSavedObjectsRepository, SavedObjectsClient } = server.savedObjects;
    const savedObjectsRepository = getSavedObjectsRepository(callCluster);
    const defaultSpaceExists = await doesDefaultSpaceExist(SavedObjectsClient, savedObjectsRepository);
    if (defaultSpaceExists) {
        return;
    }
    const options = {
        id: constants_1.DEFAULT_SPACE_ID,
    };
    try {
        await savedObjectsRepository.create('space', {
            name: i18n_1.i18n.translate('xpack.spaces.defaultSpaceTitle', {
                defaultMessage: 'Default',
            }),
            description: i18n_1.i18n.translate('xpack.spaces.defaultSpaceDescription', {
                defaultMessage: 'This is your default space!',
            }),
            color: '#00bfb3',
            disabledFeatures: [],
            _reserved: true,
        }, options);
    }
    catch (error) {
        // Ignore conflict errors.
        // It is possible that another Kibana instance, or another invocation of this function
        // created the default space in the time it took this to complete.
        if (SavedObjectsClient.errors.isConflictError(error)) {
            return;
        }
        throw error;
    }
}
exports.createDefaultSpace = createDefaultSpace;
async function doesDefaultSpaceExist(SavedObjectsClient, savedObjectsRepository) {
    try {
        await savedObjectsRepository.get('space', constants_1.DEFAULT_SPACE_ID);
        return true;
    }
    catch (e) {
        if (SavedObjectsClient.errors.isNotFoundError(e)) {
            return false;
        }
        throw e;
    }
}
