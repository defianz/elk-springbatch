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
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const dev_1 = require("../dev");
const http_1 = require("../http");
const legacy_platform_proxy_1 = require("./legacy_platform_proxy");
function getLegacyRawConfig(config) {
    const rawConfig = config.toRaw();
    // Elasticsearch config is solely handled by the core and legacy platform
    // shouldn't have direct access to it.
    if (rawConfig.elasticsearch !== undefined) {
        delete rawConfig.elasticsearch;
    }
    return rawConfig;
}
/** @internal */
class LegacyService {
    constructor(coreContext) {
        this.coreContext = coreContext;
        this.log = coreContext.logger.get('legacy-service');
        this.devConfig$ = coreContext.configService
            .atPath('dev')
            .pipe(operators_1.map(rawConfig => new dev_1.DevConfig(rawConfig)));
        this.httpConfig$ = coreContext.configService
            .atPath('server')
            .pipe(operators_1.map(rawConfig => new http_1.HttpConfig(rawConfig, coreContext.env)));
    }
    async setup(setupDeps) {
        this.setupDeps = setupDeps;
    }
    async start(startDeps) {
        const { setupDeps } = this;
        if (!setupDeps) {
            throw new Error('Legacy service is not setup yet.');
        }
        this.log.debug('starting legacy service');
        const update$ = this.coreContext.configService.getConfig$().pipe(operators_1.tap(config => {
            if (this.kbnServer !== undefined) {
                this.kbnServer.applyLoggingConfiguration(config.toRaw());
            }
        }), operators_1.tap({ error: err => this.log.error(err) }), operators_1.publishReplay(1));
        this.configSubscription = update$.connect();
        // Receive initial config and create kbnServer/ClusterManager.
        this.kbnServer = await update$
            .pipe(operators_1.first(), operators_1.mergeMap(async (config) => {
            if (this.coreContext.env.isDevClusterMaster) {
                await this.createClusterManager(config);
                return;
            }
            return await this.createKbnServer(config, setupDeps, startDeps);
        }))
            .toPromise();
    }
    async stop() {
        this.log.debug('stopping legacy service');
        if (this.configSubscription !== undefined) {
            this.configSubscription.unsubscribe();
            this.configSubscription = undefined;
        }
        if (this.kbnServer !== undefined) {
            await this.kbnServer.close();
            this.kbnServer = undefined;
        }
    }
    async createClusterManager(config) {
        const basePathProxy$ = this.coreContext.env.cliArgs.basePath
            ? rxjs_1.combineLatest(this.devConfig$, this.httpConfig$).pipe(operators_1.first(), operators_1.map(([devConfig, httpConfig]) => new http_1.BasePathProxyServer(this.coreContext.logger.get('server'), httpConfig, devConfig)))
            : rxjs_1.EMPTY;
        require('../../../cli/cluster/cluster_manager').create(this.coreContext.env.cliArgs, getLegacyRawConfig(config), await basePathProxy$.toPromise());
    }
    async createKbnServer(config, setupDeps, startDeps) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const KbnServer = require('../../../legacy/server/kbn_server');
        const kbnServer = new KbnServer(getLegacyRawConfig(config), {
            // If core HTTP service is run we'll receive internal server reference and
            // options that were used to create that server so that we can properly
            // bridge with the "legacy" Kibana. If server isn't run (e.g. if process is
            // managed by ClusterManager or optimizer) then we won't have that info,
            // so we can't start "legacy" server either.
            serverOptions: startDeps.http.isListening()
                ? {
                    ...setupDeps.http.options,
                    listener: this.setupProxyListener(setupDeps.http.server),
                }
                : { autoListen: false },
            handledConfigPaths: await this.coreContext.configService.getUsedPaths(),
            setupDeps,
            startDeps,
            logger: this.coreContext.logger,
        });
        // The kbnWorkerType check is necessary to prevent the repl
        // from being started multiple times in different processes.
        // We only want one REPL.
        if (this.coreContext.env.cliArgs.repl && process.env.kbnWorkerType === 'server') {
            require('../../../cli/repl').startRepl(kbnServer);
        }
        const httpConfig = await this.httpConfig$.pipe(operators_1.first()).toPromise();
        if (httpConfig.autoListen) {
            try {
                await kbnServer.listen();
            }
            catch (err) {
                await kbnServer.close();
                throw err;
            }
        }
        else {
            await kbnServer.ready();
        }
        return kbnServer;
    }
    setupProxyListener(server) {
        const legacyProxy = new legacy_platform_proxy_1.LegacyPlatformProxy(this.coreContext.logger.get('legacy-proxy'), server.listener);
        // We register Kibana proxy middleware right before we start server to allow
        // all new platform plugins register their routes, so that `legacyProxy`
        // handles only requests that aren't handled by the new platform.
        server.route({
            path: '/{p*}',
            method: '*',
            options: {
                payload: {
                    output: 'stream',
                    parse: false,
                    timeout: false,
                    // Having such a large value here will allow legacy routes to override
                    // maximum allowed payload size set in the core http server if needed.
                    maxBytes: Number.MAX_SAFE_INTEGER,
                },
            },
            handler: async ({ raw: { req, res } }, responseToolkit) => {
                if (this.kbnServer === undefined) {
                    this.log.debug(`Kibana server is not ready yet ${req.method}:${req.url}.`);
                    // If legacy server is not ready yet (e.g. it's still in optimization phase),
                    // we should let client know that and ask to retry after 30 seconds.
                    return responseToolkit
                        .response('Kibana server is not ready yet')
                        .code(503)
                        .header('Retry-After', '30');
                }
                this.log.trace(`Request will be handled by proxy ${req.method}:${req.url}.`);
                // Forward request and response objects to the legacy platform. This method
                // is used whenever new platform doesn't know how to handle the request.
                legacyProxy.emit('request', req, res);
                return responseToolkit.abandon;
            },
        });
        return legacyProxy;
    }
}
exports.LegacyService = LegacyService;
