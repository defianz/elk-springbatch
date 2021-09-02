"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const standaloneCodeServiceImpl_js_1 = require("monaco-editor/esm/vs/editor/standalone/browser/standaloneCodeServiceImpl.js");
const kfetch_1 = require("ui/kfetch");
const messages_1 = require("vscode-jsonrpc/lib/messages");
const uri_util_1 = require("../../common/uri_util");
const url_1 = require("../utils/url");
class EditorService extends standaloneCodeServiceImpl_js_1.StandaloneCodeEditorServiceImpl {
    constructor(getUrlQuery) {
        super();
        this.getUrlQuery = getUrlQuery;
    }
    static async handleSymbolUri(qname, getUrlQuery) {
        const result = await EditorService.findSymbolByQname(qname);
        if (result.symbols.length > 0) {
            const symbol = result.symbols[0].symbolInformation;
            const { schema, uri } = uri_util_1.parseSchema(symbol.location.uri);
            if (schema === 'git:') {
                const { line, character } = symbol.location.range.start;
                const url = uri + `!L${line + 1}:${character + 1}`;
                url_1.history.push(`${url}${getUrlQuery()}`);
            }
        }
    }
    static async findSymbolByQname(qname) {
        try {
            const response = await kfetch_1.kfetch({
                pathname: `/api/code/lsp/symbol/${qname}`,
                method: 'GET',
            });
            return response;
        }
        catch (e) {
            const error = e.body;
            throw new messages_1.ResponseError(error.code, error.message, error.data);
        }
    }
    async openCodeEditor(input, source, sideBySide) {
        const { scheme, authority, path } = input.resource;
        if (scheme === 'symbol') {
            await EditorService.handleSymbolUri(authority, this.getUrlQuery);
        }
        else {
            const uri = `/${authority}${path}`;
            if (input.options && input.options.selection) {
                const { startColumn, startLineNumber } = input.options.selection;
                const url = uri + `!L${startLineNumber}:${startColumn}`;
                const currentPath = window.location.hash.substring(1);
                if (currentPath === url) {
                    this.helper.revealPosition(startLineNumber, startColumn);
                }
                else {
                    url_1.history.push(`${url}${this.getUrlQuery()}`);
                }
            }
        }
        return source;
    }
    setMonacoHelper(helper) {
        this.helper = helper;
    }
}
exports.EditorService = EditorService;
