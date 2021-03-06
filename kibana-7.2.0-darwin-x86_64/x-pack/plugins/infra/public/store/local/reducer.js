"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const log_filter_1 = require("./log_filter");
const log_position_1 = require("./log_position");
const waffle_filter_1 = require("./waffle_filter");
const waffle_options_1 = require("./waffle_options");
const waffle_time_1 = require("./waffle_time");
exports.initialLocalState = {
    logFilter: log_filter_1.initialLogFilterState,
    logPosition: log_position_1.initialLogPositionState,
    waffleFilter: waffle_filter_1.initialWaffleFilterState,
    waffleTime: waffle_time_1.initialWaffleTimeState,
    waffleMetrics: waffle_options_1.initialWaffleOptionsState,
};
exports.localReducer = redux_1.combineReducers({
    logFilter: log_filter_1.logFilterReducer,
    logPosition: log_position_1.logPositionReducer,
    waffleFilter: waffle_filter_1.waffleFilterReducer,
    waffleTime: waffle_time_1.waffleTimeReducer,
    waffleMetrics: waffle_options_1.waffleOptionsReducer,
});
