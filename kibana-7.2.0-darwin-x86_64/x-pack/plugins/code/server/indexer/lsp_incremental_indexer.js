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
const git_diff_1 = require("../../common/git_diff");
const uri_util_1 = require("../../common/uri_util");
const model_1 = require("../../model");
const detect_language_1 = require("../utils/detect_language");
const lsp_indexer_1 = require("./lsp_indexer");
const schema_1 = require("./schema");
class LspIncrementalIndexer extends lsp_indexer_1.LspIndexer {
    constructor(repoUri, 
    // The latest revision to be indexed
    revision, 
    // The already indexed revision
    originRevision, lspService, options, gitOps, client, log) {
        super(repoUri, revision, lspService, options, gitOps, client, log);
        this.repoUri = repoUri;
        this.revision = revision;
        this.originRevision = originRevision;
        this.lspService = lspService;
        this.options = options;
        this.gitOps = gitOps;
        this.client = client;
        this.log = log;
        this.type = 'lsp_inc';
        this.diff = undefined;
    }
    async start(progressReporter, checkpointReq) {
        return await super.start(progressReporter, checkpointReq);
    }
    // If the current checkpoint is valid. Otherwise, ignore the checkpoint
    validateCheckpoint(checkpointReq) {
        return (checkpointReq !== undefined &&
            checkpointReq.revision === this.revision &&
            checkpointReq.originRevision === this.originRevision);
    }
    // If it's necessary to refresh (create and reset) all the related indices
    needRefreshIndices(_) {
        return false;
    }
    ifCheckpointMet(req, checkpointReq) {
        // Assume for the same revision pair, the order of the files we iterate the diff is definite
        // everytime.
        return (req.filePath === checkpointReq.filePath &&
            req.revision === checkpointReq.revision &&
            req.originRevision === checkpointReq.originRevision &&
            req.kind === checkpointReq.kind);
    }
    async prepareIndexCreationRequests() {
        // We don't need to create new indices for incremental indexing.
        return [];
    }
    async processRequest(request) {
        const stats = new Map()
            .set(model_1.IndexStatsKey.Symbol, 0)
            .set(model_1.IndexStatsKey.Reference, 0)
            .set(model_1.IndexStatsKey.File, 0)
            .set(model_1.IndexStatsKey.SymbolDeleted, 0)
            .set(model_1.IndexStatsKey.ReferenceDeleted, 0)
            .set(model_1.IndexStatsKey.FileDeleted, 0);
        if (this.isCancelled()) {
            this.log.debug(`Incremental indexer is cancelled. Skip.`);
            return stats;
        }
        const { kind } = request;
        this.log.debug(`Index ${kind} request ${JSON.stringify(request, null, 2)}`);
        switch (kind) {
            case git_diff_1.DiffKind.ADDED: {
                await this.handleAddedRequest(request, stats);
                break;
            }
            case git_diff_1.DiffKind.DELETED: {
                await this.handleDeletedRequest(request, stats);
                break;
            }
            case git_diff_1.DiffKind.MODIFIED: {
                await this.handleModifiedRequest(request, stats);
                break;
            }
            case git_diff_1.DiffKind.RENAMED: {
                await this.handleRenamedRequest(request, stats);
                break;
            }
            default: {
                this.log.debug(`Unsupported diff kind ${kind} for incremental indexing. Skip this request.`);
            }
        }
        return stats;
    }
    async *getIndexRequestIterator() {
        try {
            const { workspaceRepo } = await this.lspService.workspaceHandler.openWorkspace(this.repoUri, 'head');
            const workspaceDir = workspaceRepo.workdir();
            if (this.diff) {
                for (const f of this.diff.files) {
                    yield {
                        repoUri: this.repoUri,
                        localRepoPath: workspaceDir,
                        filePath: f.path,
                        originPath: f.originPath,
                        revision: this.revision,
                        kind: f.kind,
                        originRevision: this.originRevision,
                    };
                }
            }
        }
        catch (error) {
            this.log.error(`Get lsp incremental index requests count error.`);
            this.log.error(error);
            throw error;
        }
    }
    async getIndexRequestCount() {
        try {
            // cache here to avoid pulling the diff twice.
            this.diff = await this.gitOps.getDiff(this.repoUri, this.originRevision, this.revision);
            return this.diff.files.length;
        }
        catch (error) {
            this.log.error(`Get lsp incremental index requests count error.`);
            this.log.error(error);
            throw error;
        }
    }
    async cleanIndex() {
        this.log.info('Do not need to clean index for incremental indexing.');
    }
    async handleAddedRequest(request, stats) {
        const { repoUri, revision, filePath, localRepoPath } = request;
        const lspDocUri = uri_util_1.toCanonicalUrl({ repoUri, revision, file: filePath, schema: 'git:' });
        const symbolNames = new Set();
        try {
            const response = await this.lspService.sendRequest('textDocument/full', {
                textDocument: {
                    uri: lspDocUri,
                },
                reference: this.options.enableGlobalReference,
            });
            if (response && response.result.length > 0) {
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
        catch (error) {
            this.log.error(`Index symbols or references error. Skip to file indexing.`);
            this.log.error(error);
        }
        const localFilePath = `${localRepoPath}${filePath}`;
        const lstat = util_1.default.promisify(fs_1.default.lstat);
        const stat = await lstat(localFilePath);
        const readLink = util_1.default.promisify(fs_1.default.readlink);
        const readFile = util_1.default.promisify(fs_1.default.readFile);
        const content = stat.isSymbolicLink()
            ? await readLink(localFilePath, 'utf8')
            : await readFile(localFilePath, 'utf8');
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
    }
    async handleDeletedRequest(request, stats) {
        const { revision, filePath, repoUri } = request;
        // Delete the document with the exact file path. TODO: add stats
        const docRes = await this.client.deleteByQuery({
            index: schema_1.DocumentIndexName(repoUri),
            body: {
                query: {
                    term: {
                        'path.hierarchy': filePath,
                    },
                },
            },
        });
        if (docRes) {
            stats.set(model_1.IndexStatsKey.FileDeleted, docRes.deleted);
        }
        const lspDocUri = uri_util_1.toCanonicalUrl({ repoUri, revision, file: filePath, schema: 'git:' });
        // Delete all symbols within this file
        const symbolRes = await this.client.deleteByQuery({
            index: schema_1.SymbolIndexName(repoUri),
            body: {
                query: {
                    term: {
                        'symbolInformation.location.uri': lspDocUri,
                    },
                },
            },
        });
        if (symbolRes) {
            stats.set(model_1.IndexStatsKey.SymbolDeleted, symbolRes.deleted);
        }
        // TODO: When references is enabled. Clean up the references as well.
    }
    async handleModifiedRequest(request, stats) {
        const { kind, originRevision, originPath, repoUri, localRepoPath } = request;
        // 1. first delete all related indexed data
        await this.handleDeletedRequest({
            repoUri,
            localRepoPath,
            revision: originRevision,
            filePath: originPath ? originPath : '',
            kind,
            originRevision,
        }, stats);
        // 2. index data with modified version
        await this.handleAddedRequest(request, stats);
    }
    async handleRenamedRequest(request, stats) {
        // Do the same as modified file
        await this.handleModifiedRequest(request, stats);
    }
}
exports.LspIncrementalIndexer = LspIncrementalIndexer;
