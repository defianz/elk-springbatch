"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const messageWriter_1 = require("vscode-jsonrpc/lib/messageWriter");
class HttpMessageWriter extends messageWriter_1.AbstractMessageWriter {
    constructor(replies, logger) {
        super();
        this.replies = replies;
        this.logger = logger;
    }
    write(msg) {
        const response = msg;
        if (response.id != null) {
            // this is a response
            const id = response.id;
            const reply = this.replies.get(id);
            if (reply) {
                this.replies.delete(id);
                const [resolve, reject] = reply;
                if (response.error) {
                    reject(response.error);
                }
                else {
                    resolve(response);
                }
            }
            else {
                if (this.logger) {
                    this.logger.error('missing reply functions for ' + id);
                }
            }
        }
        else {
            if (this.logger) {
                this.logger.info(`ignored message ${JSON.stringify(msg)} because of no id`);
            }
        }
    }
}
exports.HttpMessageWriter = HttpMessageWriter;
