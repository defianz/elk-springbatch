"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const search_1 = require("../search");
class LspIndexerFactory {
    constructor(lspService, options, gitOps, client, log) {
        this.lspService = lspService;
        this.options = options;
        this.gitOps = gitOps;
        this.client = client;
        this.log = log;
        this.objectClient = new search_1.RepositoryObjectClient(this.client);
    }
    async create(repoUri, revision, enforcedReindex = false) {
        try {
            const repo = await this.objectClient.getRepository(repoUri);
            const indexedRevision = repo.indexedRevision;
            // Skip incremental indexer if enforced reindex.
            if (!enforcedReindex && indexedRevision) {
                this.log.info(`Create indexer to index ${repoUri} from ${indexedRevision} to ${revision}`);
                // Create the indexer to index only the diff between these 2 revisions.
                return new _1.LspIncrementalIndexer(repoUri, revision, indexedRevision, this.lspService, this.options, this.gitOps, this.client, this.log);
            }
            else {
                this.log.info(`Create indexer to index ${repoUri} at ${revision}`);
                // Create the indexer to index the entire repository.
                return new _1.LspIndexer(repoUri, revision, this.lspService, this.options, this.gitOps, this.client, this.log);
            }
        }
        catch (error) {
            this.log.error(`Create indexer error for ${repoUri}.`);
            this.log.error(error);
            return undefined;
        }
    }
}
exports.LspIndexerFactory = LspIndexerFactory;
