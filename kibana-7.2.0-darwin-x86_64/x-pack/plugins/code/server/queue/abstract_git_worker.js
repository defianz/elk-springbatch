"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const search_1 = require("../search");
const abstract_worker_1 = require("./abstract_worker");
class AbstractGitWorker extends abstract_worker_1.AbstractWorker {
    constructor(queue, log, client, serverOptions, gitOps) {
        super(queue, log);
        this.queue = queue;
        this.log = log;
        this.client = client;
        this.serverOptions = serverOptions;
        this.gitOps = gitOps;
        this.id = 'abstract-git';
        this.objectClient = new search_1.RepositoryObjectClient(client);
    }
    async onJobCompleted(job, res) {
        if (res.cancelled) {
            // Skip updating job progress if the job is done because of cancellation.
            return;
        }
        await super.onJobCompleted(job, res);
        // Update the default branch.
        const repoUri = res.uri;
        const revision = await this.gitOps.getHeadRevision(repoUri);
        const defaultBranch = await this.gitOps.getDefaultBranch(repoUri);
        // Update the repository data.
        try {
            await this.objectClient.updateRepository(repoUri, {
                defaultBranch,
                revision,
            });
        }
        catch (error) {
            this.log.error(`Update repository default branch and revision error.`);
            this.log.error(error);
        }
        // Update the git operation status.
        try {
            return await this.objectClient.updateRepositoryGitStatus(repoUri, {
                revision,
                progress: model_1.WorkerReservedProgress.COMPLETED,
                cloneProgress: {
                    isCloned: true,
                },
            });
        }
        catch (error) {
            this.log.error(`Update revision of repo clone done error.`);
            this.log.error(error);
        }
    }
    async updateProgress(job, progress, error, cloneProgress) {
        const { uri } = job.payload;
        const p = {
            uri,
            progress,
            timestamp: new Date(),
            cloneProgress,
            errorMessage: error ? error.message : undefined,
        };
        try {
            return await this.objectClient.updateRepositoryGitStatus(uri, p);
        }
        catch (err) {
            // Do nothing here since it's not blocking anything.
            // this.log.warn(`Update git clone progress error.`);
            // this.log.warn(err);
        }
    }
}
exports.AbstractGitWorker = AbstractGitWorker;
