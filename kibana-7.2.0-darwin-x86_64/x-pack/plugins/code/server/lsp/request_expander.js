"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const url_1 = require("url");
const messages_1 = require("vscode-jsonrpc/lib/messages");
const lsp_error_codes_1 = require("../../common/lsp_error_codes");
const timeout_1 = require("../utils/timeout");
var WorkspaceStatus;
(function (WorkspaceStatus) {
    WorkspaceStatus[WorkspaceStatus["Uninitialized"] = 0] = "Uninitialized";
    WorkspaceStatus[WorkspaceStatus["Initializing"] = 1] = "Initializing";
    WorkspaceStatus[WorkspaceStatus["Initialized"] = 2] = "Initialized";
})(WorkspaceStatus || (WorkspaceStatus = {}));
exports.InitializingError = new messages_1.ResponseError(lsp_error_codes_1.ServerNotInitialized, 'Server is initializing');
class RequestExpander {
    constructor(proxy, builtinWorkspace, maxWorkspace, serverOptions, initialOptions) {
        this.builtinWorkspace = builtinWorkspace;
        this.maxWorkspace = maxWorkspace;
        this.serverOptions = serverOptions;
        this.initialOptions = initialOptions;
        this.lastAccess = 0;
        this.jobQueue = [];
        // a map for workspacePath -> Workspace
        this.workspaces = new Map();
        this.running = false;
        this.exited = false;
        this.proxy = proxy;
        this.handle = this.handle.bind(this);
        proxy.onDisconnected(() => {
            this.workspaces.clear();
        });
        this.workspaceRoot = fs_1.default.realpathSync(this.serverOptions.workspacePath);
    }
    handleRequest(request) {
        this.lastAccess = Date.now();
        return new Promise((resolve, reject) => {
            if (this.exited) {
                reject(new Error('proxy is exited.'));
            }
            this.jobQueue.push({
                request,
                resolve,
                reject,
                startTime: Date.now(),
            });
            if (!this.running) {
                this.running = true;
                this.handleNext();
            }
        });
    }
    async exit() {
        this.exited = true;
        return this.proxy.exit();
    }
    async unloadWorkspace(workspacePath) {
        if (this.hasWorkspacePath(workspacePath)) {
            if (this.builtinWorkspace) {
                this.removeWorkspace(workspacePath);
                const params = {
                    event: {
                        removed: [
                            {
                                name: workspacePath,
                                uri: url_1.pathToFileURL(workspacePath).href,
                            },
                        ],
                        added: [],
                    },
                };
                await this.proxy.handleRequest({
                    method: 'workspace/didChangeWorkspaceFolders',
                    params,
                    isNotification: true,
                });
            }
            else {
                await this.exit();
            }
        }
    }
    async initialize(workspacePath) {
        this.updateWorkspace(workspacePath);
        const ws = this.getWorkspace(workspacePath);
        ws.status = WorkspaceStatus.Initializing;
        try {
            if (this.builtinWorkspace) {
                if (this.proxy.initialized) {
                    await this.changeWorkspaceFolders(workspacePath, this.maxWorkspace);
                }
                else {
                    // this is the first workspace, init the lsp server first
                    await this.sendInitRequest(workspacePath);
                }
                ws.status = WorkspaceStatus.Initialized;
            }
            else {
                for (const w of this.workspaces.values()) {
                    if (w.status === WorkspaceStatus.Initialized) {
                        await this.proxy.shutdown();
                        this.workspaces.clear();
                        break;
                    }
                }
                const response = await this.sendInitRequest(workspacePath);
                ws.status = WorkspaceStatus.Initialized;
                return response;
            }
        }
        catch (e) {
            ws.status = WorkspaceStatus.Uninitialized;
            throw e;
        }
    }
    async sendInitRequest(workspacePath) {
        return await this.proxy.initialize({}, [
            {
                name: workspacePath,
                uri: url_1.pathToFileURL(workspacePath).href,
            },
        ], this.initialOptions);
    }
    handle() {
        const job = this.jobQueue.shift();
        if (job && !this.exited) {
            const { request, resolve, reject } = job;
            this.expand(request, job.startTime).then(value => {
                try {
                    resolve(value);
                }
                finally {
                    this.handleNext();
                }
            }, err => {
                try {
                    reject(err);
                }
                finally {
                    this.handleNext();
                }
            });
        }
        else {
            this.running = false;
        }
    }
    handleNext() {
        setTimeout(this.handle, 0);
    }
    async expand(request, startTime) {
        if (request.workspacePath) {
            const ws = this.getWorkspace(request.workspacePath);
            if (ws.status === WorkspaceStatus.Uninitialized) {
                ws.initPromise = this.initialize(request.workspacePath);
            }
            // Uninitialized or initializing
            if (ws.status !== WorkspaceStatus.Initialized) {
                const timeout = request.timeoutForInitializeMs || 0;
                if (timeout > 0 && ws.initPromise) {
                    try {
                        const elasped = Date.now() - startTime;
                        await timeout_1.promiseTimeout(timeout - elasped, ws.initPromise);
                    }
                    catch (e) {
                        if (e.isTimeout) {
                            throw exports.InitializingError;
                        }
                        throw e;
                    }
                }
                else if (ws.initPromise) {
                    await ws.initPromise;
                }
                else {
                    throw exports.InitializingError;
                }
            }
        }
        return await this.proxy.handleRequest(request);
    }
    /**
     * use DidChangeWorkspaceFolders notification add a new workspace folder
     * replace the oldest one if count > maxWorkspace
     * builtinWorkspace = false is equal to maxWorkspace =1
     * @param workspacePath
     * @param maxWorkspace
     */
    async changeWorkspaceFolders(workspacePath, maxWorkspace) {
        const params = {
            event: {
                added: [
                    {
                        name: workspacePath,
                        uri: url_1.pathToFileURL(workspacePath).href,
                    },
                ],
                removed: [],
            },
        };
        this.updateWorkspace(workspacePath);
        if (this.workspaces.size > this.maxWorkspace) {
            let oldestWorkspace;
            let oldestAccess = Number.MAX_VALUE;
            for (const [workspace, ws] of this.workspaces) {
                if (ws.lastAccess < oldestAccess) {
                    oldestAccess = ws.lastAccess;
                    oldestWorkspace = path_1.default.join(this.serverOptions.workspacePath, workspace);
                }
            }
            if (oldestWorkspace) {
                params.event.removed.push({
                    name: oldestWorkspace,
                    uri: url_1.pathToFileURL(oldestWorkspace).href,
                });
                this.removeWorkspace(oldestWorkspace);
            }
        }
        // adding a workspace folder may also need initialize
        await this.proxy.handleRequest({
            method: 'workspace/didChangeWorkspaceFolders',
            params,
            isNotification: true,
        });
    }
    removeWorkspace(workspacePath) {
        this.workspaces.delete(this.relativePath(workspacePath));
    }
    updateWorkspace(workspacePath) {
        this.getWorkspace(workspacePath).status = Date.now();
    }
    hasWorkspacePath(workspacePath) {
        return this.workspaces.has(this.relativePath(workspacePath));
    }
    /**
     * use a relative path to prevent bugs due to symbolic path
     * @param workspacePath
     */
    relativePath(workspacePath) {
        const realPath = fs_1.default.realpathSync(workspacePath);
        return path_1.default.relative(this.workspaceRoot, realPath);
    }
    getWorkspace(workspacePath) {
        const p = this.relativePath(workspacePath);
        let ws = this.workspaces.get(p);
        if (!ws) {
            ws = {
                status: WorkspaceStatus.Uninitialized,
                lastAccess: Date.now(),
            };
            this.workspaces.set(p, ws);
        }
        return ws;
    }
}
exports.RequestExpander = RequestExpander;
