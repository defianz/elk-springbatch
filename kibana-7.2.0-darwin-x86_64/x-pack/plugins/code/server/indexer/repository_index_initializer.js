"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_indexer_1 = require("./abstract_indexer");
const schema_1 = require("./schema");
// Inherit AbstractIndexer's index creation logics. This is not an actual indexer.
class RepositoryIndexInitializer extends abstract_indexer_1.AbstractIndexer {
    constructor(repoUri, revision, client, log) {
        super(repoUri, revision, client, log);
        this.repoUri = repoUri;
        this.revision = revision;
        this.client = client;
        this.log = log;
        this.type = 'repository';
    }
    async prepareIndexCreationRequests() {
        const creationReq = {
            index: schema_1.RepositoryIndexName(this.repoUri),
            settings: {
                ...schema_1.RepositoryAnalysisSettings,
                number_of_shards: 1,
                auto_expand_replicas: '0-1',
            },
            schema: schema_1.RepositorySchema,
        };
        return [creationReq];
    }
    async init() {
        const res = await this.prepareIndex();
        if (!res) {
            this.log.error(`Initialize repository index failed.`);
        }
        return;
    }
}
exports.RepositoryIndexInitializer = RepositoryIndexInitializer;
