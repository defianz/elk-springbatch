"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const redux_saga_1 = require("redux-saga");
const kfetch_1 = require("ui/kfetch");
const effects_1 = require("redux-saga/effects");
const model_1 = require("../../model");
const ROUTES = tslib_1.__importStar(require("../components/routes"));
const selectors_1 = require("../selectors");
const actions_1 = require("../actions");
const reducers_1 = require("../reducers");
const status_1 = require("./status");
const REPO_STATUS_POLLING_FREQ_MS = 1000;
function fetchStatus(repoUri) {
    return kfetch_1.kfetch({
        pathname: `/api/code/repo/status/${repoUri}`,
    });
}
function* loadRepoListStatus(repos) {
    try {
        const promises = repos.map(repo => effects_1.call(fetchStatus, repo.uri));
        const statuses = yield effects_1.all(promises);
        yield effects_1.put(actions_1.loadStatusSuccess(statuses.reduce((acc, status) => {
            acc[status.gitStatus.uri] = status;
            return acc;
        }, {})));
    }
    catch (err) {
        yield effects_1.put(actions_1.loadStatusFailed(err));
    }
}
function* loadRepoStatus(repo) {
    try {
        const repoStatus = yield effects_1.call(fetchStatus, repo.uri);
        yield effects_1.put(actions_1.loadStatusSuccess({
            [repo.uri]: repoStatus,
        }));
    }
    catch (err) {
        yield effects_1.put(actions_1.loadStatusFailed(err));
    }
}
function* handleRepoStatus(action) {
    const repository = action.payload;
    yield effects_1.call(loadRepoStatus, repository);
}
function* handleRepoListStatus(action) {
    const repos = action.payload;
    yield effects_1.call(loadRepoListStatus, repos);
}
function isInProgress(progress) {
    return progress < model_1.WorkerReservedProgress.COMPLETED && progress >= model_1.WorkerReservedProgress.INIT;
}
// Try to trigger the repository status polling based on its current state.
function* triggerPollRepoStatus(state, repoUri) {
    switch (state) {
        case reducers_1.RepoState.CLONING:
            yield effects_1.put(actions_1.pollRepoCloneStatusStart(repoUri));
            break;
        case reducers_1.RepoState.INDEXING:
            yield effects_1.put(actions_1.pollRepoIndexStatusStart(repoUri));
            break;
        case reducers_1.RepoState.DELETING:
            yield effects_1.put(actions_1.pollRepoDeleteStatusStart(repoUri));
            break;
        default:
            break;
    }
}
function* handleReposStatusLoaded(action) {
    const route = yield effects_1.select(selectors_1.routeSelector);
    const allStatuses = yield effects_1.select(selectors_1.allStatusSelector);
    if (route.path === ROUTES.ADMIN) {
        // Load all repository status on admin page
        for (const repoUri of Object.keys(allStatuses)) {
            const status = allStatuses[repoUri];
            yield triggerPollRepoStatus(status.state, repoUri);
        }
    }
    else if (route.path === ROUTES.MAIN || route.path === ROUTES.MAIN_ROOT) {
        // Load current repository status on main page
        const currentUri = yield effects_1.select(selectors_1.repoUriSelector);
        const status = allStatuses[currentUri];
        if (status) {
            yield triggerPollRepoStatus(status.state, currentUri);
        }
    }
}
function* watchLoadRepoListStatus() {
    // After all the repositories have been loaded, we should start load
    // their status.
    yield effects_1.takeEvery(String(actions_1.fetchReposSuccess), handleRepoListStatus);
}
exports.watchLoadRepoListStatus = watchLoadRepoListStatus;
function* watchLoadRepoStatus() {
    // `loadRepoSuccess` is issued by the main source view page.
    yield effects_1.takeLatest(String(actions_1.loadRepoSuccess), handleRepoStatus);
}
exports.watchLoadRepoStatus = watchLoadRepoStatus;
function* watchPollingRepoStatus() {
    // After the status of the repos or a given repo has been loaded, check
    // if we need to start polling the status.
    yield effects_1.takeEvery(String(actions_1.loadStatusSuccess), handleReposStatusLoaded);
}
exports.watchPollingRepoStatus = watchPollingRepoStatus;
function* handleResetPollingStatus(action) {
    const statuses = yield effects_1.select(selectors_1.allStatusSelector);
    for (const repoUri of Object.keys(statuses)) {
        yield effects_1.put(actions_1.pollRepoCloneStatusStop(repoUri));
        yield effects_1.put(actions_1.pollRepoIndexStatusStop(repoUri));
        yield effects_1.put(actions_1.pollRepoDeleteStatusStop(repoUri));
    }
}
function* watchResetPollingStatus() {
    // Stop all the repository status polling runners when route changes.
    yield effects_1.takeEvery(actions_1.routeChange, handleResetPollingStatus);
}
exports.watchResetPollingStatus = watchResetPollingStatus;
const parseCloneStatusPollingRequest = (action) => {
    if (action.type === String(actions_1.importRepoSuccess)) {
        return action.payload.uri;
    }
    else if (action.type === String(actions_1.pollRepoCloneStatusStart)) {
        return action.payload;
    }
};
const handleRepoCloneStatusProcess = function* (status, repoUri) {
    if (
    // Repository has been deleted during the clone
    (!status.gitStatus && !status.indexStatus && !status.deleteStatus) ||
        // Repository is in delete during the clone
        status.deleteStatus) {
        // Stop polling git progress
        return false;
    }
    if (status.gitStatus) {
        const { progress, cloneProgress, errorMessage, timestamp } = status.gitStatus;
        yield effects_1.put(actions_1.updateCloneProgress({
            progress,
            timestamp: moment_1.default(timestamp).toDate(),
            repoUri,
            errorMessage,
            cloneProgress,
        }));
        // Keep polling if the progress is not 100% yet.
        return isInProgress(progress);
    }
    else {
        // Keep polling if the indexStatus has not been persisted yet.
        return true;
    }
};
function* watchRepoCloneStatusPolling() {
    // The repository clone status polling will be triggered by:
    // * user click import repository
    // * repository status has been loaded and it's in cloning
    yield effects_1.takeEvery([String(actions_1.importRepoSuccess), String(actions_1.pollRepoCloneStatusStart)], pollRepoCloneStatusRunner);
}
exports.watchRepoCloneStatusPolling = watchRepoCloneStatusPolling;
const parseIndexStatusPollingRequest = (action) => {
    if (action.type === String(actions_1.indexRepo) || action.type === String(actions_1.pollRepoIndexStatusStart)) {
        return action.payload;
    }
    else if (action.type === String(actions_1.updateCloneProgress)) {
        return action.payload.repoUri;
    }
};
const handleRepoIndexStatusProcess = function* (status, repoUri) {
    if (
    // Repository has been deleted during the index
    (!status.gitStatus && !status.indexStatus && !status.deleteStatus) ||
        // Repository is in delete during the index
        status.deleteStatus) {
        // Stop polling index progress
        return false;
    }
    if (status.indexStatus) {
        yield effects_1.put(actions_1.updateIndexProgress({
            progress: status.indexStatus.progress,
            timestamp: moment_1.default(status.indexStatus.timestamp).toDate(),
            repoUri,
        }));
        // Keep polling if the progress is not 100% yet.
        return isInProgress(status.indexStatus.progress);
    }
    else {
        // Keep polling if the indexStatus has not been persisted yet.
        return true;
    }
};
function* watchRepoIndexStatusPolling() {
    // The repository index status polling will be triggered by:
    // * user click index repository
    // * clone is done
    // * repository status has been loaded and it's in indexing
    yield effects_1.takeEvery([String(actions_1.indexRepo), status_1.cloneCompletedPattern, String(actions_1.pollRepoIndexStatusStart)], pollRepoIndexStatusRunner);
}
exports.watchRepoIndexStatusPolling = watchRepoIndexStatusPolling;
const parseDeleteStatusPollingRequest = (action) => {
    return action.payload;
};
const handleRepoDeleteStatusProcess = function* (status, repoUri) {
    if (!status.gitStatus && !status.indexStatus && !status.deleteStatus) {
        // If all the statuses cannot be found, this indicates the the repository has been successfully
        // removed.
        yield effects_1.put(actions_1.updateDeleteProgress({
            progress: model_1.WorkerReservedProgress.COMPLETED,
            repoUri,
        }));
        return false;
    }
    if (status.deleteStatus) {
        yield effects_1.put(actions_1.updateDeleteProgress({
            progress: status.deleteStatus.progress,
            timestamp: moment_1.default(status.deleteStatus.timestamp).toDate(),
            repoUri,
        }));
        return isInProgress(status.deleteStatus.progress);
    }
    else {
        // Keep polling if the deleteStatus has not been persisted yet.
        return true;
    }
};
function* watchRepoDeleteStatusPolling() {
    // The repository delete status polling will be triggered by:
    // * user click delete repository
    // * repository status has been loaded and it's in deleting
    yield effects_1.takeEvery([String(actions_1.deleteRepo), String(actions_1.pollRepoDeleteStatusStart)], pollRepoDeleteStatusRunner);
}
exports.watchRepoDeleteStatusPolling = watchRepoDeleteStatusPolling;
function createRepoStatusPollingRun(handleStatus, pollingStopActionFunction) {
    return function* (repoUri) {
        try {
            while (true) {
                // Delay at the beginning to allow some time for the server to consume the
                // queue task.
                yield effects_1.call(redux_saga_1.delay, REPO_STATUS_POLLING_FREQ_MS);
                const repoStatus = yield effects_1.call(fetchStatus, repoUri);
                const keepPolling = yield handleStatus(repoStatus, repoUri);
                if (!keepPolling) {
                    yield effects_1.put(pollingStopActionFunction(repoUri));
                }
            }
        }
        finally {
            if (yield effects_1.cancelled()) {
                // Do nothing here now.
            }
        }
    };
}
function createRepoStatusPollingRunner(parseRepoUri, pollStatusRun, pollingStopActionFunction, pollingStopActionFunctionPattern) {
    return function* (action) {
        const repoUri = parseRepoUri(action);
        // Cancel existing runner to deduplicate the polling
        yield effects_1.put(pollingStopActionFunction(repoUri));
        // Make a fork to run the repo index status polling
        const task = yield effects_1.fork(pollStatusRun, repoUri);
        // Wait for the cancellation task
        yield effects_1.take(pollingStopActionFunctionPattern(repoUri));
        // Cancel the task
        yield effects_1.cancel(task);
    };
}
const runPollRepoCloneStatus = createRepoStatusPollingRun(handleRepoCloneStatusProcess, actions_1.pollRepoCloneStatusStop);
const runPollRepoIndexStatus = createRepoStatusPollingRun(handleRepoIndexStatusProcess, actions_1.pollRepoIndexStatusStop);
const runPollRepoDeleteStatus = createRepoStatusPollingRun(handleRepoDeleteStatusProcess, actions_1.pollRepoDeleteStatusStop);
const pollRepoCloneStatusRunner = createRepoStatusPollingRunner(parseCloneStatusPollingRequest, runPollRepoCloneStatus, actions_1.pollRepoCloneStatusStop, status_1.cloneRepoStatusPollingStopPattern);
const pollRepoIndexStatusRunner = createRepoStatusPollingRunner(parseIndexStatusPollingRequest, runPollRepoIndexStatus, actions_1.pollRepoIndexStatusStop, status_1.indexRepoStatusPollingStopPattern);
const pollRepoDeleteStatusRunner = createRepoStatusPollingRunner(parseDeleteStatusPollingRequest, runPollRepoDeleteStatus, actions_1.pollRepoDeleteStatusStop, status_1.deleteRepoStatusPollingStopPattern);
