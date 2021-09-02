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
const lodash_1 = require("lodash");
const url_1 = require("url");
const http_fetch_error_1 = require("./http_fetch_error");
const JSON_CONTENT = /^(application\/(json|x-javascript)|text\/(x-)?javascript|x-json)(;.*)?$/;
const NDJSON_CONTENT = /^(application\/ndjson)(;.*)?$/;
exports.setup = ({ basePath, injectedMetadata }) => {
    async function fetch(path, options = {}) {
        const { query, prependBasePath, ...fetchOptions } = lodash_1.merge({
            method: 'GET',
            credentials: 'same-origin',
            prependBasePath: true,
            headers: {
                'kbn-version': injectedMetadata.getKibanaVersion(),
                'Content-Type': 'application/json',
            },
        }, options);
        const url = url_1.format({
            pathname: prependBasePath ? basePath.addToPath(path) : path,
            query,
        });
        if (options.headers &&
            'Content-Type' in options.headers &&
            options.headers['Content-Type'] === undefined) {
            delete fetchOptions.headers['Content-Type'];
        }
        let response;
        let body = null;
        try {
            response = await window.fetch(url, fetchOptions);
        }
        catch (err) {
            throw new http_fetch_error_1.HttpFetchError(err.message);
        }
        const contentType = response.headers.get('Content-Type') || '';
        try {
            if (NDJSON_CONTENT.test(contentType)) {
                body = await response.blob();
            }
            else if (JSON_CONTENT.test(contentType)) {
                body = await response.json();
            }
            else {
                body = await response.text();
            }
        }
        catch (err) {
            throw new http_fetch_error_1.HttpFetchError(err.message, response, body);
        }
        if (!response.ok) {
            throw new http_fetch_error_1.HttpFetchError(response.statusText, response, body);
        }
        return body;
    }
    function shorthand(method) {
        return (path, options = {}) => fetch(path, { ...options, method });
    }
    return { fetch, shorthand };
};
