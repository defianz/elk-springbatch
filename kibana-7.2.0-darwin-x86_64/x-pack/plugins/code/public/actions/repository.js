"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.fetchRepos = redux_actions_1.createAction('FETCH REPOS');
exports.fetchReposSuccess = redux_actions_1.createAction('FETCH REPOS SUCCESS');
exports.fetchReposFailed = redux_actions_1.createAction('FETCH REPOS FAILED');
exports.deleteRepo = redux_actions_1.createAction('DELETE REPOS');
exports.deleteRepoSuccess = redux_actions_1.createAction('DELETE REPOS SUCCESS');
exports.deleteRepoFinished = redux_actions_1.createAction('DELETE REPOS FINISHED');
exports.deleteRepoFailed = redux_actions_1.createAction('DELETE REPOS FAILED');
exports.indexRepo = redux_actions_1.createAction('INDEX REPOS');
exports.indexRepoSuccess = redux_actions_1.createAction('INDEX REPOS SUCCESS');
exports.indexRepoFailed = redux_actions_1.createAction('INDEX REPOS FAILED');
exports.importRepo = redux_actions_1.createAction('IMPORT REPO');
exports.importRepoSuccess = redux_actions_1.createAction('IMPORT REPO SUCCESS');
exports.importRepoFailed = redux_actions_1.createAction('IMPORT REPO FAILED');
exports.closeToast = redux_actions_1.createAction('CLOSE TOAST');
exports.fetchRepoConfigs = redux_actions_1.createAction('FETCH REPO CONFIGS');
exports.fetchRepoConfigSuccess = redux_actions_1.createAction('FETCH REPO CONFIGS SUCCESS');
exports.fetchRepoConfigFailed = redux_actions_1.createAction('FETCH REPO CONFIGS FAILED');
exports.initRepoCommand = redux_actions_1.createAction('INIT REPO CMD');
exports.gotoRepo = redux_actions_1.createAction('GOTO REPO');
exports.gotoRepoFailed = redux_actions_1.createAction('GOTO REPO FAILED');
exports.switchLanguageServer = redux_actions_1.createAction('SWITCH LANGUAGE SERVER');
exports.switchLanguageServerSuccess = redux_actions_1.createAction('SWITCH LANGUAGE SERVER SUCCESS');
exports.switchLanguageServerFailed = redux_actions_1.createAction('SWITCH LANGUAGE SERVER FAILED');
