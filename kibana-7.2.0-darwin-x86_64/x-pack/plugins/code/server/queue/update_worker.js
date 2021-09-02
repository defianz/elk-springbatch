"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_git_worker_1 = require("./abstract_git_worker");
class UpdateWorker extends abstract_git_worker_1.AbstractGitWorker {
    constructor(queue, log, client, serverOptions, gitOps, repoServiceFactory, cancellationService) {
        super(queue, log, client, serverOptions, gitOps);
        this.log = log;
        this.client = client;
        this.serverOptions = serverOptions;
        this.gitOps = gitOps;
        this.repoServiceFactory = repoServiceFactory;
        this.cancellationService = cancellationService;
        this.id = 'update';
    }
    async executeJob(job) {
        const { payload, cancellationToken } = job;
        const repo = payload;
        this.log.info(`Execute update job for ${repo.uri}`);
        const repoService = this.repoServiceFactory.newInstance(this.serverOptions.repoPath, this.serverOptions.credsPath, this.log, this.serverOptions.security.enableGitCertCheck);
        // Try to cancel any existing update job for this repository.
        this.cancellationService.cancelUpdateJob(repo.uri);
        let cancelled = false;
        if (cancellationToken) {
            cancellationToken.on(() => {
                cancelled = true;
            });
            this.cancellationService.registerUpdateJobToken(repo.uri, cancellationToken);
        }
        return await repoService.update(repo, () => {
            if (cancelled) {
                // return false to stop the clone progress
                return false;
            }
            return true;
        });
    }
    async onJobCompleted(job, res) {
        this.log.info(`Update job done for ${job.payload.uri}`);
        return await super.onJobCompleted(job, res);
    }
}
exports.UpdateWorker = UpdateWorker;
