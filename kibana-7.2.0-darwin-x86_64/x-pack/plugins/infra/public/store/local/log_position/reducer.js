"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const dist_1 = require("typescript-fsa-reducers/dist");
const actions_1 = require("./actions");
exports.initialLogPositionState = {
    targetPosition: null,
    updatePolicy: {
        policy: 'manual',
    },
    visiblePositions: {
        endKey: null,
        middleKey: null,
        startKey: null,
    },
};
const targetPositionReducer = dist_1.reducerWithInitialState(exports.initialLogPositionState.targetPosition).case(actions_1.jumpToTargetPosition, (state, target) => target);
const targetPositionUpdatePolicyReducer = dist_1.reducerWithInitialState(exports.initialLogPositionState.updatePolicy)
    .case(actions_1.startAutoReload, (state, interval) => ({
    policy: 'interval',
    interval,
}))
    .case(actions_1.stopAutoReload, () => ({
    policy: 'manual',
}));
const visiblePositionReducer = dist_1.reducerWithInitialState(exports.initialLogPositionState.visiblePositions).case(actions_1.reportVisiblePositions, (state, { startKey, middleKey, endKey }) => ({
    endKey,
    middleKey,
    startKey,
}));
exports.logPositionReducer = redux_1.combineReducers({
    targetPosition: targetPositionReducer,
    updatePolicy: targetPositionUpdatePolicyReducer,
    visiblePositions: visiblePositionReducer,
});
