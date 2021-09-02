"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
const boom_1 = tslib_1.__importDefault(require("boom"));
var ResultType;
(function (ResultType) {
    ResultType["authenticated"] = "authenticated";
    ResultType["redirected"] = "redirected";
    ResultType["rejected"] = "rejected";
})(ResultType || (ResultType = {}));
/** @internal */
class AuthResult {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    static authenticated(credentials) {
        return new AuthResult(ResultType.authenticated, credentials);
    }
    static redirected(url) {
        return new AuthResult(ResultType.redirected, url);
    }
    static rejected(error, options = {}) {
        return new AuthResult(ResultType.rejected, { error, statusCode: options.statusCode });
    }
    static isValidResult(candidate) {
        return candidate instanceof AuthResult;
    }
    isAuthenticated() {
        return this.type === ResultType.authenticated;
    }
    isRedirected() {
        return this.type === ResultType.redirected;
    }
    isRejected() {
        return this.type === ResultType.rejected;
    }
}
const toolkit = {
    authenticated: AuthResult.authenticated,
    redirected: AuthResult.redirected,
    rejected: AuthResult.rejected,
};
/** @public */
function adoptToHapiAuthFormat(fn, sessionStorage) {
    return async function interceptAuth(req, h) {
        try {
            const result = await fn(req, sessionStorage.asScoped(req), toolkit);
            if (AuthResult.isValidResult(result)) {
                if (result.isAuthenticated()) {
                    return h.authenticated({ credentials: result.payload });
                }
                if (result.isRedirected()) {
                    return h.redirect(result.payload).takeover();
                }
                if (result.isRejected()) {
                    const { error, statusCode } = result.payload;
                    return boom_1.default.boomify(error, { statusCode });
                }
            }
            throw new Error(`Unexpected result from Authenticate. Expected AuthResult, but given: ${result}.`);
        }
        catch (error) {
            return boom_1.default.internal(error.message, { statusCode: 500 });
        }
    };
}
exports.adoptToHapiAuthFormat = adoptToHapiAuthFormat;
