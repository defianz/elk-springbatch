"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
/* eslint-disable no-console */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const nodegit_1 = tslib_1.__importDefault(require("@elastic/nodegit"));
const rimraf_1 = tslib_1.__importDefault(require("rimraf"));
class TestRepoManager {
    constructor(testConfig) {
        this.repos = testConfig.repos;
    }
    async importAllRepos() {
        for (const repo of this.repos) {
            await this.importRepo(repo.url, repo.path);
        }
    }
    importRepo(url, path) {
        return new Promise(resolve => {
            if (!fs_1.default.existsSync(path)) {
                rimraf_1.default(path, error => {
                    console.log(`begin to import ${url} to ${path}`);
                    nodegit_1.default.Clone.clone(url, path, {
                        fetchOpts: {
                            callbacks: {
                                certificateCheck: () => 0,
                            },
                        },
                    }).then(repo => {
                        console.log(`import ${url} done`);
                        resolve(repo);
                    });
                });
            }
            else {
                resolve();
            }
        });
    }
    async cleanAllRepos() {
        this.repos.forEach(repo => {
            this.cleanRepo(repo.path);
        });
    }
    async cleanRepo(path) {
        return new Promise(resolve => {
            if (fs_1.default.existsSync(path)) {
                rimraf_1.default(path, resolve);
            }
            else {
                resolve(true);
            }
        });
    }
    getRepo(language) {
        return this.repos.filter(repo => {
            return repo.language === language;
        })[0];
    }
}
exports.TestRepoManager = TestRepoManager;
