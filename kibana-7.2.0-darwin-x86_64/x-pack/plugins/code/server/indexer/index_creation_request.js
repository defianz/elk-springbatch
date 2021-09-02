"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
exports.getDocumentIndexCreationRequest = (repoUri) => {
    return {
        index: schema_1.DocumentIndexName(repoUri),
        settings: {
            ...schema_1.DocumentAnalysisSettings,
            number_of_shards: 1,
            auto_expand_replicas: '0-1',
        },
        schema: schema_1.DocumentSchema,
    };
};
exports.getSymbolIndexCreationRequest = (repoUri) => {
    return {
        index: schema_1.SymbolIndexName(repoUri),
        settings: {
            ...schema_1.SymbolAnalysisSettings,
            number_of_shards: 1,
            auto_expand_replicas: '0-1',
        },
        schema: schema_1.SymbolSchema,
    };
};
exports.getReferenceIndexCreationRequest = (repoUri) => {
    return {
        index: schema_1.ReferenceIndexName(repoUri),
        settings: {
            number_of_shards: 1,
            auto_expand_replicas: '0-1',
        },
        schema: schema_1.ReferenceSchema,
    };
};
