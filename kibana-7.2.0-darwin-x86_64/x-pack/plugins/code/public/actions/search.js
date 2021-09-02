"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
// For document search page
exports.documentSearch = redux_actions_1.createAction('DOCUMENT SEARCH');
exports.documentSearchSuccess = redux_actions_1.createAction('DOCUMENT SEARCH SUCCESS');
exports.documentSearchFailed = redux_actions_1.createAction('DOCUMENT SEARCH FAILED');
// For repository search page
exports.repositorySearch = redux_actions_1.createAction('REPOSITORY SEARCH');
exports.repositorySearchSuccess = redux_actions_1.createAction('REPOSITORY SEARCH SUCCESS');
exports.repositorySearchFailed = redux_actions_1.createAction('REPOSITORY SEARCH FAILED');
exports.changeSearchScope = redux_actions_1.createAction('CHANGE SEARCH SCOPE');
exports.suggestionSearch = redux_actions_1.createAction('SUGGESTION SEARCH');
// For repository search typeahead
exports.repositorySearchQueryChanged = redux_actions_1.createAction('REPOSITORY SEARCH QUERY CHANGED');
exports.repositoryTypeaheadSearchSuccess = redux_actions_1.createAction('REPOSITORY SEARCH SUCCESS');
exports.repositoryTypeaheadSearchFailed = redux_actions_1.createAction('REPOSITORY SEARCH FAILED');
exports.saveSearchOptions = redux_actions_1.createAction('SAVE SEARCH OPTIONS');
exports.turnOnDefaultRepoScope = redux_actions_1.createAction('TURN ON DEFAULT REPO SCOPE');
exports.turnOffDefaultRepoScope = redux_actions_1.createAction('TURN OFF DEFAULT REPO SCOPE');
exports.searchReposForScope = redux_actions_1.createAction('SEARCH REPOS FOR SCOPE');
exports.searchReposForScopeSuccess = redux_actions_1.createAction('SEARCH REPOS FOR SCOPE SUCCESS');
exports.searchReposForScopeFailed = redux_actions_1.createAction('SEARCH REPOS FOR SCOPE FAILED');
