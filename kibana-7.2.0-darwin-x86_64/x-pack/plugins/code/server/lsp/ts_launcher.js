"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const get_port_1 = tslib_1.__importDefault(require("get-port"));
const path_1 = require("path");
const request_expander_1 = require("./request_expander");
const abstract_launcher_1 = require("./abstract_launcher");
const TS_LANG_DETACH_PORT = 2089;
class TypescriptServerLauncher extends abstract_launcher_1.AbstractLauncher {
    constructor(targetHost, options, loggerFactory) {
        super('typescript', targetHost, options, loggerFactory);
        this.targetHost = targetHost;
        this.options = options;
        this.loggerFactory = loggerFactory;
    }
    async getPort() {
        if (!this.options.lsp.detach) {
            return await get_port_1.default();
        }
        return TS_LANG_DETACH_PORT;
    }
    createExpander(proxy, builtinWorkspace, maxWorkspace) {
        return new request_expander_1.RequestExpander(proxy, builtinWorkspace, maxWorkspace, this.options, {
            installNodeDependency: this.options.security.installNodeDependency,
            gitHostWhitelist: this.options.security.gitHostWhitelist,
        });
    }
    async spawnProcess(installationPath, port, log) {
        const p = child_process_1.spawn(process.execPath, [installationPath, '-p', port.toString(), '-c', '1'], {
            detached: false,
            stdio: 'pipe',
            cwd: path_1.resolve(installationPath, '../..'),
        });
        p.stdout.on('data', data => {
            log.stdout(data.toString());
        });
        p.stderr.on('data', data => {
            log.stderr(data.toString());
        });
        return p;
    }
}
exports.TypescriptServerLauncher = TypescriptServerLauncher;
