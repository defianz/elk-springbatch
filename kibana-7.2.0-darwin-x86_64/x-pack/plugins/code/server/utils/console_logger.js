"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
class ConsoleLogger extends log_1.Logger {
    constructor() {
        // @ts-ignore
        super(undefined);
    }
    info(msg) {
        console.info(msg);
    }
    error(msg) {
        console.error(msg);
    }
    log(message) {
        this.info(message);
    }
    debug(msg) {
        console.debug(msg);
    }
    warn(msg) {
        console.warn(msg);
    }
    stdout(msg) {
        console.info(msg);
    }
    stderr(msg) {
        console.error(msg);
    }
}
exports.ConsoleLogger = ConsoleLogger;
