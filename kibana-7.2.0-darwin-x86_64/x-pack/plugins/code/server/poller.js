"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Borrowed from https://github.com/elastic/kibana/blob/master/x-pack/common/poller.js
 */
// Because the timers lib is global for Nodejs, it's not necessary to explicit import it.
// Also explicitly importing this lib is going to make Sinon fake timer fail to work.
// import { clearTimeout, setTimeout } from 'timers';
const noop = () => {
    // noop
};
class Poller {
    constructor(options) {
        this.functionToPoll = options.functionToPoll; // Must return a Promise
        this.successFunction = options.successFunction || noop;
        this.errorFunction = options.errorFunction || noop;
        this.pollFrequencyInMillis = options.pollFrequencyInMillis;
        this.trailing = options.trailing || false;
        this.continuePollingOnError = options.continuePollingOnError || false;
        this.pollFrequencyErrorMultiplier = options.pollFrequencyErrorMultiplier || 1;
    }
    getPollFrequency() {
        return this.pollFrequencyInMillis;
    }
    start() {
        if (this.isRunning()) {
            return;
        }
        if (this.trailing) {
            this.timeoutId = global.setTimeout(this.poll.bind(this), this.pollFrequencyInMillis);
        }
        else {
            this.poll();
        }
    }
    stop() {
        if (this.timeoutId) {
            global.clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }
    isRunning() {
        return !!this.timeoutId;
    }
    async poll() {
        try {
            await this.successFunction(await this.functionToPoll());
            if (!this.isRunning()) {
                return;
            }
            this.timeoutId = global.setTimeout(this.poll.bind(this), this.pollFrequencyInMillis);
        }
        catch (error) {
            await this.errorFunction(error);
            if (!this.isRunning()) {
                return;
            }
            if (this.continuePollingOnError) {
                this.timeoutId = global.setTimeout(this.poll.bind(this), this.pollFrequencyInMillis * this.pollFrequencyErrorMultiplier);
            }
            else {
                this.stop();
            }
        }
    }
}
exports.Poller = Poller;
