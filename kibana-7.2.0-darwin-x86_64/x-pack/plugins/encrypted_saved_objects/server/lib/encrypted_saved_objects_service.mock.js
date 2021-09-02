"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function createEncryptedSavedObjectsServiceMock(registrations = []) {
    const mock = new (jest.requireMock('./encrypted_saved_objects_service')).EncryptedSavedObjectsService();
    function processAttributes(descriptor, attrs, action) {
        const registration = registrations.find(r => r.type === descriptor.type);
        if (!registration) {
            return attrs;
        }
        const clonedAttrs = { ...attrs };
        for (const attrName of registration.attributesToEncrypt) {
            if (attrName in clonedAttrs) {
                action(clonedAttrs, attrName);
            }
        }
        return clonedAttrs;
    }
    mock.isRegistered.mockImplementation(type => registrations.findIndex(r => r.type === type) >= 0);
    mock.encryptAttributes.mockImplementation(async (descriptor, attrs) => processAttributes(descriptor, attrs, (clonedAttrs, attrName) => (clonedAttrs[attrName] = `*${clonedAttrs[attrName]}*`)));
    mock.decryptAttributes.mockImplementation(async (descriptor, attrs) => processAttributes(descriptor, attrs, (clonedAttrs, attrName) => (clonedAttrs[attrName] = clonedAttrs[attrName].slice(1, -1))));
    mock.stripEncryptedAttributes.mockImplementation((type, attrs) => processAttributes({ type }, attrs, (clonedAttrs, attrName) => delete clonedAttrs[attrName]));
    return mock;
}
exports.createEncryptedSavedObjectsServiceMock = createEncryptedSavedObjectsServiceMock;
