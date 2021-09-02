"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("vscode-jsonrpc/lib/messages");
var text_document_methods_1 = require("./text_document_methods");
exports.TextDocumentMethods = text_document_methods_1.TextDocumentMethods;
const kfetch_1 = require("ui/kfetch");
class LspRestClient {
    constructor(baseUri) {
        this.baseUri = baseUri;
    }
    async sendRequest(method, params, signal) {
        try {
            const response = await kfetch_1.kfetch({
                pathname: `${this.baseUri}/${method}`,
                method: 'POST',
                body: JSON.stringify(params),
                signal,
            });
            return response;
        }
        catch (e) {
            let error = e;
            if (error.body && error.body.error) {
                error = error.body.error;
            }
            throw new messages_1.ResponseError(error.code, error.message, error.data);
        }
    }
}
exports.LspRestClient = LspRestClient;
