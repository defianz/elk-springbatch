"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const messageReader_1 = require("vscode-jsonrpc/lib/messageReader");
class HttpMessageReader extends messageReader_1.AbstractMessageReader {
    constructor(httpEmitter) {
        super();
        httpEmitter.on('error', (error) => this.fireError(error));
        httpEmitter.on('close', () => this.fireClose());
        this.httpEmitter = httpEmitter;
    }
    listen(callback) {
        this.httpEmitter.on('message', callback);
    }
}
exports.HttpMessageReader = HttpMessageReader;
