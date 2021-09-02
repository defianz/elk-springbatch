"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const redux_1 = require("redux");
const redux_saga_1 = tslib_1.__importDefault(require("redux-saga"));
const reducers_1 = require("../reducers");
const sagas_1 = require("../sagas");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || redux_1.compose;
const sagaMW = redux_saga_1.default();
exports.store = redux_1.createStore(reducers_1.rootReducer, composeEnhancers(redux_1.applyMiddleware(sagaMW)));
sagaMW.run(sagas_1.rootSaga);
