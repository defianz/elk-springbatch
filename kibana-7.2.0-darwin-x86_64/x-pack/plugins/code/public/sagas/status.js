"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const effects_1 = require("redux-saga/effects");
const model_1 = require("../../model");
const actions_1 = require("../actions");
const ROUTES = tslib_1.__importStar(require("../components/routes"));
const matchSelector = (state) => state.route.match;
exports.cloneCompletedPattern = (action) => action.type === String(actions_1.updateCloneProgress) &&
    action.payload.progress === model_1.WorkerReservedProgress.COMPLETED;
const deleteCompletedPattern = (action) => action.type === String(actions_1.updateDeleteProgress) &&
    action.payload.progress === model_1.WorkerReservedProgress.COMPLETED;
exports.cloneRepoStatusPollingStopPattern = (repoUri) => {
    return (action) => {
        return action.type === String(actions_1.pollRepoCloneStatusStop) && action.payload === repoUri;
    };
};
exports.indexRepoStatusPollingStopPattern = (repoUri) => {
    return (action) => {
        return action.type === String(actions_1.pollRepoIndexStatusStop) && action.payload === repoUri;
    };
};
exports.deleteRepoStatusPollingStopPattern = (repoUri) => {
    return (action) => {
        return action.type === String(actions_1.pollRepoDeleteStatusStop) && action.payload === repoUri;
    };
};
function* handleRepoCloneSuccess() {
    const match = yield effects_1.select(matchSelector);
    if (match.path === ROUTES.MAIN || match.path === ROUTES.MAIN_ROOT) {
        yield effects_1.put(actions_1.routeChange(match));
    }
}
function* watchRepoCloneSuccess() {
    yield effects_1.takeEvery(exports.cloneCompletedPattern, handleRepoCloneSuccess);
}
exports.watchRepoCloneSuccess = watchRepoCloneSuccess;
function* handleRepoDeleteFinished(action) {
    yield effects_1.put(actions_1.deleteRepoFinished(action.payload.repoUri));
}
function* watchRepoDeleteFinished() {
    yield effects_1.takeEvery(deleteCompletedPattern, handleRepoDeleteFinished);
}
exports.watchRepoDeleteFinished = watchRepoDeleteFinished;
