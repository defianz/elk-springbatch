"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reselect_1 = require("reselect");
const selectInputs = (state) => state.inputs;
const selectGlobal = (state) => state.inputs.global;
const selectTimeline = (state) => state.inputs.timeline;
exports.inputsSelector = () => reselect_1.createSelector(selectInputs, inputs => inputs);
exports.timelineTimeRangeSelector = reselect_1.createSelector(selectTimeline, timeline => timeline.timerange);
exports.globalTimeRangeSelector = reselect_1.createSelector(selectGlobal, global => global.timerange);
exports.globalPolicySelector = reselect_1.createSelector(selectGlobal, global => global.policy);
exports.globalQuery = reselect_1.createSelector(selectGlobal, global => global.query);
exports.globalSelector = () => reselect_1.createSelector(selectGlobal, global => global);
exports.getTimelineSelector = () => reselect_1.createSelector(selectTimeline, timeline => timeline);
