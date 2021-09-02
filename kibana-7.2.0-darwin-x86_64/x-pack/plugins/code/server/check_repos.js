"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const repository_utils_1 = require("../common/repository_utils");
const search_1 = require("./search");
async function checkRepos(cloneWorker, esClient, serverOptions, log) {
    log.info('Check repositories on local disk.');
    const repoObjectClient = new search_1.RepositoryObjectClient(esClient);
    const repos = await repoObjectClient.getAllRepositories();
    for (const repo of repos) {
        try {
            const path = repository_utils_1.RepositoryUtils.repositoryLocalPath(serverOptions.repoPath, repo.uri);
            if (!fs_1.default.existsSync(path)) {
                log.info(`can't find ${repo.uri} on local disk, cloning from remote.`);
                const payload = {
                    url: repo.url,
                };
                await cloneWorker.enqueueJob(payload, {});
            }
        }
        catch (e) {
            log.error(e);
        }
    }
}
exports.checkRepos = checkRepos;
