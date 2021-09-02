"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const uri_util_1 = require("../common/uri_util");
const search_1 = require("./search");
class RepositoryConfigController {
    constructor(esClient) {
        this.esClient = esClient;
        this.repositoryConfigCache = {};
        this.repoObjectClient = new search_1.RepositoryObjectClient(esClient);
    }
    async isLanguageDisabled(uri, lang) {
        const { repoUri } = uri_util_1.parseLspUrl(uri);
        let repoConfig = this.repositoryConfigCache[repoUri];
        if (!repoConfig) {
            try {
                repoConfig = await this.repoObjectClient.getRepositoryConfig(repoUri);
            }
            catch (err) {
                return false;
            }
        }
        if (lang === 'go' && repoConfig.disableGo === true) {
            return true;
        }
        if (lang === 'java' && repoConfig.disableJava === true) {
            return true;
        }
        if (lang === 'typescript' && repoConfig.disableTypescript === true) {
            return true;
        }
        return false;
    }
    async resetConfigCache(repoUri) {
        delete this.repositoryConfigCache[repoUri];
    }
}
exports.RepositoryConfigController = RepositoryConfigController;
