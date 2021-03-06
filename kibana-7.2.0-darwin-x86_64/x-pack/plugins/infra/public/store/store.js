"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const redux_observable_1 = require("redux-observable");
const operators_1 = require("rxjs/operators");
const _1 = require(".");
function createStore({ apolloClient, observableApi }) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
    const middlewareDependencies = {
        postToApi$: observableApi.pipe(operators_1.map(({ post }) => post)),
        apolloClient$: apolloClient,
        selectIsLoadingLogEntries: _1.logEntriesSelectors.selectIsLoadingEntries,
        selectLogEntriesEnd: _1.logEntriesSelectors.selectEntriesEnd,
        selectLogEntriesStart: _1.logEntriesSelectors.selectEntriesStart,
        selectHasMoreLogEntriesAfterEnd: _1.logEntriesSelectors.selectHasMoreAfterEnd,
        selectHasMoreLogEntriesBeforeStart: _1.logEntriesSelectors.selectHasMoreBeforeStart,
        selectIsAutoReloadingLogEntries: _1.logPositionSelectors.selectIsAutoReloading,
        selectLogFilterQueryAsJson: _1.logFilterSelectors.selectLogFilterQueryAsJson,
        selectLogTargetPosition: _1.logPositionSelectors.selectTargetPosition,
        selectVisibleLogMidpointOrTarget: _1.logPositionSelectors.selectVisibleMidpointOrTarget,
        selectWaffleTimeUpdatePolicyInterval: _1.waffleTimeSelectors.selectTimeUpdatePolicyInterval,
    };
    const epicMiddleware = redux_observable_1.createEpicMiddleware({
        dependencies: middlewareDependencies,
    });
    const store = redux_1.createStore(_1.reducer, _1.initialState, composeEnhancers(redux_1.applyMiddleware(epicMiddleware)));
    epicMiddleware.run(_1.createRootEpic());
    return store;
}
exports.createStore = createStore;
