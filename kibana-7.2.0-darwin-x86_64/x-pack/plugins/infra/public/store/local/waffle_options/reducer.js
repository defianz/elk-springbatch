"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
const types_1 = require("../../../graphql/types");
const actions_1 = require("./actions");
exports.initialWaffleOptionsState = {
    metric: { type: types_1.InfraSnapshotMetricType.cpu },
    groupBy: [],
    nodeType: types_1.InfraNodeType.host,
    view: 'map',
    customOptions: [],
    boundsOverride: { max: 1, min: 0 },
    autoBounds: true,
};
const currentMetricReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialWaffleOptionsState.metric).case(actions_1.changeMetric, (current, target) => target);
const currentCustomOptionsReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialWaffleOptionsState.customOptions).case(actions_1.changeCustomOptions, (current, target) => target);
const currentGroupByReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialWaffleOptionsState.groupBy).case(actions_1.changeGroupBy, (current, target) => target);
const currentNodeTypeReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialWaffleOptionsState.nodeType).case(actions_1.changeNodeType, (current, target) => target);
const currentViewReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialWaffleOptionsState.view).case(actions_1.changeView, (current, target) => target);
const currentBoundsOverrideReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialWaffleOptionsState.boundsOverride).case(actions_1.changeBoundsOverride, (current, target) => target);
const currentAutoBoundsReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialWaffleOptionsState.autoBounds).case(actions_1.changeAutoBounds, (current, target) => target);
exports.waffleOptionsReducer = redux_1.combineReducers({
    metric: currentMetricReducer,
    groupBy: currentGroupByReducer,
    nodeType: currentNodeTypeReducer,
    view: currentViewReducer,
    customOptions: currentCustomOptionsReducer,
    boundsOverride: currentBoundsOverrideReducer,
    autoBounds: currentAutoBoundsReducer,
});
