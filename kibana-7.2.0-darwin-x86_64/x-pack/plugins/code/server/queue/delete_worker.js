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
const schema_1 = require("../indexer/schema");
const search_1 = require("../search");
const abstract_worker_1 = require("./abstract_worker");
class DeleteWorker extends abstract_worker_1.AbstractWorker {
    constructor(queue, log, client, serverOptions, gitOps, cancellationService, lspService, repoServiceFactory) {
        super(queue, log);
        this.queue = queue;
        this.log = log;
        this.client = client;
        this.serverOptions = serverOptions;
        this.gitOps = gitOps;
        this.cancellationService = cancellationService;
        this.lspService = lspService;
        this.repoServiceFactory = repoServiceFactory;
        this.id = 'delete';
        this.objectClient = new search_1.RepositoryObjectClient(this.client);
    }
    async executeJob(job) {
        const { uri } = job.payload;
        // 1. Cancel running workers
        this.cancellationService.cancelCloneJob(uri);
        this.cancellationService.cancelUpdateJob(uri);
        this.cancellationService.cancelIndexJob(uri);
        // 2. Delete git repository and all related data.
        const repoService = this.repoServiceFactory.newInstance(this.serverOptions.repoPath, this.serverOptions.credsPath, this.log, this.serverOptions.security.enableGitCertCheck);
        const deleteRepoPromise = this.deletePromiseWrapper(repoService.remove(uri), 'git data', uri);
        const deleteWorkspacePromise = this.deletePromiseWrapper(this.lspService.deleteWorkspace(uri), 'workspace', uri);
        // 3. Delete ES indices and aliases
        const deleteSymbolESIndexPromise = this.deletePromiseWrapper(this.client.indices.delete({ index: `${schema_1.SymbolIndexName(uri)}*` }), 'symbol ES index', uri);
        const deleteReferenceESIndexPromise = this.deletePromiseWrapper(this.client.indices.delete({ index: `${schema_1.ReferenceIndexName(uri)}*` }), 'reference ES index', uri);
        try {
            await Promise.all([
                deleteWorkspacePromise,
                deleteSymbolESIndexPromise,
                deleteReferenceESIndexPromise,
            ]);
            this.gitOps.cleanRepo(uri);
            await deleteRepoPromise;
            // 4. Delete the document index and alias where the repository document and all status reside,
            // so that you won't be able to import the same repositories until they are
            // fully removed.
            await this.deletePromiseWrapper(this.client.indices.delete({ index: `${schema_1.DocumentIndexName(uri)}*` }), 'document ES index', uri);
            return {
                uri,
                res: true,
            };
        }
        catch (error) {
            this.log.error(`Delete repository ${uri} error.`);
            this.log.error(error);
            return {
                uri,
                res: false,
            };
        }
    }
    async onJobEnqueued(job) {
        const repoUri = job.payload.uri;
        const progress = {
            uri: repoUri,
            progress: model_1.WorkerReservedProgress.INIT,
            timestamp: new Date(),
        };
        return await this.objectClient.setRepositoryDeleteStatus(repoUri, progress);
    }
    async updateProgress(job, progress) {
        const { uri } = job.payload;
        const p = {
            uri,
            progress,
            timestamp: new Date(),
        };
        if (progress !== model_1.WorkerReservedProgress.COMPLETED) {
            return await this.objectClient.updateRepositoryDeleteStatus(uri, p);
        }
    }
    async getTimeoutMs(_) {
        return (moment_1.default.duration(1, 'hour').asMilliseconds() + moment_1.default.duration(10, 'minutes').asMilliseconds());
    }
    deletePromiseWrapper(promise, type, repoUri) {
        return promise
            .then(() => {
            this.log.info(`Delete ${type} of repository ${repoUri} done.`);
        })
            .catch((error) => {
            this.log.error(`Delete ${type} of repository ${repoUri} error.`);
            this.log.error(error);
        });
    }
}
exports.DeleteWorker = DeleteWorker;
