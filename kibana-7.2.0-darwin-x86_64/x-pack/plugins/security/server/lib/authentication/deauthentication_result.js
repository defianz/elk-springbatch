"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents status that `DeauthenticationResult` can be in.
 */
var DeauthenticationResultStatus;
(function (DeauthenticationResultStatus) {
    /**
     * Deauthentication of the user can't be handled (e.g. provider doesn't
     * support sign out).
     */
    DeauthenticationResultStatus["NotHandled"] = "not-handled";
    /**
     * User has been successfully deauthenticated.
     */
    DeauthenticationResultStatus["Succeeded"] = "succeeded";
    /**
     * User can't be deauthenticated. Result should include the error that
     * describes the reason of failure.
     */
    DeauthenticationResultStatus["Failed"] = "failed";
    /**
     * Deauthentication consists of multiple steps and user should be redirected
     * to a different location to complete it.
     */
    DeauthenticationResultStatus["Redirected"] = "redirected";
})(DeauthenticationResultStatus || (DeauthenticationResultStatus = {}));
/**
 * Represents the result of the deauthentication attempt.
 */
class DeauthenticationResult {
    /**
     * Constructor is not supposed to be used directly, please use corresponding static factory methods instead.
     * @param status Indicates the status of the deauthentication result.
     * @param [options] Optional argument that includes additional deauthentication options.
     */
    constructor(status, options = {}) {
        this.status = status;
        this.options = options;
    }
    /**
     * Produces `DeauthenticationResult` for the case when user deauthentication isn't supported.
     */
    static notHandled() {
        return new DeauthenticationResult(DeauthenticationResultStatus.NotHandled);
    }
    /**
     * Produces `DeauthenticationResult` for the case when deauthentication succeeds.
     */
    static succeeded() {
        return new DeauthenticationResult(DeauthenticationResultStatus.Succeeded);
    }
    /**
     * Produces `DeauthenticationResult` for the case when deauthentication fails.
     * @param error Error that occurred during deauthentication attempt.
     */
    static failed(error) {
        if (!error) {
            throw new Error('Error should be specified.');
        }
        return new DeauthenticationResult(DeauthenticationResultStatus.Failed, { error });
    }
    /**
     * Produces `DeauthenticationResult` for the case when deauthentication needs user to be redirected.
     * @param redirectURL URL that should be used to redirect user to complete deauthentication.
     */
    static redirectTo(redirectURL) {
        if (!redirectURL) {
            throw new Error('Redirect URL must be specified.');
        }
        return new DeauthenticationResult(DeauthenticationResultStatus.Redirected, { redirectURL });
    }
    /**
     * Error that occurred during deauthentication (only available for `failed` result).
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
     * Indicates that deauthentication isn't supported.
     */
    notHandled() {
        return this.status === DeauthenticationResultStatus.NotHandled;
    }
    /**
     * Indicates that deauthentication succeeded.
     */
    succeeded() {
        return this.status === DeauthenticationResultStatus.Succeeded;
    }
    /**
     * Indicates that deauthentication failed.
     */
    failed() {
        return this.status === DeauthenticationResultStatus.Failed;
    }
    /**
     * Indicates that deauthentication needs user to be redirected.
     */
    redirected() {
        return this.status === DeauthenticationResultStatus.Redirected;
    }
}
exports.DeauthenticationResult = DeauthenticationResult;
