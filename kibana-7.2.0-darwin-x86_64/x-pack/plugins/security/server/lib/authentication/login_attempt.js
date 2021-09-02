"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A LoginAttempt represents a single attempt to provide login credentials.
 * Once credentials are set, they cannot be changed.
 */
class LoginAttempt {
    constructor() {
        /**
         * Username and password for login.
         */
        this.credentials = null;
    }
    /**
     * Gets the username and password for this login.
     */
    getCredentials() {
        return this.credentials;
    }
    /**
     * Sets the username and password for this login.
     */
    setCredentials(username, password) {
        if (this.credentials) {
            throw new Error('Credentials for login attempt have already been set');
        }
        this.credentials = Object.freeze({ username, password });
    }
}
exports.LoginAttempt = LoginAttempt;
