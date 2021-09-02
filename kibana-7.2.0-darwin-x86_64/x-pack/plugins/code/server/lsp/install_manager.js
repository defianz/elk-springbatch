"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const installation_1 = require("../../common/installation");
const language_server_1 = require("../../common/language_server");
class InstallManager {
    constructor(server, serverOptions) {
        this.server = server;
        this.serverOptions = serverOptions;
    }
    status(def) {
        if (def.installationType === installation_1.InstallationType.Embed) {
            return language_server_1.LanguageServerStatus.READY;
        }
        // @ts-ignore
        const plugin = this.server.plugins[def.installationPluginName];
        if (plugin) {
            const pluginPath = plugin.install.path;
            if (fs_1.default.existsSync(pluginPath)) {
                return language_server_1.LanguageServerStatus.READY;
            }
        }
        return language_server_1.LanguageServerStatus.NOT_INSTALLED;
    }
    installationPath(def) {
        if (def.installationType === installation_1.InstallationType.Embed) {
            return def.embedPath;
        }
        // @ts-ignore
        const plugin = this.server.plugins[def.installationPluginName];
        if (plugin) {
            return plugin.install.path;
        }
        return undefined;
    }
}
exports.InstallManager = InstallManager;
