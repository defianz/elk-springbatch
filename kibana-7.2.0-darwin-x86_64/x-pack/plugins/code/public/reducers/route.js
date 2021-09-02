"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const immer_1 = tslib_1.__importDefault(require("immer"));
const redux_actions_1 = require("redux-actions");
const actions_1 = require("../actions");
const initialState = {
    match: {},
};
exports.route = redux_actions_1.handleActions({
    [String(actions_1.routeChange)]: (state, action) => immer_1.default(state, draft => {
        draft.match = action.payload;
    }),
}, initialState);
