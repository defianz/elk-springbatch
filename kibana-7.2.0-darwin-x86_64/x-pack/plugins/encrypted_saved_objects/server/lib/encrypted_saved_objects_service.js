"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const node_crypto_1 = tslib_1.__importDefault(require("@elastic/node-crypto"));
const json_stable_stringify_1 = tslib_1.__importDefault(require("json-stable-stringify"));
const type_detect_1 = tslib_1.__importDefault(require("type-detect"));
const encryption_error_1 = require("./encryption_error");
/**
 * Utility function that gives array representation of the saved object descriptor respecting
 * optional `namespace` property.
 * @param descriptor Saved Object descriptor to turn into array.
 */
function descriptorToArray(descriptor) {
    return descriptor.namespace
        ? [descriptor.namespace, descriptor.type, descriptor.id]
        : [descriptor.type, descriptor.id];
}
exports.descriptorToArray = descriptorToArray;
/**
 * Represents the service that tracks all saved object types that might contain attributes that need
 * to be encrypted before they are stored and eventually decrypted when retrieved. The service
 * performs encryption only based on registered saved object types that are known to contain such
 * attributes.
 */
class EncryptedSavedObjectsService {
    /**
     * @param encryptionKey The key used to encrypt and decrypt saved objects attributes.
     * @param knownTypes The list of all known saved object types.
     * @param log Ordinary logger instance.
     * @param audit Audit logger instance.
     */
    constructor(encryptionKey, knownTypes, log, audit) {
        this.knownTypes = knownTypes;
        this.log = log;
        this.audit = audit;
        /**
         * Map of all registered saved object types where the `key` is saved object type and the `value`
         * is the registration parameters (names of attributes that need to be encrypted etc.).
         */
        this.typeRegistrations = new Map();
        this.crypto = node_crypto_1.default({ encryptionKey });
    }
    /**
     * Registers saved object type as the one that contains attributes that should be encrypted.
     * @param typeRegistration Saved object type registration parameters.
     * @throws Will throw if `attributesToEncrypt` is empty.
     * @throws Will throw if the type is already registered.
     * @throws Will throw if the type is not known saved object type.
     */
    registerType(typeRegistration) {
        if (typeRegistration.attributesToEncrypt.size === 0) {
            throw new Error(`The "attributesToEncrypt" array for "${typeRegistration.type}" is empty.`);
        }
        if (this.typeRegistrations.has(typeRegistration.type)) {
            throw new Error(`The "${typeRegistration.type}" saved object type is already registered.`);
        }
        if (!this.knownTypes.includes(typeRegistration.type)) {
            throw new Error(`The type "${typeRegistration.type}" is not known saved object type.`);
        }
        this.typeRegistrations.set(typeRegistration.type, typeRegistration);
    }
    /**
     * Checks whether specified saved object type is registered as the one that contains attributes
     * that should be encrypted.
     * @param type Saved object type.
     */
    isRegistered(type) {
        return this.typeRegistrations.has(type);
    }
    /**
     * Takes saved object attributes for the specified type and strips any of them that are supposed
     * to be encrypted and returns that __NEW__ attributes dictionary back.
     * @param type Type of the saved object to strip encrypted attributes from.
     * @param attributes Dictionary of __ALL__ saved object attributes.
     */
    stripEncryptedAttributes(type, attributes) {
        const typeRegistration = this.typeRegistrations.get(type);
        if (typeRegistration === undefined) {
            return attributes;
        }
        const clonedAttributes = {};
        for (const [attributeName, attributeValue] of Object.entries(attributes)) {
            if (!typeRegistration.attributesToEncrypt.has(attributeName)) {
                clonedAttributes[attributeName] = attributeValue;
            }
        }
        return clonedAttributes;
    }
    /**
     * Takes saved object attributes for the specified type and encrypts all of them that are supposed
     * to be encrypted if any and returns that __NEW__ attributes dictionary back. If none of the
     * attributes were encrypted original attributes dictionary is returned.
     * @param descriptor Descriptor of the saved object to encrypt attributes for.
     * @param attributes Dictionary of __ALL__ saved object attributes.
     * @throws Will throw if encryption fails for whatever reason.
     */
    async encryptAttributes(descriptor, attributes) {
        const typeRegistration = this.typeRegistrations.get(descriptor.type);
        if (typeRegistration === undefined) {
            return attributes;
        }
        const encryptionAAD = this.getAAD(typeRegistration, descriptor, attributes);
        const encryptedAttributes = {};
        for (const attributeName of typeRegistration.attributesToEncrypt) {
            const attributeValue = attributes[attributeName];
            if (attributeValue != null) {
                try {
                    encryptedAttributes[attributeName] = await this.crypto.encrypt(attributeValue, encryptionAAD);
                }
                catch (err) {
                    this.log.error(`Failed to encrypt "${attributeName}" attribute: ${err.message || err}`);
                    this.audit.encryptAttributeFailure(attributeName, descriptor);
                    throw new encryption_error_1.EncryptionError(`Unable to encrypt attribute "${attributeName}"`, attributeName, err);
                }
            }
        }
        // Normally we expect all registered to-be-encrypted attributes to be defined, but if it's
        // not the case we should collect and log them to make troubleshooting easier.
        const encryptedAttributesKeys = Object.keys(encryptedAttributes);
        if (encryptedAttributesKeys.length !== typeRegistration.attributesToEncrypt.size) {
            this.log.debug(`The following attributes of saved object "${descriptorToArray(descriptor)}" should have been encrypted: ${Array.from(typeRegistration.attributesToEncrypt)}, but found only: ${encryptedAttributesKeys}`);
        }
        if (encryptedAttributesKeys.length === 0) {
            return attributes;
        }
        this.audit.encryptAttributesSuccess(encryptedAttributesKeys, descriptor);
        return {
            ...attributes,
            ...encryptedAttributes,
        };
    }
    /**
     * Takes saved object attributes for the specified type and decrypts all of them that are supposed
     * to be encrypted if any and returns that __NEW__ attributes dictionary back. If none of the
     * attributes were decrypted original attributes dictionary is returned.
     * @param descriptor Descriptor of the saved object to decrypt attributes for.
     * @param attributes Dictionary of __ALL__ saved object attributes.
     * @throws Will throw if decryption fails for whatever reason.
     * @throws Will throw if any of the attributes to decrypt is not a string.
     */
    async decryptAttributes(descriptor, attributes) {
        const typeRegistration = this.typeRegistrations.get(descriptor.type);
        if (typeRegistration === undefined) {
            return attributes;
        }
        const encryptionAAD = this.getAAD(typeRegistration, descriptor, attributes);
        const decryptedAttributes = {};
        for (const attributeName of typeRegistration.attributesToEncrypt) {
            const attributeValue = attributes[attributeName];
            if (attributeValue == null) {
                continue;
            }
            if (typeof attributeValue !== 'string') {
                this.audit.decryptAttributeFailure(attributeName, descriptor);
                throw new Error(`Encrypted "${attributeName}" attribute should be a string, but found ${type_detect_1.default(attributeValue)}`);
            }
            try {
                decryptedAttributes[attributeName] = await this.crypto.decrypt(attributeValue, encryptionAAD);
            }
            catch (err) {
                this.log.error(`Failed to decrypt "${attributeName}" attribute: ${err.message || err}`);
                this.audit.decryptAttributeFailure(attributeName, descriptor);
                throw new encryption_error_1.EncryptionError(`Unable to decrypt attribute "${attributeName}"`, attributeName, err);
            }
        }
        // Normally we expect all registered to-be-encrypted attributes to be defined, but if it's
        // not the case we should collect and log them to make troubleshooting easier.
        const decryptedAttributesKeys = Object.keys(decryptedAttributes);
        if (decryptedAttributesKeys.length !== typeRegistration.attributesToEncrypt.size) {
            this.log.debug(`The following attributes of saved object "${descriptorToArray(descriptor)}" should have been decrypted: ${Array.from(typeRegistration.attributesToEncrypt)}, but found only: ${decryptedAttributesKeys}`);
        }
        if (decryptedAttributesKeys.length === 0) {
            return attributes;
        }
        this.audit.decryptAttributesSuccess(decryptedAttributesKeys, descriptor);
        return {
            ...attributes,
            ...decryptedAttributes,
        };
    }
    /**
     * Generates string representation of the Additional Authenticated Data based on the specified saved
     * object type and attributes.
     * @param typeRegistration Saved object type registration parameters.
     * @param descriptor Descriptor of the saved object to get AAD for.
     * @param attributes All attributes of the saved object instance of the specified type.
     */
    getAAD(typeRegistration, descriptor, attributes) {
        // Collect all attributes (both keys and values) that should contribute to AAD.
        const attributesAAD = {};
        for (const [attributeKey, attributeValue] of Object.entries(attributes)) {
            if (!typeRegistration.attributesToEncrypt.has(attributeKey) &&
                (typeRegistration.attributesToExcludeFromAAD == null ||
                    !typeRegistration.attributesToExcludeFromAAD.has(attributeKey))) {
                attributesAAD[attributeKey] = attributeValue;
            }
        }
        if (Object.keys(attributesAAD).length) {
            this.log.debug(`The AAD for saved object "${descriptorToArray(descriptor)}" does not include any attributes.`);
        }
        return json_stable_stringify_1.default([...descriptorToArray(descriptor), attributesAAD]);
    }
}
exports.EncryptedSavedObjectsService = EncryptedSavedObjectsService;
