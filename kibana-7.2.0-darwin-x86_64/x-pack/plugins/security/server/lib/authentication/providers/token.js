"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const can_redirect_request_1 = require("../../can_redirect_request");
const errors_1 = require("../../errors");
const authentication_result_1 = require("../authentication_result");
const deauthentication_result_1 = require("../deauthentication_result");
const base_1 = require("./base");
/**
 * If request with access token fails with `401 Unauthorized` then this token is no
 * longer valid and we should try to refresh it. Another use case that we should
 * temporarily support (until elastic/elasticsearch#38866 is fixed) is when token
 * document has been removed and ES responds with `500 Internal Server Error`.
 * @param err Error returned from Elasticsearch.
 */
function isAccessTokenExpiredError(err) {
    const errorStatusCode = errors_1.getErrorStatusCode(err);
    return (errorStatusCode === 401 ||
        (errorStatusCode === 500 &&
            err &&
            err.body &&
            err.body.error &&
            err.body.error.reason === 'token document is missing and must be present'));
}
/**
 * Provider that supports token-based request authentication.
 */
class TokenAuthenticationProvider extends base_1.BaseAuthenticationProvider {
    /**
     * Performs token-based request authentication
     * @param request Request instance.
     * @param [state] Optional state object associated with the provider.
     */
    async authenticate(request, state) {
        this.debug(`Trying to authenticate user request to ${request.url.path}.`);
        // first try from login payload
        let authenticationResult = await this.authenticateViaLoginAttempt(request);
        // if there isn't a payload, try header-based token auth
        if (authenticationResult.notHandled()) {
            const { authenticationResult: headerAuthResult, headerNotRecognized, } = await this.authenticateViaHeader(request);
            if (headerNotRecognized) {
                return headerAuthResult;
            }
            authenticationResult = headerAuthResult;
        }
        // if we still can't attempt auth, try authenticating via state (session token)
        if (authenticationResult.notHandled() && state) {
            authenticationResult = await this.authenticateViaState(request, state);
            if (authenticationResult.failed() && isAccessTokenExpiredError(authenticationResult.error)) {
                authenticationResult = await this.authenticateViaRefreshToken(request, state);
            }
        }
        // finally, if authentication still can not be handled for this
        // request/state combination, redirect to the login page if appropriate
        if (authenticationResult.notHandled() && can_redirect_request_1.canRedirectRequest(request)) {
            authenticationResult = authentication_result_1.AuthenticationResult.redirectTo(this.getLoginPageURL(request));
        }
        return authenticationResult;
    }
    /**
     * Redirects user to the login page preserving query string parameters.
     * @param request Request instance.
     * @param state State value previously stored by the provider.
     */
    async deauthenticate(request, state) {
        this.debug(`Trying to deauthenticate user via ${request.url.path}.`);
        if (!state || !state.accessToken || !state.refreshToken) {
            this.debug('There are no access and refresh tokens to invalidate.');
            return deauthentication_result_1.DeauthenticationResult.notHandled();
        }
        this.debug('Token-based logout has been initiated by the user.');
        try {
            // First invalidate the access token.
            const { invalidated_tokens: invalidatedAccessTokensCount, } = await this.options.client.callWithInternalUser('shield.deleteAccessToken', {
                body: { token: state.accessToken },
            });
            if (invalidatedAccessTokensCount === 0) {
                this.debug('User access token was already invalidated.');
            }
            else if (invalidatedAccessTokensCount === 1) {
                this.debug('User access token has been successfully invalidated.');
            }
            else {
                this.debug(`${invalidatedAccessTokensCount} user access tokens were invalidated, this is unexpected.`);
            }
            // Then invalidate the refresh token.
            const { invalidated_tokens: invalidatedRefreshTokensCount, } = await this.options.client.callWithInternalUser('shield.deleteAccessToken', {
                body: { refresh_token: state.refreshToken },
            });
            if (invalidatedRefreshTokensCount === 0) {
                this.debug('User refresh token was already invalidated.');
            }
            else if (invalidatedRefreshTokensCount === 1) {
                this.debug('User refresh token has been successfully invalidated.');
            }
            else {
                this.debug(`${invalidatedRefreshTokensCount} user refresh tokens were invalidated, this is unexpected.`);
            }
            return deauthentication_result_1.DeauthenticationResult.redirectTo(`${this.options.basePath}/login${request.url.search || ''}`);
        }
        catch (err) {
            this.debug(`Failed invalidating user's access token: ${err.message}`);
            return deauthentication_result_1.DeauthenticationResult.failed(err);
        }
    }
    /**
     * Validates whether request contains `Bearer ***` Authorization header and just passes it
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
        if (authenticationSchema.toLowerCase() !== 'bearer') {
            this.debug(`Unsupported authentication schema: ${authenticationSchema}`);
            return { authenticationResult: authentication_result_1.AuthenticationResult.notHandled(), headerNotRecognized: true };
        }
        try {
            const user = await this.options.client.callWithRequest(request, 'shield.authenticate');
            this.debug('Request has been authenticated via header.');
            // We intentionally do not store anything in session state because token
            // header auth can only be used on a request by request basis.
            return { authenticationResult: authentication_result_1.AuthenticationResult.succeeded(user) };
        }
        catch (err) {
            this.debug(`Failed to authenticate request via header: ${err.message}`);
            return { authenticationResult: authentication_result_1.AuthenticationResult.failed(err) };
        }
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
            // First attempt to exchange login credentials for an access token
            const { username, password } = credentials;
            const { access_token: accessToken, refresh_token: refreshToken, } = await this.options.client.callWithInternalUser('shield.getAccessToken', {
                body: { grant_type: 'password', username, password },
            });
            this.debug('Get token API request to Elasticsearch successful');
            // We validate that both access and refresh tokens exist in the response
            // so other private methods in this class can rely on them both existing.
            if (!accessToken) {
                throw new Error('Unexpected response from get token API - no access token present');
            }
            if (!refreshToken) {
                throw new Error('Unexpected response from get token API - no refresh token present');
            }
            // Then attempt to query for the user details using the new token
            request.headers.authorization = `Bearer ${accessToken}`;
            const user = await this.options.client.callWithRequest(request, 'shield.authenticate');
            this.debug('User has been authenticated with new access token');
            return authentication_result_1.AuthenticationResult.succeeded(user, { accessToken, refreshToken });
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
     * Tries to extract authorization header from the state and adds it to the request before
     * it's forwarded to Elasticsearch backend.
     * @param request Request instance.
     * @param state State value previously stored by the provider.
     */
    async authenticateViaState(request, { accessToken }) {
        this.debug('Trying to authenticate via state.');
        if (!accessToken) {
            this.debug('Access token is not found in state.');
            return authentication_result_1.AuthenticationResult.notHandled();
        }
        try {
            request.headers.authorization = `Bearer ${accessToken}`;
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
     * This method is only called when authentication via access token stored in the state failed because of expired
     * token. So we should use refresh token, that is also stored in the state, to extend expired access token and
     * authenticate user with it.
     * @param request Request instance.
     * @param state State value previously stored by the provider.
     */
    async authenticateViaRefreshToken(request, { refreshToken }) {
        this.debug('Trying to refresh access token.');
        if (!refreshToken) {
            this.debug('Refresh token is not found in state.');
            return authentication_result_1.AuthenticationResult.notHandled();
        }
        try {
            // Token must be refreshed by the same user that obtained that token, the
            // kibana system user.
            const { access_token: newAccessToken, refresh_token: newRefreshToken, } = await this.options.client.callWithInternalUser('shield.getAccessToken', {
                body: { grant_type: 'refresh_token', refresh_token: refreshToken },
            });
            this.debug(`Request to refresh token via Elasticsearch's get token API successful`);
            // We validate that both access and refresh tokens exist in the response
            // so other private methods in this class can rely on them both existing.
            if (!newAccessToken) {
                throw new Error('Unexpected response from get token API - no access token present');
            }
            if (!newRefreshToken) {
                throw new Error('Unexpected response from get token API - no refresh token present');
            }
            request.headers.authorization = `Bearer ${newAccessToken}`;
            const user = await this.options.client.callWithRequest(request, 'shield.authenticate');
            this.debug('Request has been authenticated via refreshed token.');
            return authentication_result_1.AuthenticationResult.succeeded(user, {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        }
        catch (err) {
            this.debug(`Failed to refresh access token: ${err.message}`);
            // Reset `Authorization` header we've just set. We know for sure that it hasn't been defined before,
            // otherwise it would have been used or completely rejected by the `authenticateViaHeader`.
            // We can't just set `authorization` to `undefined` or `null`, we should remove this property
            // entirely, otherwise `authorization` header without value will cause `callWithRequest` to fail if
            // it's called with this request once again down the line (e.g. in the next authentication provider).
            delete request.headers.authorization;
            // If refresh fails with `400` then refresh token is no longer valid and we should clear session
            // and redirect user to the login page to re-authenticate.
            if (errors_1.getErrorStatusCode(err) === 400 && can_redirect_request_1.canRedirectRequest(request)) {
                this.debug('Clearing session since both access and refresh tokens are expired.');
                // Set state to `null` to let `Authenticator` know that we want to clear current session.
                return authentication_result_1.AuthenticationResult.redirectTo(this.getLoginPageURL(request), null);
            }
            return authentication_result_1.AuthenticationResult.failed(err);
        }
    }
    /**
     * Constructs login page URL using current url path as `next` query string parameter.
     * @param request Request instance.
     */
    getLoginPageURL(request) {
        const nextURL = encodeURIComponent(`${request.getBasePath()}${request.url.path}`);
        return `${this.options.basePath}/login?next=${nextURL}`;
    }
    /**
     * Logs message with `debug` level and token/security related tags.
     * @param message Message to log.
     */
    debug(message) {
        this.options.log(['debug', 'security', 'token'], message);
    }
}
exports.TokenAuthenticationProvider = TokenAuthenticationProvider;
