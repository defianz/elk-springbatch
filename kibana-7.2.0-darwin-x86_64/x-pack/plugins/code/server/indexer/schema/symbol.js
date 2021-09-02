"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const repository_utils_1 = require("../../../common/repository_utils");
exports.SymbolSchema = {
    qname: {
        type: 'text',
        analyzer: 'qname_path_hierarchy_case_sensitive_analyzer',
        fields: {
            // Create a 'lowercased' field to match query in lowercased mode.
            lowercased: {
                type: 'text',
                analyzer: 'qname_path_hierarchy_case_insensitive_analyzer',
            },
        },
    },
    symbolInformation: {
        properties: {
            name: {
                type: 'text',
                analyzer: 'qname_path_hierarchy_case_sensitive_analyzer',
                fields: {
                    // Create a 'lowercased' field to match query in lowercased mode.
                    lowercased: {
                        type: 'text',
                        analyzer: 'qname_path_hierarchy_case_insensitive_analyzer',
                    },
                },
            },
            kind: {
                type: 'integer',
                index: false,
            },
            location: {
                properties: {
                    uri: {
                        // Indexed now for symbols batch deleting in incremental indexing
                        type: 'keyword',
                    },
                },
            },
        },
    },
};
exports.SymbolAnalysisSettings = {
    analysis: {
        analyzer: {
            qname_path_hierarchy_case_sensitive_analyzer: {
                type: 'custom',
                tokenizer: 'qname_path_hierarchy_tokenizer',
            },
            qname_path_hierarchy_case_insensitive_analyzer: {
                type: 'custom',
                tokenizer: 'qname_path_hierarchy_tokenizer',
                filter: ['lowercase'],
            },
        },
        tokenizer: {
            qname_path_hierarchy_tokenizer: {
                type: 'path_hierarchy',
                delimiter: '.',
                reverse: 'true',
            },
        },
    },
};
exports.SymbolIndexNamePrefix = `.code-symbol`;
exports.SymbolIndexName = (repoUri) => {
    return `${exports.SymbolIndexNamePrefix}-${repository_utils_1.RepositoryUtils.normalizeRepoUriToIndexName(repoUri)}`;
};
exports.SymbolSearchIndexWithScope = (repoScope) => {
    return repoScope.map((repoUri) => `${exports.SymbolIndexName(repoUri)}*`).join(',');
};
