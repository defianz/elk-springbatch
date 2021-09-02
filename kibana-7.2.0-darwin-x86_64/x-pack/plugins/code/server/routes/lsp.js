"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const boom_1 = tslib_1.__importDefault(require("boom"));
const lodash_1 = require("lodash");
const vscode_jsonrpc_1 = require("vscode-jsonrpc");
const lsp_error_codes_1 = require("../../common/lsp_error_codes");
const uri_util_1 = require("../../common/uri_util");
const git_operations_1 = require("../git_operations");
const log_1 = require("../log");
const search_1 = require("../search");
const composite_source_merger_1 = require("../utils/composite_source_merger");
const detect_language_1 = require("../utils/detect_language");
const esclient_with_request_1 = require("../utils/esclient_with_request");
const timeout_1 = require("../utils/timeout");
const LANG_SERVER_ERROR = 'language server error';
function lspRoute(server, lspService, serverOptions) {
    const log = new log_1.Logger(server.server);
    server.route({
        path: '/api/code/lsp/textDocument/{method}',
        async handler(req, h) {
            if (typeof req.payload === 'object' && req.payload != null) {
                const method = req.params.method;
                if (method) {
                    try {
                        const result = await timeout_1.promiseTimeout(serverOptions.lsp.requestTimeoutMs, lspService.sendRequest(`textDocument/${method}`, req.payload, 1000));
                        return result;
                    }
                    catch (error) {
                        if (error instanceof vscode_jsonrpc_1.ResponseError) {
                            // hide some errors;
                            if (error.code !== lsp_error_codes_1.UnknownFileLanguage ||
                                error.code !== lsp_error_codes_1.ServerNotInitialized ||
                                error.code !== lsp_error_codes_1.LanguageServerStartFailed) {
                                log.debug(error);
                            }
                            return h
                                .response({ error: { code: error.code, msg: LANG_SERVER_ERROR } })
                                .type('json')
                                .code(500); // different code for LS errors and other internal errors.
                        }
                        else if (error.isBoom) {
                            return error;
                        }
                        else {
                            log.error(error);
                            return h
                                .response({ error: { code: error.code || 500, msg: LANG_SERVER_ERROR } })
                                .type('json')
                                .code(500);
                        }
                    }
                }
                else {
                    return h.response('missing `method` in request').code(400);
                }
            }
            else {
                return h.response('json body required').code(400); // bad request
            }
        },
        method: 'POST',
    });
    server.route({
        path: '/api/code/lsp/findReferences',
        method: 'POST',
        async handler(req, h) {
            try {
                // @ts-ignore
                const { textDocument, position } = req.payload;
                const { uri } = textDocument;
                const response = await timeout_1.promiseTimeout(serverOptions.lsp.requestTimeoutMs, lspService.sendRequest(`textDocument/references`, { textDocument: { uri }, position }, 1000));
                const hover = await lspService.sendRequest('textDocument/hover', {
                    textDocument: { uri },
                    position,
                });
                let title;
                if (hover.result && hover.result.contents) {
                    title = Array.isArray(hover.result.contents)
                        ? hover.result.contents[0].value
                        : hover.result.contents;
                }
                else {
                    title = lodash_1.last(uri.toString().split('/')) + `(${position.line}, ${position.character})`;
                }
                const gitOperations = new git_operations_1.GitOperations(serverOptions.repoPath);
                const files = [];
                const groupedLocations = lodash_1.groupBy(response.result, 'uri');
                for (const url of Object.keys(groupedLocations)) {
                    const { repoUri, revision, file } = uri_util_1.parseLspUrl(url);
                    const locations = groupedLocations[url];
                    const lines = locations.map(l => ({
                        startLine: l.range.start.line,
                        endLine: l.range.end.line,
                    }));
                    const ranges = composite_source_merger_1.expandRanges(lines, 1);
                    const mergedRanges = composite_source_merger_1.mergeRanges(ranges);
                    const blob = await gitOperations.fileContent(repoUri, file, revision);
                    const source = blob
                        .content()
                        .toString('utf8')
                        .split('\n');
                    const language = await detect_language_1.detectLanguage(file, blob.content());
                    const lineMappings = new composite_source_merger_1.LineMapping();
                    const code = composite_source_merger_1.extractSourceContent(mergedRanges, source, lineMappings).join('\n');
                    const lineNumbers = lineMappings.toStringArray();
                    const highlights = locations.map(l => {
                        const { start, end } = l.range;
                        const startLineNumber = lineMappings.lineNumber(start.line);
                        const endLineNumber = lineMappings.lineNumber(end.line);
                        return {
                            startLineNumber,
                            startColumn: start.character + 1,
                            endLineNumber,
                            endColumn: end.character + 1,
                        };
                    });
                    files.push({
                        repo: repoUri,
                        file,
                        language,
                        uri: url,
                        revision,
                        code,
                        lineNumbers,
                        highlights,
                    });
                }
                return { title, files: lodash_1.groupBy(files, 'repo'), uri, position };
            }
            catch (error) {
                log.error(error);
                if (error instanceof vscode_jsonrpc_1.ResponseError) {
                    return h
                        .response({ error: { code: error.code, msg: LANG_SERVER_ERROR } })
                        .type('json')
                        .code(500); // different code for LS errors and other internal errors.
                }
                else if (error.isBoom) {
                    return error;
                }
                else {
                    return h
                        .response({ error: { code: 500, msg: LANG_SERVER_ERROR } })
                        .type('json')
                        .code(500);
                }
            }
        },
    });
}
exports.lspRoute = lspRoute;
function symbolByQnameRoute(server, log) {
    server.route({
        path: '/api/code/lsp/symbol/{qname}',
        method: 'GET',
        async handler(req) {
            try {
                const symbolSearchClient = new search_1.SymbolSearchClient(new esclient_with_request_1.EsClientWithRequest(req), log);
                const res = await symbolSearchClient.findByQname(req.params.qname);
                return res;
            }
            catch (error) {
                return boom_1.default.internal(`Search Exception`);
            }
        },
    });
}
exports.symbolByQnameRoute = symbolByQnameRoute;
