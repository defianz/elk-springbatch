"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const _1 = require(".");
const version_json_1 = tslib_1.__importDefault(require("./schema/version.json"));
class IndexVersionController {
    constructor(client, log) {
        this.client = client;
        this.log = log;
        this.version = Number(version_json_1.default.codeIndexVersion);
    }
    async tryUpgrade(request) {
        this.log.debug(`Try upgrade index mapping/settings for index ${request.index}.`);
        const esIndexVersion = await this.getIndexVersionFromES(request.index);
        const needUpgrade = this.needUpgrade(esIndexVersion);
        if (needUpgrade) {
            const migrator = new _1.IndexMigrator(this.client, this.log);
            const oldIndexName = `${request.index}-${esIndexVersion}`;
            this.log.warn(`Migrate index mapping/settings from version ${esIndexVersion} for ${request.index}`);
            return migrator.migrateIndex(oldIndexName, request);
        }
        else {
            this.log.debug(`Index version is update-to-date for ${request.index}`);
        }
    }
    /*
     * Currently there is a simple rule to decide if we need upgrade the index or not: if the index
     * version is smaller than current version specified in the package.json file under `codeIndexVersion`.
     */
    needUpgrade(oldIndexVersion) {
        return oldIndexVersion < this.version;
    }
    async getIndexVersionFromES(indexName) {
        try {
            const res = await this.client.indices.getMapping({
                index: indexName,
            });
            const esIndexName = Object.keys(res)[0];
            const version = lodash_1.default.get(res, [esIndexName, 'mappings', '_meta', 'version'], 0);
            if (version === 0) {
                this.log.error(`Can't find index version for ${indexName}.`);
            }
            return version;
        }
        catch (error) {
            this.log.error(`Get index version error for ${indexName}.`);
            this.log.error(error);
            return 0;
        }
    }
}
exports.IndexVersionController = IndexVersionController;
