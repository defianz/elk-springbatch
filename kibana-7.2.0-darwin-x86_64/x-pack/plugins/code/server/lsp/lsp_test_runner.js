"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable no-console */
const fs_1 = tslib_1.__importDefault(require("fs"));
// @ts-ignore
const sl = tslib_1.__importStar(require("stats-lite"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const papaparse_1 = tslib_1.__importDefault(require("papaparse"));
const install_manager_1 = require("./install_manager");
const java_launcher_1 = require("./java_launcher");
const language_servers_1 = require("./language_servers");
const ts_launcher_1 = require("./ts_launcher");
const git_operations_1 = require("../git_operations");
const test_utils_1 = require("../test_utils");
const console_logger_factory_1 = require("../utils/console_logger_factory");
const repository_utils_1 = require("../../common/repository_utils");
const test_config_1 = require("../../model/test_config");
const requestTypeMapping = new Map([
    [test_config_1.RequestType.FULL, 'full'],
    [test_config_1.RequestType.HOVER, 'hover'],
    [test_config_1.RequestType.INITIALIZE, 'initialize'],
]);
const serverOptions = test_utils_1.createTestServerOption();
class LspTestRunner {
    constructor(repo, requestType, times) {
        this.repo = repo;
        this.requestType = requestType;
        this.times = times;
        this.proxy = null;
        this.result = {
            repoName: `${repo.url}`,
            startTime: 0,
            numberOfRequests: times,
            rps: 0,
            OK: 0,
            KO: 0,
            KORate: '',
            latency_max: 0,
            latency_min: 0,
            latency_medium: 0,
            latency_95: 0,
            latency_99: 0,
            latency_avg: 0,
            latency_std_dev: 0,
        };
        if (!fs_1.default.existsSync(serverOptions.workspacePath)) {
            fs_1.default.mkdirSync(serverOptions.workspacePath);
        }
    }
    async sendRandomRequest() {
        const repoPath = this.repo.path;
        const files = await this.getAllFile();
        const randomFile = files[Math.floor(Math.random() * files.length)];
        await this.proxy.initialize(repoPath);
        switch (this.requestType) {
            case test_config_1.RequestType.HOVER: {
                const req = {
                    method: 'textDocument/hover',
                    params: {
                        textDocument: {
                            uri: `file://${this.repo.path}/${randomFile}`,
                        },
                        position: this.randomizePosition(),
                    },
                };
                await this.launchRequest(req);
                break;
            }
            case test_config_1.RequestType.INITIALIZE: {
                this.proxy.initialize(repoPath);
                break;
            }
            case test_config_1.RequestType.FULL: {
                const req = {
                    method: 'textDocument/full',
                    params: {
                        textDocument: {
                            uri: `file://${this.repo.path}/${randomFile}`,
                        },
                        reference: false,
                    },
                };
                await this.launchRequest(req);
                break;
            }
            default: {
                console.error('Unknown request type!');
                break;
            }
        }
    }
    async launchRequest(req) {
        this.result.startTime = Date.now();
        let OK = 0;
        let KO = 0;
        const responseTimes = [];
        for (let i = 0; i < this.times; i++) {
            try {
                const start = Date.now();
                await this.proxy.handleRequest(req);
                responseTimes.push(Date.now() - start);
                OK += 1;
            }
            catch (e) {
                KO += 1;
            }
        }
        this.result.KO = KO;
        this.result.OK = OK;
        this.result.KORate = ((KO / this.times) * 100).toFixed(2) + '%';
        this.result.rps = this.times / (Date.now() - this.result.startTime);
        this.collectMetrics(responseTimes);
    }
    collectMetrics(responseTimes) {
        this.result.latency_max = Math.max.apply(null, responseTimes);
        this.result.latency_min = Math.min.apply(null, responseTimes);
        this.result.latency_avg = sl.mean(responseTimes);
        this.result.latency_medium = sl.median(responseTimes);
        this.result.latency_95 = sl.percentile(responseTimes, 0.95);
        this.result.latency_99 = sl.percentile(responseTimes, 0.99);
        this.result.latency_std_dev = sl.stdev(responseTimes).toFixed(2);
    }
    dumpToCSV(resultFile) {
        const newResult = lodash_1.default.mapKeys(this.result, (v, k) => {
            if (k !== 'repoName') {
                return `${requestTypeMapping.get(this.requestType)}_${k}`;
            }
            else {
                return 'repoName';
            }
        });
        if (!fs_1.default.existsSync(resultFile)) {
            console.log(papaparse_1.default.unparse([newResult]));
            fs_1.default.writeFileSync(resultFile, papaparse_1.default.unparse([newResult]));
        }
        else {
            const file = fs_1.default.createReadStream(resultFile);
            papaparse_1.default.parse(file, {
                header: true,
                complete: parsedResult => {
                    const originResults = parsedResult.data;
                    const index = originResults.findIndex(originResult => {
                        return originResult.repoName === newResult.repoName;
                    });
                    if (index === -1) {
                        originResults.push(newResult);
                    }
                    else {
                        originResults[index] = { ...originResults[index], ...newResult };
                    }
                    fs_1.default.writeFileSync(resultFile, papaparse_1.default.unparse(originResults));
                },
            });
        }
    }
    async getAllFile() {
        const gitOperator = new git_operations_1.GitOperations(this.repo.path);
        try {
            const fileTree = await gitOperator.fileTree('', '', 'HEAD', 0, Number.MAX_SAFE_INTEGER, false, Number.MAX_SAFE_INTEGER);
            return repository_utils_1.RepositoryUtils.getAllFiles(fileTree).filter((filePath) => {
                return filePath.endsWith(this.repo.language);
            });
        }
        catch (e) {
            console.error(`get files error: ${e}`);
            throw e;
        }
    }
    randomizePosition() {
        // TODO:pcxu randomize position according to source file
        return {
            line: 19,
            character: 2,
        };
    }
    async launchLspByLanguage() {
        switch (this.repo.language) {
            case 'java': {
                this.proxy = await this.launchJavaLanguageServer();
                break;
            }
            case 'ts': {
                this.proxy = await this.launchTypescriptLanguageServer();
                break;
            }
            default: {
                console.error('unknown language type');
                break;
            }
        }
    }
    async launchTypescriptLanguageServer() {
        const launcher = new ts_launcher_1.TypescriptServerLauncher('127.0.0.1', serverOptions, new console_logger_factory_1.ConsoleLoggerFactory());
        return await launcher.launch(false, 1, language_servers_1.TYPESCRIPT.embedPath);
    }
    async launchJavaLanguageServer() {
        const launcher = new java_launcher_1.JavaLauncher('127.0.0.1', serverOptions, new console_logger_factory_1.ConsoleLoggerFactory());
        // @ts-ignore
        const installManager = new install_manager_1.InstallManager(null, serverOptions);
        return await launcher.launch(false, 1, installManager.installationPath(language_servers_1.JAVA));
    }
}
exports.LspTestRunner = LspTestRunner;
