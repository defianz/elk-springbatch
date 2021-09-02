"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const repository_utils_1 = require("../../../common/repository_utils");
exports.ReferenceSchema = {
    category: {
        type: 'keyword',
    },
    location: {
        properties: {
            uri: {
                type: 'text',
            },
        },
    },
    symbol: {
        properties: {
            name: {
                type: 'text',
            },
            kind: {
                type: 'keyword',
            },
            location: {
                properties: {
                    uri: {
                        type: 'text',
                    },
                },
            },
        },
    },
};
exports.ReferenceIndexNamePrefix = `.code-reference`;
exports.ReferenceIndexName = (repoUri) => {
    return `${exports.ReferenceIndexNamePrefix}-${repository_utils_1.RepositoryUtils.normalizeRepoUriToIndexName(repoUri)}`;
};
