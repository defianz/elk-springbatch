"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
const workspace_handler_1 = require("./workspace_handler");
class LspService {
    constructor(targetHost, serverOptions, gitOps, client, installManager, loggerFactory, repoConfigController) {
        this.workspaceHandler = new workspace_handler_1.WorkspaceHandler(gitOps, serverOptions.workspacePath, client, loggerFactory);
        this.controller = new controller_1.LanguageServerController(serverOptions, targetHost, installManager, loggerFactory, repoConfigController);
    }
    /**
     * send a lsp request to language server, will initiate the language server if needed
     * @param method the method name
     * @param params the request params
     * @param timeoutForInitializeMs When this request triggered an initializing, for how many milliseconds the response will wait for it.
     */
    async sendRequest(method, params, timeoutForInitializeMs) {
        const request = { method, params, timeoutForInitializeMs };
        await this.workspaceHandler.handleRequest(request);
        const response = await this.controller.handleRequest(request);
        return this.workspaceHandler.handleResponse(request, response);
    }
    async launchServers() {
        await this.controller.launchServers();
    }
    async deleteWorkspace(repoUri) {
        for (const path of await this.workspaceHandler.listWorkspaceFolders(repoUri)) {
            await this.controller.unloadWorkspace(path);
        }
        await this.workspaceHandler.clearWorkspace(repoUri);
    }
    /**
     * shutdown all launched language servers
     */
    async shutdown() {
        await this.controller.exit();
    }
    supportLanguage(lang) {
        return this.controller.supportLanguage(lang);
    }
    languageServerStatus(lang) {
        return this.controller.status(lang);
    }
}
exports.LspService = LspService;
