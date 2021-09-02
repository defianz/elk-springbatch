"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
let counter = 0;
exports.createStore = (initialState, updater) => {
    let currentState = initialState;
    const commit = (type, payload) => {
        return (currentState = updater({
            ...currentState,
            primaryUpdate: {
                type,
                payload: { ...payload, uid: counter++ },
            },
        }));
    };
    const getCurrentState = () => currentState;
    const setCurrentState = (state) => {
        currentState = state;
        commit('flush', {});
    };
    return { getCurrentState, setCurrentState, commit };
};
