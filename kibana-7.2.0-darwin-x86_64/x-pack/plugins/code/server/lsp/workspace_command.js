"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const child_process_1 = require("child_process");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const proper_lockfile_1 = tslib_1.__importDefault(require("proper-lockfile"));
class WorkspaceCommand {
    constructor(repoConfig, workspaceDir, revision, log) {
        this.repoConfig = repoConfig;
        this.workspaceDir = workspaceDir;
        this.revision = revision;
        this.log = log;
    }
    async runInit(force) {
        if (this.repoConfig.init) {
            const versionFile = path_1.default.join(this.workspaceDir, 'init.version');
            if (this.checkRevision(versionFile) && !force) {
                this.log.info('a same revision exists, init cmd skipped.');
                return;
            }
            const lockFile = this.workspaceDir; // path.join(this.workspaceDir, 'init.lock');
            const isLocked = await proper_lockfile_1.default.check(lockFile);
            if (isLocked) {
                this.log.info('another process is running, please try again later');
                return;
            }
            const release = await proper_lockfile_1.default.lock(lockFile);
            try {
                const process = this.spawnProcess(this.repoConfig.init);
                const logFile = path_1.default.join(this.workspaceDir, 'init.log');
                const logFileStream = fs_1.default.createWriteStream(logFile, { encoding: 'utf-8', flags: 'a+' });
                this.redirectOutput(process.stdout, logFileStream);
                this.redirectOutput(process.stderr, logFileStream, true);
                process.on('close', async (code, signal) => {
                    logFileStream.close();
                    await this.writeRevisionFile(versionFile);
                    this.log.info(`init process finished with code: ${code} signal: ${signal}`);
                    await release();
                });
            }
            catch (e) {
                this.log.error(e);
                release();
            }
        }
    }
    spawnProcess(repoCmd) {
        let cmd;
        let args;
        if (typeof repoCmd === 'string') {
            cmd = repoCmd;
            args = [];
        }
        else {
            [cmd, ...args] = repoCmd;
        }
        return child_process_1.spawn(cmd, args, {
            detached: false,
            cwd: this.workspaceDir,
        });
    }
    redirectOutput(from, to, isError = false) {
        from.on('data', (data) => {
            if (isError) {
                this.log.error(data.toString('utf-8'));
            }
            else {
                this.log.info(data.toString('utf-8'));
            }
            to.write(data);
        });
    }
    /**
     * check the revision file in workspace, return true if it exists and its content equals current revision.
     * @param versionFile
     */
    checkRevision(versionFile) {
        if (fs_1.default.existsSync(versionFile)) {
            const revision = fs_1.default.readFileSync(versionFile, 'utf8').trim();
            return revision === this.revision;
        }
        return false;
    }
    writeRevisionFile(versionFile) {
        return new Promise((resolve, reject) => {
            fs_1.default.writeFile(versionFile, this.revision, err => {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    }
}
exports.WorkspaceCommand = WorkspaceCommand;
