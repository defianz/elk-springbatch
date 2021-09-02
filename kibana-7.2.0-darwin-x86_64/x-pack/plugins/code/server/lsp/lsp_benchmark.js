"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const js_yaml_1 = tslib_1.__importDefault(require("js-yaml"));
const test_config_1 = require("../../model/test_config");
const test_repo_manager_1 = require("./test_repo_manager");
const lsp_test_runner_1 = require("./lsp_test_runner");
jest.setTimeout(300000);
let repoManger;
const resultFile = `benchmark_result_${Date.now()}.csv`;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
beforeAll(async () => {
    const config = js_yaml_1.default.safeLoad(fs_1.default.readFileSync('test_config.yml', 'utf8'));
    repoManger = new test_repo_manager_1.TestRepoManager(config);
    await repoManger.importAllRepos();
});
it('test Java lsp full', async () => {
    const repo = repoManger.getRepo('java');
    const runner = new lsp_test_runner_1.LspTestRunner(repo, test_config_1.RequestType.FULL, 10);
    await runner.launchLspByLanguage();
    // sleep until jdt connection established
    await sleep(3000);
    await runner.sendRandomRequest();
    await runner.proxy.exit();
    runner.dumpToCSV(resultFile);
    expect(true);
});
it('test Java lsp hover', async () => {
    const repo = repoManger.getRepo('java');
    const runner = new lsp_test_runner_1.LspTestRunner(repo, test_config_1.RequestType.HOVER, 10);
    await runner.launchLspByLanguage();
    // sleep until jdt connection established
    await sleep(3000);
    await runner.sendRandomRequest();
    await runner.proxy.exit();
    runner.dumpToCSV(resultFile);
    expect(true);
});
it('test ts lsp full', async () => {
    const repo = repoManger.getRepo('ts');
    const runner = new lsp_test_runner_1.LspTestRunner(repo, test_config_1.RequestType.FULL, 10);
    await runner.launchLspByLanguage();
    await sleep(2000);
    await runner.sendRandomRequest();
    await runner.proxy.exit();
    runner.dumpToCSV(resultFile);
    await sleep(2000);
    expect(true);
});
it('test ts lsp hover', async () => {
    const repo = repoManger.getRepo('ts');
    const runner = new lsp_test_runner_1.LspTestRunner(repo, test_config_1.RequestType.HOVER, 10);
    await runner.launchLspByLanguage();
    await sleep(3000);
    await runner.sendRandomRequest();
    await runner.proxy.exit();
    runner.dumpToCSV(resultFile);
    await sleep(2000);
    expect(true);
});
afterAll(async () => {
    // eslint-disable-next-line no-console
    console.log(`result file ${path_1.default.resolve(__dirname)}/${resultFile} was saved!`);
    await repoManger.cleanAllRepos();
});
