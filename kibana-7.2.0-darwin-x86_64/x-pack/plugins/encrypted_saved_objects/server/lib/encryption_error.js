"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class EncryptionError extends Error {
    constructor(message, attributeName, cause) {
        super(message);
        this.attributeName = attributeName;
        this.cause = cause;
        // Set the prototype explicitly, see:
        // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(this, EncryptionError.prototype);
    }
}
exports.EncryptionError = EncryptionError;
