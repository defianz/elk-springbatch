"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const app_1 = require("./app");
const drag_and_drop_1 = require("./drag_and_drop");
const hosts_1 = require("./hosts");
const inputs_1 = require("./inputs");
const network_1 = require("./network");
const reducer_1 = require("./timeline/reducer");
exports.initialState = {
    app: app_1.initialAppState,
    dragAndDrop: drag_and_drop_1.initialDragAndDropState,
    hosts: hosts_1.initialHostsState,
    inputs: inputs_1.initialInputsState,
    network: network_1.initialNetworkState,
    timeline: reducer_1.initialTimelineState,
};
exports.reducer = redux_1.combineReducers({
    app: app_1.appReducer,
    dragAndDrop: drag_and_drop_1.dragAndDropReducer,
    hosts: hosts_1.hostsReducer,
    inputs: inputs_1.inputsReducer,
    network: network_1.networkReducer,
    timeline: reducer_1.timelineReducer,
});
