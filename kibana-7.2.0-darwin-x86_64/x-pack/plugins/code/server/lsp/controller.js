"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const fs_1 = tslib_1.__importDefault(require("fs"));
const vscode_jsonrpc_1 = require("vscode-jsonrpc");
const language_server_1 = require("../../common/language_server");
const lsp_error_codes_1 = require("../../common/lsp_error_codes");
const detect_language_1 = require("../utils/detect_language");
const language_servers_1 = require("./language_servers");
/**
 * Manage different LSP servers and forward request to different LSP using LanguageServerProxy, currently
 * we just use forward request to all the LSP servers we are running.
 */
class LanguageServerController {
    constructor(options, targetHost, installManager, loggerFactory, repoConfigController) {
        this.options = options;
        this.targetHost = targetHost;
        this.installManager = installManager;
        this.loggerFactory = loggerFactory;
        this.repoConfigController = repoConfigController;
        this.log = loggerFactory.getLogger([]);
        this.languageServers = language_servers_1.LanguageServers.map(def => ({
            definition: def,
            builtinWorkspaceFolders: def.builtinWorkspaceFolders,
            languages: def.languages,
            maxWorkspace: options.maxWorkspace,
            launcher: new def.launcher(this.targetHost, options, loggerFactory),
        }));
        this.languageServerMap = this.languageServers.reduce((map, ls) => {
            ls.languages.forEach(lang => (map[lang] = ls));
            map[ls.definition.name] = ls;
            return map;
        }, {});
    }
    async handleRequest(request) {
        const file = request.resolvedFilePath;
        if (file) {
            // #todo add test for this
            const lang = await detect_language_1.detectLanguage(file.replace('file://', ''));
            if (await this.repoConfigController.isLanguageDisabled(request.documentUri, lang)) {
                throw new vscode_jsonrpc_1.ResponseError(lsp_error_codes_1.LanguageDisabled, `language disabled for the file`);
            }
            return await this.dispatchRequest(lang, request);
        }
        else {
            throw new vscode_jsonrpc_1.ResponseError(lsp_error_codes_1.UnknownErrorCode, `can't detect language without a file`);
        }
    }
    async dispatchRequest(lang, request) {
        if (lang) {
            const ls = this.findLanguageServer(lang);
            if (ls.builtinWorkspaceFolders) {
                if (!ls.languageServerHandlers && !ls.launcher.running) {
                    ls.languageServerHandlers = ls.launcher.launch(ls.builtinWorkspaceFolders, ls.maxWorkspace, this.installManager.installationPath(ls.definition));
                }
                const handler = await ls.languageServerHandlers;
                return await handler.handleRequest(request);
            }
            else {
                const handler = await this.findOrCreateHandler(ls, request);
                handler.lastAccess = Date.now();
                return await handler.handleRequest(request);
            }
        }
        else {
            throw new vscode_jsonrpc_1.ResponseError(lsp_error_codes_1.UnknownFileLanguage, `can't detect language from file:${request.resolvedFilePath}`);
        }
    }
    /**
     * shutdown all language servers
     */
    async exit() {
        for (const ls of this.languageServers) {
            if (ls.languageServerHandlers) {
                if (ls.builtinWorkspaceFolders) {
                    if (ls.languageServerHandlers) {
                        const h = await ls.languageServerHandlers;
                        await h.exit();
                    }
                }
                else {
                    const handlers = ls.languageServerHandlers;
                    for (const handlerPromise of Object.values(handlers)) {
                        const handler = await handlerPromise;
                        await handler.exit();
                    }
                }
            }
        }
    }
    async launchServers() {
        for (const ls of this.languageServers) {
            const installed = this.installManager.status(ls.definition) === language_server_1.LanguageServerStatus.READY;
            // for those language server has builtin workspace support, we can launch them during kibana startup
            if (installed && ls.builtinWorkspaceFolders) {
                try {
                    ls.languageServerHandlers = ls.launcher.launch(true, ls.maxWorkspace, this.installManager.installationPath(ls.definition));
                }
                catch (e) {
                    this.log.error(e);
                }
            }
        }
    }
    async unloadWorkspace(workspaceDir) {
        for (const languageServer of this.languageServers) {
            if (languageServer.languageServerHandlers) {
                if (languageServer.builtinWorkspaceFolders) {
                    const handler = await languageServer.languageServerHandlers;
                    await handler.unloadWorkspace(workspaceDir);
                }
                else {
                    const handlers = languageServer.languageServerHandlers;
                    const realPath = fs_1.default.realpathSync(workspaceDir);
                    const handler = handlers[realPath];
                    if (handler) {
                        await (await handler).unloadWorkspace(realPath);
                        delete handlers[realPath];
                    }
                }
            }
        }
    }
    status(lang) {
        const ls = this.languageServerMap[lang];
        const status = this.installManager.status(ls.definition);
        // installed, but is it running?
        if (status === language_server_1.LanguageServerStatus.READY) {
            if (ls.launcher.running) {
                return language_server_1.LanguageServerStatus.RUNNING;
            }
        }
        return status;
    }
    supportLanguage(lang) {
        return this.languageServerMap[lang] !== undefined;
    }
    async findOrCreateHandler(languageServer, request) {
        let handlers;
        if (languageServer.languageServerHandlers) {
            handlers = languageServer.languageServerHandlers;
        }
        else {
            handlers = languageServer.languageServerHandlers = {};
        }
        if (!request.workspacePath) {
            throw new vscode_jsonrpc_1.ResponseError(lsp_error_codes_1.UnknownErrorCode, `no workspace in request?`);
        }
        const realPath = fs_1.default.realpathSync(request.workspacePath);
        let handler = handlers[realPath];
        if (handler) {
            return handler;
        }
        else {
            const maxWorkspace = languageServer.maxWorkspace;
            const handlerArray = Object.entries(handlers);
            if (handlerArray.length < maxWorkspace) {
                handler = languageServer.launcher.launch(languageServer.builtinWorkspaceFolders, maxWorkspace, this.installManager.installationPath(languageServer.definition));
                handlers[realPath] = handler;
                return handler;
            }
            else {
                let [oldestWorkspace, oldestHandler] = handlerArray[0];
                for (const e of handlerArray) {
                    const [ws, handlePromise] = e;
                    const h = await handlePromise;
                    const oldestAccess = (await oldestHandler).lastAccess;
                    if (h.lastAccess < oldestAccess) {
                        oldestWorkspace = ws;
                        oldestHandler = handlePromise;
                    }
                }
                delete handlers[oldestWorkspace];
                handlers[request.workspacePath] = oldestHandler;
                return oldestHandler;
            }
        }
    }
    findLanguageServer(lang) {
        const ls = this.languageServerMap[lang];
        if (ls) {
            if (!this.options.lsp.detach &&
                this.installManager.status(ls.definition) !== language_server_1.LanguageServerStatus.READY) {
                throw new vscode_jsonrpc_1.ResponseError(lsp_error_codes_1.LanguageServerNotInstalled, `language server ${lang} not installed`);
            }
            else {
                return ls;
            }
        }
        else {
            throw new vscode_jsonrpc_1.ResponseError(lsp_error_codes_1.UnknownFileLanguage, `unsupported language ${lang}`);
        }
    }
}
exports.LanguageServerController = LanguageServerController;
