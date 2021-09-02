"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class ElasticsearchSourceStatusAdapter {
    constructor(framework) {
        this.framework = framework;
    }
    async getIndexNames(request, aliasName) {
        const indexMaps = await Promise.all([
            this.framework
                .callWithRequest(request, 'indices.getAlias', {
                name: aliasName,
                filterPath: '*.settings.index.uuid',
            })
                .catch(withDefaultIfNotFound({})),
            this.framework
                .callWithRequest(request, 'indices.get', {
                index: aliasName,
                filterPath: '*.settings.index.uuid',
            })
                .catch(withDefaultIfNotFound({})),
        ]);
        return indexMaps.reduce((indexNames, indexMap) => [...indexNames, ...Object.keys(indexMap)], []);
    }
    async hasAlias(request, aliasName) {
        return await this.framework.callWithRequest(request, 'indices.existsAlias', {
            name: aliasName,
        });
    }
    async hasIndices(request, indexNames) {
        return await this.framework
            .callWithRequest(request, 'search', {
            index: indexNames,
            size: 0,
            terminate_after: 1,
            allow_no_indices: true,
        })
            .then(response => response._shards.total > 0, err => {
            if (err.status === 404) {
                return false;
            }
            throw err;
        });
    }
}
exports.ElasticsearchSourceStatusAdapter = ElasticsearchSourceStatusAdapter;
const withDefaultIfNotFound = (defaultValue) => (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
error) => {
    if (error && error.status === 404) {
        return defaultValue;
    }
    throw error;
};
