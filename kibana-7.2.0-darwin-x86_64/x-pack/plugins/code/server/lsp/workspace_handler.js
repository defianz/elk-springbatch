"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodegit_1 = require("@elastic/nodegit");
const boom_1 = tslib_1.__importDefault(require("boom"));
const del_1 = tslib_1.__importDefault(require("del"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const lodash_1 = require("lodash");
const mkdirp_1 = tslib_1.__importDefault(require("mkdirp"));
const path_1 = tslib_1.__importDefault(require("path"));
const repository_utils_1 = require("../../common/repository_utils");
const uri_util_1 = require("../../common/uri_util");
const model_1 = require("../../model");
const search_1 = require("../search");
exports.MAX_RESULT_COUNT = 20;
class WorkspaceHandler {
    constructor(gitOps, workspacePath, client, loggerFactory) {
        this.gitOps = gitOps;
        this.workspacePath = workspacePath;
        this.client = client;
        this.revisionMap = {};
        this.objectClient = undefined;
        // this.git = new GitOperations(repoPath);
        this.log = loggerFactory.getLogger(['LSP', 'workspace']);
        if (this.client) {
            this.objectClient = new search_1.RepositoryObjectClient(this.client);
        }
    }
    /**
     * open workspace for repositoryUri, update it from bare repository if necessary.
     * @param repositoryUri the uri of bare repository.
     * @param revision
     */
    async openWorkspace(repositoryUri, revision) {
        // Try get repository clone status with 3 retries at maximum.
        const tryGetGitStatus = async (retryCount) => {
            let gitStatus;
            try {
                gitStatus = await this.objectClient.getRepositoryGitStatus(repositoryUri);
            }
            catch (error) {
                throw boom_1.default.internal(`checkout workspace on an unknown status repository`);
            }
            if (!repository_utils_1.RepositoryUtils.hasFullyCloned(gitStatus.cloneProgress) &&
                gitStatus.progress < model_1.WorkerReservedProgress.COMPLETED) {
                if (retryCount < 3) {
                    this.log.debug(`Check repository ${repositoryUri} clone status at trial ${retryCount}`);
                    return lodash_1.delay(tryGetGitStatus, 3000, retryCount + 1);
                }
                else {
                    throw boom_1.default.internal(`repository has not been fully cloned yet.`);
                }
            }
        };
        if (this.objectClient) {
            await tryGetGitStatus(0);
        }
        const bareRepo = await this.gitOps.openRepo(repositoryUri);
        const targetCommit = await this.gitOps.getCommit(repositoryUri, revision);
        const defaultBranch = await this.gitOps.getDefaultBranch(repositoryUri);
        if (revision !== defaultBranch) {
            await this.checkCommit(bareRepo, targetCommit);
            revision = defaultBranch;
        }
        let workspaceRepo;
        if (await this.workspaceExists(bareRepo, repositoryUri, revision)) {
            workspaceRepo = await this.updateWorkspace(repositoryUri, revision, targetCommit);
        }
        else {
            workspaceRepo = await this.cloneWorkspace(bareRepo, repositoryUri, revision, targetCommit);
        }
        const workspaceHeadCommit = await workspaceRepo.getHeadCommit();
        if (workspaceHeadCommit.sha() !== targetCommit.sha()) {
            const commit = await workspaceRepo.getCommit(targetCommit.sha());
            this.log.info(`checkout ${workspaceRepo.workdir()} to commit ${targetCommit.sha()}`);
            // @ts-ignore
            const result = await nodegit_1.Reset.reset(workspaceRepo, commit, 3 /* HARD */, {});
            if (result !== undefined && result !== 0 /* OK */) {
                throw boom_1.default.internal(`checkout workspace to commit ${targetCommit.sha()} failed.`);
            }
        }
        this.setWorkspaceRevision(workspaceRepo, workspaceHeadCommit);
        return { workspaceRepo, workspaceRevision: workspaceHeadCommit.sha().substring(0, 7) };
    }
    async listWorkspaceFolders(repoUri) {
        const workspaceDir = await this.workspaceDir(repoUri);
        const isDir = (source) => fs_1.default.lstatSync(source).isDirectory();
        try {
            return fs_1.default
                .readdirSync(workspaceDir)
                .map(name => path_1.default.join(workspaceDir, name))
                .filter(isDir);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                this.log.debug('Cannot find workspace dirs');
                return [];
            }
            else {
                throw error;
            }
        }
    }
    async clearWorkspace(repoUri) {
        const workspaceDir = await this.workspaceDir(repoUri);
        await del_1.default([workspaceDir], { force: true });
    }
    async handleRequest(request) {
        const { method, params } = request;
        switch (method) {
            case 'textDocument/edefinition':
            case 'textDocument/definition':
            case 'textDocument/hover':
            case 'textDocument/references':
            case 'textDocument/documentSymbol':
            case 'textDocument/full': {
                const payload = params;
                const { filePath, workspacePath, workspaceRevision } = await this.resolveUri(params.textDocument.uri);
                if (filePath) {
                    request.documentUri = payload.textDocument.uri;
                    payload.textDocument.uri = request.resolvedFilePath = filePath;
                    request.workspacePath = workspacePath;
                    request.workspaceRevision = workspaceRevision;
                }
                break;
            }
            default:
            // do nothing
        }
    }
    handleResponse(request, response) {
        const { method } = request;
        switch (method) {
            case 'textDocument/hover': {
                const result = response.result;
                this.handleHoverContents(result);
                return response;
            }
            case 'textDocument/edefinition': {
                let result = response.result;
                if (result) {
                    if (!Array.isArray(result)) {
                        response.result = result = [result];
                    }
                    for (const def of result) {
                        this.convertLocation(def.location);
                    }
                }
                return response;
            }
            case 'textDocument/definition': {
                const result = response.result;
                if (result) {
                    if (Array.isArray(result)) {
                        result.forEach(location => this.convertLocation(location));
                    }
                    else {
                        this.convertLocation(result);
                    }
                }
                return response;
            }
            case 'textDocument/full': {
                // unify the result of full as a array.
                const result = Array.isArray(response.result)
                    ? response.result
                    : [response.result];
                for (const full of result) {
                    if (full.symbols) {
                        for (const symbol of full.symbols) {
                            this.convertLocation(symbol.symbolInformation.location);
                            if (symbol.contents !== null || symbol.contents !== undefined) {
                                this.handleHoverContents(symbol);
                            }
                        }
                    }
                    if (full.references) {
                        for (const reference of full.references) {
                            this.convertLocation(reference.location);
                            if (reference.target.location) {
                                this.convertLocation(reference.target.location);
                            }
                        }
                    }
                }
                response.result = result;
                return response;
            }
            case 'textDocument/references': {
                if (response.result) {
                    const locations = response.result.slice(0, exports.MAX_RESULT_COUNT);
                    for (const location of locations) {
                        this.convertLocation(location);
                    }
                    response.result = locations;
                }
                return response;
            }
            case 'textDocument/documentSymbol': {
                if (response.result) {
                    for (const symbol of response.result) {
                        this.convertLocation(symbol.location);
                    }
                }
                return response;
            }
            default:
                return response;
        }
    }
    handleHoverContents(result) {
        if (!Array.isArray(result.contents)) {
            if (typeof result.contents === 'string') {
                result.contents = [{ language: '', value: result.contents }];
            }
            else {
                result.contents = [result.contents];
            }
        }
        else {
            result.contents = Array.from(result.contents).map(c => {
                if (typeof c === 'string') {
                    return { language: '', value: c };
                }
                else {
                    return c;
                }
            });
        }
    }
    parseLocation(location) {
        const uri = location.uri;
        const prefix = path_1.default.sep === '\\' ? 'file:///' : 'file://';
        if (uri && uri.startsWith(prefix)) {
            const locationPath = fs_1.default.realpathSync(decodeURIComponent(uri.substring(prefix.length)));
            const workspacePath = fs_1.default.realpathSync(decodeURIComponent(this.workspacePath));
            // On windows, it's possible one path has c:\ and another has C:\, so we need compare case-insensitive
            if (locationPath.toLocaleLowerCase().startsWith(workspacePath.toLocaleLowerCase())) {
                let relativePath = path_1.default.relative(workspacePath, locationPath);
                if (path_1.default.sep === '\\') {
                    relativePath = relativePath.replace(/\\/gi, '/');
                }
                const regex = /^(.*?\/.*?\/.*?)\/(__.*?\/)?([^_]+?)\/(.*)$/;
                const m = relativePath.match(regex);
                if (m) {
                    const repoUri = m[1];
                    const revision = m[3];
                    const gitRevision = this.revisionMap[`${repoUri}/${revision}`] || revision;
                    const file = m[4];
                    return { repoUri, revision: gitRevision, file };
                }
            }
            // @ts-ignore
            throw new Error("path in response doesn't not starts with workspace path");
        }
        return null;
    }
    convertLocation(location) {
        if (location) {
            const parsedLocation = this.parseLocation(location);
            if (parsedLocation) {
                const { repoUri, revision, file } = parsedLocation;
                location.uri = `git://${repoUri}/blob/${revision}/${file}`;
            }
            return parsedLocation;
        }
    }
    fileUrl(str) {
        let pathName = str.replace(/\\/g, '/');
        // Windows drive letter must be prefixed with a slash
        if (pathName[0] !== '/') {
            pathName = '/' + pathName;
        }
        return 'file://' + pathName;
    }
    /**
     * convert a git uri to absolute file path, checkout code into workspace
     * @param uri the uri
     */
    async resolveUri(uri) {
        if (uri.startsWith('git://')) {
            const { repoUri, file, revision } = uri_util_1.parseLspUrl(uri);
            const { workspaceRepo, workspaceRevision } = await this.openWorkspace(repoUri, revision);
            if (file) {
                const isValidPath = await this.checkFile(workspaceRepo, file);
                if (!isValidPath) {
                    throw new Error('invalid fle path in requests.');
                }
            }
            return {
                workspacePath: workspaceRepo.workdir(),
                filePath: this.fileUrl(path_1.default.resolve(workspaceRepo.workdir(), file || '/')),
                uri,
                workspaceRevision,
            };
        }
        else {
            return {
                workspacePath: undefined,
                workspaceRevision: undefined,
                filePath: undefined,
                uri,
            };
        }
    }
    async checkCommit(repository, commit) {
        // we only support headCommit now.
        const headCommit = await repository.getHeadCommit();
        if (headCommit.sha() !== commit.sha()) {
            throw boom_1.default.badRequest(`revision must be master.`);
        }
    }
    async workspaceExists(bareRepo, repositoryUri, revision) {
        const workTreeName = this.workspaceWorktreeBranchName(revision);
        const wt = this.getWorktree(bareRepo, workTreeName);
        if (wt) {
            const workspaceDir = await this.revisionDir(repositoryUri, revision);
            return fs_1.default.existsSync(workspaceDir);
        }
        return false;
    }
    async revisionDir(repositoryUri, revision) {
        return path_1.default.join(await this.workspaceDir(repositoryUri), revision);
    }
    async workspaceDir(repoUri) {
        const randomStr = this.objectClient && (await this.objectClient.getRepositoryRandomStr(repoUri));
        const base = path_1.default.join(this.workspacePath, repoUri);
        if (randomStr) {
            return path_1.default.join(base, `__${randomStr}`);
        }
        else {
            return base;
        }
    }
    workspaceWorktreeBranchName(repoName) {
        return `workspace-${repoName}`;
    }
    async updateWorkspace(repositoryUri, revision, targetCommit) {
        const workspaceDir = await this.revisionDir(repositoryUri, revision);
        const workspaceRepo = await nodegit_1.Repository.open(workspaceDir);
        const workspaceHead = await workspaceRepo.getHeadCommit();
        if (workspaceHead.sha() !== targetCommit.sha()) {
            const commit = await workspaceRepo.getCommit(targetCommit.sha());
            this.log.info(`Checkout workspace ${workspaceDir} to ${targetCommit.sha()}`);
            // @ts-ignore
            const result = await nodegit_1.Reset.reset(workspaceRepo, commit, 3 /* HARD */, {});
            if (result !== undefined && result !== 0 /* OK */) {
                throw boom_1.default.internal(`Reset workspace to commit ${targetCommit.sha()} failed.`);
            }
        }
        return workspaceRepo;
    }
    async cloneWorkspace(bareRepo, repositoryUri, revision, targetCommit) {
        const workspaceDir = await this.revisionDir(repositoryUri, revision);
        this.log.info(`Create workspace ${workspaceDir} from url ${bareRepo.path()}`);
        const parentDir = path_1.default.dirname(workspaceDir);
        // on windows, git clone will failed if parent folder is not exists;
        await new Promise((resolve, reject) => mkdirp_1.default(parentDir, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        }));
        const workTreeName = this.workspaceWorktreeBranchName(revision);
        await this.pruneWorktree(bareRepo, workTreeName);
        // Create the worktree and open it as Repository.
        const wt = await nodegit_1.Worktree.add(bareRepo, workTreeName, workspaceDir, { lock: 0, version: 1 });
        // @ts-ignore
        const workspaceRepo = await nodegit_1.Repository.openFromWorktree(wt);
        const workspaceHeadCommit = await workspaceRepo.getHeadCommit();
        // when we start supporting multi-revision, targetCommit may not be head
        if (workspaceHeadCommit.sha() !== targetCommit.sha()) {
            const commit = await workspaceRepo.getCommit(targetCommit.sha());
            this.log.info(`checkout ${workspaceRepo.workdir()} to commit ${targetCommit.sha()}`);
            // @ts-ignore
            const result = await nodegit_1.Reset.reset(workspaceRepo, commit, 3 /* HARD */, {});
            if (result !== undefined && result !== 0 /* OK */) {
                throw boom_1.default.internal(`checkout workspace to commit ${targetCommit.sha()} failed.`);
            }
        }
        return workspaceRepo;
    }
    async getWorktree(bareRepo, workTreeName) {
        try {
            const wt = await nodegit_1.Worktree.lookup(bareRepo, workTreeName);
            return wt;
        }
        catch (e) {
            return null;
        }
    }
    async pruneWorktree(bareRepo, workTreeName) {
        const wt = await this.getWorktree(bareRepo, workTreeName);
        if (wt) {
            wt.prune({ flags: 1 });
            try {
                // try delete the worktree branch
                const ref = await bareRepo.getReference(`refs/heads/${workTreeName}`);
                ref.delete();
            }
            catch (e) {
                // it doesn't matter if branch is not exists
            }
        }
    }
    setWorkspaceRevision(workspaceRepo, headCommit) {
        const workspaceRelativePath = path_1.default.relative(this.workspacePath, workspaceRepo.workdir());
        this.revisionMap[workspaceRelativePath] = headCommit.sha().substring(0, 7);
    }
    /**
     * check whether the file path specify in the request is valid. The file path must:
     *  1. exists in git repo
     *  2. is a valid file or dir, can't be a link or submodule
     *
     * @param workspaceRepo
     * @param filePath
     */
    async checkFile(workspaceRepo, filePath) {
        const headCommit = await workspaceRepo.getHeadCommit();
        try {
            const entry = await headCommit.getEntry(filePath);
            switch (entry.filemode()) {
                case 16384 /* TREE */:
                case 33188 /* BLOB */:
                case 33261 /* EXECUTABLE */:
                    return true;
                default:
                    return false;
            }
        }
        catch (e) {
            // filePath may not exists
            return false;
        }
    }
}
exports.WorkspaceHandler = WorkspaceHandler;
