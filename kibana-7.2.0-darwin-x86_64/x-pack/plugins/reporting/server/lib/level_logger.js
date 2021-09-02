"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class LevelLogger {
    static createForServer(server, tags) {
        const serverLog = (tgs, msg) => server.log(tgs, msg);
        return new LevelLogger(serverLog, tags);
    }
    constructor(logger, tags) {
        this._logger = logger;
        this._tags = tags;
        /*
         * This shortcut provides maintenance convenience: Reporting code has been
         * using both .warn and .warning
         */
        this.warn = this.warning.bind(this);
    }
    error(msg, tags = []) {
        this._logger([...this._tags, ...tags, 'error'], msg);
    }
    warning(msg, tags = []) {
        this._logger([...this._tags, ...tags, 'warning'], msg);
    }
    debug(msg, tags = []) {
        this._logger([...this._tags, ...tags, 'debug'], msg);
    }
    info(msg, tags = []) {
        this._logger([...this._tags, ...tags, 'info'], msg);
    }
    clone(tags) {
        return new LevelLogger(this._logger, [...this._tags, ...tags]);
    }
}
exports.LevelLogger = LevelLogger;
