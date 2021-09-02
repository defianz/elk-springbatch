"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.loadCommit = redux_actions_1.createAction('LOAD COMMIT');
exports.loadCommitSuccess = redux_actions_1.createAction('LOAD COMMIT SUCCESS');
exports.loadCommitFailed = redux_actions_1.createAction('LOAD COMMIT FAILED');
