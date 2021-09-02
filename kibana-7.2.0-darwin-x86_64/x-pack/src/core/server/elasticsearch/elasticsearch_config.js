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
const config_schema_1 = require("@kbn/config-schema");
const hostURISchema = config_schema_1.schema.uri({ scheme: ['http', 'https'] });
exports.DEFAULT_API_VERSION = '7.x';
exports.config = {
    path: 'elasticsearch',
    schema: config_schema_1.schema.object({
        sniffOnStart: config_schema_1.schema.boolean({ defaultValue: false }),
        sniffInterval: config_schema_1.schema.oneOf([config_schema_1.schema.duration(), config_schema_1.schema.literal(false)], {
            defaultValue: false,
        }),
        sniffOnConnectionFault: config_schema_1.schema.boolean({ defaultValue: false }),
        hosts: config_schema_1.schema.oneOf([hostURISchema, config_schema_1.schema.arrayOf(hostURISchema, { minSize: 1 })], {
            defaultValue: 'http://localhost:9200',
        }),
        preserveHost: config_schema_1.schema.boolean({ defaultValue: true }),
        username: config_schema_1.schema.maybe(config_schema_1.schema.string()),
        password: config_schema_1.schema.maybe(config_schema_1.schema.string()),
        requestHeadersWhitelist: config_schema_1.schema.oneOf([config_schema_1.schema.string(), config_schema_1.schema.arrayOf(config_schema_1.schema.string())], {
            defaultValue: ['authorization'],
        }),
        customHeaders: config_schema_1.schema.recordOf(config_schema_1.schema.string(), config_schema_1.schema.string(), { defaultValue: {} }),
        shardTimeout: config_schema_1.schema.duration({ defaultValue: '30s' }),
        requestTimeout: config_schema_1.schema.duration({ defaultValue: '30s' }),
        pingTimeout: config_schema_1.schema.duration({ defaultValue: config_schema_1.schema.siblingRef('requestTimeout') }),
        startupTimeout: config_schema_1.schema.duration({ defaultValue: '5s' }),
        logQueries: config_schema_1.schema.boolean({ defaultValue: false }),
        ssl: config_schema_1.schema.object({
            verificationMode: config_schema_1.schema.oneOf([config_schema_1.schema.literal('none'), config_schema_1.schema.literal('certificate'), config_schema_1.schema.literal('full')], { defaultValue: 'full' }),
            certificateAuthorities: config_schema_1.schema.maybe(config_schema_1.schema.oneOf([config_schema_1.schema.string(), config_schema_1.schema.arrayOf(config_schema_1.schema.string(), { minSize: 1 })])),
            certificate: config_schema_1.schema.maybe(config_schema_1.schema.string()),
            key: config_schema_1.schema.maybe(config_schema_1.schema.string()),
            keyPassphrase: config_schema_1.schema.maybe(config_schema_1.schema.string()),
            alwaysPresentCertificate: config_schema_1.schema.boolean({ defaultValue: true }),
        }),
        apiVersion: config_schema_1.schema.string({ defaultValue: exports.DEFAULT_API_VERSION }),
        healthCheck: config_schema_1.schema.object({ delay: config_schema_1.schema.duration({ defaultValue: 2500 }) }),
    }),
};
class ElasticsearchConfig {
    constructor(rawConfig) {
        this.apiVersion = rawConfig.apiVersion;
        this.logQueries = rawConfig.logQueries;
        this.hosts = Array.isArray(rawConfig.hosts) ? rawConfig.hosts : [rawConfig.hosts];
        this.requestHeadersWhitelist = Array.isArray(rawConfig.requestHeadersWhitelist)
            ? rawConfig.requestHeadersWhitelist
            : [rawConfig.requestHeadersWhitelist];
        this.pingTimeout = rawConfig.pingTimeout;
        this.requestTimeout = rawConfig.requestTimeout;
        this.shardTimeout = rawConfig.shardTimeout;
        this.sniffOnStart = rawConfig.sniffOnStart;
        this.sniffOnConnectionFault = rawConfig.sniffOnConnectionFault;
        this.sniffInterval = rawConfig.sniffInterval;
        this.healthCheckDelay = rawConfig.healthCheck.delay;
        this.username = rawConfig.username;
        this.password = rawConfig.password;
        this.customHeaders = rawConfig.customHeaders;
        const certificateAuthorities = Array.isArray(rawConfig.ssl.certificateAuthorities)
            ? rawConfig.ssl.certificateAuthorities
            : typeof rawConfig.ssl.certificateAuthorities === 'string'
                ? [rawConfig.ssl.certificateAuthorities]
                : undefined;
        this.ssl = {
            ...rawConfig.ssl,
            certificateAuthorities,
        };
    }
}
exports.ElasticsearchConfig = ElasticsearchConfig;
