"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inputsActions = tslib_1.__importStar(require("./actions"));
exports.inputsActions = inputsActions;
const inputsModel = tslib_1.__importStar(require("./model"));
exports.inputsModel = inputsModel;
const inputsSelectors = tslib_1.__importStar(require("./selectors"));
exports.inputsSelectors = inputsSelectors;
tslib_1.__exportStar(require("./reducer"), exports);
