"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kfetch_1 = require("ui/kfetch");
const effects_1 = require("redux-saga/effects");
const blame_1 = require("../actions/blame");
const patterns_1 = require("./patterns");
function requestBlame(repoUri, revision, path) {
    return kfetch_1.kfetch({
        pathname: `/api/code/repo/${repoUri}/blame/${encodeURIComponent(revision)}/${path}`,
    });
}
function* handleFetchBlame(action) {
    try {
        const { repoUri, revision, path } = action.payload;
        const blame = yield effects_1.call(requestBlame, repoUri, revision, path);
        yield effects_1.put(blame_1.loadBlameSuccess(blame));
    }
    catch (err) {
        yield effects_1.put(blame_1.loadBlameFailed(err));
    }
}
function* watchLoadBlame() {
    yield effects_1.takeEvery(String(blame_1.loadBlame), handleFetchBlame);
}
exports.watchLoadBlame = watchLoadBlame;
function* handleBlame(action) {
    const { resource, org, repo, revision, path } = action.payload.params;
    const repoUri = `${resource}/${org}/${repo}`;
    yield effects_1.put(blame_1.loadBlame({ repoUri, revision, path }));
}
function* watchBlame() {
    yield effects_1.takeEvery(patterns_1.blamePattern, handleBlame);
}
exports.watchBlame = watchBlame;
