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
const elasticsearch_1 = require("elasticsearch");
const lodash_1 = require("lodash");
const router_1 = require("../http/router");
const elasticsearch_client_config_1 = require("./elasticsearch_client_config");
const scoped_cluster_client_1 = require("./scoped_cluster_client");
/**
 * Calls the Elasticsearch API endpoint with the specified parameters.
 * @param client Raw Elasticsearch JS client instance to use.
 * @param endpoint Name of the API endpoint to call.
 * @param clientParams Parameters that will be directly passed to the
 * Elasticsearch JS client.
 * @param options Options that affect the way we call the API and process the result.
 */
async function callAPI(client, endpoint, clientParams = {}, options = { wrap401Errors: true }) {
    const clientPath = endpoint.split('.');
    const api = lodash_1.get(client, clientPath);
    if (!api) {
        throw new Error(`called with an invalid endpoint: ${endpoint}`);
    }
    const apiContext = clientPath.length === 1 ? client : lodash_1.get(client, clientPath.slice(0, -1));
    try {
        return await api.call(apiContext, clientParams);
    }
    catch (err) {
        if (!options.wrap401Errors || err.statusCode !== 401) {
            throw err;
        }
        const boomError = boom_1.default.boomify(err, { statusCode: err.statusCode });
        const wwwAuthHeader = lodash_1.get(err, 'body.error.header[WWW-Authenticate]');
        boomError.output.headers['WWW-Authenticate'] =
            wwwAuthHeader || 'Basic realm="Authorization Required"';
        throw boomError;
    }
}
/**
 * Represents an Elasticsearch cluster API client and allows to call API on behalf
 * of the internal Kibana user and the actual user that is derived from the request
 * headers (via `asScoped(...)`).
 *
 * @public
 */
class ClusterClient {
    constructor(config, log) {
        this.config = config;
        this.log = log;
        /**
         * Indicates whether this cluster client (and all internal raw Elasticsearch JS clients) has been closed.
         */
        this.isClosed = false;
        /**
         * Calls specified endpoint with provided clientParams on behalf of the
         * Kibana internal user.
         * @param endpoint - String descriptor of the endpoint e.g. `cluster.getSettings` or `ping`.
         * @param clientParams - A dictionary of parameters that will be passed directly to the Elasticsearch JS client.
         * @param options - Options that affect the way we call the API and process the result.
         */
        this.callAsInternalUser = async (endpoint, clientParams = {}, options) => {
            this.assertIsNotClosed();
            return await callAPI(this.client, endpoint, clientParams, options);
        };
        /**
         * Calls specified endpoint with provided clientParams on behalf of the
         * user initiated request to the Kibana server (via HTTP request headers).
         * @param endpoint - String descriptor of the endpoint e.g. `cluster.getSettings` or `ping`.
         * @param clientParams - A dictionary of parameters that will be passed directly to the Elasticsearch JS client.
         * @param options - Options that affect the way we call the API and process the result.
         */
        this.callAsCurrentUser = async (endpoint, clientParams = {}, options) => {
            this.assertIsNotClosed();
            return await callAPI(this.scopedClient, endpoint, clientParams, options);
        };
        this.client = new elasticsearch_1.Client(elasticsearch_client_config_1.parseElasticsearchClientConfig(config, log));
    }
    /**
     * Closes the cluster client. After that client cannot be used and one should
     * create a new client instance to be able to interact with Elasticsearch API.
     */
    close() {
        if (this.isClosed) {
            return;
        }
        this.isClosed = true;
        this.client.close();
        if (this.scopedClient !== undefined) {
            this.scopedClient.close();
        }
    }
    /**
     * Creates an instance of `ScopedClusterClient` based on the configuration the
     * current cluster client that exposes additional `callAsCurrentUser` method
     * scoped to the provided req. Consumers shouldn't worry about closing
     * scoped client instances, these will be automatically closed as soon as the
     * original cluster client isn't needed anymore and closed.
     * @param req - Request the `ScopedClusterClient` instance will be scoped to.
     */
    asScoped(req = {}) {
        // It'd have been quite expensive to create and configure client for every incoming
        // request since it involves parsing of the config, reading of the SSL certificate and
        // key files etc. Moreover scoped client needs two Elasticsearch JS clients at the same
        // time: one to support `callAsInternalUser` and another one for `callAsCurrentUser`.
        // To reduce that overhead we create one scoped client per cluster client and share it
        // between all scoped client instances.
        if (this.scopedClient === undefined) {
            this.scopedClient = new elasticsearch_1.Client(elasticsearch_client_config_1.parseElasticsearchClientConfig(this.config, this.log, {
                auth: false,
                ignoreCertAndKey: !this.config.ssl || !this.config.ssl.alwaysPresentCertificate,
            }));
        }
        const headers = req.headers
            ? router_1.filterHeaders(req.headers, this.config.requestHeadersWhitelist)
            : req.headers;
        return new scoped_cluster_client_1.ScopedClusterClient(this.callAsInternalUser, this.callAsCurrentUser, headers);
    }
    assertIsNotClosed() {
        if (this.isClosed) {
            throw new Error('Cluster client cannot be used after it has been closed.');
        }
    }
}
exports.ClusterClient = ClusterClient;
