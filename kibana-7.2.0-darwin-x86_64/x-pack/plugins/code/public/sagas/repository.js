"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const kfetch_1 = require("ui/kfetch");
const effects_1 = require("redux-saga/effects");
const actions_1 = require("../actions");
const language_server_1 = require("../actions/language_server");
const url_1 = require("../utils/url");
const patterns_1 = require("./patterns");
function requestRepos() {
    return kfetch_1.kfetch({ pathname: '/api/code/repos' });
}
function* handleFetchRepos() {
    try {
        const repos = yield effects_1.call(requestRepos);
        yield effects_1.put(actions_1.fetchReposSuccess(repos));
    }
    catch (err) {
        yield effects_1.put(actions_1.fetchReposFailed(err));
    }
}
function requestDeleteRepo(uri) {
    return kfetch_1.kfetch({ pathname: `/api/code/repo/${uri}`, method: 'delete' });
}
function requestIndexRepo(uri) {
    return kfetch_1.kfetch({
        pathname: `/api/code/repo/index/${uri}`,
        method: 'post',
        body: JSON.stringify({ reindex: true }),
    });
}
function* handleDeleteRepo(action) {
    try {
        yield effects_1.call(requestDeleteRepo, action.payload || '');
        yield effects_1.put(actions_1.deleteRepoSuccess(action.payload || ''));
        yield effects_1.put(actions_1.updateDeleteProgress({
            repoUri: action.payload,
            progress: 0,
        }));
    }
    catch (err) {
        yield effects_1.put(actions_1.deleteRepoFailed(err));
    }
}
function* handleIndexRepo(action) {
    try {
        yield effects_1.call(requestIndexRepo, action.payload || '');
        yield effects_1.put(actions_1.indexRepoSuccess(action.payload || ''));
        yield effects_1.put(actions_1.updateIndexProgress({
            repoUri: action.payload,
            progress: 0,
        }));
    }
    catch (err) {
        yield effects_1.put(actions_1.indexRepoFailed(err));
    }
}
function requestImportRepo(uri) {
    return kfetch_1.kfetch({
        pathname: '/api/code/repo',
        method: 'post',
        body: JSON.stringify({ url: uri }),
    });
}
function* handleImportRepo(action) {
    try {
        const data = yield effects_1.call(requestImportRepo, action.payload || '');
        yield effects_1.put(actions_1.importRepoSuccess(data));
    }
    catch (err) {
        yield effects_1.put(actions_1.importRepoFailed(err));
    }
}
function* handleFetchRepoConfigs() {
    try {
        const configs = yield effects_1.call(requestRepoConfigs);
        yield effects_1.put(actions_1.fetchRepoConfigSuccess(configs));
    }
    catch (e) {
        yield effects_1.put(actions_1.fetchRepoConfigFailed(e));
    }
}
function requestRepoConfigs() {
    return kfetch_1.kfetch({ pathname: '/api/code/workspace', method: 'get' });
}
function* handleInitCmd(action) {
    const repoUri = action.payload;
    yield effects_1.call(requestRepoInitCmd, repoUri);
}
function requestRepoInitCmd(repoUri) {
    return kfetch_1.kfetch({
        pathname: `/api/code/workspace/${repoUri}/master`,
        query: { force: true },
        method: 'post',
    });
}
function* handleGotoRepo(action) {
    try {
        const repoUri = action.payload;
        yield effects_1.put(actions_1.loadRepo(repoUri));
        const loadRepoDoneAction = yield effects_1.take([String(actions_1.loadRepoSuccess), String(actions_1.loadRepoFailed)]);
        if (loadRepoDoneAction.type === String(actions_1.loadRepoSuccess)) {
            url_1.history.replace(`/${repoUri}/tree/${loadRepoDoneAction.payload.defaultBranch || 'master'}`);
        }
        else {
            // redirect to root project path if repo not found to show 404 page
            url_1.history.replace(`/${action.payload}/tree/master`);
        }
    }
    catch (e) {
        url_1.history.replace(`/${action.payload}/tree/master`);
        yield effects_1.put(actions_1.gotoRepoFailed(e));
    }
}
function* watchImportRepo() {
    yield effects_1.takeEvery(String(actions_1.importRepo), handleImportRepo);
}
exports.watchImportRepo = watchImportRepo;
function* watchDeleteRepo() {
    yield effects_1.takeEvery(String(actions_1.deleteRepo), handleDeleteRepo);
}
exports.watchDeleteRepo = watchDeleteRepo;
function* watchIndexRepo() {
    yield effects_1.takeEvery(String(actions_1.indexRepo), handleIndexRepo);
}
exports.watchIndexRepo = watchIndexRepo;
function* watchFetchRepos() {
    yield effects_1.takeEvery(String(actions_1.fetchRepos), handleFetchRepos);
}
exports.watchFetchRepos = watchFetchRepos;
function* watchFetchRepoConfigs() {
    yield effects_1.takeEvery(String(actions_1.fetchRepoConfigs), handleFetchRepoConfigs);
}
exports.watchFetchRepoConfigs = watchFetchRepoConfigs;
function* watchInitRepoCmd() {
    yield effects_1.takeEvery(String(actions_1.initRepoCommand), handleInitCmd);
}
exports.watchInitRepoCmd = watchInitRepoCmd;
function* watchGotoRepo() {
    yield effects_1.takeLatest(String(actions_1.gotoRepo), handleGotoRepo);
}
exports.watchGotoRepo = watchGotoRepo;
function* handleAdminRouteChange() {
    yield effects_1.put(actions_1.fetchRepos());
    yield effects_1.put(actions_1.fetchRepoConfigs());
    yield effects_1.put(language_server_1.loadLanguageServers());
}
function* watchAdminRouteChange() {
    yield effects_1.takeLatest(patterns_1.adminRoutePattern, handleAdminRouteChange);
}
exports.watchAdminRouteChange = watchAdminRouteChange;
