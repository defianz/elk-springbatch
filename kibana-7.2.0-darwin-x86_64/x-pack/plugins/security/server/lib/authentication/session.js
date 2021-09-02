"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const hapi_auth_cookie_1 = tslib_1.__importDefault(require("hapi-auth-cookie"));
const HAPI_STRATEGY_NAME = 'security-cookie';
// Forbid applying of Hapi authentication strategies to routes automatically.
const HAPI_STRATEGY_MODE = false;
function assertRequest(request) {
    if (!request || typeof request !== 'object') {
        throw new Error(`Request should be a valid object, was [${typeof request}].`);
    }
}
/**
 * Manages Kibana user session.
 */
class Session {
    /**
     * Instantiates Session. Constructor is not supposed to be used directly. To make sure that all
     * `Session` dependencies/plugins are properly initialized one should use static `Session.create` instead.
     * @param server Server instance.
     */
    constructor(server) {
        this.server = server;
        /**
         * Session duration in ms. If `null` session will stay active until the browser is closed.
         */
        this.ttl = null;
        this.ttl = this.server.config().get('xpack.security.sessionTimeout');
    }
    /**
     * Retrieves session value from the session storage (e.g. cookie).
     * @param request Request instance.
     */
    async get(request) {
        assertRequest(request);
        try {
            const session = await this.server.auth.test(HAPI_STRATEGY_NAME, request);
            // If it's not an array, just return the session value
            if (!Array.isArray(session)) {
                return session.value;
            }
            // If we have an array with one value, we're good also
            if (session.length === 1) {
                return session[0].value;
            }
            // Otherwise, we have more than one and won't be authing the user because we don't
            // know which session identifies the actual user. There's potential to change this behavior
            // to ensure all valid sessions identify the same user, or choose one valid one, but this
            // is the safest option.
            const warning = `Found ${session.length} auth sessions when we were only expecting 1.`;
            this.server.log(['warning', 'security', 'auth', 'session'], warning);
            return null;
        }
        catch (err) {
            this.server.log(['debug', 'security', 'auth', 'session'], err);
            return null;
        }
    }
    /**
     * Puts current session value into the session storage.
     * @param request Request instance.
     * @param value Any object that will be associated with the request.
     */
    async set(request, value) {
        assertRequest(request);
        request.cookieAuth.set({
            value,
            expires: this.ttl && Date.now() + this.ttl,
        });
    }
    /**
     * Clears current session.
     * @param request Request instance.
     */
    async clear(request) {
        assertRequest(request);
        request.cookieAuth.clear();
    }
    /**
     * Prepares and creates a session instance.
     * @param server Server instance.
     */
    static async create(server) {
        // Register HAPI plugin that manages session cookie and delegate parsing of the session cookie to it.
        await server.register({
            plugin: hapi_auth_cookie_1.default,
        });
        const config = server.config();
        const httpOnly = true;
        const name = config.get('xpack.security.cookieName');
        const password = config.get('xpack.security.encryptionKey');
        const path = `${config.get('server.basePath')}/`;
        const secure = config.get('xpack.security.secureCookies');
        server.auth.strategy(HAPI_STRATEGY_NAME, 'cookie', {
            cookie: name,
            password,
            clearInvalid: true,
            validateFunc: Session.validateCookie,
            isHttpOnly: httpOnly,
            isSecure: secure,
            isSameSite: false,
            path,
        });
        if (HAPI_STRATEGY_MODE) {
            server.auth.default({
                strategy: HAPI_STRATEGY_NAME,
                mode: 'required',
            });
        }
        return new Session(server);
    }
    /**
     * Validation function that is passed to hapi-auth-cookie plugin and is responsible
     * only for cookie expiration time validation.
     * @param request Request instance.
     * @param session Session value object retrieved from cookie.
     */
    static validateCookie(request, session) {
        if (session.expires && session.expires < Date.now()) {
            return { valid: false };
        }
        return { valid: true };
    }
}
exports.Session = Session;
