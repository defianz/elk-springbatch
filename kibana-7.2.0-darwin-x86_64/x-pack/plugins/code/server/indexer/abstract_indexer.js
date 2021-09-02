"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const index_stats_aggregator_1 = require("../utils/index_stats_aggregator");
const index_creator_1 = require("./index_creator");
class AbstractIndexer {
    constructor(repoUri, revision, client, log) {
        this.repoUri = repoUri;
        this.revision = revision;
        this.client = client;
        this.log = log;
        this.type = 'abstract';
        this.cancelled = false;
        this.INDEXER_PROGRESS_UPDATE_INTERVAL_MS = 1000;
        this.indexCreator = new index_creator_1.IndexCreator(client);
    }
    async start(progressReporter, checkpointReq) {
        this.log.info(`Indexer ${this.type} started for repo ${this.repoUri} with revision ${this.revision}`);
        const isCheckpointValid = this.validateCheckpoint(checkpointReq);
        if (this.needRefreshIndices(checkpointReq)) {
            // Prepare the ES index
            const res = await this.prepareIndex();
            if (!res) {
                this.log.error(`Prepare index for ${this.repoUri} error. Skip indexing.`);
                return new Map();
            }
            // Clean up the index if necessary
            await this.cleanIndex();
        }
        // Prepare all the index requests
        let totalCount = 0;
        let prevTimestamp = moment_1.default();
        let successCount = 0;
        let failCount = 0;
        const statsBuffer = [];
        try {
            totalCount = await this.getIndexRequestCount();
        }
        catch (error) {
            this.log.error(`Get index request count for ${this.repoUri} error.`);
            this.log.error(error);
            throw error;
        }
        let meetCheckpoint = false;
        const reqsIterator = await this.getIndexRequestIterator();
        for await (const req of reqsIterator) {
            if (this.isCancelled()) {
                this.log.info(`Indexer cancelled. Stop right now.`);
                break;
            }
            // If checkpoint is valid and has not been met
            if (isCheckpointValid && !meetCheckpoint) {
                meetCheckpoint = meetCheckpoint || this.ifCheckpointMet(req, checkpointReq);
                if (!meetCheckpoint) {
                    // If the checkpoint has not been met yet, skip current request.
                    continue;
                }
                else {
                    this.log.info(`Checkpoint met. Continue with indexing.`);
                }
            }
            try {
                const stats = await this.processRequest(req);
                statsBuffer.push(stats);
                successCount += 1;
            }
            catch (error) {
                this.log.error(`Process index request error. ${error}`);
                failCount += 1;
            }
            // Double check if the the indexer is cancelled or not, because the
            // processRequest process could take fairly long and during this time
            // the index job might have been cancelled already. In this case,
            // we shall not update the progress.
            if (!this.isCancelled() && progressReporter) {
                this.log.debug(`Update progress for ${this.type} indexer.`);
                // Update progress if progress reporter has been provided.
                const progress = {
                    type: this.type,
                    total: totalCount,
                    success: successCount,
                    fail: failCount,
                    percentage: Math.floor((100 * (successCount + failCount)) / totalCount),
                    checkpoint: req,
                };
                if (moment_1.default().diff(prevTimestamp) > this.INDEXER_PROGRESS_UPDATE_INTERVAL_MS) {
                    progressReporter(progress);
                    prevTimestamp = moment_1.default();
                }
            }
        }
        return index_stats_aggregator_1.aggregateIndexStats(statsBuffer);
    }
    cancel() {
        this.cancelled = true;
    }
    isCancelled() {
        return this.cancelled;
    }
    // If the current checkpoint is valid
    validateCheckpoint(checkpointReq) {
        return checkpointReq !== undefined;
    }
    // If it's necessary to refresh (create and reset) all the related indices
    needRefreshIndices(checkpointReq) {
        return false;
    }
    ifCheckpointMet(req, checkpointReq) {
        // Please override this function
        return false;
    }
    async cleanIndex() {
        // This is the abstract implementation. You should override this.
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    async *getIndexRequestIterator() {
        // This is the abstract implementation. You should override this.
    }
    async getIndexRequestCount() {
        // This is the abstract implementation. You should override this.
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    async processRequest(request) {
        // This is the abstract implementation. You should override this.
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    async prepareIndexCreationRequests() {
        // This is the abstract implementation. You should override this.
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    async prepareIndex() {
        const creationReqs = await this.prepareIndexCreationRequests();
        for (const req of creationReqs) {
            try {
                const res = await this.indexCreator.createIndex(req);
                if (!res) {
                    this.log.info(`Index creation failed for ${req.index}.`);
                    return false;
                }
            }
            catch (error) {
                this.log.error(`Index creation error.`);
                this.log.error(error);
                return false;
            }
        }
        return true;
    }
}
exports.AbstractIndexer = AbstractIndexer;
