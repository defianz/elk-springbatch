"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const git_url_utils_1 = require("../../common/git_url_utils");
const repository_utils_1 = require("../../common/repository_utils");
const log_1 = require("../log");
const search_1 = require("../search");
const esclient_with_request_1 = require("../utils/esclient_with_request");
function repositoryRoute(server, cloneWorker, deleteWorker, indexWorker, repoIndexInitializerFactory, repoConfigController, options) {
    // Clone a git repository
    server.route({
        path: '/api/code/repo',
        requireAdmin: true,
        method: 'POST',
        async handler(req, h) {
            const repoUrl = req.payload.url;
            const log = new log_1.Logger(req.server);
            // Reject the request if the url is an invalid git url.
            try {
                git_url_utils_1.validateGitUrl(repoUrl, options.security.gitHostWhitelist, options.security.gitProtocolWhitelist);
            }
            catch (error) {
                log.error(`Validate git url ${repoUrl} error.`);
                log.error(error);
                return boom_1.default.badRequest(error);
            }
            const repo = repository_utils_1.RepositoryUtils.buildRepository(repoUrl);
            const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
            try {
                // Check if the repository already exists
                await repoObjectClient.getRepository(repo.uri);
                const msg = `Repository ${repoUrl} already exists. Skip clone.`;
                log.info(msg);
                return h.response(msg).code(304); // Not Modified
            }
            catch (error) {
                log.info(`Repository ${repoUrl} does not exist. Go ahead with clone.`);
                try {
                    // Create the index for the repository
                    const initializer = (await repoIndexInitializerFactory.create(repo.uri, ''));
                    await initializer.init();
                    // Persist to elasticsearch
                    await repoObjectClient.setRepository(repo.uri, repo);
                    const randomStr = Math.random()
                        .toString(36)
                        .substring(2, 15);
                    await repoObjectClient.setRepositoryRandomStr(repo.uri, randomStr);
                    // Kick off clone job
                    const payload = {
                        url: repoUrl,
                    };
                    await cloneWorker.enqueueJob(payload, {});
                    return repo;
                }
                catch (error2) {
                    const msg = `Issue repository clone request for ${repoUrl} error`;
                    log.error(msg);
                    log.error(error2);
                    return boom_1.default.badRequest(msg);
                }
            }
        },
    });
    // Remove a git repository
    server.route({
        path: '/api/code/repo/{uri*3}',
        requireAdmin: true,
        method: 'DELETE',
        async handler(req, h) {
            const repoUri = req.params.uri;
            const log = new log_1.Logger(req.server);
            const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
            try {
                // Check if the repository already exists. If not, an error will be thrown.
                await repoObjectClient.getRepository(repoUri);
                // Check if the repository delete status already exists. If so, we should ignore this
                // request.
                try {
                    await repoObjectClient.getRepositoryDeleteStatus(repoUri);
                    const msg = `Repository ${repoUri} is already in delete.`;
                    log.info(msg);
                    return h.response(msg).code(304); // Not Modified
                }
                catch (error) {
                    // Do nothing here since this error is expected.
                    log.info(`Repository ${repoUri} delete status does not exist. Go ahead with delete.`);
                }
                const payload = {
                    uri: repoUri,
                };
                await deleteWorker.enqueueJob(payload, {});
                return {};
            }
            catch (error) {
                const msg = `Issue repository delete request for ${repoUri} error`;
                log.error(msg);
                log.error(error);
                return boom_1.default.notFound(msg);
            }
        },
    });
    // Get a git repository
    server.route({
        path: '/api/code/repo/{uri*3}',
        method: 'GET',
        async handler(req) {
            const repoUri = req.params.uri;
            const log = new log_1.Logger(req.server);
            try {
                const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
                return await repoObjectClient.getRepository(repoUri);
            }
            catch (error) {
                const msg = `Get repository ${repoUri} error`;
                log.error(msg);
                log.error(error);
                return boom_1.default.notFound(msg);
            }
        },
    });
    server.route({
        path: '/api/code/repo/status/{uri*3}',
        method: 'GET',
        async handler(req) {
            const repoUri = req.params.uri;
            const log = new log_1.Logger(req.server);
            try {
                const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
                let gitStatus = null;
                try {
                    gitStatus = await repoObjectClient.getRepositoryGitStatus(repoUri);
                }
                catch (error) {
                    log.debug(`Get repository git status ${repoUri} error: ${error}`);
                }
                let indexStatus = null;
                try {
                    indexStatus = await repoObjectClient.getRepositoryLspIndexStatus(repoUri);
                }
                catch (error) {
                    log.debug(`Get repository index status ${repoUri} error: ${error}`);
                }
                let deleteStatus = null;
                try {
                    deleteStatus = await repoObjectClient.getRepositoryDeleteStatus(repoUri);
                }
                catch (error) {
                    log.debug(`Get repository delete status ${repoUri} error: ${error}`);
                }
                return {
                    gitStatus,
                    indexStatus,
                    deleteStatus,
                };
            }
            catch (error) {
                const msg = `Get repository status ${repoUri} error`;
                log.error(msg);
                log.error(error);
                return boom_1.default.notFound(msg);
            }
        },
    });
    // Get all git repositories
    server.route({
        path: '/api/code/repos',
        method: 'GET',
        async handler(req) {
            const log = new log_1.Logger(req.server);
            try {
                const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
                return await repoObjectClient.getAllRepositories();
            }
            catch (error) {
                const msg = `Get all repositories error`;
                log.error(msg);
                log.error(error);
                return boom_1.default.notFound(msg);
            }
        },
    });
    // Issue a repository index task.
    // TODO(mengwei): This is just temporary API stub to trigger the index job. Eventually in the near
    // future, this route will be removed. The scheduling strategy is still in discussion.
    server.route({
        path: '/api/code/repo/index/{uri*3}',
        method: 'POST',
        requireAdmin: true,
        async handler(req) {
            const repoUri = req.params.uri;
            const log = new log_1.Logger(req.server);
            const reindex = req.payload.reindex;
            try {
                const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
                const cloneStatus = await repoObjectClient.getRepositoryGitStatus(repoUri);
                const payload = {
                    uri: repoUri,
                    revision: cloneStatus.revision,
                    enforceReindex: reindex,
                };
                await indexWorker.enqueueJob(payload, {});
                return {};
            }
            catch (error) {
                const msg = `Index repository ${repoUri} error`;
                log.error(msg);
                log.error(error);
                return boom_1.default.notFound(msg);
            }
        },
    });
    // Update a repo config
    server.route({
        path: '/api/code/repo/config/{uri*3}',
        method: 'PUT',
        requireAdmin: true,
        async handler(req, h) {
            const config = req.payload;
            const repoUri = config.uri;
            const log = new log_1.Logger(req.server);
            const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
            try {
                // Check if the repository exists
                await repoObjectClient.getRepository(repoUri);
            }
            catch (error) {
                return boom_1.default.badRequest(`Repository not existed for ${repoUri}`);
            }
            try {
                // Persist to elasticsearch
                await repoObjectClient.setRepositoryConfig(repoUri, config);
                repoConfigController.resetConfigCache(repoUri);
                return {};
            }
            catch (error) {
                const msg = `Update repository config for ${repoUri} error`;
                log.error(msg);
                log.error(error);
                return boom_1.default.badRequest(msg);
            }
        },
    });
    // Get repository config
    server.route({
        path: '/api/code/repo/config/{uri*3}',
        method: 'GET',
        async handler(req) {
            const repoUri = req.params.uri;
            try {
                const repoObjectClient = new search_1.RepositoryObjectClient(new esclient_with_request_1.EsClientWithRequest(req));
                return await repoObjectClient.getRepositoryConfig(repoUri);
            }
            catch (error) {
                return boom_1.default.notFound(`Repository config ${repoUri} not exist`);
            }
        },
    });
}
exports.repositoryRoute = repositoryRoute;
