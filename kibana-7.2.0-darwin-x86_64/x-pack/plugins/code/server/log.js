"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
class Logger {
    constructor(server, baseTags = ['code']) {
        this.server = server;
        this.baseTags = baseTags;
    }
    info(msg) {
        if (typeof msg !== 'string') {
            msg = util_1.inspect(msg, {
                colors: process.stdout.isTTY,
            });
        }
        this.server.log([...this.baseTags, 'info'], msg);
    }
    error(msg) {
        if (msg instanceof Error) {
            msg = msg.stack;
        }
        if (typeof msg !== 'string') {
            msg = util_1.inspect(msg, {
                colors: process.stdout.isTTY,
            });
        }
        this.server.log([...this.baseTags, 'error'], msg);
    }
    log(message) {
        this.info(message);
    }
    debug(msg) {
        if (typeof msg !== 'string') {
            msg = util_1.inspect(msg, {
                colors: process.stdout.isTTY,
            });
        }
        this.server.log([...this.baseTags, 'debug'], msg);
    }
    warn(msg) {
        if (msg instanceof Error) {
            msg = msg.stack;
        }
        if (typeof msg !== 'string') {
            msg = util_1.inspect(msg, {
                colors: process.stdout.isTTY,
            });
        }
        this.server.log([...this.baseTags, 'warning'], msg);
    }
    // Log subprocess stdout
    stdout(msg) {
        if (typeof msg !== 'string') {
            msg = util_1.inspect(msg, {
                colors: process.stdout.isTTY,
            });
        }
        this.server.log([...this.baseTags, 'debug', 'stdout'], msg);
    }
    // Log subprocess stderr
    stderr(msg) {
        if (typeof msg !== 'string') {
            msg = util_1.inspect(msg, {
                colors: process.stdout.isTTY,
            });
        }
        this.server.log([...this.baseTags, 'error', 'stderr'], msg);
    }
}
exports.Logger = Logger;
