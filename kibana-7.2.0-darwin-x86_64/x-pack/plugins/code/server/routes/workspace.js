"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const log_1 = require("../log");
const workspace_command_1 = require("../lsp/workspace_command");
const workspace_handler_1 = require("../lsp/workspace_handler");
const esclient_with_request_1 = require("../utils/esclient_with_request");
const server_logger_factory_1 = require("../utils/server_logger_factory");
function workspaceRoute(server, serverOptions, gitOps) {
    server.route({
        path: '/api/code/workspace',
        method: 'GET',
        async handler() {
            return serverOptions.repoConfigs;
        },
    });
    server.route({
        path: '/api/code/workspace/{uri*3}/{revision}',
        requireAdmin: true,
        method: 'POST',
        async handler(req, reply) {
            const repoUri = req.params.uri;
            const revision = req.params.revision;
            const repoConfig = serverOptions.repoConfigs[repoUri];
            const force = !!req.query.force;
            if (repoConfig) {
                const log = new log_1.Logger(server.server, ['workspace', repoUri]);
                const workspaceHandler = new workspace_handler_1.WorkspaceHandler(gitOps, serverOptions.workspacePath, new esclient_with_request_1.EsClientWithRequest(req), new server_logger_factory_1.ServerLoggerFactory(server.server));
                try {
                    const { workspaceRepo, workspaceRevision } = await workspaceHandler.openWorkspace(repoUri, revision);
                    const workspaceCmd = new workspace_command_1.WorkspaceCommand(repoConfig, workspaceRepo.workdir(), workspaceRevision, log);
                    workspaceCmd.runInit(force).then(() => {
                        return '';
                    });
                }
                catch (e) {
                    if (e.isBoom) {
                        return e;
                    }
                }
            }
            else {
                return boom_1.default.notFound(`repo config for ${repoUri} not found.`);
            }
        },
    });
}
exports.workspaceRoute = workspaceRoute;
