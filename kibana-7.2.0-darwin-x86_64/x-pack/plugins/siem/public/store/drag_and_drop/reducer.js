"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const typescript_fsa_reducers_1 = require("typescript-fsa-reducers");
const actions_1 = require("./actions");
exports.initialDragAndDropState = { dataProviders: {} };
exports.registerProviderHandler = ({ provider, dataProviders, }) => ({
    ...dataProviders,
    [provider.id]: provider,
});
exports.unRegisterProviderHandler = ({ id, dataProviders, }) => fp_1.omit(id, dataProviders);
exports.dragAndDropReducer = typescript_fsa_reducers_1.reducerWithInitialState(exports.initialDragAndDropState)
    .case(actions_1.registerProvider, (state, { provider }) => ({
    ...state,
    dataProviders: exports.registerProviderHandler({ provider, dataProviders: state.dataProviders }),
}))
    .case(actions_1.unRegisterProvider, (state, { id }) => ({
    ...state,
    dataProviders: exports.unRegisterProviderHandler({ id, dataProviders: state.dataProviders }),
}))
    .build();
