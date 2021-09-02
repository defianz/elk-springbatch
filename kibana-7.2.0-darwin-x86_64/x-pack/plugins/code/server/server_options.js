"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
class ServerOptions {
    constructor(options, config) {
        this.options = options;
        this.config = config;
        this.workspacePath = path_1.resolve(this.config.get('path.data'), 'code/workspace');
        this.repoPath = path_1.resolve(this.config.get('path.data'), 'code/repos');
        this.credsPath = path_1.resolve(this.config.get('path.data'), 'code/credentials');
        this.jdtWorkspacePath = path_1.resolve(this.config.get('path.data'), 'code/jdt_ws');
        this.jdtConfigPath = path_1.resolve(this.config.get('path.data'), 'code/jdt_config');
        this.updateFrequencyMs = this.options.updateFrequencyMs;
        this.indexFrequencyMs = this.options.indexFrequencyMs;
        this.updateRepoFrequencyMs = this.options.updateRepoFrequencyMs;
        this.indexRepoFrequencyMs = this.options.indexRepoFrequencyMs;
        this.maxWorkspace = this.options.maxWorkspace;
        this.disableIndexScheduler = this.options.disableIndexScheduler;
        this.enableGlobalReference = this.options.enableGlobalReference;
        this.lsp = this.options.lsp;
        this.security = this.options.security;
        this.repoConfigs = this.options.repos.reduce((previous, current) => {
            previous[current.repo] = current;
            return previous;
        }, {});
        this.enabled = this.options.enabled;
        this.codeNodeUrl = this.options.codeNodeUrl;
    }
}
exports.ServerOptions = ServerOptions;
