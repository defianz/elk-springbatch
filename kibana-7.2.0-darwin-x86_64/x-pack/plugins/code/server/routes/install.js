"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Boom = tslib_1.__importStar(require("boom"));
const language_servers_1 = require("../lsp/language_servers");
function installRoute(server, lspService) {
    const kibanaVersion = server.server.config().get('pkg.version');
    const status = (def) => ({
        name: def.name,
        status: lspService.languageServerStatus(def.name),
        version: def.version,
        build: def.build,
        languages: def.languages,
        installationType: def.installationType,
        downloadUrl: typeof def.downloadUrl === 'function' ? def.downloadUrl(kibanaVersion) : def.downloadUrl,
        pluginName: def.installationPluginName,
    });
    server.route({
        path: '/api/code/install',
        handler() {
            return language_servers_1.LanguageServers.map(status);
        },
        method: 'GET',
    });
    server.route({
        path: '/api/code/install/{name}',
        handler(req) {
            const name = req.params.name;
            const def = language_servers_1.LanguageServers.find(d => d.name === name);
            if (def) {
                return status(def);
            }
            else {
                return Boom.notFound(`language server ${name} not found.`);
            }
        },
        method: 'GET',
    });
}
exports.installRoute = installRoute;
