"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var AuthenticationResultStatus;
(function (AuthenticationResultStatus) {
    /**
     * Authentication of the user can't be handled (e.g. supported credentials
     * are not provided).
     */
    AuthenticationResultStatus["NotHandled"] = "not-handled";
    /**
     * User has been successfully authenticated. Result should be complemented
     * with retrieved user information and optionally with state.
     */
    AuthenticationResultStatus["Succeeded"] = "succeeded";
    /**
     * User can't be authenticated with the provided credentials. Result should
     * include the error that describes the reason of failure.
     */
    AuthenticationResultStatus["Failed"] = "failed";
    /**
     * Authentication consists of multiple steps and user should be redirected to
     * a different location to complete it. Can be complemented with optional state.
     */
    AuthenticationResultStatus["Redirected"] = "redirected";
})(AuthenticationResultStatus || (AuthenticationResultStatus = {}));
/**
 * Represents the result of an authentication attempt.
 */
class AuthenticationResult {
    /**
     * Constructor is not supposed to be used directly, please use corresponding static factory methods instead.
     * @param status Indicates the status of the authentication result.
     * @param [options] Optional argument that includes additional authentication options.
     */
    constructor(status, options = {}) {
        this.status = status;
        this.options = options;
    }
    /**
     * Produces `AuthenticationResult` for the case when user can't be authenticated with the
     * provided credentials.
     */
    static notHandled() {
        return new AuthenticationResult(AuthenticationResultStatus.NotHandled);
    }
    /**
     * Produces `AuthenticationResult` for the case when authentication succeeds.
     * @param user User information retrieved as a result of successful authentication attempt.
     * @param [state] Optional state to be stored and reused for the next request.
     */
    static succeeded(user, state) {
        if (!user) {
            throw new Error('User should be specified.');
        }
        return new AuthenticationResult(AuthenticationResultStatus.Succeeded, { user, state });
    }
    /**
     * Produces `AuthenticationResult` for the case when authentication fails.
     * @param error Error that occurred during authentication attempt.
     */
    static failed(error) {
        if (!error) {
            throw new Error('Error should be specified.');
        }
        return new AuthenticationResult(AuthenticationResultStatus.Failed, { error });
    }
    /**
     * Produces `AuthenticationResult` for the case when authentication needs user to be redirected.
     * @param redirectURL URL that should be used to redirect user to complete authentication.
     * @param [state] Optional state to be stored and reused for the next request.
     */
    static redirectTo(redirectURL, state) {
        if (!redirectURL) {
            throw new Error('Redirect URL must be specified.');
        }
        return new AuthenticationResult(AuthenticationResultStatus.Redirected, { redirectURL, state });
    }
    /**
     * Authenticated user instance (only available for `succeeded` result).
     */
    get user() {
        return this.options.user;
    }
    /**
     * State associated with the authenticated user (only available for `succeeded`
     * and `redirected` results).
     */
    get state() {
        return this.options.state;
    }
    /**
     * Error that occurred during authentication (only available for `failed` result).
     */
    get error() {
        return this.options.error;
    }
    /**
     * URL that should be used to redirect user to complete authentication only available
     * for `redirected` result).
     */
    get redirectURL() {
        return this.options.redirectURL;
    }
    /**
     * Indicates that authentication couldn't be performed with the provided credentials.
     */
    notHandled() {
        return this.status === AuthenticationResultStatus.NotHandled;
    }
    /**
     * Indicates that authentication succeeded.
     */
    succeeded() {
        return this.status === AuthenticationResultStatus.Succeeded;
    }
    /**
     * Indicates that authentication failed.
     */
    failed() {
        return this.status === AuthenticationResultStatus.Failed;
    }
    /**
     * Indicates that authentication needs user to be redirected.
     */
    redirected() {
        return this.status === AuthenticationResultStatus.Redirected;
    }
    /**
     * Checks whether authentication result implies state update.
     */
    shouldUpdateState() {
        // State shouldn't be updated in case it wasn't set or was specifically set to `null`.
        return this.options.state != null;
    }
    /**
     * Checks whether authentication result implies state clearing.
     */
    shouldClearState() {
        return this.options.state === null;
    }
}
exports.AuthenticationResult = AuthenticationResult;
