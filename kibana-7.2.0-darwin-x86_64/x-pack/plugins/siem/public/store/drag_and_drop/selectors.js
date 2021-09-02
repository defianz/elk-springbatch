"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const reselect_1 = require("reselect");
const selectDataProviders = (state) => state.dragAndDrop.dataProviders;
exports.dataProvidersSelector = reselect_1.createSelector(selectDataProviders, dataProviders => dataProviders);
