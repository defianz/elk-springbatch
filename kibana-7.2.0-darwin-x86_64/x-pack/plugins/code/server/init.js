"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const _ = tslib_1.__importStar(require("lodash"));
const i18n_1 = require("@kbn/i18n");
const check_repos_1 = require("./check_repos");
const git_operations_1 = require("./git_operations");
const indexer_1 = require("./indexer");
const esqueue_1 = require("./lib/esqueue");
const log_1 = require("./log");
const install_manager_1 = require("./lsp/install_manager");
const language_servers_1 = require("./lsp/language_servers");
const lsp_service_1 = require("./lsp/lsp_service");
const queue_1 = require("./queue");
const repository_config_controller_1 = require("./repository_config_controller");
const repository_service_factory_1 = require("./repository_service_factory");
const file_1 = require("./routes/file");
const install_1 = require("./routes/install");
const lsp_1 = require("./routes/lsp");
const redirect_1 = require("./routes/redirect");
const repository_1 = require("./routes/repository");
const search_1 = require("./routes/search");
const setup_1 = require("./routes/setup");
const workspace_1 = require("./routes/workspace");
const scheduler_1 = require("./scheduler");
const security_1 = require("./security");
const server_options_1 = require("./server_options");
const server_logger_factory_1 = require("./utils/server_logger_factory");
const esclient_with_internal_request_1 = require("./utils/esclient_with_internal_request");
const check_1 = require("./routes/check");
async function retryUntilAvailable(func, intervalMs, retries = Number.MAX_VALUE) {
    const value = await func();
    if (value) {
        return value;
    }
    else {
        const promise = new Promise(resolve => {
            const retry = () => {
                func().then(v => {
                    if (v) {
                        resolve(v);
                    }
                    else {
                        retries--;
                        if (retries > 0) {
                            setTimeout(retry, intervalMs);
                        }
                        else {
                            resolve(v);
                        }
                    }
                });
            };
            setTimeout(retry, intervalMs);
        });
        return await promise;
    }
}
function init(server, options) {
    if (!options.ui.enabled) {
        return;
    }
    const log = new log_1.Logger(server);
    const serverOptions = new server_options_1.ServerOptions(options, server.config());
    const xpackMainPlugin = server.plugins.xpack_main;
    xpackMainPlugin.registerFeature({
        id: 'code',
        name: i18n_1.i18n.translate('xpack.code.featureRegistry.codeFeatureName', {
            defaultMessage: 'Code',
        }),
        icon: 'codeApp',
        navLinkId: 'code',
        app: ['code', 'kibana'],
        catalogue: [],
        privileges: {
            all: {
                api: ['code_user', 'code_admin'],
                savedObject: {
                    all: [],
                    read: ['config'],
                },
                ui: ['show', 'user', 'admin'],
            },
            read: {
                api: ['code_user'],
                savedObject: {
                    all: [],
                    read: ['config'],
                },
                ui: ['show', 'user'],
            },
        },
    });
    // @ts-ignore
    const kbnServer = this.kbnServer;
    kbnServer.ready().then(async () => {
        const codeNodeUrl = serverOptions.codeNodeUrl;
        const rndString = crypto_1.default.randomBytes(20).toString('hex');
        check_1.checkRoute(server, rndString);
        if (codeNodeUrl) {
            const checkResult = await retryUntilAvailable(async () => await check_1.checkCodeNode(codeNodeUrl, log, rndString), 5000);
            if (checkResult.me) {
                await initCodeNode(server, serverOptions, log);
            }
            else {
                await initNonCodeNode(codeNodeUrl, server, serverOptions, log);
            }
        }
        else {
            // codeNodeUrl not set, single node mode
            await initCodeNode(server, serverOptions, log);
        }
    });
}
exports.init = init;
async function initNonCodeNode(url, server, serverOptions, log) {
    log.info(`Initializing Code plugin as non-code node, redirecting all code requests to ${url}`);
    redirect_1.redirectRoute(server, url, log);
}
async function initCodeNode(server, serverOptions, log) {
    // wait until elasticsearch is ready
    // @ts-ignore
    await server.plugins.elasticsearch.waitUntilReady();
    log.info('Initializing Code plugin as code-node.');
    const queueIndex = server.config().get('xpack.code.queueIndex');
    const queueTimeoutMs = server.config().get('xpack.code.queueTimeoutMs');
    const devMode = server.config().get('env.dev');
    const esClient = new esclient_with_internal_request_1.EsClientWithInternalRequest(server);
    const repoConfigController = new repository_config_controller_1.RepositoryConfigController(esClient);
    server.injectUiAppVars('code', () => ({
        enableLangserversDeveloping: devMode,
    }));
    // Enable the developing language servers in development mode.
    if (devMode === true) {
        language_servers_1.LanguageServers.push(...language_servers_1.LanguageServersDeveloping);
        const JavaLanguageServer = language_servers_1.LanguageServers.find(d => d.name === 'Java');
        JavaLanguageServer.downloadUrl = _.partialRight(JavaLanguageServer.downloadUrl, devMode);
    }
    // Initialize git operations
    const gitOps = new git_operations_1.GitOperations(serverOptions.repoPath);
    const installManager = new install_manager_1.InstallManager(server, serverOptions);
    const lspService = new lsp_service_1.LspService('127.0.0.1', serverOptions, gitOps, esClient, installManager, new server_logger_factory_1.ServerLoggerFactory(server), repoConfigController);
    server.events.on('stop', async () => {
        log.debug('shutdown lsp process');
        await lspService.shutdown();
    });
    // Initialize indexing factories.
    const lspIndexerFactory = new indexer_1.LspIndexerFactory(lspService, serverOptions, gitOps, esClient, log);
    const repoIndexInitializerFactory = new indexer_1.RepositoryIndexInitializerFactory(esClient, log);
    // Initialize queue worker cancellation service.
    const cancellationService = new queue_1.CancellationSerivce();
    // Execute index version checking and try to migrate index data if necessary.
    await indexer_1.tryMigrateIndices(esClient, log);
    // Initialize queue.
    const queue = new esqueue_1.Esqueue(queueIndex, {
        client: esClient,
        timeout: queueTimeoutMs,
    });
    const indexWorker = new queue_1.IndexWorker(queue, log, esClient, [lspIndexerFactory], gitOps, cancellationService).bind();
    const repoServiceFactory = new repository_service_factory_1.RepositoryServiceFactory();
    const cloneWorker = new queue_1.CloneWorker(queue, log, esClient, serverOptions, gitOps, indexWorker, repoServiceFactory, cancellationService).bind();
    const deleteWorker = new queue_1.DeleteWorker(queue, log, esClient, serverOptions, gitOps, cancellationService, lspService, repoServiceFactory).bind();
    const updateWorker = new queue_1.UpdateWorker(queue, log, esClient, serverOptions, gitOps, repoServiceFactory, cancellationService).bind();
    // Initialize schedulers.
    const updateScheduler = new scheduler_1.UpdateScheduler(updateWorker, serverOptions, esClient, log);
    const indexScheduler = new scheduler_1.IndexScheduler(indexWorker, serverOptions, esClient, log);
    updateScheduler.start();
    if (!serverOptions.disableIndexScheduler) {
        indexScheduler.start();
    }
    // check code node repos on disk
    await check_repos_1.checkRepos(cloneWorker, esClient, serverOptions, log);
    const codeServerRouter = new security_1.CodeServerRouter(server);
    // Add server routes and initialize the plugin here
    repository_1.repositoryRoute(codeServerRouter, cloneWorker, deleteWorker, indexWorker, repoIndexInitializerFactory, repoConfigController, serverOptions);
    search_1.repositorySearchRoute(codeServerRouter, log);
    search_1.documentSearchRoute(codeServerRouter, log);
    search_1.symbolSearchRoute(codeServerRouter, log);
    file_1.fileRoute(codeServerRouter, gitOps);
    workspace_1.workspaceRoute(codeServerRouter, serverOptions, gitOps);
    lsp_1.symbolByQnameRoute(codeServerRouter, log);
    install_1.installRoute(codeServerRouter, lspService);
    lsp_1.lspRoute(codeServerRouter, lspService, serverOptions);
    setup_1.setupRoute(codeServerRouter);
    server.events.on('stop', () => {
        gitOps.cleanAllRepo();
        if (!serverOptions.disableIndexScheduler) {
            indexScheduler.stop();
        }
        updateScheduler.stop();
        queue.destroy();
    });
}
