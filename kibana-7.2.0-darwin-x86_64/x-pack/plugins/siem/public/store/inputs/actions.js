"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_fsa_1 = tslib_1.__importDefault(require("typescript-fsa"));
const actionCreator = typescript_fsa_1.default('x-pack/siem/local/inputs');
exports.setAbsoluteRangeDatePicker = actionCreator('SET_ABSOLUTE_RANGE_DATE_PICKER');
exports.setTimelineRangeDatePicker = actionCreator('SET_TIMELINE_RANGE_DATE_PICKER');
exports.setRelativeRangeDatePicker = actionCreator('SET_RELATIVE_RANGE_DATE_PICKER');
exports.setDuration = actionCreator('SET_DURATION');
exports.startAutoReload = actionCreator('START_KQL_AUTO_RELOAD');
exports.stopAutoReload = actionCreator('STOP_KQL_AUTO_RELOAD');
exports.setQuery = actionCreator('SET_QUERY');
exports.deleteAllQuery = actionCreator('DELETE_ALL_QUERY');
exports.toggleTimelineLinkTo = actionCreator('TOGGLE_TIMELINE_LINK_TO');
