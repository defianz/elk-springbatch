"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const querystring_1 = tslib_1.__importDefault(require("querystring"));
const kfetch_1 = require("ui/kfetch");
const effects_1 = require("redux-saga/effects");
const model_1 = require("../../model");
const actions_1 = require("../actions");
const patterns_1 = require("./patterns");
function requestDocumentSearch(payload) {
    const { query, page, languages, repositories, repoScope } = payload;
    const queryParams = {
        q: query,
    };
    if (page) {
        queryParams.p = page;
    }
    if (languages) {
        queryParams.langs = languages;
    }
    if (repositories) {
        queryParams.repos = repositories;
    }
    if (repoScope) {
        queryParams.repoScope = repoScope;
    }
    if (query && query.length > 0) {
        return kfetch_1.kfetch({
            pathname: `/api/code/search/doc`,
            method: 'get',
            query: queryParams,
        });
    }
    else {
        return {
            documents: [],
            took: 0,
            total: 0,
        };
    }
}
function* handleDocumentSearch(action) {
    try {
        const data = yield effects_1.call(requestDocumentSearch, action.payload);
        yield effects_1.put(actions_1.documentSearchSuccess(data));
    }
    catch (err) {
        yield effects_1.put(actions_1.documentSearchFailed(err));
    }
}
function requestRepositorySearch(q) {
    return kfetch_1.kfetch({
        pathname: `/api/code/search/repo`,
        method: 'get',
        query: { q },
    });
}
function* watchDocumentSearch() {
    yield effects_1.takeLatest(String(actions_1.documentSearch), handleDocumentSearch);
}
exports.watchDocumentSearch = watchDocumentSearch;
function* handleRepositorySearch(action) {
    try {
        const data = yield effects_1.call(requestRepositorySearch, action.payload.query);
        yield effects_1.put(actions_1.repositorySearchSuccess(data));
    }
    catch (err) {
        yield effects_1.put(actions_1.repositorySearchFailed(err));
    }
}
function* watchRepositorySearch() {
    yield effects_1.takeLatest([String(actions_1.repositorySearch), String(actions_1.repositorySearchQueryChanged)], handleRepositorySearch);
}
exports.watchRepositorySearch = watchRepositorySearch;
function* handleSearchRouteChange(action) {
    const { location } = action.payload;
    const rawSearchStr = location.search.length > 0 ? location.search.substring(1) : '';
    const queryParams = querystring_1.default.parse(rawSearchStr);
    const { q, p, langs, repos, scope, repoScope } = queryParams;
    yield effects_1.put(actions_1.changeSearchScope(scope));
    if (scope === model_1.SearchScope.REPOSITORY) {
        yield effects_1.put(actions_1.repositorySearch({ query: q }));
    }
    else {
        yield effects_1.put(actions_1.documentSearch({
            query: q,
            page: p,
            languages: langs,
            repositories: repos,
            repoScope: repoScope,
        }));
    }
}
function* resetDefaultRepoScope() {
    yield effects_1.put(actions_1.turnOffDefaultRepoScope());
}
function* watchSearchRouteChange() {
    yield effects_1.takeLatest(patterns_1.searchRoutePattern, handleSearchRouteChange);
    // Reset the default search scope if enters the admin page.
    yield effects_1.takeLatest(patterns_1.adminRoutePattern, resetDefaultRepoScope);
}
exports.watchSearchRouteChange = watchSearchRouteChange;
function* handleReposSearchForScope(action) {
    try {
        const data = yield effects_1.call(requestRepositorySearch, action.payload.query);
        yield effects_1.put(actions_1.searchReposForScopeSuccess(data));
    }
    catch (err) {
        yield effects_1.put(actions_1.searchReposForScopeFailed(err));
    }
}
function* watchRepoScopeSearch() {
    yield effects_1.takeEvery(actions_1.searchReposForScope, handleReposSearchForScope);
}
exports.watchRepoScopeSearch = watchRepoScopeSearch;
