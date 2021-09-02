"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.loadStatus = redux_actions_1.createAction('LOAD STATUS');
exports.loadStatusSuccess = redux_actions_1.createAction('LOAD STATUS SUCCESS');
exports.loadStatusFailed = redux_actions_1.createAction('LOAD STATUS FAILED');
exports.loadRepo = redux_actions_1.createAction('LOAD REPO');
exports.loadRepoSuccess = redux_actions_1.createAction('LOAD REPO SUCCESS');
exports.loadRepoFailed = redux_actions_1.createAction('LOAD REPO FAILED');
exports.updateCloneProgress = redux_actions_1.createAction('UPDATE CLONE PROGRESS');
exports.updateIndexProgress = redux_actions_1.createAction('UPDATE INDEX PROGRESS');
exports.updateDeleteProgress = redux_actions_1.createAction('UPDATE DELETE PROGRESS');
exports.pollRepoCloneStatusStart = redux_actions_1.createAction('POLL CLONE STATUS START');
exports.pollRepoIndexStatusStart = redux_actions_1.createAction('POLL INDEX STATUS START');
exports.pollRepoDeleteStatusStart = redux_actions_1.createAction('POLL DELETE STATUS START');
exports.pollRepoCloneStatusStop = redux_actions_1.createAction('POLL CLONE STATUS STOP');
exports.pollRepoIndexStatusStop = redux_actions_1.createAction('POLL INDEX STATUS STOP');
exports.pollRepoDeleteStatusStop = redux_actions_1.createAction('POLL DELETE STATUS STOP');
