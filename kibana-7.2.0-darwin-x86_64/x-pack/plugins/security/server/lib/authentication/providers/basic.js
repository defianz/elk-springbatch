"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const can_redirect_request_1 = require("../../can_redirect_request");
const authentication_result_1 = require("../authentication_result");
const deauthentication_result_1 = require("../deauthentication_result");
const base_1 = require("./base");
/**
 * Utility class that knows how to decorate request with proper Basic authentication headers.
 */
class BasicCredentials {
    /**
     * Takes provided `username` and `password`, transforms them into proper `Basic ***` authorization
     * header and decorates passed request with it.
     * @param request Request instance.
     * @param username User name.
     * @param password User password.
     */
    static decorateRequest(request, username, password) {
        const typeOfRequest = typeof request;
        if (!request || typeOfRequest !== 'object') {
            throw new Error('Request should be a valid object.');
        }
        if (!username || typeof username !== 'string') {
            throw new Error('Username should be a valid non-empty string.');
        }
        if (!password || typeof password !== 'string') {
            throw new Error('Password should be a valid non-empty string.');
        }
        const basicCredentials = Buffer.from(`${username}:${password}`).toString('base64');
        request.headers.authorization = `Basic ${basicCredentials}`;
        return request;
    }
}
exports.BasicCredentials = BasicCredentials;
/**
 * Provider that supports request authentication via Basic HTTP Authentication.
 */
class BasicAuthenticationProvider extends base_1.BaseAuthenticationProvider {
    /**
     * Performs request authentication using Basic HTTP Authentication.
     * @param request Request instance.
     * @param [state] Optional state object associated with the provider.
     */
    async authenticate(request, state) {
        this.debug(`Trying to authenticate user request to ${request.url.path}.`);
        // first try from login payload
        let authenticationResult = await this.authenticateViaLoginAttempt(request);
        // if there isn't a payload, try header-based auth
        if (authenticationResult.notHandled()) {
            const { authenticationResult: headerAuthResult, headerNotRecognized, } = await this.authenticateViaHeader(request);
            if (headerNotRecognized) {
                return headerAuthResult;
            }
            authenticationResult = headerAuthResult;
        }
        if (authenticationResult.notHandled() && state) {
            authenticationResult = await this.authenticateViaState(request, state);
        }
        else if (authenticationResult.notHandled() && can_redirect_request_1.canRedirectRequest(request)) {
            // If we couldn't handle authentication let's redirect user to the login page.
            const nextURL = encodeURIComponent(`${request.getBasePath()}${request.url.path}`);
            authenticationResult = authentication_result_1.AuthenticationResult.redirectTo(`${this.options.basePath}/login?next=${nextURL}`);
        }
        return authenticationResult;
    }
    /**
     * Redirects user to the login page preserving query string parameters.
     * @param request Request instance.
     */
    async deauthenticate(request) {
        // Query string may contain the path where logout has been called or
        // logout reason that login page may need to know.
        return deauthentication_result_1.DeauthenticationResult.redirectTo(`${this.options.basePath}/login${request.url.search || ''}`);
    }
    /**
     * Validates whether request contains a login payload and authenticates the
     * user if necessary.
     * @param request Request instance.
     */
    async authenticateViaLoginAttempt(request) {
        this.debug('Trying to authenticate via login attempt.');
        const credentials = request.loginAttempt().getCredentials();
        if (!credentials) {
            this.debug('Username and password not found in payload.');
            return authentication_result_1.AuthenticationResult.notHandled();
        }
        try {
            const { username, password } = credentials;
            BasicCredentials.decorateRequest(request, username, password);
            const user = await this.options.client.callWithRequest(request, 'shield.authenticate');
            this.debug('Request has been authenticated via login attempt.');
            return authentication_result_1.AuthenticationResult.succeeded(user, { authorization: request.headers.authorization });
        }
        catch (err) {
            this.debug(`Failed to authenticate request via login attempt: ${err.message}`);
            // Reset `Authorization` header we've just set. We know for sure that it hasn't been defined before,
            // otherwise it would have been used or completely rejected by the `authenticateViaHeader`.
            // We can't just set `authorization` to `undefined` or `null`, we should remove this property
            // entirely, otherwise `authorization` header without value will cause `callWithRequest` to fail if
            // it's called with this request once again down the line (e.g. in the next authentication provider).
            delete request.headers.authorization;
            return authentication_result_1.AuthenticationResult.failed(err);
        }
    }
    /**
     * Validates whether request contains `Basic ***` Authorization header and just passes it
     * forward to Elasticsearch backend.
     * @param request Request instance.
     */
    async authenticateViaHeader(request) {
        this.debug('Trying to authenticate via header.');
        const authorization = request.headers.authorization;
        if (!authorization) {
            this.debug('Authorization header is not presented.');
            return { authenticationResult: authentication_result_1.AuthenticationResult.notHandled() };
        }
        const authenticationSchema = authorization.split(/\s+/)[0];
        if (authenticationSchema.toLowerCase() !== 'basic') {
            this.debug(`Unsupported authentication schema: ${authenticationSchema}`);
            return {
                authenticationResult: authentication_result_1.AuthenticationResult.notHandled(),
                headerNotRecognized: true,
            };
        }
        try {
            const user = await this.options.client.callWithRequest(request, 'shield.authenticate');
            this.debug('Request has been authenticated via header.');
            return { authenticationResult: authentication_result_1.AuthenticationResult.succeeded(user) };
        }
        catch (err) {
            this.debug(`Failed to authenticate request via header: ${err.message}`);
            return { authenticationResult: authentication_result_1.AuthenticationResult.failed(err) };
        }
    }
    /**
     * Tries to extract authorization header from the state and adds it to the request before
     * it's forwarded to Elasticsearch backend.
     * @param request Request instance.
     * @param state State value previously stored by the provider.
     */
    async authenticateViaState(request, { authorization }) {
        this.debug('Trying to authenticate via state.');
        if (!authorization) {
            this.debug('Access token is not found in state.');
            return authentication_result_1.AuthenticationResult.notHandled();
        }
        request.headers.authorization = authorization;
        try {
            const user = await this.options.client.callWithRequest(request, 'shield.authenticate');
            this.debug('Request has been authenticated via state.');
            return authentication_result_1.AuthenticationResult.succeeded(user);
        }
        catch (err) {
            this.debug(`Failed to authenticate request via state: ${err.message}`);
            // Reset `Authorization` header we've just set. We know for sure that it hasn't been defined before,
            // otherwise it would have been used or completely rejected by the `authenticateViaHeader`.
            // We can't just set `authorization` to `undefined` or `null`, we should remove this property
            // entirely, otherwise `authorization` header without value will cause `callWithRequest` to crash if
            // it's called with this request once again down the line (e.g. in the next authentication provider).
            delete request.headers.authorization;
            return authentication_result_1.AuthenticationResult.failed(err);
        }
    }
    /**
     * Logs message with `debug` level and saml/security related tags.
     * @param message Message to log.
     */
    debug(message) {
        this.options.log(['debug', 'security', 'basic'], message);
    }
}
exports.BasicAuthenticationProvider = BasicAuthenticationProvider;
