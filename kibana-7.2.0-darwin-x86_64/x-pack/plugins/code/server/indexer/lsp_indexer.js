"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const util_1 = tslib_1.__importDefault(require("util"));
const vscode_jsonrpc_1 = require("vscode-jsonrpc");
const file_1 = require("../../common/file");
const lsp_error_codes_1 = require("../../common/lsp_error_codes");
const uri_util_1 = require("../../common/uri_util");
const model_1 = require("../../model");
const detect_language_1 = require("../utils/detect_language");
const abstract_indexer_1 = require("./abstract_indexer");
const batch_index_helper_1 = require("./batch_index_helper");
const index_creation_request_1 = require("./index_creation_request");
const schema_1 = require("./schema");
class LspIndexer extends abstract_indexer_1.AbstractIndexer {
    constructor(repoUri, revision, lspService, options, gitOps, client, log) {
        super(repoUri, revision, client, log);
        this.repoUri = repoUri;
        this.revision = revision;
        this.lspService = lspService;
        this.options = options;
        this.gitOps = gitOps;
        this.client = client;
        this.log = log;
        this.type = 'lsp';
        this.LSP_BATCH_INDEX_SIZE = 1000;
        this.DOC_BATCH_INDEX_SIZE = 50;
        this.lspBatchIndexHelper = new batch_index_helper_1.BatchIndexHelper(client, log, this.LSP_BATCH_INDEX_SIZE);
        this.docBatchIndexHelper = new batch_index_helper_1.BatchIndexHelper(client, log, this.DOC_BATCH_INDEX_SIZE);
    }
    async start(progressReporter, checkpointReq) {
        try {
            return await super.start(progressReporter, checkpointReq);
        }
        finally {
            if (!this.isCancelled()) {
                // Flush all the index request still in the cache for bulk index.
                this.lspBatchIndexHelper.flush();
                this.docBatchIndexHelper.flush();
            }
        }
    }
    cancel() {
        this.lspBatchIndexHelper.cancel();
        this.docBatchIndexHelper.cancel();
        super.cancel();
    }
    // If the current checkpoint is valid
    validateCheckpoint(checkpointReq) {
        return checkpointReq !== undefined && checkpointReq.revision === this.revision;
    }
    // If it's necessary to refresh (create and reset) all the related indices
    needRefreshIndices(checkpointReq) {
        // If it's not resumed from a checkpoint, then try to refresh all the indices.
        return !this.validateCheckpoint(checkpointReq);
    }
    ifCheckpointMet(req, checkpointReq) {
        // Assume for the same revision, the order of the files we iterate the repository is definite
        // everytime.
        return req.filePath === checkpointReq.filePath && req.revision === checkpointReq.revision;
    }
    async prepareIndexCreationRequests() {
        return [
            index_creation_request_1.getDocumentIndexCreationRequest(this.repoUri),
            index_creation_request_1.getReferenceIndexCreationRequest(this.repoUri),
            index_creation_request_1.getSymbolIndexCreationRequest(this.repoUri),
        ];
    }
    async *getIndexRequestIterator() {
        let repo;
        try {
            const { workspaceRepo, workspaceRevision, } = await this.lspService.workspaceHandler.openWorkspace(this.repoUri, 'head');
            repo = workspaceRepo;
            const workspaceDir = workspaceRepo.workdir();
            const fileIterator = await this.gitOps.iterateRepo(this.repoUri, 'head');
            for await (const file of fileIterator) {
                const filePath = file.path;
                const req = {
                    repoUri: this.repoUri,
                    localRepoPath: workspaceDir,
                    filePath,
                    revision: workspaceRevision,
                };
                yield req;
            }
        }
        catch (error) {
            this.log.error(`Prepare lsp indexing requests error.`);
            this.log.error(error);
            throw error;
        }
        finally {
            if (repo) {
                repo.cleanup();
            }
        }
    }
    async getIndexRequestCount() {
        try {
            return await this.gitOps.countRepoFiles(this.repoUri, 'head');
        }
        catch (error) {
            this.log.error(`Get lsp index requests count error.`);
            this.log.error(error);
            throw error;
        }
    }
    async cleanIndex() {
        // Clean up all the symbol documents in the symbol index
        try {
            await this.client.deleteByQuery({
                index: schema_1.SymbolIndexName(this.repoUri),
                body: {
                    query: {
                        match_all: {},
                    },
                },
            });
            this.log.info(`Clean up symbols for ${this.repoUri} done.`);
        }
        catch (error) {
            this.log.error(`Clean up symbols for ${this.repoUri} error.`);
            this.log.error(error);
        }
        // Clean up all the reference documents in the reference index
        try {
            await this.client.deleteByQuery({
                index: schema_1.ReferenceIndexName(this.repoUri),
                body: {
                    query: {
                        match_all: {},
                    },
                },
            });
            this.log.info(`Clean up references for ${this.repoUri} done.`);
        }
        catch (error) {
            this.log.error(`Clean up references for ${this.repoUri} error.`);
            this.log.error(error);
        }
        // Clean up all the document documents in the document index but keep the repository document.
        try {
            await this.client.deleteByQuery({
                index: schema_1.DocumentIndexName(this.repoUri),
                body: {
                    query: {
                        bool: {
                            must_not: schema_1.ALL_RESERVED.map((field) => ({
                                exists: {
                                    field,
                                },
                            })),
                        },
                    },
                },
            });
            this.log.info(`Clean up documents for ${this.repoUri} done.`);
        }
        catch (error) {
            this.log.error(`Clean up documents for ${this.repoUri} error.`);
            this.log.error(error);
        }
    }
    async processRequest(request) {
        const stats = new Map()
            .set(model_1.IndexStatsKey.Symbol, 0)
            .set(model_1.IndexStatsKey.Reference, 0)
            .set(model_1.IndexStatsKey.File, 0);
        const { repoUri, revision, filePath, localRepoPath } = request;
        this.log.debug(`Indexing ${filePath} at revision ${revision} for ${repoUri}`);
        const lspDocUri = uri_util_1.toCanonicalUrl({ repoUri, revision, file: filePath, schema: 'git:' });
        const symbolNames = new Set();
        const localFilePath = `${localRepoPath}${filePath}`;
        const lstat = util_1.default.promisify(fs_1.default.lstat);
        const stat = await lstat(localFilePath);
        if (stat.size > file_1.TEXT_FILE_LIMIT) {
            this.log.debug(`File size exceeds limit. Skip index.`);
            return stats;
        }
        const readLink = util_1.default.promisify(fs_1.default.readlink);
        const readFile = util_1.default.promisify(fs_1.default.readFile);
        const content = stat.isSymbolicLink()
            ? await readLink(localFilePath, 'utf8')
            : await readFile(localFilePath, 'utf8');
        try {
            const lang = detect_language_1.detectLanguageByFilename(filePath);
            // filter file by language
            if (lang && this.lspService.supportLanguage(lang)) {
                const response = await this.lspService.sendRequest('textDocument/full', {
                    textDocument: {
                        uri: lspDocUri,
                    },
                    reference: this.options.enableGlobalReference,
                });
                if (response && response.result && response.result.length > 0 && response.result[0]) {
                    const { symbols, references } = response.result[0];
                    for (const symbol of symbols) {
                        await this.lspBatchIndexHelper.index(schema_1.SymbolIndexName(repoUri), symbol);
                        symbolNames.add(symbol.symbolInformation.name);
                    }
                    stats.set(model_1.IndexStatsKey.Symbol, symbols.length);
                    for (const ref of references) {
                        await this.lspBatchIndexHelper.index(schema_1.ReferenceIndexName(repoUri), ref);
                    }
                    stats.set(model_1.IndexStatsKey.Reference, references.length);
                }
                else {
                    this.log.debug(`Empty response from lsp server. Skip symbols and references indexing.`);
                }
            }
            else {
                this.log.debug(`Unsupported language. Skip symbols and references indexing.`);
            }
        }
        catch (error) {
            if (error instanceof vscode_jsonrpc_1.ResponseError && error.code === lsp_error_codes_1.LanguageServerNotInstalled) {
                // TODO maybe need to report errors to the index task and warn user later
                this.log.debug(`Index symbols or references error due to language server not installed`);
            }
            else if (error instanceof vscode_jsonrpc_1.ResponseError && error.code === lsp_error_codes_1.LanguageServerStartFailed) {
                this.log.debug(`Index symbols or references error due to language server can't be started.`);
            }
            else {
                this.log.warn(`Index symbols or references error.`);
                this.log.warn(error);
            }
        }
        const language = await detect_language_1.detectLanguage(filePath, Buffer.from(content));
        const body = {
            repoUri,
            path: filePath,
            content,
            language,
            qnames: Array.from(symbolNames),
        };
        await this.docBatchIndexHelper.index(schema_1.DocumentIndexName(repoUri), body);
        stats.set(model_1.IndexStatsKey.File, 1);
        return stats;
    }
}
exports.LspIndexer = LspIndexer;
