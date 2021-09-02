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
const ssl_config_1 = require("./ssl_config");
const validBasePathRegex = /(^$|^\/.*[^\/]$)/;
const match = (regex, errorMsg) => (str) => regex.test(str) ? undefined : errorMsg;
exports.config = {
    path: 'server',
    schema: config_schema_1.schema.object({
        autoListen: config_schema_1.schema.boolean({ defaultValue: true }),
        basePath: config_schema_1.schema.maybe(config_schema_1.schema.string({
            validate: match(validBasePathRegex, "must start with a slash, don't end with one"),
        })),
        cors: config_schema_1.schema.conditional(config_schema_1.schema.contextRef('dev'), true, config_schema_1.schema.object({
            origin: config_schema_1.schema.arrayOf(config_schema_1.schema.string()),
        }, {
            defaultValue: {
                origin: ['*://localhost:9876'],
            },
        }), config_schema_1.schema.boolean({ defaultValue: false })),
        host: config_schema_1.schema.string({
            defaultValue: 'localhost',
            hostname: true,
        }),
        maxPayload: config_schema_1.schema.byteSize({
            defaultValue: '1048576b',
        }),
        port: config_schema_1.schema.number({
            defaultValue: 5601,
        }),
        rewriteBasePath: config_schema_1.schema.boolean({ defaultValue: false }),
        ssl: ssl_config_1.sslSchema,
    }, {
        validate: rawConfig => {
            if (!rawConfig.basePath && rawConfig.rewriteBasePath) {
                return 'cannot use [rewriteBasePath] when [basePath] is not specified';
            }
            if (rawConfig.ssl.enabled &&
                rawConfig.ssl.redirectHttpFromPort !== undefined &&
                rawConfig.ssl.redirectHttpFromPort === rawConfig.port) {
                return ('Kibana does not accept http traffic to [port] when ssl is ' +
                    'enabled (only https is allowed), so [ssl.redirectHttpFromPort] ' +
                    `cannot be configured to the same value. Both are [${rawConfig.port}].`);
            }
        },
    }),
};
class HttpConfig {
    /**
     * @internal
     */
    constructor(rawConfig, env) {
        this.autoListen = rawConfig.autoListen;
        this.host = rawConfig.host;
        this.port = rawConfig.port;
        this.cors = rawConfig.cors;
        this.maxPayload = rawConfig.maxPayload;
        this.basePath = rawConfig.basePath;
        this.rewriteBasePath = rawConfig.rewriteBasePath;
        this.publicDir = env.staticFilesDir;
        this.ssl = new ssl_config_1.SslConfig(rawConfig.ssl || {});
    }
}
exports.HttpConfig = HttpConfig;
