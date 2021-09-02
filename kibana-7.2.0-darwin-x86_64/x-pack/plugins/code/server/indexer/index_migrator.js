"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const _1 = require(".");
const search_1 = require("../search");
const version_json_1 = tslib_1.__importDefault(require("./schema/version.json"));
class IndexMigrator {
    constructor(client, log) {
        this.client = client;
        this.log = log;
        this.version = Number(version_json_1.default.codeIndexVersion);
    }
    async migrateIndex(oldIndexName, request) {
        const body = {
            settings: request.settings,
            mappings: {
                // Apply the index version in the reserved _meta field of the index.
                _meta: {
                    version: this.version,
                },
                dynamic_templates: [
                    {
                        fieldDefaultNotAnalyzed: {
                            match: '*',
                            mapping: {
                                index: false,
                                norms: false,
                            },
                        },
                    },
                ],
                properties: request.schema,
            },
        };
        const newIndexName = `${request.index}-${this.version}`;
        try {
            try {
                // Create the new index first with the version as the index suffix number.
                await this.client.indices.create({
                    index: newIndexName,
                    body,
                });
            }
            catch (error) {
                this.log.error(`Create new index ${newIndexName} for index migration error.`);
                this.log.error(error);
                throw error;
            }
            try {
                // Issue the reindex request for import the data from the old index.
                await this.client.reindex({
                    body: {
                        source: {
                            index: oldIndexName,
                        },
                        dest: {
                            index: newIndexName,
                        },
                    },
                });
            }
            catch (error) {
                this.log.error(`Migrate data from ${oldIndexName} to ${newIndexName} for index migration error.`);
                this.log.error(error);
                throw error;
            }
            try {
                // Update the alias
                await this.client.indices.updateAliases({
                    body: {
                        actions: [
                            {
                                remove: {
                                    index: oldIndexName,
                                    alias: request.index,
                                },
                            },
                            {
                                add: {
                                    index: newIndexName,
                                    alias: request.index,
                                },
                            },
                        ],
                    },
                });
            }
            catch (error) {
                this.log.error(`Update the index alias for ${newIndexName} error.`);
                this.log.error(error);
                throw error;
            }
            try {
                // Delete the old index
                await this.client.indices.delete({ index: oldIndexName });
            }
            catch (error) {
                this.log.error(`Clean up the old index ${oldIndexName} error.`);
                this.log.error(error);
                // This won't affect serving, so do not throw the error anymore.
            }
        }
        catch (error) {
            this.log.error(`Index upgrade/migration to version ${this.version} failed.`);
            this.log.error(error);
        }
    }
}
exports.IndexMigrator = IndexMigrator;
exports.tryMigrateIndices = async (client, log) => {
    log.info('Check the versions of Code indices...');
    const repoObjectClient = new search_1.RepositoryObjectClient(client);
    const repos = await repoObjectClient.getAllRepositories();
    const migrationPromises = [];
    for (const repo of repos) {
        const docIndexVersionController = new _1.IndexVersionController(client, log);
        const docCreationReq = _1.getDocumentIndexCreationRequest(repo.uri);
        migrationPromises.push(docIndexVersionController.tryUpgrade(docCreationReq));
        const symbolIndexVersionController = new _1.IndexVersionController(client, log);
        const symbolCreationReq = _1.getSymbolIndexCreationRequest(repo.uri);
        migrationPromises.push(symbolIndexVersionController.tryUpgrade(symbolCreationReq));
        const refIndexVersionController = new _1.IndexVersionController(client, log);
        const refCreationReq = _1.getReferenceIndexCreationRequest(repo.uri);
        migrationPromises.push(refIndexVersionController.tryUpgrade(refCreationReq));
    }
    return Promise.all(migrationPromises);
};
