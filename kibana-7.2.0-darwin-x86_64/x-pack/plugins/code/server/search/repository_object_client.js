"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("../indexer/schema");
/*
 * This RepositoryObjectClient is dedicated to manipulate resository related objects
 * stored in ES.
 */
class RepositoryObjectClient {
    constructor(esClient) {
        this.esClient = esClient;
    }
    async getRepositoryGitStatus(repoUri) {
        return await this.getRepositoryObject(repoUri, schema_1.RepositoryGitStatusReservedField);
    }
    async getRepositoryLspIndexStatus(repoUri) {
        return await this.getRepositoryObject(repoUri, schema_1.RepositoryLspIndexStatusReservedField);
    }
    async getRepositoryDeleteStatus(repoUri) {
        return await this.getRepositoryObject(repoUri, schema_1.RepositoryDeleteStatusReservedField);
    }
    async getRepositoryConfig(repoUri) {
        return await this.getRepositoryObject(repoUri, schema_1.RepositoryConfigReservedField);
    }
    async getRepository(repoUri) {
        return await this.getRepositoryObject(repoUri, schema_1.RepositoryReservedField);
    }
    async getRepositoryRandomStr(repoUri) {
        return await this.getRepositoryObject(repoUri, schema_1.RepositoryRandomPathReservedField);
    }
    async getAllRepositories() {
        const res = await this.esClient.search({
            index: `${schema_1.RepositoryIndexNamePrefix}*`,
            body: {
                query: {
                    exists: {
                        field: schema_1.RepositoryReservedField,
                    },
                },
            },
            from: 0,
            size: 10000,
        });
        const hits = res.hits.hits;
        const repos = hits.map(hit => {
            const repo = hit._source[schema_1.RepositoryReservedField];
            return repo;
        });
        return repos;
    }
    async setRepositoryGitStatus(repoUri, gitStatus) {
        return await this.setRepositoryObject(repoUri, schema_1.RepositoryGitStatusReservedField, gitStatus);
    }
    async setRepositoryLspIndexStatus(repoUri, indexStatus) {
        return await this.setRepositoryObject(repoUri, schema_1.RepositoryLspIndexStatusReservedField, indexStatus);
    }
    async setRepositoryDeleteStatus(repoUri, deleteStatus) {
        return await this.setRepositoryObject(repoUri, schema_1.RepositoryDeleteStatusReservedField, deleteStatus);
    }
    async setRepositoryConfig(repoUri, config) {
        return await this.setRepositoryObject(repoUri, schema_1.RepositoryConfigReservedField, config);
    }
    async setRepositoryRandomStr(repoUri, randomStr) {
        return await this.setRepositoryObject(repoUri, schema_1.RepositoryRandomPathReservedField, randomStr);
    }
    async setRepository(repoUri, repo) {
        return await this.setRepositoryObject(repoUri, schema_1.RepositoryReservedField, repo);
    }
    async updateRepositoryGitStatus(repoUri, obj) {
        return await this.updateRepositoryObject(repoUri, schema_1.RepositoryGitStatusReservedField, obj);
    }
    async updateRepositoryLspIndexStatus(repoUri, obj) {
        return await this.updateRepositoryObject(repoUri, schema_1.RepositoryLspIndexStatusReservedField, obj);
    }
    async updateRepositoryDeleteStatus(repoUri, obj) {
        return await this.updateRepositoryObject(repoUri, schema_1.RepositoryDeleteStatusReservedField, obj);
    }
    async updateRepository(repoUri, obj) {
        return await this.updateRepositoryObject(repoUri, schema_1.RepositoryReservedField, obj);
    }
    async getRepositoryObject(repoUri, reservedFieldName) {
        const res = await this.esClient.get({
            index: schema_1.RepositoryIndexName(repoUri),
            id: this.getRepositoryObjectId(reservedFieldName),
        });
        return res._source[reservedFieldName];
    }
    async setRepositoryObject(repoUri, reservedFieldName, obj) {
        return await this.esClient.index({
            index: schema_1.RepositoryIndexName(repoUri),
            id: this.getRepositoryObjectId(reservedFieldName),
            refresh: 'true',
            body: JSON.stringify({
                [reservedFieldName]: obj,
            }),
        });
    }
    async updateRepositoryObject(repoUri, reservedFieldName, obj) {
        return await this.esClient.update({
            index: schema_1.RepositoryIndexName(repoUri),
            id: this.getRepositoryObjectId(reservedFieldName),
            refresh: 'true',
            body: JSON.stringify({
                doc: {
                    [reservedFieldName]: obj,
                },
            }),
        });
    }
    getRepositoryObjectId(reservedFieldName) {
        return reservedFieldName;
    }
}
exports.RepositoryObjectClient = RepositoryObjectClient;
