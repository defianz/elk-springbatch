"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_jsonrpc_1 = require("vscode-jsonrpc");
const proxy_1 = require("./proxy");
const lsp_error_codes_1 = require("../../common/lsp_error_codes");
let seqNo = 1;
exports.ServerStartFailed = new vscode_jsonrpc_1.ResponseError(lsp_error_codes_1.LanguageServerStartFailed, 'Launch language server failed.');
class AbstractLauncher {
    constructor(name, targetHost, options, loggerFactory) {
        this.name = name;
        this.targetHost = targetHost;
        this.options = options;
        this.loggerFactory = loggerFactory;
        this.running = false;
        this._currentPid = -1;
        this.child = null;
        this._startTime = -1;
        this._proxyConnected = false;
        this.spawnTimes = 0;
        /**
         * proxy should be connected within this timeout, otherwise we reconnect.
         */
        this.startupTimeout = 10000;
        this.maxRespawn = 3;
        this.log = this.loggerFactory.getLogger([`${seqNo++}`, `${this.name}`, 'code']);
    }
    async launch(builtinWorkspace, maxWorkspace, installationPath) {
        const port = await this.getPort();
        const log = this.log;
        let child;
        const proxy = new proxy_1.LanguageServerProxy(port, this.targetHost, log, this.options.lsp);
        if (this.options.lsp.detach) {
            log.debug('Detach mode, expected language server launch externally');
            proxy.onConnected(() => {
                this.running = true;
            });
            proxy.onDisconnected(() => {
                this.running = false;
                if (!proxy.isClosed) {
                    log.debug(`${this.name} language server disconnected, reconnecting`);
                    setTimeout(() => this.reconnect(proxy, installationPath), 1000);
                }
            });
        }
        else {
            child = await this.spawnProcess(installationPath, port, log);
            this.spawnTimes += 1;
            this.child = child;
            log.debug('spawned a child process ' + child.pid);
            this._currentPid = child.pid;
            this._startTime = Date.now();
            this.running = true;
            this.onProcessExit(child, () => {
                if (!proxy.isClosed)
                    this.reconnect(proxy, installationPath);
            });
            proxy.onDisconnected(async () => {
                this._proxyConnected = false;
                if (!proxy.isClosed) {
                    log.debug('proxy disconnected, reconnecting');
                    setTimeout(async () => {
                        await this.reconnect(proxy, installationPath, child);
                    }, 1000);
                }
                else if (this.child) {
                    log.info('proxy closed, kill process');
                    await this.killProcess(this.child);
                }
            });
        }
        proxy.onExit(() => {
            log.debug('proxy exited, is the process running? ' + this.running);
            if (this.child && this.running) {
                const p = this.child;
                this.killProcess(p);
            }
        });
        proxy.listen();
        this.startConnect(proxy);
        await new Promise((resolve, reject) => {
            proxy.onConnected(() => {
                this._proxyConnected = true;
                resolve();
            });
            this.launchReject = err => {
                proxy.exit().catch(this.log.debug);
                reject(err);
            };
        });
        return this.createExpander(proxy, builtinWorkspace, maxWorkspace);
    }
    onProcessExit(child, reconnectFn) {
        const pid = child.pid;
        child.on('exit', () => {
            if (this._currentPid === pid) {
                this.running = false;
                // if the process exited before proxy connected, then we reconnect
                if (!this._proxyConnected) {
                    reconnectFn();
                }
            }
        });
    }
    /**
     * try reconnect the proxy when disconnected
     */
    async reconnect(proxy, installationPath, child) {
        this.log.debug('reconnecting');
        if (this.options.lsp.detach) {
            this.startConnect(proxy);
        }
        else {
            const processExpired = () => Date.now() - this._startTime > this.startupTimeout;
            if (child && !child.killed && !processExpired()) {
                this.startConnect(proxy);
            }
            else {
                if (this.spawnTimes < this.maxRespawn) {
                    if (child && this.running) {
                        this.log.debug('killing the old process.');
                        await this.killProcess(child);
                    }
                    const port = await this.getPort();
                    proxy.changePort(port);
                    this.child = await this.spawnProcess(installationPath, port, this.log);
                    this.spawnTimes += 1;
                    this.log.debug('spawned a child process ' + this.child.pid);
                    this._currentPid = this.child.pid;
                    this._startTime = Date.now();
                    this.running = true;
                    this.onProcessExit(this.child, () => this.reconnect(proxy, installationPath, child));
                    this.startConnect(proxy);
                }
                else {
                    this.log.warn(`spawned process ${this.spawnTimes} times, mark this proxy unusable.`);
                    proxy.setError(exports.ServerStartFailed);
                    this.launchReject(exports.ServerStartFailed);
                }
            }
        }
    }
    startConnect(proxy) {
        proxy.connect().catch(this.log.debug);
    }
    killProcess(child) {
        if (!child.killed) {
            return new Promise((resolve, reject) => {
                // if not killed within 1s
                const t = setTimeout(reject, 1000);
                child.on('exit', () => {
                    clearTimeout(t);
                    resolve(true);
                });
                child.kill();
                this.log.info('killed process ' + child.pid);
            })
                .catch(() => {
                // force kill
                child.kill('SIGKILL');
                this.log.info('force killed process ' + child.pid);
                return child.killed;
            })
                .finally(() => {
                if (this._currentPid === child.pid)
                    this.running = false;
            });
        }
    }
}
exports.AbstractLauncher = AbstractLauncher;
