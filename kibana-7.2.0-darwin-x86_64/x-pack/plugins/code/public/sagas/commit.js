"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kfetch_1 = require("ui/kfetch");
const effects_1 = require("redux-saga/effects");
const actions_1 = require("../actions");
const patterns_1 = require("./patterns");
function requestCommit(repo, commitId) {
    return kfetch_1.kfetch({
        pathname: `/api/code/repo/${repo}/diff/${commitId}`,
    });
}
function* handleLoadCommit(action) {
    try {
        const { commitId, resource, org, repo } = action.payload.params;
        yield effects_1.put(actions_1.loadCommit(commitId));
        const repoUri = `${resource}/${org}/${repo}`;
        const commit = yield effects_1.call(requestCommit, repoUri, commitId);
        yield effects_1.put(actions_1.loadCommitSuccess(commit));
    }
    catch (err) {
        yield effects_1.put(actions_1.loadCommitFailed(err));
    }
}
function* watchLoadCommit() {
    yield effects_1.takeEvery(patterns_1.commitRoutePattern, handleLoadCommit);
}
exports.watchLoadCommit = watchLoadCommit;
