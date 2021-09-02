"use strict";
/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const hapi_auth_cookie_1 = tslib_1.__importDefault(require("hapi-auth-cookie"));
class ScopedCookieSessionStorage {
    constructor(server, request) {
        this.server = server;
        this.request = request;
    }
    async get() {
        try {
            return await this.server.auth.test('security-cookie', this.request);
        }
        catch (error) {
            return null;
        }
    }
    set(sessionValue) {
        return this.request.cookieAuth.set(sessionValue);
    }
    clear() {
        return this.request.cookieAuth.clear();
    }
}
/**
 * Creates SessionStorage factory, which abstract the way of
 * session storage implementation and scoping to the incoming requests.
 *
 * @param server - hapi server to create SessionStorage for
 * @param cookieOptions - cookies configuration
 */
async function createCookieSessionStorageFactory(server, cookieOptions, basePath) {
    await server.register({ plugin: hapi_auth_cookie_1.default });
    server.auth.strategy('security-cookie', 'cookie', {
        cookie: cookieOptions.name,
        password: cookieOptions.encryptionKey,
        validateFunc: async (req, session) => ({ valid: await cookieOptions.validate(session) }),
        isSecure: cookieOptions.isSecure,
        path: basePath,
        clearInvalid: true,
        isHttpOnly: true,
        isSameSite: false,
    });
    return {
        asScoped(request) {
            return new ScopedCookieSessionStorage(server, request);
        },
    };
}
exports.createCookieSessionStorageFactory = createCookieSessionStorageFactory;
