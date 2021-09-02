"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../indexer/schema");
const poller_1 = require("../poller");
class AbstractScheduler {
    constructor(client, pollFrequencyMs, onScheduleFinished) {
        this.client = client;
        this.onScheduleFinished = onScheduleFinished;
        this.poller = new poller_1.Poller({
            functionToPoll: () => {
                return this.schedule();
            },
            pollFrequencyInMillis: pollFrequencyMs,
            trailing: true,
            continuePollingOnError: true,
            pollFrequencyErrorMultiplier: 2,
        });
    }
    start() {
        this.poller.start();
    }
    stop() {
        this.poller.stop();
    }
    async schedule() {
        const res = await this.client.search({
            index: `${schema_1.RepositoryIndexNamePrefix}*`,
            body: {
                query: {
                    exists: {
                        field: schema_1.RepositoryReservedField,
                    },
                },
            },
            from: 0,
            size: 10000,
        });
        const schedulingPromises = Array.from(res.hits.hits).map((hit) => {
            const repo = hit._source[schema_1.RepositoryReservedField];
            return this.executeSchedulingJob(repo);
        });
        await Promise.all(schedulingPromises);
        // Execute the callback after each schedule is done.
        if (this.onScheduleFinished) {
            this.onScheduleFinished();
        }
    }
    repoNextSchedulingTime() {
        const duration = this.getRepoSchedulingFrequencyMs() / 2 +
            ((Math.random() * Number.MAX_SAFE_INTEGER) % this.getRepoSchedulingFrequencyMs());
        const now = new Date().getTime();
        return new Date(now + duration);
    }
    getRepoSchedulingFrequencyMs() {
        // This is an abstract class. Do nothing here. You should override this.
        return -1;
    }
    async executeSchedulingJob(repo) {
        // This is an abstract class. Do nothing here. You should override this.
        return new Promise((resolve, _) => {
            resolve();
        });
    }
}
exports.AbstractScheduler = AbstractScheduler;
