"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const kfetch_1 = require("ui/kfetch");
const url_1 = tslib_1.__importDefault(require("url"));
const effects_1 = require("redux-saga/effects");
const actions_1 = require("../actions");
const selectors_1 = require("../selectors");
const patterns_1 = require("./patterns");
function* handleFetchRepoTree(action) {
    try {
        const tree = yield effects_1.call(requestRepoTree, action.payload);
        (tree.children || []).sort((a, b) => {
            const typeDiff = a.type - b.type;
            if (typeDiff === 0) {
                return a.name > b.name ? 1 : -1;
            }
            else {
                return -typeDiff;
            }
        });
        tree.repoUri = action.payload.uri;
        yield effects_1.put(actions_1.fetchRepoTreeSuccess({
            tree,
            path: action.payload.path,
            withParents: action.payload.parents,
        }));
    }
    catch (err) {
        if (action.payload.isDir && err.body && err.body.statusCode === 404) {
            yield effects_1.put(actions_1.dirNotFound(action.payload.path));
        }
        yield effects_1.put(actions_1.fetchRepoTreeFailed({ ...err, path: action.payload.path }));
    }
}
function requestRepoTree({ uri, revision, path, limit = 1000, parents = false, }) {
    const query = { limit, flatten: true };
    if (parents) {
        query.parents = true;
    }
    return kfetch_1.kfetch({
        pathname: `/api/code/repo/${uri}/tree/${encodeURIComponent(revision)}/${path}`,
        query,
    });
}
function* watchFetchRepoTree() {
    yield effects_1.takeEvery(String(actions_1.fetchRepoTree), handleFetchRepoTree);
}
exports.watchFetchRepoTree = watchFetchRepoTree;
function* handleFetchRootRepoTree(action) {
    try {
        const { uri, revision } = action.payload;
        const tree = yield effects_1.call(requestRepoTree, { uri, revision, path: '', isDir: true });
        yield effects_1.put(actions_1.fetchRootRepoTreeSuccess(tree));
    }
    catch (err) {
        yield effects_1.put(actions_1.fetchRootRepoTreeFailed(err));
    }
}
function* watchFetchRootRepoTree() {
    yield effects_1.takeEvery(String(actions_1.fetchRootRepoTree), handleFetchRootRepoTree);
}
exports.watchFetchRootRepoTree = watchFetchRootRepoTree;
function* handleFetchBranches(action) {
    try {
        const results = yield effects_1.call(requestBranches, action.payload);
        yield effects_1.put(actions_1.fetchRepoBranchesSuccess(results));
    }
    catch (err) {
        yield effects_1.put(actions_1.fetchRepoBranchesFailed(err));
    }
}
function requestBranches({ uri }) {
    return kfetch_1.kfetch({
        pathname: `/api/code/repo/${uri}/references`,
    });
}
function* handleFetchCommits(action) {
    try {
        const results = yield effects_1.call(requestCommits, action.payload);
        yield effects_1.put(actions_1.fetchRepoCommitsSuccess(results));
    }
    catch (err) {
        yield effects_1.put(actions_1.fetchRepoCommitsFailed(err));
    }
}
function* handleFetchMoreCommits(action) {
    try {
        const path = yield effects_1.select(selectors_1.currentPathSelector);
        const commits = yield effects_1.select(selectors_1.treeCommitsSelector);
        const revision = commits.length > 0 ? commits[commits.length - 1].id : 'head';
        const uri = action.payload;
        // @ts-ignore
        const newCommits = yield effects_1.call(requestCommits, { uri, revision }, path, true);
        yield effects_1.put(actions_1.fetchTreeCommitsSuccess({ path, commits: newCommits, append: true }));
    }
    catch (err) {
        yield effects_1.put(actions_1.fetchTreeCommitsFailed(err));
    }
}
function* handleFetchTreeCommits(action) {
    try {
        const path = action.payload.path;
        const commits = yield effects_1.call(requestCommits, action.payload, path);
        yield effects_1.put(actions_1.fetchTreeCommitsSuccess({ path, commits }));
    }
    catch (err) {
        yield effects_1.put(actions_1.fetchTreeCommitsFailed(err));
    }
}
function requestCommits({ uri, revision }, path, loadMore, count) {
    const pathStr = path ? `/${path}` : '';
    const options = {
        pathname: `/api/code/repo/${uri}/history/${encodeURIComponent(revision)}${pathStr}`,
    };
    if (loadMore) {
        options.query = { after: 1 };
    }
    if (count) {
        options.count = count;
    }
    return kfetch_1.kfetch(options);
}
async function requestFile(payload, line) {
    const { uri, revision, path } = payload;
    const url = `/api/code/repo/${uri}/blob/${encodeURIComponent(revision)}/${path}`;
    const query = {};
    if (line) {
        query.line = line;
    }
    const response = await fetch(chrome_1.default.addBasePath(url_1.default.format({ pathname: url, query })));
    if (response.status >= 200 && response.status < 300) {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.startsWith('text/')) {
            const lang = contentType.split(';')[0].substring('text/'.length);
            if (lang === 'big') {
                return {
                    payload,
                    content: '',
                    isOversize: true,
                };
            }
            return {
                payload,
                lang,
                content: await response.text(),
                isUnsupported: false,
            };
        }
        else if (contentType && contentType.startsWith('image/')) {
            return {
                payload,
                isImage: true,
                content: '',
                url,
                isUnsupported: false,
            };
        }
        else {
            return {
                payload,
                isImage: false,
                content: '',
                url,
                isUnsupported: true,
            };
        }
    }
    else if (response.status === 404) {
        return {
            payload,
            isNotFound: true,
        };
    }
    throw new Error('invalid file type');
}
exports.requestFile = requestFile;
function* handleFetchFile(action) {
    try {
        const results = yield effects_1.call(requestFile, action.payload);
        if (results.isNotFound) {
            yield effects_1.put(actions_1.setNotFound(true));
            yield effects_1.put(actions_1.fetchFileFailed(new Error('file not found')));
        }
        else {
            yield effects_1.put(actions_1.fetchFileSuccess(results));
        }
    }
    catch (err) {
        yield effects_1.put(actions_1.fetchFileFailed(err));
    }
}
function* handleFetchDirs(action) {
    try {
        const dir = yield effects_1.call(requestRepoTree, action.payload);
        yield effects_1.put(actions_1.fetchDirectorySuccess(dir));
    }
    catch (err) {
        yield actions_1.fetchDirectoryFailed(err);
    }
}
function* watchFetchBranchesAndCommits() {
    yield effects_1.takeEvery(String(actions_1.fetchRepoBranches), handleFetchBranches);
    yield effects_1.takeEvery(String(actions_1.fetchRepoCommits), handleFetchCommits);
    yield effects_1.takeLatest(String(actions_1.fetchFile), handleFetchFile);
    yield effects_1.takeEvery(String(actions_1.fetchDirectory), handleFetchDirs);
    yield effects_1.takeLatest(String(actions_1.fetchTreeCommits), handleFetchTreeCommits);
    yield effects_1.takeLatest(String(actions_1.fetchMoreCommits), handleFetchMoreCommits);
}
exports.watchFetchBranchesAndCommits = watchFetchBranchesAndCommits;
function* handleRepoRouteChange(action) {
    const { repo, org, resource } = action.payload.params;
    const uri = `${resource}/${org}/${repo}`;
    yield effects_1.put(actions_1.gotoRepo(uri));
}
function* watchRepoRouteChange() {
    yield effects_1.takeEvery(patterns_1.repoRoutePattern, handleRepoRouteChange);
}
exports.watchRepoRouteChange = watchRepoRouteChange;
