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
const utils_1 = require("../../utils");
const http_tools_1 = require("./http_tools");
const auth_1 = require("./lifecycle/auth");
const on_request_1 = require("./lifecycle/on_request");
const router_1 = require("./router");
const cookie_session_storage_1 = require("./cookie_session_storage");
class HttpServer {
    constructor(log) {
        this.log = log;
        this.registeredRouters = new Set();
        this.authRegistered = false;
        this.basePathCache = new WeakMap();
    }
    isListening() {
        return this.server !== undefined && this.server.listener.listening;
    }
    registerRouter(router) {
        if (this.isListening()) {
            throw new Error('Routers can be registered only when HTTP server is stopped.');
        }
        this.log.debug(`registering route handler for [${router.path}]`);
        this.registeredRouters.add(router);
    }
    // passing hapi Request works for BWC. can be deleted once we remove legacy server.
    getBasePathFor(config, request) {
        const incomingMessage = request instanceof router_1.KibanaRequest ? request.unstable_getIncomingMessage() : request.raw.req;
        const requestScopePath = this.basePathCache.get(incomingMessage) || '';
        const serverBasePath = config.basePath || '';
        return `${serverBasePath}${requestScopePath}`;
    }
    // should work only for KibanaRequest as soon as spaces migrate to NP
    setBasePathFor(request, basePath) {
        const incomingMessage = request instanceof router_1.KibanaRequest ? request.unstable_getIncomingMessage() : request.raw.req;
        if (this.basePathCache.has(incomingMessage)) {
            throw new Error('Request basePath was previously set. Setting multiple times is not supported.');
        }
        this.basePathCache.set(incomingMessage, basePath);
    }
    setup(config) {
        const serverOptions = http_tools_1.getServerOptions(config);
        this.server = http_tools_1.createServer(serverOptions);
        return {
            options: serverOptions,
            registerRouter: this.registerRouter.bind(this),
            registerOnRequest: this.registerOnRequest.bind(this),
            registerAuth: (fn, cookieOptions) => this.registerAuth(fn, cookieOptions, config.basePath),
            getBasePathFor: this.getBasePathFor.bind(this, config),
            setBasePathFor: this.setBasePathFor.bind(this),
            // Return server instance with the connection options so that we can properly
            // bridge core and the "legacy" Kibana internally. Once this bridge isn't
            // needed anymore we shouldn't return the instance from this method.
            server: this.server,
        };
    }
    async start(config) {
        if (this.server === undefined) {
            throw new Error('Http server is not setup up yet');
        }
        this.log.debug('starting http server');
        this.setupBasePathRewrite(this.server, config);
        for (const router of this.registeredRouters) {
            for (const route of router.getRoutes()) {
                this.server.route({
                    handler: route.handler,
                    method: route.method,
                    path: this.getRouteFullPath(router.path, route.path),
                });
            }
        }
        await this.server.start();
        this.log.debug(`http server running at ${this.server.info.uri}${config.rewriteBasePath ? config.basePath : ''}`);
    }
    async stop() {
        if (this.server === undefined) {
            return;
        }
        this.log.debug('stopping http server');
        await this.server.stop();
        this.server = undefined;
    }
    setupBasePathRewrite(server, config) {
        if (config.basePath === undefined || !config.rewriteBasePath) {
            return;
        }
        const basePath = config.basePath;
        server.ext('onRequest', (request, responseToolkit) => {
            const newURL = utils_1.modifyUrl(request.url.href, urlParts => {
                if (urlParts.pathname != null && urlParts.pathname.startsWith(basePath)) {
                    urlParts.pathname = urlParts.pathname.replace(basePath, '') || '/';
                }
                else {
                    return {};
                }
            });
            if (!newURL) {
                return responseToolkit
                    .response('Not Found')
                    .code(404)
                    .takeover();
            }
            request.setUrl(newURL);
            // We should update raw request as well since it can be proxied to the old platform
            // where base path isn't expected.
            request.raw.req.url = request.url.href;
            return responseToolkit.continue;
        });
    }
    getRouteFullPath(routerPath, routePath) {
        // If router's path ends with slash and route's path starts with slash,
        // we should omit one of them to have a valid concatenated path.
        const routePathStartIndex = routerPath.endsWith('/') && routePath.startsWith('/') ? 1 : 0;
        return `${routerPath}${routePath.slice(routePathStartIndex)}`;
    }
    registerOnRequest(fn) {
        if (this.server === undefined) {
            throw new Error('Server is not created yet');
        }
        this.server.ext('onRequest', on_request_1.adoptToHapiOnRequestFormat(fn));
    }
    async registerAuth(fn, cookieOptions, basePath) {
        if (this.server === undefined) {
            throw new Error('Server is not created yet');
        }
        if (this.authRegistered) {
            throw new Error('Auth interceptor was already registered');
        }
        this.authRegistered = true;
        const sessionStorage = await cookie_session_storage_1.createCookieSessionStorageFactory(this.server, cookieOptions, basePath);
        this.server.auth.scheme('login', () => ({
            authenticate: auth_1.adoptToHapiAuthFormat(fn, sessionStorage),
        }));
        this.server.auth.strategy('session', 'login');
        // The default means that the `session` strategy that is based on `login` schema defined above will be
        // automatically assigned to all routes that don't contain an auth config.
        // should be applied for all routes if they don't specify auth strategy in route declaration
        // https://github.com/hapijs/hapi/blob/master/API.md#-serverauthdefaultoptions
        this.server.auth.default('session');
    }
}
exports.HttpServer = HttpServer;
