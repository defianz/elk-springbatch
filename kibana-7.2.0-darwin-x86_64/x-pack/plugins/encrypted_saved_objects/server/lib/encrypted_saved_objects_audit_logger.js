"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const encrypted_saved_objects_service_1 = require("./encrypted_saved_objects_service");
/**
 * Represents all audit events the plugin can log.
 */
class EncryptedSavedObjectsAuditLogger {
    constructor(auditLogger) {
        this.auditLogger = auditLogger;
    }
    encryptAttributeFailure(attributeName, descriptor) {
        this.auditLogger.log('encrypt_failure', `Failed to encrypt attribute "${attributeName}" for saved object "[${encrypted_saved_objects_service_1.descriptorToArray(descriptor)}]".`, { ...descriptor, attributeName });
    }
    decryptAttributeFailure(attributeName, descriptor) {
        this.auditLogger.log('decrypt_failure', `Failed to decrypt attribute "${attributeName}" for saved object "[${encrypted_saved_objects_service_1.descriptorToArray(descriptor)}]".`, { ...descriptor, attributeName });
    }
    encryptAttributesSuccess(attributesNames, descriptor) {
        this.auditLogger.log('encrypt_success', `Successfully encrypted attributes "[${attributesNames}]" for saved object "[${encrypted_saved_objects_service_1.descriptorToArray(descriptor)}]".`, { ...descriptor, attributesNames });
    }
    decryptAttributesSuccess(attributesNames, descriptor) {
        this.auditLogger.log('decrypt_success', `Successfully decrypted attributes "[${attributesNames}]" for saved object "[${encrypted_saved_objects_service_1.descriptorToArray(descriptor)}]".`, { ...descriptor, attributesNames });
    }
}
exports.EncryptedSavedObjectsAuditLogger = EncryptedSavedObjectsAuditLogger;
