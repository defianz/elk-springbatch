"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const get_client_shield_1 = require("../../../../../server/lib/get_client_shield");
const auth_scope_service_1 = require("../auth_scope_service");
const errors_1 = require("../errors");
const providers_1 = require("./providers");
const authentication_result_1 = require("./authentication_result");
const deauthentication_result_1 = require("./deauthentication_result");
const session_1 = require("./session");
const login_attempt_1 = require("./login_attempt");
// Mapping between provider key defined in the config and authentication
// provider class that can handle specific authentication mechanism.
const providerMap = new Map([
    ['basic', providers_1.BasicAuthenticationProvider],
    ['saml', providers_1.SAMLAuthenticationProvider],
    ['token', providers_1.TokenAuthenticationProvider],
    ['oidc', providers_1.OIDCAuthenticationProvider],
]);
function assertRequest(request) {
    if (!request || typeof request !== 'object') {
        throw new Error(`Request should be a valid object, was [${typeof request}].`);
    }
}
/**
 * Prepares options object that is shared among all authentication providers.
 * @param server Server instance.
 */
function getProviderOptions(server) {
    const config = server.config();
    return {
        client: get_client_shield_1.getClient(server),
        log: server.log.bind(server),
        protocol: server.info.protocol,
        hostname: config.get('server.host'),
        port: config.get('server.port'),
        basePath: config.get('server.basePath'),
        ...config.get('xpack.security.public'),
    };
}
/**
 * Prepares options object that is specific only to an authentication provider.
 * @param server Server instance.
 * @param providerType the type of the provider to get the options for.
 */
function getProviderSpecificOptions(server, providerType) {
    const config = server.config();
    // we can't use `config.has` here as it doesn't currently work with Joi's "alternatives" syntax which we
    // are using to make the provider specific configuration required when the auth provider is specified
    const authc = config.get(`xpack.security.authc`);
    if (authc && authc[providerType] !== undefined) {
        return authc[providerType];
    }
    return {};
}
/**
 * Instantiates authentication provider based on the provider key from config.
 * @param providerType Provider type key.
 * @param options Options to pass to provider's constructor.
 */
function instantiateProvider(providerType, options, providerSpecificOptions) {
    const ProviderClassName = providerMap.get(providerType);
    if (!ProviderClassName) {
        throw new Error(`Unsupported authentication provider name: ${providerType}.`);
    }
    return new ProviderClassName(options, providerSpecificOptions);
}
/**
 * Authenticator is responsible for authentication of the request using chain of
 * authentication providers. The chain is essentially a prioritized list of configured
 * providers (typically of various types). The order of the list determines the order in
 * which the providers will be consulted. During the authentication process, Authenticator
 * will try to authenticate the request via one provider at a time. Once one of the
 * providers successfully authenticates the request, the authentication is considered
 * to be successful and the authenticated user will be associated with the request.
 * If provider cannot authenticate the request, the next in line provider in the chain
 * will be used. If all providers in the chain could not authenticate the request,
 * the authentication is then considered to be unsuccessful and an authentication error
 * will be returned.
 */
