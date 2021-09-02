"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodegit_1 = tslib_1.__importDefault(require("@elastic/nodegit"));
const del_1 = tslib_1.__importDefault(require("del"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const mkdirp_1 = tslib_1.__importDefault(require("mkdirp"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const path_1 = tslib_1.__importDefault(require("path"));
const repository_utils_1 = require("../common/repository_utils");
const GIT_FETCH_PROGRESS_CANCEL = -1;
// TODO: Cannot directly access Git.Error.CODE.EUSER (-7). Investigate why.
const NODEGIT_CALLBACK_RETURN_VALUE_ERROR = -7;
const GIT_INDEXER_PROGRESS_CALLBACK_RETURN_VALUE_ERROR_MSG = `indexer progress callback returned ${GIT_FETCH_PROGRESS_CANCEL}`;
const SSH_AUTH_ERROR = new Error('Failed to authenticate SSH session');
function isCancelled(error) {
    return (error &&
        (error.message.includes(GIT_INDEXER_PROGRESS_CALLBACK_RETURN_VALUE_ERROR_MSG) ||
            error.errno === NODEGIT_CALLBACK_RETURN_VALUE_ERROR));
}
// This is the service for any kind of repository handling, e.g. clone, update, delete, etc.
class RepositoryService {
    constructor(repoVolPath, credsPath, log, enableGitCertCheck) {
        this.repoVolPath = repoVolPath;
        this.credsPath = credsPath;
        this.log = log;
        this.enableGitCertCheck = enableGitCertCheck;
    }
    async clone(repo, handler) {
        if (!repo) {
            throw new Error(`Invalid repository.`);
        }
        else {
            const localPath = repository_utils_1.RepositoryUtils.repositoryLocalPath(this.repoVolPath, repo.uri);
            if (fs_1.default.existsSync(localPath)) {
                this.log.info(`Repository exist in local path. Do update instead of clone.`);
                try {
                    // Do update instead of clone if the local repo exists.
                    const updateRes = await this.update(repo);
                    return {
                        uri: repo.uri,
                        repo: {
                            ...repo,
                            defaultBranch: updateRes.branch,
                            revision: updateRes.revision,
                        },
                    };
                }
                catch (error) {
                    // If failed to update the current git repo living in the disk, clean up the local git repo and
                    // move on with the clone.
                    await this.remove(repo.uri);
                }
            }
            else {
                const parentDir = path_1.default.dirname(localPath);
                // on windows, git clone will failed if parent folder is not exists;
                await new Promise((resolve, reject) => mkdirp_1.default(parentDir, err => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                }));
            }
            // Go head with the actual clone.
            if (repo.protocol === 'ssh') {
                return this.tryWithKeys(key => this.doClone(repo, localPath, handler, key));
            }
            else {
                return await this.doClone(repo, localPath, handler);
            }
        }
    }
    async remove(uri) {
        const localPath = repository_utils_1.RepositoryUtils.repositoryLocalPath(this.repoVolPath, uri);
        try {
            // For now, just `rm -rf`
            await del_1.default([localPath], { force: true });
            this.log.info(`Remove local repository ${uri} done.`);
            return {
                uri,
                res: true,
            };
        }
        catch (error) {
            this.log.error(`Remove local repository ${uri} error: ${error}.`);
            throw error;
        }
    }
    async update(repo, handler) {
        if (repo.protocol === 'ssh') {
            return await this.tryWithKeys(key => this.doUpdate(repo.uri, key, handler));
        }
        else {
            return await this.doUpdate(repo.uri, /* key */ undefined, handler);
        }
    }
    async doUpdate(uri, key, handler) {
        const localPath = repository_utils_1.RepositoryUtils.repositoryLocalPath(this.repoVolPath, uri);
        let repo;
        try {
            repo = await nodegit_1.default.Repository.open(localPath);
            const cbs = {
                transferProgress: (_) => {
                    if (handler) {
                        const resumeUpdate = handler();
                        if (!resumeUpdate) {
                            return GIT_FETCH_PROGRESS_CANCEL;
                        }
                    }
                    return 0;
                },
                credentials: this.credentialFunc(key),
            };
            // Ignore cert check on testing environment.
            if (!this.enableGitCertCheck) {
                cbs.certificateCheck = () => {
                    // Ignore cert check failures.
                    return 0;
                };
            }
            await repo.fetchAll({
                callbacks: cbs,
            });
            // TODO(mengwei): deal with the case when the default branch has changed.
            const currentBranch = await repo.getCurrentBranch();
            const currentBranchName = currentBranch.shorthand();
            const originBranchName = `origin/${currentBranchName}`;
            const originRef = await repo.getReference(originBranchName);
            const headRef = await repo.getReference(currentBranchName);
            if (!originRef.target().equal(headRef.target())) {
                await headRef.setTarget(originRef.target(), 'update');
            }
            const headCommit = await repo.getHeadCommit();
            this.log.debug(`Update repository to revision ${headCommit.sha()}`);
            return {
                uri,
                branch: currentBranchName,
                revision: headCommit.sha(),
            };
        }
        catch (error) {
            if (isCancelled(error)) {
                // Update job was cancelled intentionally. Do not throw this error.
                this.log.info(`Update repository job for ${uri} was cancelled.`);
                this.log.debug(`Update repository job cancellation error: ${JSON.stringify(error, null, 2)}`);
                return {
                    uri,
                    branch: '',
                    revision: '',
                    cancelled: true,
                };
            }
            else if (error.message && error.message.startsWith(SSH_AUTH_ERROR.message)) {
                throw SSH_AUTH_ERROR;
            }
            else {
                const msg = `update repository ${uri} error: ${error}`;
                this.log.error(msg);
                throw new Error(msg);
            }
        }
        finally {
            if (repo) {
                repo.cleanup();
            }
        }
    }
    /**
     * read credentials dir, try using each privateKey until action is successful
     * @param action
     */
    async tryWithKeys(action) {
        const files = fs_1.default.existsSync(this.credsPath)
            ? new Set(fs_1.default.readdirSync(this.credsPath))
            : new Set([]);
        for (const f of files) {
            if (f.endsWith('.pub')) {
                const privateKey = f.slice(0, f.length - 4);
                if (files.has(privateKey)) {
                    try {
                        this.log.debug(`try with key ${privateKey}`);
                        return await action(privateKey);
                    }
                    catch (e) {
                        if (e !== SSH_AUTH_ERROR) {
                            throw e;
                        }
                        // continue to try another key
                    }
                }
            }
        }
        throw SSH_AUTH_ERROR;
    }
    async doClone(repo, localPath, handler, keyFile) {
        try {
            let lastProgressUpdate = moment_1.default();
            const cbs = {
                transferProgress: (stats) => {
                    // Clone progress update throttling.
                    const now = moment_1.default();
                    if (now.diff(lastProgressUpdate) < 1000) {
                        return 0;
                    }
                    lastProgressUpdate = now;
                    if (handler) {
                        const progress = (100 * (stats.receivedObjects() + stats.indexedObjects())) /
                            (stats.totalObjects() * 2);
                        const cloneProgress = {
                            isCloned: false,
                            receivedObjects: stats.receivedObjects(),
                            indexedObjects: stats.indexedObjects(),
                            totalObjects: stats.totalObjects(),
                            localObjects: stats.localObjects(),
                            totalDeltas: stats.totalDeltas(),
                            indexedDeltas: stats.indexedDeltas(),
                            receivedBytes: stats.receivedBytes(),
                        };
                        const resumeClone = handler(progress, cloneProgress);
                        if (!resumeClone) {
                            return GIT_FETCH_PROGRESS_CANCEL;
                        }
                    }
                    return 0;
                },
                credentials: this.credentialFunc(keyFile),
            };
            // Ignore cert check on testing environment.
            if (!this.enableGitCertCheck) {
                cbs.certificateCheck = () => {
                    // Ignore cert check failures.
                    return 0;
                };
            }
            let gitRepo;
            try {
                gitRepo = await nodegit_1.default.Clone.clone(repo.url, localPath, {
                    bare: 1,
                    fetchOpts: {
                        callbacks: cbs,
                    },
                });
                const headCommit = await gitRepo.getHeadCommit();
                const headRevision = headCommit.sha();
                const currentBranch = await gitRepo.getCurrentBranch();
                const currentBranchName = currentBranch.shorthand();
                this.log.info(`Clone repository from ${repo.url} done with head revision ${headRevision} and default branch ${currentBranchName}`);
                return {
                    uri: repo.uri,
                    repo: {
                        ...repo,
                        defaultBranch: currentBranchName,
                        revision: headRevision,
                    },
                };
            }
            finally {
                if (gitRepo) {
                    gitRepo.cleanup();
                }
            }
        }
        catch (error) {
            if (isCancelled(error)) {
                // Clone job was cancelled intentionally. Do not throw this error.
                this.log.info(`Clone repository job for ${repo.uri} was cancelled.`);
                this.log.debug(`Clone repository job cancellation error: ${JSON.stringify(error, null, 2)}`);
                return {
                    uri: repo.uri,
                    repo,
                    cancelled: true,
                };
            }
            else if (error.message && error.message.startsWith(SSH_AUTH_ERROR.message)) {
                throw SSH_AUTH_ERROR;
            }
            else {
                const msg = `Clone repository from ${repo.url} error.`;
                this.log.error(msg);
                this.log.error(error);
                throw new Error(error.message);
            }
        }
    }
    credentialFunc(keyFile) {
        return (url, userName) => {
            if (keyFile) {
                this.log.debug(`try with key ${path_1.default.join(this.credsPath, keyFile)}`);
                return nodegit_1.default.Cred.sshKeyNew(userName, path_1.default.join(this.credsPath, `${keyFile}.pub`), path_1.default.join(this.credsPath, keyFile), '');
            }
            else {
                return nodegit_1.default.Cred.defaultNew();
            }
        };
    }
}
exports.RepositoryService = RepositoryService;
