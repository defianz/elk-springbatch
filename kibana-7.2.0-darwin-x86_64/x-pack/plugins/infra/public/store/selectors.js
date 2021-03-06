"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reselect_1 = require("reselect");
const log_entry_1 = require("../utils/log_entry");
const typed_redux_1 = require("../utils/typed_redux");
const local_1 = require("./local");
const remote_1 = require("./remote");
/**
 * local selectors
 */
const selectLocal = (state) => state.local;
exports.logFilterSelectors = typed_redux_1.globalizeSelectors(selectLocal, local_1.logFilterSelectors);
exports.logPositionSelectors = typed_redux_1.globalizeSelectors(selectLocal, local_1.logPositionSelectors);
exports.waffleFilterSelectors = typed_redux_1.globalizeSelectors(selectLocal, local_1.waffleFilterSelectors);
exports.waffleTimeSelectors = typed_redux_1.globalizeSelectors(selectLocal, local_1.waffleTimeSelectors);
exports.waffleOptionsSelectors = typed_redux_1.globalizeSelectors(selectLocal, local_1.waffleOptionsSelectors);
/**
 * remote selectors
 */
const selectRemote = (state) => state.remote;
exports.logEntriesSelectors = typed_redux_1.globalizeSelectors(selectRemote, remote_1.logEntriesSelectors);
/**
 * shared selectors
 */
exports.sharedSelectors = {
    selectFirstVisibleLogEntry: reselect_1.createSelector(exports.logEntriesSelectors.selectEntries, exports.logPositionSelectors.selectFirstVisiblePosition, (entries, firstVisiblePosition) => firstVisiblePosition ? log_entry_1.getLogEntryAtTime(entries, firstVisiblePosition) : null),
    selectMiddleVisibleLogEntry: reselect_1.createSelector(exports.logEntriesSelectors.selectEntries, exports.logPositionSelectors.selectMiddleVisiblePosition, (entries, middleVisiblePosition) => middleVisiblePosition ? log_entry_1.getLogEntryAtTime(entries, middleVisiblePosition) : null),
    selectLastVisibleLogEntry: reselect_1.createSelector(exports.logEntriesSelectors.selectEntries, exports.logPositionSelectors.selectLastVisiblePosition, (entries, lastVisiblePosition) => lastVisiblePosition ? log_entry_1.getLogEntryAtTime(entries, lastVisiblePosition) : null),
};
