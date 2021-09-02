"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const git_url_utils_1 = require("../../common/git_url_utils");
const repository_utils_1 = require("../../common/repository_utils");
const model_1 = require("../../model");
const abstract_git_worker_1 = require("./abstract_git_worker");
class CloneWorker extends abstract_git_worker_1.AbstractGitWorker {
    constructor(queue, log, client, serverOptions, gitOps, indexWorker, repoServiceFactory, cancellationService) {
        super(queue, log, client, serverOptions, gitOps);
        this.queue = queue;
        this.log = log;
        this.client = client;
        this.serverOptions = serverOptions;
        this.gitOps = gitOps;
        this.indexWorker = indexWorker;
        this.repoServiceFactory = repoServiceFactory;
        this.cancellationService = cancellationService;
        this.id = 'clone';
    }
    async executeJob(job) {
        const { payload, cancellationToken } = job;
        const { url } = payload;
        try {
            git_url_utils_1.validateGitUrl(url, this.serverOptions.security.gitHostWhitelist, this.serverOptions.security.gitProtocolWhitelist);
        }
        catch (error) {
            this.log.error(`Validate git url ${url} error.`);
            this.log.error(error);
            return {
                uri: url,
                // Return a null repo for invalid git url.
                repo: null,
            };
        }
        this.log.info(`Execute clone job for ${url}`);
        const repoService = this.repoServiceFactory.newInstance(this.serverOptions.repoPath, this.serverOptions.credsPath, this.log, this.serverOptions.security.enableGitCertCheck);
        const repo = repository_utils_1.RepositoryUtils.buildRepository(url);
        // Try to cancel any existing clone job for this repository.
        this.cancellationService.cancelCloneJob(repo.uri);
        let cancelled = false;
        if (cancellationToken) {
            cancellationToken.on(() => {
                cancelled = true;
            });
            this.cancellationService.registerCloneJobToken(repo.uri, cancellationToken);
        }
        return await repoService.clone(repo, (progress, cloneProgress) => {
            if (cancelled) {
                // return false to stop the clone progress
                return false;
            }
            // For clone job payload, it only has the url. Populate back the
            // repository uri before update progress.
            job.payload.uri = repo.uri;
            this.updateProgress(job, progress, undefined, cloneProgress);
            return true;
        });
    }
    async onJobCompleted(job, res) {
        if (res.cancelled) {
            // Skip updating job progress if the job is done because of cancellation.
            return;
        }
        this.log.info(`Clone job done for ${res.repo.uri}`);
        // For clone job payload, it only has the url. Populate back the
        // repository uri.
        job.payload.uri = res.repo.uri;
        await super.onJobCompleted(job, res);
        // Throw out a repository index request after 1 second.
        return lodash_1.delay(async () => {
            const payload = {
                uri: res.repo.uri,
                revision: res.repo.revision,
            };
            await this.indexWorker.enqueueJob(payload, {});
        }, 1000);
    }
    async onJobEnqueued(job) {
        const { url } = job.payload;
        const repo = repository_utils_1.RepositoryUtils.buildRepository(url);
        const progress = {
            uri: repo.uri,
            progress: model_1.WorkerReservedProgress.INIT,
            timestamp: new Date(),
        };
        return await this.objectClient.setRepositoryGitStatus(repo.uri, progress);
    }
    async onJobExecutionError(res) {
        // The payload of clone job won't have the `uri`, but only with `url`.
        const url = res.job.payload.url;
        const repo = repository_utils_1.RepositoryUtils.buildRepository(url);
        res.job.payload.uri = repo.uri;
        return await super.onJobExecutionError(res);
    }
    async onJobTimeOut(res) {
        // The payload of clone job won't have the `uri`, but only with `url`.
        const url = res.job.payload.url;
        const repo = repository_utils_1.RepositoryUtils.buildRepository(url);
        res.job.payload.uri = repo.uri;
        return await super.onJobTimeOut(res);
    }
}
exports.CloneWorker = CloneWorker;
