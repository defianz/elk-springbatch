"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_observable_1 = require("redux-observable");
const app_1 = require("./app");
const timeline_1 = require("./timeline");
const inputs_1 = require("./inputs");
const reducer_1 = require("./reducer");
const epic_1 = require("./epic");
let store = null;
exports.createStore = (state = reducer_1.initialState, apolloClient) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
    const middlewareDependencies = {
        apolloClient$: apolloClient,
        selectNotesByIdSelector: app_1.appSelectors.selectNotesByIdSelector,
        timelineByIdSelector: timeline_1.timelineSelectors.timelineByIdSelector,
        timelineTimeRangeSelector: inputs_1.inputsSelectors.timelineTimeRangeSelector,
    };
    const epicMiddleware = redux_observable_1.createEpicMiddleware({
        dependencies: middlewareDependencies,
    });
    store = redux_1.createStore(reducer_1.reducer, state, composeEnhancers(redux_1.applyMiddleware(epicMiddleware)));
    epicMiddleware.run(epic_1.createRootEpic());
    return store;
};
exports.getStore = () => store;
