"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const model_1 = require("../../model");
const search_1 = require("../search");
const index_stats_aggregator_1 = require("../utils/index_stats_aggregator");
const abstract_worker_1 = require("./abstract_worker");
class IndexWorker extends abstract_worker_1.AbstractWorker {
    constructor(queue, log, client, indexerFactories, gitOps, cancellationService) {
        super(queue, log);
        this.queue = queue;
        this.log = log;
        this.client = client;
        this.indexerFactories = indexerFactories;
        this.gitOps = gitOps;
        this.cancellationService = cancellationService;
        this.id = 'index';
        this.objectClient = new search_1.RepositoryObjectClient(this.client);
    }
    async executeJob(job) {
        const { payload, cancellationToken } = job;
        const { uri, revision, enforceReindex } = payload;
        const indexerNumber = this.indexerFactories.length;
        const workerProgress = (await this.objectClient.getRepositoryLspIndexStatus(uri));
        let checkpointReq;
        if (workerProgress) {
            // There exist an ongoing index process
            const { uri: currentUri, revision: currentRevision, indexProgress: currentIndexProgress, progress, } = workerProgress;
            checkpointReq = currentIndexProgress && currentIndexProgress.checkpoint;
            if (!checkpointReq &&
                progress > model_1.WorkerReservedProgress.INIT &&
                progress < model_1.WorkerReservedProgress.COMPLETED &&
                currentUri === uri &&
                currentRevision === revision) {
                // If
                // * no checkpoint exist (undefined or empty string)
                // * index progress is ongoing
                // * the uri and revision match the current job
                // Then we can safely dedup this index job request.
                this.log.info(`Index job skipped for ${uri} at revision ${revision}`);
                return {
                    uri,
                    revision,
                };
            }
        }
        // Binding the index cancellation logic
        let cancelled = false;
        this.cancellationService.cancelIndexJob(uri);
        const indexPromises = this.indexerFactories.map(async (indexerFactory, index) => {
            const indexer = await indexerFactory.create(uri, revision, enforceReindex);
            if (!indexer) {
                this.log.info(`Failed to create indexer for ${uri}`);
                return new Map(); // return an empty map as stats.
            }
            if (cancellationToken) {
                cancellationToken.on(() => {
                    indexer.cancel();
                    cancelled = true;
                });
                this.cancellationService.registerIndexJobToken(uri, cancellationToken);
            }
            const progressReporter = this.getProgressReporter(uri, revision, index, indexerNumber);
            return indexer.start(progressReporter, checkpointReq);
        });
        const stats = await Promise.all(indexPromises);
        const res = {
            uri,
            revision,
            stats: index_stats_aggregator_1.aggregateIndexStats(stats),
            cancelled,
        };
        return res;
    }
    async onJobEnqueued(job) {
        const { uri, revision } = job.payload;
        const progress = {
            uri,
            progress: model_1.WorkerReservedProgress.INIT,
            timestamp: new Date(),
            revision,
        };
        return await this.objectClient.setRepositoryLspIndexStatus(uri, progress);
    }
    async onJobCompleted(job, res) {
        if (res.cancelled) {
            // Skip updating job progress if the job is done because of cancellation.
            return;
        }
        this.log.info(`Index worker finished with stats: ${JSON.stringify([...res.stats])}`);
        await super.onJobCompleted(job, res);
        const { uri, revision } = job.payload;
        try {
            return await this.objectClient.updateRepository(uri, { indexedRevision: revision });
        }
        catch (error) {
            this.log.error(`Update indexed revision in repository object error.`);
            this.log.error(error);
        }
    }
    async updateProgress(job, progress) {
        const { uri } = job.payload;
        let p = {
            uri,
            progress,
            timestamp: new Date(),
        };
        if (progress === model_1.WorkerReservedProgress.COMPLETED ||
            progress === model_1.WorkerReservedProgress.ERROR ||
            progress === model_1.WorkerReservedProgress.TIMEOUT) {
            // Reset the checkpoint if necessary.
            p = {
                ...p,
                indexProgress: {
                    checkpoint: null,
                },
            };
        }
        try {
            return await this.objectClient.updateRepositoryLspIndexStatus(uri, p);
        }
        catch (error) {
            this.log.error(`Update index progress error.`);
            this.log.error(error);
        }
    }
    async getTimeoutMs(payload) {
        try {
            const totalCount = await this.gitOps.countRepoFiles(payload.uri, 'head');
            let timeout = moment_1.default.duration(1, 'hour').asMilliseconds();
            if (totalCount > 0) {
                // timeout = ln(file_count) in hour
                // e.g. 10 files -> 2.3 hours, 100 files -> 4.6 hours, 1000 -> 6.9 hours, 10000 -> 9.2 hours
                timeout = moment_1.default.duration(Math.log(totalCount), 'hour').asMilliseconds();
            }
            this.log.info(`Set index job timeout to be ${timeout} ms.`);
            return timeout;
        }
        catch (error) {
            this.log.error(`Get repo file total count error.`);
            this.log.error(error);
            throw error;
        }
    }
    getProgressReporter(repoUri, revision, index, total) {
        return async (progress) => {
            const p = {
                uri: repoUri,
                progress: progress.percentage,
                timestamp: new Date(),
                revision,
                indexProgress: progress,
            };
            return await this.objectClient.setRepositoryLspIndexStatus(repoUri, p);
        };
    }
}
exports.IndexWorker = IndexWorker;
