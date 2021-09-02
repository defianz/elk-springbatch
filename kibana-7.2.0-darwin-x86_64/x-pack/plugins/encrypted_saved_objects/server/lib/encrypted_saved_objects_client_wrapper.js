"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
/**
 * Generates UUIDv4 ID for the any newly created saved object that is supposed to contain
 * encrypted attributes.
 */
function generateID() {
    return uuid_1.default.v4();
}
class EncryptedSavedObjectsClientWrapper {
    constructor(options, errors = options.baseClient.errors) {
        this.options = options;
        this.errors = errors;
    }
    async create(type, attributes = {}, options = {}) {
        if (!this.options.service.isRegistered(type)) {
            return await this.options.baseClient.create(type, attributes, options);
        }
        // Saved objects with encrypted attributes should have IDs that are hard to guess especially
        // since IDs are part of the AAD used during encryption, that's why we control them within this
        // wrapper and don't allow consumers to specify their own IDs directly.
        if (options.id) {
            throw new Error('Predefined IDs are not allowed for saved objects with encrypted attributes.');
        }
        const id = generateID();
        return this.stripEncryptedAttributesFromResponse(await this.options.baseClient.create(type, await this.options.service.encryptAttributes({ type, id, namespace: options.namespace }, attributes), { ...options, id }));
    }
    async bulkCreate(objects, options) {
        // We encrypt attributes for every object in parallel and that can potentially exhaust libuv or
        // NodeJS thread pool. If it turns out to be a problem, we can consider switching to the
        // sequential processing.
        const encryptedObjects = await Promise.all(objects.map(async (object) => {
            if (!this.options.service.isRegistered(object.type)) {
                return object;
            }
            // Saved objects with encrypted attributes should have IDs that are hard to guess especially
            // since IDs are part of the AAD used during encryption, that's why we control them within this
            // wrapper and don't allow consumers to specify their own IDs directly.
            if (object.id) {
                throw new Error('Predefined IDs are not allowed for saved objects with encrypted attributes.');
            }
            const id = generateID();
            return {
                ...object,
                id,
                attributes: await this.options.service.encryptAttributes({ type: object.type, id, namespace: options && options.namespace }, object.attributes),
            };
        }));
        return this.stripEncryptedAttributesFromBulkResponse(await this.options.baseClient.bulkCreate(encryptedObjects, options));
    }
    async delete(type, id, options) {
        return await this.options.baseClient.delete(type, id, options);
    }
    async find(options = {}) {
        return this.stripEncryptedAttributesFromBulkResponse(await this.options.baseClient.find(options));
    }
    async bulkGet(objects = [], options) {
        return this.stripEncryptedAttributesFromBulkResponse(await this.options.baseClient.bulkGet(objects, options));
    }
    async get(type, id, options) {
        return this.stripEncryptedAttributesFromResponse(await this.options.baseClient.get(type, id, options));
    }
    async update(type, id, attributes, options) {
        if (!this.options.service.isRegistered(type)) {
            return await this.options.baseClient.update(type, id, attributes, options);
        }
        return this.stripEncryptedAttributesFromResponse(await this.options.baseClient.update(type, id, await this.options.service.encryptAttributes({ type, id, namespace: options && options.namespace }, attributes), options));
    }
    /**
     * Strips encrypted attributes from any non-bulk Saved Objects API response. If type isn't
     * registered, response is returned as is.
     * @param response Raw response returned by the underlying base client.
     */
    stripEncryptedAttributesFromResponse(response) {
        if (this.options.service.isRegistered(response.type)) {
            response.attributes = this.options.service.stripEncryptedAttributes(response.type, response.attributes);
        }
        return response;
    }
    /**
     * Strips encrypted attributes from any bulk Saved Objects API response. If type for any bulk
     * response portion isn't registered, it is returned as is.
     * @param response Raw response returned by the underlying base client.
     */
    stripEncryptedAttributesFromBulkResponse(response) {
        for (const savedObject of response.saved_objects) {
            if (this.options.service.isRegistered(savedObject.type)) {
                savedObject.attributes = this.options.service.stripEncryptedAttributes(savedObject.type, savedObject.attributes);
            }
        }
        return response;
    }
}
exports.EncryptedSavedObjectsClientWrapper = EncryptedSavedObjectsClientWrapper;
