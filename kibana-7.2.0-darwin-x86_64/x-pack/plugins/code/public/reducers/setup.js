"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const immer_1 = tslib_1.__importDefault(require("immer"));
const redux_actions_1 = require("redux-actions");
const actions_1 = require("../actions");
const initialState = {};
exports.setup = redux_actions_1.handleActions({
    [String(actions_1.checkSetupFailed)]: (state) => immer_1.default(state, draft => {
        draft.ok = false;
    }),
    [String(actions_1.checkSetupSuccess)]: (state) => immer_1.default(state, draft => {
        draft.ok = true;
    }),
}, initialState);
