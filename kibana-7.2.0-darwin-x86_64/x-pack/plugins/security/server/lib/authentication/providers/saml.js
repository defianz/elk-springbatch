"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
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
 * Checks whether request payload contains SAML response from IdP.
 * @param request Request instance.
 */
function isRequestWithSAMLResponsePayload(request) {
    return request.payload != null && !!request.payload.SAMLResponse;
}
/**
 * Checks whether request query includes SAML request from IdP.
 * @param query Parsed HTTP request query.
 */
function isSAMLRequestQuery(query) {
    return query && query.SAMLRequest;
}
/**
 * Provider that supports SAML request authentication.
 */
class SAMLAuthenticationProvider extends base_1.BaseAuthenticationProvider {
    /**
     * Performs SAML request authentication.
     * @param request Request instance.
     * @param [state] Optional state object associated with the provider.
     */
    async authenticate(request, state) {
        this.debug(`Trying to authenticate user request to ${request.url.path}.`);
        let { authenticationResult, 
        // eslint-disable-next-line prefer-const
        headerNotRecognized, } = await this.authenticateViaHeader(request);
        if (headerNotRecognized) {
            return authenticationResult;
        }
        if (state && authenticationResult.notHandled()) {
            authenticationResult = await this.authenticateViaState(request, state);
            if (authenticationResult.failed() && isAccessTokenExpiredError(authenticationResult.error)) {
                authenticationResult = await this.authenticateViaRefreshToken(request, state);
            }
        }
        // Let's check if user is redirected to Kibana from IdP with valid SAMLResponse.
        if (isRequestWithSAMLResponsePayload(request)) {
            if (authenticationResult.notHandled()) {
                authenticationResult = await this.authenticateViaPayload(request, state);
            }
            else if (authenticationResult.succeeded()) {
                // If user has been authenticated via session, but request also includes SAML payload
                // we should check whether this payload is for the exactly same user and if not
                // we'll re-authenticate user and forward to a page with the respective warning.
                authenticationResult = await this.authenticateViaNewPayload(request, (authenticationResult.state || state), authenticationResult.user);
            }
        }
        // If we couldn't authenticate by means of all methods above, let's try to
        // initiate SAML handshake, otherwise just return authentication result we have.
        return authenticationResult.notHandled()
            ? await this.authenticateViaHandshake(request)
            : authenticationResult;
    }
    /**
     * Invalidates SAML access token if it exists.
     * @param request Request instance.
     * @param state State value previously stored by the provider.
     */
    async deauthenticate(request, state) {
        this.debug(`Trying to deauthenticate user via ${request.url.path}.`);
        if ((!state || !state.accessToken) && !isSAMLRequestQuery(request.query)) {
            this.debug('There is neither access token nor SAML session to invalidate.');
            return deauthentication_result_1.DeauthenticationResult.notHandled();
        }
        try {
            const redirect = isSAMLRequestQuery(request.query)
                ? await this.performIdPInitiatedSingleLogout(request)
                : await this.performUserInitiatedSingleLogout(state.accessToken, state.refreshToken);
            // Having non-null `redirect` field within logout response means that IdP
            // supports SAML Single Logout and we should redirect user to the specified
            // location to properly complete logout.
            if (redirect != null) {
                this.debug('Redirecting user to Identity Provider to complete logout.');
                return deauthentication_result_1.DeauthenticationResult.redirectTo(redirect);
            }
            return deauthentication_result_1.DeauthenticationResult.redirectTo('/logged_out');
        }
        catch (err) {
            this.debug(`Failed to deauthenticate user: ${err.message}`);
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
     * Validates whether request payload contains `SAMLResponse` parameter that can be exchanged
     * to a proper access token. If state is presented and includes request id then it means
     * that login attempt has been initiated by Kibana itself and request id must be sent to
     * Elasticsearch together with corresponding `SAMLResponse`. Not having state at this stage is
     * indication of potential IdP initiated login, so we should send only `SAMLResponse` that
     * Elasticsearch will decrypt and figure out on its own if it's a legit response from IdP
     * initiated login.
     *
     * When login succeeds access token is stored in the state and user is redirected to the URL
     * that was requested before SAML handshake or to default Kibana location in case of IdP
     * initiated login.
     * @param request Request instance.
     * @param [state] Optional state object associated with the provider.
     */
    async authenticateViaPayload(request, state) {
        this.debug('Trying to authenticate via SAML response payload.');
        // If we have a `SAMLResponse` and state, but state doesn't contain all the necessary information,
        // then something unexpected happened and we should fail.
        const { requestId: stateRequestId, nextURL: stateRedirectURL } = state || {
            requestId: '',
            nextURL: '',
        };
        if (state && (!stateRequestId || !stateRedirectURL)) {
            const message = 'SAML response state does not have corresponding request id or redirect URL.';
            this.debug(message);
            return authentication_result_1.AuthenticationResult.failed(boom_1.default.badRequest(message));
        }
        // When we don't have state and hence request id we assume that SAMLResponse came from the IdP initiated login.
        this.debug(stateRequestId
            ? 'Authentication has been previously initiated by Kibana.'
            : 'Authentication has been initiated by Identity Provider.');
        try {
            // This operation should be performed on behalf of the user with a privilege that normal
            // user usually doesn't have `cluster:admin/xpack/security/saml/authenticate`.
            const { access_token: accessToken, refresh_token: refreshToken, } = await this.options.client.callWithInternalUser('shield.samlAuthenticate', {
                body: {
                    ids: stateRequestId ? [stateRequestId] : [],
                    content: request.payload.SAMLResponse,
                },
            });
            this.debug('Request has been authenticated via SAML response.');
            return authentication_result_1.AuthenticationResult.redirectTo(stateRedirectURL || `${this.options.basePath}/`, {
                accessToken,
                refreshToken,
            });
        }
        catch (err) {
            this.debug(`Failed to authenticate request via SAML response: ${err.message}`);
            return authentication_result_1.AuthenticationResult.failed(err);
        }
    }
    /**
     * Validates whether user retrieved using session is the same as the user defined in the SAML payload.
     * If we can successfully exchange this SAML payload to access and refresh tokens, then we'll
     * invalidate tokens from the existing session and use the new ones instead.
     *
     * The tokens are stored in the state and user is redirected to the default Kibana location, unless
     * we detect that user from existing session isn't the same as defined in SAML payload. In this case
     * we'll forward user to a page with the respective warning.
     * @param request Request instance.
     * @param existingState State existing user session is based on.
     * @param user User returned for the existing session.
     */
    async authenticateViaNewPayload(request, existingState, user) {
        this.debug('Trying to authenticate via SAML response payload with existing valid session.');
        // First let's try to authenticate via SAML Response payload.
        const payloadAuthenticationResult = await this.authenticateViaPayload(request);
        if (payloadAuthenticationResult.failed()) {
            return payloadAuthenticationResult;
        }
        else if (!payloadAuthenticationResult.shouldUpdateState()) {
            // Should never happen, but if it does - it's a bug.
            return authentication_result_1.AuthenticationResult.failed(new Error('Authentication via SAML payload did not produce access and refresh tokens.'));
        }
        const newState = payloadAuthenticationResult.state;
        // Then use received tokens to retrieve user information. We need just username and authentication
        // realm, once ES starts returning this info from `saml/authenticate` we can get rid of this call.
        const newUserAuthenticationResult = await this.authenticateViaState(request, newState);
        if (newUserAuthenticationResult.failed()) {
            return newUserAuthenticationResult;
        }
        else if (newUserAuthenticationResult.user === undefined) {
            // Should never happen, but if it does - it's a bug.
            return authentication_result_1.AuthenticationResult.failed(new Error('Could not retrieve user information using tokens produced for the SAML payload.'));
        }
        // Now let's invalidate tokens from the existing session.
        try {
            await this.performIdPInitiatedLocalLogout(existingState.accessToken, existingState.refreshToken);
        }
        catch (err) {
            this.debug(`Failed to perform IdP initiated local logout: ${err.message}`);
            return authentication_result_1.AuthenticationResult.failed(err);
        }
        if (newUserAuthenticationResult.user.username !== user.username ||
            newUserAuthenticationResult.user.authentication_realm.name !== user.authentication_realm.name) {
            this.debug('Authentication initiated by Identity Provider is for a different user than currently authenticated.');
            return authentication_result_1.AuthenticationResult.redirectTo(`${this.options.basePath}/overwritten_session`, newState);
        }
        this.debug('Authentication initiated by Identity Provider is for currently authenticated user.');
        return payloadAuthenticationResult;
    }
    /**
     * Tries to extract access token from state and adds it to the request before it's
     * forwarded to Elasticsearch backend.
     * @param request Request instance.
     * @param state State value previously stored by the provider.
     */
    async authenticateViaState(request, { accessToken }) {
        this.debug('Trying to authenticate via state.');
        if (!accessToken) {
            this.debug('Access token is not found in state.');
            return authentication_result_1.AuthenticationResult.notHandled();
        }
        request.headers.authorization = `Bearer ${accessToken}`;
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
            // entirely, otherwise `authorization` header without value will cause `callWithRequest` to fail if
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
            // Token should be refreshed by the same user that obtained that token.
            const { access_token: newAccessToken, refresh_token: newRefreshToken, } = await this.options.client.callWithInternalUser('shield.getAccessToken', {
                body: { grant_type: 'refresh_token', refresh_token: refreshToken },
            });
            this.debug('Access token has been successfully refreshed.');
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
            // There are at least two common cases when refresh token request can fail:
            // 1. Refresh token is valid only for 24 hours and if it hasn't been used it expires.
            //
            // 2. Refresh token is one-time use token and if it has been used already, it is treated in the same way as
            // expired token. Even though it's an edge case, there are several perfectly valid scenarios when it can
            // happen. E.g. when several simultaneous AJAX request has been sent to Kibana, but access token has expired
            // already, so the first request that reaches Kibana uses refresh token to get a new access token, but the
            // second concurrent request has no idea about that and tries to refresh access token as well. All ends well
            // when first request refreshes access token and updates session cookie with fresh access/refresh token pair.
            // But if user navigates to another page _before_ AJAX request (the one that triggered token refresh) responds
            // with updated cookie, then user will have only that old cookie with expired access token and refresh token
            // that has been used already.
            //
            // When user has neither valid access nor refresh token, the only way to resolve this issue is to get new
            // SAML LoginResponse and exchange it for a new access/refresh token pair. To do that we initiate a new SAML
            // handshake. Obviously we can't do that for AJAX requests, so we just reply with `400` and clear error message.
            // There are two reasons for `400` and not `401`: Elasticsearch search responds with `400` so it seems logical
            // to do the same on Kibana side and `401` would force user to logout and do full SLO if it's supported.
            if (errors_1.getErrorStatusCode(err) === 400) {
                if (can_redirect_request_1.canRedirectRequest(request)) {
                    this.debug('Both access and refresh tokens are expired. Re-initiating SAML handshake.');
                    return this.authenticateViaHandshake(request);
                }
                return authentication_result_1.AuthenticationResult.failed(boom_1.default.badRequest('Both access and refresh tokens are expired.'));
            }
            return authentication_result_1.AuthenticationResult.failed(err);
        }
    }
    /**
     * Tries to start SAML handshake and eventually receive a token.
     * @param request Request instance.
     */
    async authenticateViaHandshake(request) {
        this.debug('Trying to initiate SAML handshake.');
        // If client can't handle redirect response, we shouldn't initiate SAML handshake.
        if (!can_redirect_request_1.canRedirectRequest(request)) {
            this.debug('SAML handshake can not be initiated by AJAX requests.');
            return authentication_result_1.AuthenticationResult.notHandled();
        }
        try {
            // This operation should be performed on behalf of the user with a privilege that normal
            // user usually doesn't have `cluster:admin/xpack/security/saml/prepare`.
            const { id: requestId, redirect } = await this.options.client.callWithInternalUser('shield.samlPrepare', { body: { acs: this.getACS() } });
            this.debug('Redirecting to Identity Provider with SAML request.');
            return authentication_result_1.AuthenticationResult.redirectTo(redirect, 
            // Store request id in the state so that we can reuse it once we receive `SAMLResponse`.
            { requestId, nextURL: `${request.getBasePath()}${request.url.path}` });
        }
        catch (err) {
            this.debug(`Failed to initiate SAML handshake: ${err.message}`);
            return authentication_result_1.AuthenticationResult.failed(err);
        }
    }
    /**
     * Invalidates access and refresh tokens without calling `saml/logout`.
     * @param accessToken Access token to invalidate.
     * @param refreshToken Refresh token to invalidate.
     */
    async performIdPInitiatedLocalLogout(accessToken, refreshToken) {
        this.debug('Local logout has been initiated by the Identity Provider.');
        // First invalidate old access token.
        const { invalidated_tokens: invalidatedAccessTokensCount, } = await this.options.client.callWithInternalUser('shield.deleteAccessToken', {
            body: { token: accessToken },
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
        // Then invalidate old refresh token.
        const { invalidated_tokens: invalidatedRefreshTokensCount, } = await this.options.client.callWithInternalUser('shield.deleteAccessToken', {
            body: { refresh_token: refreshToken },
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
    }
    /**
     * Calls `saml/logout` with access and refresh tokens and redirects user to the Identity Provider if needed.
     * @param accessToken Access token to invalidate.
     * @param refreshToken Refresh token to invalidate.
     */
    async performUserInitiatedSingleLogout(accessToken, refreshToken) {
        this.debug('Single logout has been initiated by the user.');
        // This operation should be performed on behalf of the user with a privilege that normal
        // user usually doesn't have `cluster:admin/xpack/security/saml/logout`.
        const { redirect } = await this.options.client.callWithInternalUser('shield.samlLogout', {
            body: { token: accessToken, refresh_token: refreshToken },
        });
        this.debug('User session has been successfully invalidated.');
        return redirect;
    }
    /**
     * Calls `saml/invalidate` with the `SAMLRequest` query string parameter received from the Identity
     * Provider and redirects user back to the Identity Provider if needed.
     * @param request Request instance.
     */
    async performIdPInitiatedSingleLogout(request) {
        this.debug('Single logout has been initiated by the Identity Provider.');
        // This operation should be performed on behalf of the user with a privilege that normal
        // user usually doesn't have `cluster:admin/xpack/security/saml/invalidate`.
        const { redirect } = await this.options.client.callWithInternalUser('shield.samlInvalidate', {
            // Elasticsearch expects `queryString` without leading `?`, so we should strip it with `slice`.
            body: {
                queryString: request.url.search ? request.url.search.slice(1) : '',
                acs: this.getACS(),
            },
        });
        this.debug('User session has been successfully invalidated.');
        return redirect;
    }
    /**
     * Constructs and returns Kibana's Assertion consumer service URL.
     */
    getACS() {
        return (`${this.options.protocol}://${this.options.hostname}:${this.options.port}` +
            `${this.options.basePath}/api/security/v1/saml`);
    }
    /**
     * Logs message with `debug` level and saml/security related tags.
     * @param message Message to log.
     */
    debug(message) {
        this.options.log(['debug', 'security', 'saml'], message);
    }
}
exports.SAMLAuthenticationProvider = SAMLAuthenticationProvider;
