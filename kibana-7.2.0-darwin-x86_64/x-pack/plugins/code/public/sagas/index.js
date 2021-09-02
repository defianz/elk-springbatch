"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("redux-saga/effects");
const blame_1 = require("./blame");
const commit_1 = require("./commit");
const editor_1 = require("./editor");
const file_1 = require("./file");
const language_server_1 = require("./language_server");
const project_status_1 = require("./project_status");
const repository_1 = require("./repository");
const search_1 = require("./search");
const setup_1 = require("./setup");
const status_1 = require("./status");
const structure_1 = require("./structure");
function* rootSaga() {
    yield effects_1.fork(setup_1.watchRootRoute);
    yield effects_1.fork(commit_1.watchLoadCommit);
    yield effects_1.fork(repository_1.watchFetchRepos);
    yield effects_1.fork(repository_1.watchDeleteRepo);
    yield effects_1.fork(repository_1.watchIndexRepo);
    yield effects_1.fork(repository_1.watchImportRepo);
    yield effects_1.fork(file_1.watchFetchRepoTree);
    yield effects_1.fork(file_1.watchFetchRootRepoTree);
    yield effects_1.fork(file_1.watchFetchBranchesAndCommits);
    yield effects_1.fork(search_1.watchDocumentSearch);
    yield effects_1.fork(search_1.watchRepositorySearch);
    yield effects_1.fork(structure_1.watchLoadStructure);
    yield effects_1.fork(editor_1.watchLspMethods);
    yield effects_1.fork(editor_1.watchCloseReference);
    yield effects_1.fork(repository_1.watchFetchRepoConfigs);
    yield effects_1.fork(repository_1.watchInitRepoCmd);
    yield effects_1.fork(repository_1.watchGotoRepo);
    yield effects_1.fork(editor_1.watchLoadRepo);
    yield effects_1.fork(search_1.watchSearchRouteChange);
    yield effects_1.fork(repository_1.watchAdminRouteChange);
    yield effects_1.fork(editor_1.watchMainRouteChange);
    yield effects_1.fork(editor_1.watchLoadRepo);
    yield effects_1.fork(file_1.watchRepoRouteChange);
    yield effects_1.fork(blame_1.watchLoadBlame);
    yield effects_1.fork(blame_1.watchBlame);
    yield effects_1.fork(status_1.watchRepoCloneSuccess);
    yield effects_1.fork(status_1.watchRepoDeleteFinished);
    yield effects_1.fork(language_server_1.watchLoadLanguageServers);
    yield effects_1.fork(language_server_1.watchInstallLanguageServer);
    yield effects_1.fork(project_status_1.watchLoadRepoListStatus);
    yield effects_1.fork(project_status_1.watchLoadRepoStatus);
    // Repository status polling sagas begin
    yield effects_1.fork(project_status_1.watchPollingRepoStatus);
    yield effects_1.fork(project_status_1.watchResetPollingStatus);
    yield effects_1.fork(project_status_1.watchRepoDeleteStatusPolling);
    yield effects_1.fork(project_status_1.watchRepoIndexStatusPolling);
    yield effects_1.fork(project_status_1.watchRepoCloneStatusPolling);
    // Repository status polling sagas end
    yield effects_1.fork(search_1.watchRepoScopeSearch);
}
exports.rootSaga = rootSaga;
