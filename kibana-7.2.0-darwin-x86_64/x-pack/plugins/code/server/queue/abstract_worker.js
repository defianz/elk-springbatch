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
const esqueue_1 = require("../lib/esqueue");
class AbstractWorker {
    constructor(queue, log) {
        this.queue = queue;
        this.log = log;
        // The id of the worker. Also serves as the id of the job this worker consumes.
        this.id = '';
    }
    // Assemble jobs, for now most of the job object construction should be the same.
    async createJob(payload, options) {
        const timestamp = moment_1.default().valueOf();
        if (options.timeout !== undefined && options.timeout !== null) {
            // If the job explicitly specify the timeout, then honor it.
            return {
                payload,
                options,
                timestamp,
            };
        }
        else {
            // Otherwise, use a default timeout.
            const timeout = await this.getTimeoutMs(payload);
            return {
                payload,
                options: {
                    ...options,
                    timeout,
                },
                timestamp,
            };
        }
    }
    async executeJob(job) {
        // This is an abstract class. Do nothing here. You should override this.
        return new Promise((resolve, _) => {
            resolve();
        });
    }
    // Enqueue the job.
    async enqueueJob(payload, options) {
        const job = await this.createJob(payload, options);
        return new Promise((resolve, reject) => {
            const jobInternal = this.queue.addJob(this.id, job, job.options);
            jobInternal.on(esqueue_1.events.EVENT_JOB_CREATED, async (createdJob) => {
                if (createdJob.id === jobInternal.id) {
                    await this.onJobEnqueued(job);
                    resolve(jobInternal);
                }
            });
            jobInternal.on(esqueue_1.events.EVENT_JOB_CREATE_ERROR, reject);
        });
    }
    bind() {
        const workerFn = (payload, cancellationToken) => {
            const job = {
                ...payload,
                cancellationToken,
            };
            return this.executeJob(job);
        };
        const workerOptions = {
            interval: 5000,
            capacity: 5,
            intervalErrorMultiplier: 1,
        };
        const queueWorker = this.queue.registerWorker(this.id, workerFn, workerOptions);
        queueWorker.on(esqueue_1.events.EVENT_WORKER_COMPLETE, async (res) => {
            const result = res.output.content;
            const job = res.job;
            await this.onJobCompleted(job, result);
        });
        queueWorker.on(esqueue_1.events.EVENT_WORKER_JOB_EXECUTION_ERROR, async (res) => {
            await this.onJobExecutionError(res);
        });
        queueWorker.on(esqueue_1.events.EVENT_WORKER_JOB_TIMEOUT, async (res) => {
            await this.onJobTimeOut(res);
        });
        return this;
    }
    async onJobEnqueued(job) {
        this.log.info(`${this.id} job enqueued with details ${JSON.stringify(job)}`);
        return await this.updateProgress(job, model_1.WorkerReservedProgress.INIT);
    }
    async onJobCompleted(job, res) {
        this.log.info(`${this.id} job completed with result ${JSON.stringify(res)} in ${this.workerTaskDurationSeconds(job)} seconds.`);
        if (res.cancelled) {
            // Skip updating job progress if the job is done because of cancellation.
            return;
        }
        return await this.updateProgress(job, model_1.WorkerReservedProgress.COMPLETED);
    }
    async onJobExecutionError(res) {
        this.log.error(`${this.id} job execution error ${JSON.stringify(res)} in ${this.workerTaskDurationSeconds(res.job)} seconds.`);
        return await this.updateProgress(res.job, model_1.WorkerReservedProgress.ERROR, res.error);
    }
    async onJobTimeOut(res) {
        this.log.error(`${this.id} job timed out ${JSON.stringify(res)} in ${this.workerTaskDurationSeconds(res.job)} seconds.`);
        return await this.updateProgress(res.job, model_1.WorkerReservedProgress.TIMEOUT, res.error);
    }
    async updateProgress(job, progress, error) {
        // This is an abstract class. Do nothing here. You should override this.
        return new Promise((resolve, _) => {
            resolve();
        });
    }
    async getTimeoutMs(payload) {
        // Set to 1 hour by default. Override this function for sub classes if necessary.
        return moment_1.default.duration(1, 'hour').asMilliseconds();
    }
    workerTaskDurationSeconds(job) {
        const diff = moment_1.default().diff(moment_1.default(job.timestamp));
        return moment_1.default.duration(diff).asSeconds();
    }
}
exports.AbstractWorker = AbstractWorker;
