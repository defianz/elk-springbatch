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
const boom_1 = tslib_1.__importDefault(require("boom"));
const router_1 = require("../router");
var ResultType;
(function (ResultType) {
    ResultType["next"] = "next";
    ResultType["redirected"] = "redirected";
    ResultType["rejected"] = "rejected";
})(ResultType || (ResultType = {}));
/** @internal */
class OnRequestResult {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
    static next() {
        return new OnRequestResult(ResultType.next);
    }
    static redirected(url) {
        return new OnRequestResult(ResultType.redirected, url);
    }
    static rejected(error, options = {}) {
        return new OnRequestResult(ResultType.rejected, { error, statusCode: options.statusCode });
    }
    static isValidResult(candidate) {
        return candidate instanceof OnRequestResult;
    }
    isNext() {
        return this.type === ResultType.next;
    }
    isRedirected() {
        return this.type === ResultType.redirected;
    }
    isRejected() {
        return this.type === ResultType.rejected;
    }
}
/**
 * @public
 * Adopt custom request interceptor to Hapi lifecycle system.
 * @param fn - an extension point allowing to perform custom logic for
 * incoming HTTP requests.
 */
function adoptToHapiOnRequestFormat(fn) {
    return async function interceptRequest(request, h) {
        try {
            const result = await fn(router_1.KibanaRequest.from(request, undefined), {
                next: OnRequestResult.next,
                redirected: OnRequestResult.redirected,
                rejected: OnRequestResult.rejected,
                setUrl: (newUrl) => {
                    request.setUrl(newUrl);
                    // We should update raw request as well since it can be proxied to the old platform
                    request.raw.req.url = typeof newUrl === 'string' ? newUrl : newUrl.href;
                },
            });
            if (OnRequestResult.isValidResult(result)) {
                if (result.isNext()) {
                    return h.continue;
                }
                if (result.isRedirected()) {
                    return h.redirect(result.payload).takeover();
                }
                if (result.isRejected()) {
                    const { error, statusCode } = result.payload;
                    return boom_1.default.boomify(error, { statusCode });
                }
            }
            throw new Error(`Unexpected result from OnRequest. Expected OnRequestResult, but given: ${result}.`);
        }
        catch (error) {
            return boom_1.default.internal(error.message, { statusCode: 500 });
        }
    };
}
exports.adoptToHapiOnRequestFormat = adoptToHapiOnRequestFormat;
