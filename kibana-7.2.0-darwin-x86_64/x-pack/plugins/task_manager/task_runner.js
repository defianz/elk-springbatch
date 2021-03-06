"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * This module contains the core logic for running an individual task.
 * It handles the full lifecycle of a task run, including error handling,
 * rescheduling, middleware application, etc.
 */
const joi_1 = tslib_1.__importDefault(require("joi"));
const intervals_1 = require("./lib/intervals");
const task_1 = require("./task");
/**
 * Runs a background task, ensures that errors are properly handled,
 * allows for cancellation.
 *
 * @export
 * @class TaskManagerRunner
 * @implements {TaskRunner}
 */
class TaskManagerRunner {
    /**
     * Creates an instance of TaskManagerRunner.
     * @param {Opts} opts
     * @prop {Logger} logger - The task manager logger
     * @prop {TaskDefinition} definition - The definition of the task being run
     * @prop {ConcreteTaskInstance} instance - The record describing this particular task instance
     * @prop {Updatable} store - The store used to read / write tasks instance info
     * @prop {kbnServer} kbnServer - An async function that provides the task's run context
     * @prop {BeforeRunFunction} beforeRun - A function that adjusts the run context prior to running the task
     * @memberof TaskManagerRunner
     */
    constructor(opts) {
        this.instance = sanitizeInstance(opts.instance);
        this.definitions = opts.definitions;
        this.logger = opts.logger;
        this.store = opts.store;
        this.kbnServer = opts.kbnServer;
        this.beforeRun = opts.beforeRun;
    }
    /**
     * Gets how many workers are occupied by this task instance.
     * Per Joi validation logic, this will return a number >= 1
     */
    get numWorkers() {
        return this.definition.numWorkers;
    }
    /**
     * Gets the id of this task instance.
     */
    get id() {
        return this.instance.id;
    }
    /**
     * Gets the task type of this task instance.
     */
    get taskType() {
        return this.instance.taskType;
    }
    /**
     * Gets the task defintion from the dictionary.
     */
    get definition() {
        return this.definitions[this.taskType];
    }
    /**
     * Gets whether or not this task has run longer than its expiration setting allows.
     */
    get isExpired() {
        return this.instance.runAt < new Date();
    }
    /**
     * Returns a log-friendly representation of this task.
     */
    toString() {
        return `${this.taskType} "${this.id}"`;
    }
    /**
     * Runs the task, handling the task result, errors, etc, rescheduling if need
     * be. NOTE: the time of applying the middleware's beforeRun is incorporated
     * into the total timeout time the task in configured with. We may decide to
     * start the timer after beforeRun resolves
     *
     * @returns {Promise<RunResult>}
     */
    async run() {
        this.logger.debug(`Running task ${this}`);
        const modifiedContext = await this.beforeRun({
            kbnServer: this.kbnServer,
            taskInstance: this.instance,
        });
        try {
            this.task = this.definition.createTaskRunner(modifiedContext);
            const result = await this.task.run();
            const validatedResult = this.validateResult(result);
            return this.processResult(validatedResult);
        }
        catch (err) {
            this.logger.error(`Task ${this} failed: ${err}`);
            // in error scenario, we can not get the RunResult
            // re-use modifiedContext's state, which is correct as of beforeRun
            return this.processResult({ error: err, state: modifiedContext.taskInstance.state });
        }
    }
    /**
     * Attempts to claim exclusive rights to run the task. If the attempt fails
     * with a 409 (http conflict), we assume another Kibana instance beat us to the punch.
     *
     * @returns {Promise<boolean>}
     */
    async claimOwnership() {
        const VERSION_CONFLICT_STATUS = 409;
        try {
            this.instance = await this.store.update({
                ...this.instance,
                status: 'running',
                runAt: intervals_1.intervalFromNow(this.definition.timeout),
            });
            return true;
        }
        catch (error) {
            if (error.statusCode !== VERSION_CONFLICT_STATUS) {
                throw error;
            }
        }
        return false;
    }
    /**
     * Attempts to cancel the task.
     *
     * @returns {Promise<void>}
     */
    async cancel() {
        const { task } = this;
        if (task && task.cancel) {
            this.task = undefined;
            return task.cancel();
        }
        this.logger.warning(`The task ${this} is not cancellable.`);
    }
    validateResult(result) {
        const { error } = joi_1.default.validate(result, task_1.validateRunResult);
        if (error) {
            this.logger.warning(`Invalid task result for ${this}: ${error.message}`);
        }
        return result || { state: {} };
    }
    async processResultForRecurringTask(result) {
        // recurring task: update the task instance
        const state = result.state || this.instance.state || {};
        const status = this.instance.attempts < this.store.maxAttempts ? 'idle' : 'failed';
        let runAt;
        if (status === 'failed') {
            // task run errored, keep the same runAt
            runAt = this.instance.runAt;
        }
        else {
            runAt =
                result.runAt ||
                    intervals_1.intervalFromNow(this.instance.interval) ||
                    // when result.error is truthy, then we're retrying because it failed
                    intervals_1.minutesFromNow((this.instance.attempts + 1) * 5); // incrementally backs off an extra 5m per failure
        }
        await this.store.update({
            ...this.instance,
            runAt,
            state,
            status,
            attempts: result.error ? this.instance.attempts + 1 : 0,
        });
        return result;
    }
    async processResultWhenDone(result) {
        // not a recurring task: clean up by removing the task instance from store
        try {
            await this.store.remove(this.instance.id);
        }
        catch (err) {
            if (err.statusCode === 404) {
                this.logger.warning(`Task cleanup of ${this} failed in processing. Was remove called twice?`);
            }
            else {
                throw err;
            }
        }
        return result;
    }
    async processResult(result) {
        if (result.runAt || this.instance.interval || result.error) {
            await this.processResultForRecurringTask(result);
        }
        else {
            await this.processResultWhenDone(result);
        }
        return result;
    }
}
exports.TaskManagerRunner = TaskManagerRunner;
function sanitizeInstance(instance) {
    return {
        ...instance,
        params: instance.params || {},
        state: instance.state || {},
    };
}
