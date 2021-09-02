"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lsp_client_1 = require("../../../common/lsp_client");
exports.LOADING = 'loading';
class HoverComputer {
    constructor() {
        this.range = null;
        this.uri = null;
        const lspClient = new lsp_client_1.LspRestClient('/api/code/lsp');
        this.lspMethods = new lsp_client_1.TextDocumentMethods(lspClient);
    }
    setParams(uri, range) {
        this.range = range;
        this.uri = uri;
    }
    compute() {
        return this.lspMethods.hover.asyncTask({
            position: {
                line: this.range.startLineNumber - 1,
                character: this.range.startColumn - 1,
            },
            textDocument: {
                uri: this.uri,
            },
        });
    }
    loadingMessage() {
        return {
            range: {
                start: {
                    line: this.range.startLineNumber - 1,
                    character: this.range.startColumn - 1,
                },
                end: {
                    line: this.range.endLineNumber - 1,
                    character: this.range.endColumn - 1,
                },
            },
            contents: exports.LOADING,
        };
    }
}
exports.HoverComputer = HoverComputer;
