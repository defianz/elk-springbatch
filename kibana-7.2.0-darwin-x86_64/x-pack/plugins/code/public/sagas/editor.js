"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const kfetch_1 = require("ui/kfetch");
const url_1 = tslib_1.__importDefault(require("url"));
const effects_1 = require("redux-saga/effects");
const uri_util_1 = require("../../common/uri_util");
const actions_1 = require("../actions");
const status_1 = require("../actions/status");
const types_1 = require("../common/types");
const file_1 = require("../reducers/file");
const selectors_1 = require("../selectors");
const url_2 = require("../utils/url");
const patterns_1 = require("./patterns");
function* handleReferences(action) {
    try {
        const params = action.payload;
        const { title, files } = yield effects_1.call(requestFindReferences, params);
        const repos = Object.keys(files).map((repo) => ({ repo, files: files[repo] }));
        yield effects_1.put(actions_1.findReferencesSuccess({ title, repos }));
    }
    catch (error) {
        yield effects_1.put(actions_1.findReferencesFailed(error));
    }
}
function requestFindReferences(params) {
    return kfetch_1.kfetch({
        pathname: `/api/code/lsp/findReferences`,
        method: 'POST',
        body: JSON.stringify(params),
    });
}
function* watchLspMethods() {
    yield effects_1.takeLatest(String(actions_1.findReferences), handleReferences);
}
exports.watchLspMethods = watchLspMethods;
function* handleCloseReferences(action) {
    if (action.payload) {
        const search = yield effects_1.select(selectors_1.urlQueryStringSelector);
        const { pathname } = url_2.history.location;
        const queryParams = url_1.default.parse(search, true).query;
        if (queryParams.tab) {
            delete queryParams.tab;
        }
        if (queryParams.refUrl) {
            delete queryParams.refUrl;
        }
        const query = querystring_1.default.stringify(queryParams);
        if (query) {
            url_2.history.push(`${pathname}?${query}`);
        }
        else {
            url_2.history.push(pathname);
        }
    }
}
function* watchCloseReference() {
    yield effects_1.takeLatest(String(actions_1.closeReferences), handleCloseReferences);
}
exports.watchCloseReference = watchCloseReference;
function* handleReference(url) {
    const refUrl = yield effects_1.select(selectors_1.refUrlSelector);
    if (refUrl === url) {
        return;
    }
    const { uri, position, schema, repoUri, file, revision } = uri_util_1.parseLspUrl(url);
    if (uri && position) {
        yield effects_1.put(actions_1.findReferences({
            textDocument: {
                uri: uri_util_1.toCanonicalUrl({ revision, schema, repoUri, file }),
            },
            position,
        }));
    }
}
function* handleFile(repoUri, file, revision) {
    const response = yield effects_1.select(selectors_1.fileSelector);
    const payload = response && response.payload;
    if (payload &&
        payload.path === file &&
        payload.revision === revision &&
        payload.uri === repoUri) {
        return;
    }
    yield effects_1.put(actions_1.fetchFile({
        uri: repoUri,
        path: file,
        revision,
    }));
}
function fetchRepo(repoUri) {
    return kfetch_1.kfetch({ pathname: `/api/code/repo/${repoUri}` });
}
function* loadRepoSaga(action) {
    try {
        const repo = yield effects_1.call(fetchRepo, action.payload);
        yield effects_1.put(status_1.loadRepoSuccess(repo));
        // turn on defaultRepoScope if there's no repo scope specified when enter a source view page
        const repoScope = yield effects_1.select(selectors_1.repoScopeSelector);
        if (repoScope.length === 0) {
            yield effects_1.put(actions_1.turnOnDefaultRepoScope(repo));
        }
    }
    catch (e) {
        yield effects_1.put(status_1.loadRepoFailed(e));
    }
}
function* watchLoadRepo() {
    yield effects_1.takeEvery(String(status_1.loadRepo), loadRepoSaga);
}
exports.watchLoadRepo = watchLoadRepo;
function* handleMainRouteChange(action) {
    // in source view page, we need repos as default repo scope options when no query input
    yield effects_1.put(actions_1.fetchRepos());
    const { location } = action.payload;
    const search = location.search.startsWith('?') ? location.search.substring(1) : location.search;
    const queryParams = querystring_1.default.parse(search);
    const { resource, org, repo, path: file, pathType, revision, goto } = action.payload.params;
    const repoUri = `${resource}/${org}/${repo}`;
    let position;
    if (goto) {
        position = uri_util_1.parseGoto(goto);
    }
    yield effects_1.put(status_1.loadRepo(repoUri));
    yield effects_1.put(actions_1.fetchRepoBranches({ uri: repoUri }));
    if (file) {
        if ([types_1.PathTypes.blob, types_1.PathTypes.blame].includes(pathType)) {
            yield effects_1.put(actions_1.revealPosition(position));
            const { tab, refUrl } = queryParams;
            if (tab === 'references' && refUrl) {
                yield effects_1.call(handleReference, decodeURIComponent(refUrl));
            }
            else {
                yield effects_1.put(actions_1.closeReferences(false));
            }
        }
        yield effects_1.call(handleFile, repoUri, file, revision);
        const commits = yield effects_1.select((state) => state.file.treeCommits[file]);
        if (commits === undefined) {
            yield effects_1.put(actions_1.fetchTreeCommits({ revision, uri: repoUri, path: file }));
        }
    }
    const lastRequestPath = yield effects_1.select(selectors_1.lastRequestPathSelector);
    const currentTree = yield effects_1.select(selectors_1.getTree);
    // repo changed
    if (currentTree.repoUri !== repoUri) {
        yield effects_1.put(actions_1.resetRepoTree());
        yield effects_1.put(actions_1.fetchRepoCommits({ uri: repoUri, revision }));
        yield effects_1.put(actions_1.fetchRootRepoTree({ uri: repoUri, revision }));
    }
    const tree = yield effects_1.select(selectors_1.getTree);
    const isDir = pathType === types_1.PathTypes.tree;
    const openPath = isDir
        ? file
        : (file || '')
            .split('/')
            .slice(0, -1)
            .join('/');
    yield effects_1.put(actions_1.openTreePath(openPath || ''));
    function isTreeLoaded(isDirectory, targetTree) {
        if (!isDirectory) {
            return !!targetTree;
        }
        else if (!targetTree) {
            return false;
        }
        else {
            return targetTree.children && targetTree.children.length > 0;
        }
    }
    const targetTree = yield effects_1.select(selectors_1.createTreeSelector(file || ''));
    if (!isTreeLoaded(isDir, targetTree)) {
        yield effects_1.put(actions_1.fetchRepoTree({
            uri: repoUri,
            revision,
            path: file || '',
            parents: file_1.getPathOfTree(tree, (file || '').split('/')) === null,
            isDir,
        }));
    }
    const uri = uri_util_1.toCanonicalUrl({
        repoUri,
        file,
        revision,
    });
    if (file && pathType === types_1.PathTypes.blob) {
        if (lastRequestPath !== uri) {
            yield effects_1.put(actions_1.loadStructure(uri));
        }
    }
}
function* watchMainRouteChange() {
    yield effects_1.takeLatest(patterns_1.mainRoutePattern, handleMainRouteChange);
}
exports.watchMainRouteChange = watchMainRouteChange;
