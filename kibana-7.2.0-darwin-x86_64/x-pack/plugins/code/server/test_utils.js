"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const os = tslib_1.__importStar(require("os"));
const path_1 = tslib_1.__importDefault(require("path"));
const server_options_1 = require("./server_options");
// TODO migrate other duplicate classes, functions
exports.emptyAsyncFunc = async (_) => {
    Promise.resolve({});
};
const TEST_OPTIONS = {
    enabled: true,
    queueIndex: '.code_internal-worker-queue',
    queueTimeoutMs: 60 * 60 * 1000,
    updateFreqencyMs: 5 * 60 * 1000,
    indexFrequencyMs: 24 * 60 * 60 * 1000,
    lsp: {
        requestTimeoutMs: 5 * 60,
        detach: false,
        verbose: false,
    },
    security: {
        enableMavenImport: true,
        enableGradleImport: true,
        installNodeDependency: true,
        enableGitCertCheck: false,
        gitProtocolWhitelist: ['ssh', 'https', 'git'],
    },
    repos: [],
    maxWorkspace: 5,
    disableIndexScheduler: true,
};
function createTestServerOption() {
    const tmpDataPath = fs_1.default.mkdtempSync(path_1.default.join(os.tmpdir(), 'code_test'));
    const config = {
        get(key) {
            if (key === 'path.data') {
                return tmpDataPath;
            }
        },
    };
    return new server_options_1.ServerOptions(TEST_OPTIONS, config);
}
exports.createTestServerOption = createTestServerOption;
