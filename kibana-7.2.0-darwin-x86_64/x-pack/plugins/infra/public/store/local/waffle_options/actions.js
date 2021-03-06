"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typescript_fsa_1 = tslib_1.__importDefault(require("typescript-fsa"));
const actionCreator = typescript_fsa_1.default('x-pack/infra/local/waffle_options');
exports.changeMetric = actionCreator('CHANGE_METRIC');
exports.changeGroupBy = actionCreator('CHANGE_GROUP_BY');
exports.changeCustomOptions = actionCreator('CHANGE_CUSTOM_OPTIONS');
exports.changeNodeType = actionCreator('CHANGE_NODE_TYPE');
exports.changeView = actionCreator('CHANGE_VIEW');
exports.changeBoundsOverride = actionCreator('CHANGE_BOUNDS_OVERRIDE');
exports.changeAutoBounds = actionCreator('CHANGE_AUTO_BOUNDS');
