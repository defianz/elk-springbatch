"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const search_1 = require("../search");
const abstract_scheduler_1 = require("./abstract_scheduler");
class UpdateScheduler extends abstract_scheduler_1.AbstractScheduler {
    constructor(updateWorker, serverOptions, client, log, onScheduleFinished) {
        super(client, serverOptions.updateFrequencyMs, onScheduleFinished);
        this.updateWorker = updateWorker;
        this.serverOptions = serverOptions;
        this.client = client;
        this.log = log;
        this.onScheduleFinished = onScheduleFinished;
        this.objectClient = new search_1.RepositoryObjectClient(this.client);
    }
    getRepoSchedulingFrequencyMs() {
        return this.serverOptions.updateRepoFrequencyMs;
    }
    // TODO: Currently the schduling algorithm the most naive one, which go through
    // all repositories and execute update. Later we can repeat the one we used
    // before for task throttling.
    async executeSchedulingJob(repo) {
        this.log.debug(`Try to schedule update repo request for ${repo.uri}`);
        try {
            // This repository is too soon to execute the next update job.
            if (repo.nextUpdateTimestamp && new Date() < new Date(repo.nextUpdateTimestamp)) {
                this.log.debug(`Repo ${repo.uri} is too soon to execute the next update job.`);
                return;
            }
            this.log.info(`Start to schedule update repo request for ${repo.uri}`);
            let inDelete = false;
            try {
                await this.objectClient.getRepositoryDeleteStatus(repo.uri);
                inDelete = true;
            }
            catch (error) {
                inDelete = false;
            }
            const cloneStatus = await this.objectClient.getRepositoryGitStatus(repo.uri);
            // Schedule update job only when the repo has been fully cloned already and not in delete
            if (!inDelete &&
                cloneStatus.cloneProgress &&
                cloneStatus.cloneProgress.isCloned &&
                cloneStatus.progress === model_1.WorkerReservedProgress.COMPLETED) {
                const payload = repo;
                // Update the next repo update timestamp.
                const nextRepoUpdateTimestamp = this.repoNextSchedulingTime();
                await this.objectClient.updateRepository(repo.uri, {
                    nextUpdateTimestamp: nextRepoUpdateTimestamp,
                });
                await this.updateWorker.enqueueJob(payload, {});
            }
            else {
                this.log.info(`Repo ${repo.uri} has not been fully cloned yet or in update/delete. Skip update.`);
            }
        }
        catch (error) {
            this.log.error(`Schedule update for ${repo.uri} error.`);
            this.log.error(error);
        }
    }
}
exports.UpdateScheduler = UpdateScheduler;
