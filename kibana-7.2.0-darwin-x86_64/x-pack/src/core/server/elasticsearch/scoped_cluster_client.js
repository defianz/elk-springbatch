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
/**
 * Serves the same purpose as "normal" `ClusterClient` but exposes additional
 * `callAsCurrentUser` method that doesn't use credentials of the Kibana internal
 * user (as `callAsInternalUser` does) to request Elasticsearch API, but rather
 * passes HTTP headers extracted from the current user request to the API
 *
 * @public
 */
class ScopedClusterClient {
    constructor(internalAPICaller, scopedAPICaller, headers) {
        this.internalAPICaller = internalAPICaller;
        this.scopedAPICaller = scopedAPICaller;
        this.headers = headers;
    }
    /**
     * Calls specified `endpoint` with provided `clientParams` on behalf of the
     * Kibana internal user.
     * @param endpoint - String descriptor of the endpoint e.g. `cluster.getSettings` or `ping`.
     * @param clientParams - A dictionary of parameters that will be passed directly to the Elasticsearch JS client.
     * @param options - Options that affect the way we call the API and process the result.
     */
    callAsInternalUser(endpoint, clientParams = {}, options) {
        return this.internalAPICaller(endpoint, clientParams, options);
    }
    /**
     * Calls specified `endpoint` with provided `clientParams` on behalf of the
     * user initiated request to the Kibana server (via HTTP request headers).
     * @param endpoint - String descriptor of the endpoint e.g. `cluster.getSettings` or `ping`.
     * @param clientParams - A dictionary of parameters that will be passed directly to the Elasticsearch JS client.
     * @param options - Options that affect the way we call the API and process the result.
     */
    callAsCurrentUser(endpoint, clientParams = {}, options) {
        if (this.headers !== undefined) {
            clientParams.headers = this.headers;
        }
        return this.scopedAPICaller(endpoint, clientParams, options);
    }
}
exports.ScopedClusterClient = ScopedClusterClient;
