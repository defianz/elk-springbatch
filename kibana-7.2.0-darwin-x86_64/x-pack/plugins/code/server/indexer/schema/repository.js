"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
exports.RepositorySchema = document_1.DocumentSchema;
exports.RepositoryAnalysisSettings = document_1.DocumentAnalysisSettings;
exports.RepositoryIndexNamePrefix = document_1.DocumentIndexNamePrefix;
exports.RepositoryIndexName = document_1.DocumentIndexName;
exports.RepositorySearchIndexWithScope = document_1.DocumentSearchIndexWithScope;
// The field name of repository object nested in the Document index.
exports.RepositoryReservedField = 'repository';
// The field name of repository git status object nested in the Document index.
exports.RepositoryGitStatusReservedField = 'repository_git_status';
// The field name of repository delete status object nested in the Document index.
exports.RepositoryDeleteStatusReservedField = 'repository_delete_status';
// The field name of repository lsp index status object nested in the Document index.
exports.RepositoryLspIndexStatusReservedField = 'repository_lsp_index_status';
// The field name of repository config object nested in the Document index.
exports.RepositoryConfigReservedField = 'repository_config';
// The field name of repository config object nested in the Document index.
exports.RepositoryRandomPathReservedField = 'repository_random_path';
exports.ALL_RESERVED = [
    exports.RepositoryReservedField,
    exports.RepositoryGitStatusReservedField,
    exports.RepositoryDeleteStatusReservedField,
    exports.RepositoryLspIndexStatusReservedField,
    exports.RepositoryConfigReservedField,
    exports.RepositoryRandomPathReservedField,
];
