"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lsp_method_1 = require("./lsp_method");
class TextDocumentMethods {
    constructor(client) {
        this.client = client;
        this.documentSymbol = new lsp_method_1.LspMethod('textDocument/documentSymbol', this.client);
        this.hover = new lsp_method_1.LspMethod('textDocument/hover', this.client);
        this.definition = new lsp_method_1.LspMethod('textDocument/definition', this.client);
        this.edefinition = new lsp_method_1.LspMethod('textDocument/edefinition', this.client);
        this.references = new lsp_method_1.LspMethod('textDocument/references', this.client);
    }
}
exports.TextDocumentMethods = TextDocumentMethods;
