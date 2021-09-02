"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var app_state_1 = require("./app_state");
exports.initialState = app_state_1.initialState;
exports.reducer = app_state_1.reducer;
exports.AppStateProvider = app_state_1.AppStateProvider;
exports.useAppState = app_state_1.useAppState;