class Authenticator {
    /**
     * Instantiates Authenticator and bootstrap configured providers.
     * @param server Server instance.
     * @param authScope AuthScopeService instance.
     * @param session Session instance.
     */
    constructor(server, authScope, session) {
        this.server = server;
        this.authScope = authScope;
        this.session = session;
        const config = this.server.config();
        const authProviders = config.get('xpack.security.authProviders');
        if (authProviders.length === 0) {
            throw new Error('No authentication provider is configured. Verify `xpack.security.authProviders` config value.');
        }
        const providerOptions = Object.freeze(getProviderOptions(server));
        this.providers = new Map(authProviders.map(providerType => {
            const providerSpecificOptions = getProviderSpecificOptions(server, providerType);
            return [
                providerType,
                instantiateProvider(providerType, providerOptions, providerSpecificOptions),
            ];
        }));
    }
    /**
     * Performs request authentication using configured chain of authentication providers.
     * @param request Request instance.
     */
    async authenticate(request) {
        assertRequest(request);
        const isSystemApiRequest = this.server.plugins.kibana.systemApi.isSystemApiRequest(request);
        const existingSession = await this.getSessionValue(request);
        let authenticationResult;
        for (const [providerType, provider] of this.providerIterator(existingSession)) {
            // Check if current session has been set by this provider.
            const ownsSession = existingSession && existingSession.provider === providerType;
            authenticationResult = await provider.authenticate(request, ownsSession ? existingSession.state : null);
            if (ownsSession || authenticationResult.shouldUpdateState()) {
                // If authentication succeeds or requires redirect we should automatically extend existing user session,
                // unless authentication has been triggered by a system API request. In case provider explicitly returns new
                // state we should store it in the session regardless of whether it's a system API request or not.
                const sessionCanBeUpdated = (authenticationResult.succeeded() || authenticationResult.redirected()) &&
                    (authenticationResult.shouldUpdateState() || !isSystemApiRequest);
                // If provider owned the session, but failed to authenticate anyway, that likely means that
                // session is not valid and we should clear it. Also provider can specifically ask to clear
                // session by setting it to `null` even if authentication attempt didn't fail.
                if (authenticationResult.shouldClearState() ||
                    (authenticationResult.failed() && errors_1.getErrorStatusCode(authenticationResult.error) === 401)) {
                    await this.session.clear(request);
                }
                else if (sessionCanBeUpdated) {
                    await this.session.set(request, authenticationResult.shouldUpdateState()
                        ? { state: authenticationResult.state, provider: providerType }
                        : existingSession);
                }
            }
            if (authenticationResult.failed()) {
                return authenticationResult;
            }
            if (authenticationResult.succeeded()) {
                return authentication_result_1.AuthenticationResult.succeeded({
                    ...authenticationResult.user,
                    // Complement user returned from the provider with scopes.
                    scope: await this.authScope.getForRequestAndUser(request, authenticationResult.user),
                });
            }
            else if (authenticationResult.redirected()) {
                return authenticationResult;
            }
        }
        return authenticationResult;
    }
    /**
     * Deauthenticates current request.
     * @param request Request instance.
     */
    async deauthenticate(request) {
        assertRequest(request);
        const sessionValue = await this.getSessionValue(request);
        if (sessionValue) {
            await this.session.clear(request);
            return this.providers.get(sessionValue.provider).deauthenticate(request, sessionValue.state);
        }
        // Normally when there is no active session in Kibana, `deauthenticate` method shouldn't do anything
        // and user will eventually be redirected to the home page to log in. But if SAML is supported there
        // is a special case when logout is initiated by the IdP or another SP, then IdP will request _every_
        // SP associated with the current user session to do the logout. So if Kibana (without active session)
        // receives such a request it shouldn't redirect user to the home page, but rather redirect back to IdP
        // with correct logout response and only Elasticsearch knows how to do that.
        if (request.query.SAMLRequest && this.providers.has('saml')) {
            return this.providers.get('saml').deauthenticate(request);
        }
        return deauthentication_result_1.DeauthenticationResult.notHandled();
    }
    /**
     * Returns provider iterator where providers are sorted in the order of priority (based on the session ownership).
     * @param sessionValue Current session value.
     */
    *providerIterator(sessionValue) {
        // If there is no session to predict which provider to use first, let's use the order
        // providers are configured in. Otherwise return provider that owns session first, and only then the rest
        // of providers.
        if (!sessionValue) {
            yield* this.providers;
        }
        else {
            yield [sessionValue.provider, this.providers.get(sessionValue.provider)];
            for (const [providerType, provider] of this.providers) {
                if (providerType !== sessionValue.provider) {
                    yield [providerType, provider];
                }
            }
        }
    }
    /**
     * Extracts session value for the specified request. Under the hood it can
     * clear session if it belongs to the provider that is not available.
     * @param request Request to extract session value for.
     */
    async getSessionValue(request) {
        let sessionValue = await this.session.get(request);
        // If for some reason we have a session stored for the provider that is not available
        // (e.g. when user was logged in with one provider, but then configuration has changed
        // and that provider is no longer available), then we should clear session entirely.
        if (sessionValue && !this.providers.has(sessionValue.provider)) {
            await this.session.clear(request);
            sessionValue = null;
        }
        return sessionValue;
    }
}
async function initAuthenticator(server) {
    const session = await session_1.Session.create(server);
    const authScope = new auth_scope_service_1.AuthScopeService();
    const authenticator = new Authenticator(server, authScope, session);
    const loginAttempts = new WeakMap();
    server.decorate('request', 'loginAttempt', function () {
        const request = this;
        if (!loginAttempts.has(request)) {
            loginAttempts.set(request, new login_attempt_1.LoginAttempt());
        }
        return loginAttempts.get(request);
    });
    server.expose('authenticate', (request) => authenticator.authenticate(request));
    server.expose('deauthenticate', (request) => authenticator.deauthenticate(request));
    server.expose('registerAuthScopeGetter', (scopeExtender) => authScope.registerGetter(scopeExtender));
    server.expose('isAuthenticated', async (request) => {
        try {
            await server.plugins.security.getUser(request);
            return true;
        }
        catch (err) {
            // Don't swallow server errors.
            if (!err.isBoom || err.output.statusCode !== 401) {
                throw err;
            }
        }
        return false;
    });
}
exports.initAuthenticator = initAuthenticator;
