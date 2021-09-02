"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const StateContext = react_1.createContext({});
exports.initialState = {};
exports.reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
exports.AppStateProvider = StateContext.Provider;
exports.useAppState = () => react_1.useContext(StateContext);
