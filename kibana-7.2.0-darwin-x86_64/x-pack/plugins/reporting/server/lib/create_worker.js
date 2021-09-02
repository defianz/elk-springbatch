"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const constants_1 = require("../../common/constants");
// @ts-ignore untyped dependency
const esqueue_1 = require("./esqueue");
// @ts-ignore untyped dependency
const level_logger_1 = require("./level_logger");
// @ts-ignore untyped dependency
const once_per_server_1 = require("./once_per_server");
function createWorkerFn(server) {
    const config = server.config();
    const queueConfig = config.get('xpack.reporting.queue');
    const kibanaName = config.get('server.name');
    const kibanaId = config.get('server.uuid');
    const exportTypesRegistry = server.plugins.reporting.exportTypesRegistry;
    const logger = level_logger_1.LevelLogger.createForServer(server, [constants_1.PLUGIN_ID, 'queue', 'worker']);
    // Once more document types are added, this will need to be passed in
    return function createWorker(queue) {
        // export type / execute job map
        const jobExectors = new Map();
        for (const exportType of exportTypesRegistry.getAll()) {
            const executeJob = exportType.executeJobFactory(server);
            jobExectors.set(exportType.jobType, executeJob);
        }
        const workerFn = (job, jobdoc, cancellationToken) => {
            // pass the work to the jobExecutor
            const jobExecutor = jobExectors.get(job._source.jobtype);
            if (!jobExecutor) {
                throw new Error(`Unable to find a job executor for the claimed job: [${job._id}]`);
            }
            return jobExecutor(jobdoc, cancellationToken);
        };
        const workerOptions = {
            kibanaName,
            kibanaId,
            interval: queueConfig.pollInterval,
            intervalErrorMultiplier: queueConfig.pollIntervalErrorMultiplier,
        };
        const worker = queue.registerWorker(constants_1.PLUGIN_ID, workerFn, workerOptions);
        worker.on(esqueue_1.events.EVENT_WORKER_COMPLETE, (res) => {
            logger.debug(`Worker completed: (${res.job.id})`);
        });
        worker.on(esqueue_1.events.EVENT_WORKER_JOB_EXECUTION_ERROR, (res) => {
            logger.debug(`Worker error: (${res.job.id})`);
        });
        worker.on(esqueue_1.events.EVENT_WORKER_JOB_TIMEOUT, (res) => {
            logger.debug(`Job timeout exceeded: (${res.job.id})`);
        });
    };
}
exports.createWorkerFactory = once_per_server_1.oncePerServer(createWorkerFn);
