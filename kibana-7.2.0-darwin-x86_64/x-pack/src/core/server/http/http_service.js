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
const operators_1 = require("rxjs/operators");
const http_config_1 = require("./http_config");
const http_server_1 = require("./http_server");
const https_redirect_server_1 = require("./https_redirect_server");
/** @internal */
class HttpService {
    constructor(coreContext) {
        this.coreContext = coreContext;
        this.log = coreContext.logger.get('http');
        this.config$ = coreContext.configService
            .atPath('server')
            .pipe(operators_1.map(rawConfig => new http_config_1.HttpConfig(rawConfig, coreContext.env)));
        this.httpServer = new http_server_1.HttpServer(coreContext.logger.get('http', 'server'));
        this.httpsRedirectServer = new https_redirect_server_1.HttpsRedirectServer(coreContext.logger.get('http', 'redirect', 'server'));
    }
    async setup() {
        this.configSubscription = this.config$.subscribe(() => {
            if (this.httpServer.isListening()) {
                // If the server is already running we can't make any config changes
                // to it, so we warn and don't allow the config to pass through.
                this.log.warn('Received new HTTP config after server was started. ' + 'Config will **not** be applied.');
            }
        });
        const config = await this.config$.pipe(operators_1.first()).toPromise();
        return this.httpServer.setup(config);
    }
    async start() {
        const config = await this.config$.pipe(operators_1.first()).toPromise();
        // We shouldn't set up http service in two cases:`
        // 1. If `server.autoListen` is explicitly set to `false`.
        // 2. When the process is run as dev cluster master in which case cluster manager
        // will fork a dedicated process where http service will be set up instead.
        if (!this.coreContext.env.isDevClusterMaster && config.autoListen) {
            // If a redirect port is specified, we start an HTTP server at this port and
            // redirect all requests to the SSL port.
            if (config.ssl.enabled && config.ssl.redirectHttpFromPort !== undefined) {
                await this.httpsRedirectServer.start(config);
            }
            await this.httpServer.start(config);
        }
        return {
            isListening: () => this.httpServer.isListening(),
        };
    }
    async stop() {
        if (this.configSubscription === undefined) {
            return;
        }
        this.configSubscription.unsubscribe();
        this.configSubscription = undefined;
        await this.httpServer.stop();
        await this.httpsRedirectServer.stop();
    }
}
exports.HttpService = HttpService;
