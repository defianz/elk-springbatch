"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const kfetch_1 = require("ui/kfetch");
const lsp_client_1 = require("../../../common/lsp_client");
function provideDefinition(monaco, model, position) {
    const lspClient = new lsp_client_1.LspRestClient('/api/code/lsp');
    const lspMethods = new lsp_client_1.TextDocumentMethods(lspClient);
    function handleLocation(location) {
        return {
            uri: monaco.Uri.parse(location.uri),
            range: {
                startLineNumber: location.range.start.line + 1,
                startColumn: location.range.start.character + 1,
                endLineNumber: location.range.end.line + 1,
                endColumn: location.range.end.character + 1,
            },
        };
    }
    async function handleQname(qname) {
        const res = await kfetch_1.kfetch({ pathname: `/api/code/lsp/symbol/${qname}` });
        if (res.symbols) {
            return res.symbols.map((s) => handleLocation(s.symbolInformation.location));
        }
        return [];
    }
    return lspMethods.edefinition
        .send({
        position: {
            line: position.lineNumber - 1,
            character: position.column - 1,
        },
        textDocument: {
            uri: model.uri.toString(),
        },
    })
        .then((result) => {
        if (result) {
            const locations = result.filter(l => l.location !== undefined);
            if (locations.length > 0) {
                return locations.map(l => handleLocation(l.location));
            }
            else {
                return Promise.all(result.filter(l => l.qname !== undefined).map(l => handleQname(l.qname))).then(lodash_1.flatten);
            }
        }
        else {
            return [];
        }
    }, (_) => {
        return [];
    });
}
exports.provideDefinition = provideDefinition;
