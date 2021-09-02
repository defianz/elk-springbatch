"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const proxy_1 = require("./proxy");
const request_expander_1 = require("./request_expander");
class GoLauncher {
    constructor(targetHost, options, loggerFactory) {
        this.targetHost = targetHost;
        this.options = options;
        this.loggerFactory = loggerFactory;
        this.isRunning = false;
    }
    get running() {
        return this.isRunning;
    }
    async launch(builtinWorkspace, maxWorkspace, installationPath) {
        const port = 2091;
        const log = this.loggerFactory.getLogger(['code', `go@${this.targetHost}:${port}`]);
        const proxy = new proxy_1.LanguageServerProxy(port, this.targetHost, log, this.options.lsp);
        log.info('Detach mode, expected langserver launch externally');
        proxy.onConnected(() => {
            this.isRunning = true;
        });
        proxy.onDisconnected(() => {
            this.isRunning = false;
            if (!proxy.isClosed) {
                log.warn('language server disconnected, reconnecting');
                setTimeout(() => proxy.connect(), 1000);
            }
        });
        proxy.listen();
        await proxy.connect();
        return new request_expander_1.RequestExpander(proxy, builtinWorkspace, maxWorkspace, this.options);
    }
}
exports.GoLauncher = GoLauncher;
