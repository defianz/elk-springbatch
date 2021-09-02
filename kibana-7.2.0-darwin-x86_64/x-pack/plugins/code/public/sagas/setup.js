"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kfetch_1 = require("ui/kfetch");
const effects_1 = require("redux-saga/effects");
const actions_1 = require("../actions");
const patterns_1 = require("./patterns");
function* handleRootRoute() {
    try {
        yield effects_1.call(requestSetup);
        yield effects_1.put(actions_1.checkSetupSuccess());
    }
    catch (e) {
        yield effects_1.put(actions_1.checkSetupFailed());
    }
}
function requestSetup() {
    return kfetch_1.kfetch({ pathname: `/api/code/setup`, method: 'head' });
}
function* watchRootRoute() {
    yield effects_1.takeEvery(patterns_1.rootRoutePattern, handleRootRoute);
    yield effects_1.takeEvery(patterns_1.setupRoutePattern, handleRootRoute);
}
exports.watchRootRoute = watchRootRoute;
