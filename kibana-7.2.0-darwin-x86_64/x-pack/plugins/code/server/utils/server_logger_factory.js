"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("../log");
class ServerLoggerFactory {
    constructor(server) {
        this.server = server;
    }
    getLogger(tags) {
        return new log_1.Logger(this.server, tags);
    }
}
exports.ServerLoggerFactory = ServerLoggerFactory;
