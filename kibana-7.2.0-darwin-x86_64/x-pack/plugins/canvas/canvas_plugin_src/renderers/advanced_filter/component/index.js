"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const recompose_1 = require("recompose");
const advanced_filter_1 = require("./advanced_filter");
exports.AdvancedFilter = recompose_1.compose(recompose_1.withState('value', 'onChange', ({ value }) => value || ''))(advanced_filter_1.AdvancedFilter);
