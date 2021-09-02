"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const repository_utils_1 = require("../../common/repository_utils");
const model_1 = require("../../model");
const search_1 = require("../search");
const abstract_scheduler_1 = require("./abstract_scheduler");
class IndexScheduler extends abstract_scheduler_1.AbstractScheduler {
    constructor(indexWorker, serverOptions, client, log, onScheduleFinished) {
        super(client, serverOptions.indexFrequencyMs, onScheduleFinished);
        this.indexWorker = indexWorker;
        this.serverOptions = serverOptions;
        this.client = client;
        this.log = log;
        this.onScheduleFinished = onScheduleFinished;
        this.objectClient = new search_1.RepositoryObjectClient(this.client);
    }
    getRepoSchedulingFrequencyMs() {
        return this.serverOptions.indexRepoFrequencyMs;
    }
    async executeSchedulingJob(repo) {
        this.log.info(`Schedule index repo request for ${repo.uri}`);
        try {
            // This repository is too soon to execute the next index job.
            if (repo.nextIndexTimestamp && new Date() < new Date(repo.nextIndexTimestamp)) {
                this.log.debug(`Repo ${repo.uri} is too soon to execute the next index job.`);
                return;
            }
            const cloneStatus = await this.objectClient.getRepositoryGitStatus(repo.uri);
            if (!repository_utils_1.RepositoryUtils.hasFullyCloned(cloneStatus.cloneProgress) ||
                cloneStatus.progress !== model_1.WorkerReservedProgress.COMPLETED) {
                this.log.info(`Repo ${repo.uri} has not been fully cloned yet or in update. Skip index.`);
                return;
            }
            const repoIndexStatus = await this.objectClient.getRepositoryLspIndexStatus(repo.uri);
            // Schedule index job only when the indexed revision is different from the current repository
            // revision.
            this.log.info(`Current repo revision: ${repo.revision}, indexed revision ${repoIndexStatus.revision}.`);
            if (repoIndexStatus.progress >= 0 &&
                repoIndexStatus.progress < model_1.WorkerReservedProgress.COMPLETED) {
                this.log.info(`Repo is still in indexing. Skip index for ${repo.uri}`);
            }
            else if (repoIndexStatus.progress === model_1.WorkerReservedProgress.COMPLETED &&
                repoIndexStatus.revision === repo.revision) {
                this.log.info(`Repo does not change since last index. Skip index for ${repo.uri}.`);
            }
            else {
                const payload = {
                    uri: repo.uri,
                    revision: repo.revision,
                };
                // Update the next repo index timestamp.
                const nextRepoIndexTimestamp = this.repoNextSchedulingTime();
                await this.objectClient.updateRepository(repo.uri, {
                    nextIndexTimestamp: nextRepoIndexTimestamp,
                });
                await this.indexWorker.enqueueJob(payload, {});
            }
        }
        catch (error) {
            this.log.error(`Schedule index job for ${repo.uri} error.`);
            this.log.error(error);
        }
    }
}
exports.IndexScheduler = IndexScheduler;
