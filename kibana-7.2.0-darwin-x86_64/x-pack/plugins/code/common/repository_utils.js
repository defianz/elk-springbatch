"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const git_url_parse_1 = tslib_1.__importDefault(require("git-url-parse"));
const path_1 = tslib_1.__importDefault(require("path"));
const model_1 = require("../model");
const uri_util_1 = require("./uri_util");
class RepositoryUtils {
    // Generate a Repository instance by parsing repository remote url
    static buildRepository(remoteUrl) {
        const repo = git_url_parse_1.default(remoteUrl.trim());
        let host = repo.source ? repo.source : '';
        if (repo.port !== null) {
            host = host + ':' + repo.port;
        }
        // Remove the leading `/` and tailing `.git` if necessary.
        const pathname = repo.pathname && repo.git_suffix
            ? repo.pathname.substr(1, repo.pathname.length - 5)
            : repo.pathname.substr(1);
        // The pathname should look like `a/b/c` now.
        const segs = pathname.split('/').filter(s => s.length > 0);
        const org = segs.length >= 2 ? segs.slice(0, segs.length - 1).join('_') : '_';
        const name = segs.length >= 1 ? segs[segs.length - 1] : '_';
        const uri = host ? `${host}/${org}/${name}` : repo.full_name;
        return {
            uri,
            url: repo.href,
            name,
            org,
            protocol: repo.protocol,
        };
    }
    // From uri 'origin/org/name' to 'org'
    static orgNameFromUri(repoUri) {
        const segs = repoUri.split('/');
        if (segs && segs.length === 3) {
            return segs[1];
        }
        throw new Error('Invalid repository uri.');
    }
    // From uri 'origin/org/name' to 'name'
    static repoNameFromUri(repoUri) {
        const segs = repoUri.split('/');
        if (segs && segs.length === 3) {
            return segs[2];
        }
        throw new Error('Invalid repository uri.');
    }
    // From uri 'origin/org/name' to 'org/name'
    static repoFullNameFromUri(repoUri) {
        const segs = repoUri.split('/');
        if (segs && segs.length === 3) {
            return segs[1] + '/' + segs[2];
        }
        throw new Error('Invalid repository uri.');
    }
    // Return the local data path of a given repository.
    static repositoryLocalPath(repoPath, repoUri) {
        return path_1.default.join(repoPath, repoUri);
    }
    static normalizeRepoUriToIndexName(repoUri) {
        const hash = crypto_1.default
            .createHash('md5')
            .update(repoUri)
            .digest('hex')
            .substring(0, 8);
        const segs = repoUri.split('/');
        segs.push(hash);
        // Elasticsearch index name is case insensitive
        return segs.join('-').toLowerCase();
    }
    static locationToUrl(loc) {
        const url = uri_util_1.parseLspUrl(loc.uri);
        const { repoUri, file, revision } = url;
        if (repoUri && file && revision) {
            return uri_util_1.toCanonicalUrl({ repoUri, file, revision, position: loc.range.start });
        }
        return '';
    }
    static getAllFiles(fileTree) {
        if (!fileTree) {
            return [];
        }
        let result = [];
        switch (fileTree.type) {
            case model_1.FileTreeItemType.File:
                result.push(fileTree.path);
                break;
            case model_1.FileTreeItemType.Directory:
                for (const node of fileTree.children) {
                    result = result.concat(RepositoryUtils.getAllFiles(node));
                }
                break;
            default:
                break;
        }
        return result;
    }
    static hasFullyCloned(cloneProgress) {
        return !!cloneProgress && cloneProgress.isCloned !== undefined && cloneProgress.isCloned;
    }
}
exports.RepositoryUtils = RepositoryUtils;
