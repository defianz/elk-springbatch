"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * This BatchIndexHelper acts as the index request cache for elasticsearch
 * bulk index API.
 */
class BatchIndexHelper {
    constructor(client, log, batchSize = BatchIndexHelper.DEFAULT_BATCH_SIZE) {
        this.client = client;
        this.log = log;
        this.batchSize = batchSize;
        this.cancelled = false;
        this.batch = [];
    }
    async index(index, body) {
        if (this.isCancelled()) {
            this.log.debug(`Batch index helper is cancelled. Skip.`);
            return;
        }
        this.batch.push({
            index: {
                _index: index,
            },
        });
        this.batch.push(body);
        if (this.batch.length >= this.batchSize * 2) {
            return await this.flush();
        }
    }
    async flush() {
        if (this.batch.length === 0) {
            this.log.debug(`0 index requests found. Skip.`);
            return;
        }
        if (this.isCancelled()) {
            this.log.debug(`Batch index helper is cancelled. Skip.`);
            return;
        }
        try {
            this.log.debug(`Batch indexed ${this.batch.length / 2} documents.`);
            return await this.client.bulk({ body: this.batch });
        }
        catch (error) {
            // TODO(mengwei): should we throw this exception again?
            this.log.error(`Batch index ${this.batch.length / 2} documents error. Skip.`);
            this.log.error(error);
        }
        finally {
            this.batch = [];
        }
    }
    isCancelled() {
        return this.cancelled;
    }
    cancel() {
        this.cancelled = true;
    }
}
BatchIndexHelper.DEFAULT_BATCH_SIZE = 1000;
exports.BatchIndexHelper = BatchIndexHelper;
