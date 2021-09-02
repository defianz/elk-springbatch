"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.fetchRootRepoTree = redux_actions_1.createAction('FETCH ROOT REPO TREE');
exports.fetchRootRepoTreeSuccess = redux_actions_1.createAction('FETCH ROOT REPO TREE SUCCESS');
exports.fetchRootRepoTreeFailed = redux_actions_1.createAction('FETCH ROOT REPO TREE FAILED');
exports.fetchRepoTree = redux_actions_1.createAction('FETCH REPO TREE');
exports.fetchRepoTreeSuccess = redux_actions_1.createAction('FETCH REPO TREE SUCCESS');
exports.fetchRepoTreeFailed = redux_actions_1.createAction('FETCH REPO TREE FAILED');
exports.resetRepoTree = redux_actions_1.createAction('CLEAR REPO TREE');
exports.closeTreePath = redux_actions_1.createAction('CLOSE TREE PATH');
exports.openTreePath = redux_actions_1.createAction('OPEN TREE PATH');
exports.fetchRepoBranches = redux_actions_1.createAction('FETCH REPO BRANCHES');
exports.fetchRepoBranchesSuccess = redux_actions_1.createAction('FETCH REPO BRANCHES SUCCESS');
exports.fetchRepoBranchesFailed = redux_actions_1.createAction('FETCH REPO BRANCHES FAILED');
exports.fetchRepoCommits = redux_actions_1.createAction('FETCH REPO COMMITS');
exports.fetchRepoCommitsSuccess = redux_actions_1.createAction('FETCH REPO COMMITS SUCCESS');
exports.fetchRepoCommitsFailed = redux_actions_1.createAction('FETCH REPO COMMITS FAILED');
exports.fetchFile = redux_actions_1.createAction('FETCH FILE');
exports.fetchFileSuccess = redux_actions_1.createAction('FETCH FILE SUCCESS');
exports.fetchFileFailed = redux_actions_1.createAction('FETCH FILE ERROR');
exports.fetchDirectory = redux_actions_1.createAction('FETCH REPO DIR');
exports.fetchDirectorySuccess = redux_actions_1.createAction('FETCH REPO DIR SUCCESS');
exports.fetchDirectoryFailed = redux_actions_1.createAction('FETCH REPO DIR FAILED');
exports.setNotFound = redux_actions_1.createAction('SET FILE NOT FOUND');
exports.dirNotFound = redux_actions_1.createAction('DIR NOT FOUND');
exports.fetchTreeCommits = redux_actions_1.createAction('FETCH TREE COMMITS');
exports.fetchTreeCommitsSuccess = redux_actions_1.createAction('FETCH TREE COMMITS SUCCESS');
exports.fetchTreeCommitsFailed = redux_actions_1.createAction('FETCH TREE COMMITS FAILED');
exports.fetchMoreCommits = redux_actions_1.createAction('FETCH MORE COMMITS');
