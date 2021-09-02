"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reselect_1 = require("reselect");
const keury_1 = require("../../lib/keury");
const model_1 = require("./model");
const selectTimelineById = (state) => state.timeline.timelineById;
const selectAutoSaveMsg = (state) => state.timeline.autoSavedWarningMsg;
exports.selectTimeline = (state, timelineId) => state.timeline.timelineById[timelineId];
exports.autoSaveMsgSelector = reselect_1.createSelector(selectAutoSaveMsg, autoSaveMsg => autoSaveMsg);
exports.timelineByIdSelector = reselect_1.createSelector(selectTimelineById, timelineById => timelineById);
exports.getTimelineByIdSelector = () => reselect_1.createSelector(exports.selectTimeline, timeline => timeline || model_1.timelineDefaults);
exports.getKqlFilterQuerySelector = () => reselect_1.createSelector(exports.selectTimeline, timeline => timeline &&
    timeline.kqlQuery &&
    timeline.kqlQuery.filterQuery &&
    timeline.kqlQuery.filterQuery.kuery
    ? timeline.kqlQuery.filterQuery.kuery.expression
    : null);
exports.getKqlFilterQueryDraftSelector = () => reselect_1.createSelector(exports.selectTimeline, timeline => (timeline && timeline.kqlQuery ? timeline.kqlQuery.filterQueryDraft : null));
exports.isFilterQueryDraftValidSelector = () => reselect_1.createSelector(exports.selectTimeline, timeline => timeline &&
    timeline.kqlQuery &&
    keury_1.isFromKueryExpressionValid(timeline.kqlQuery.filterQueryDraft));
