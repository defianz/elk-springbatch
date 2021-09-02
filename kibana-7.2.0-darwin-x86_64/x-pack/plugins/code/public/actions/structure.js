"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.loadStructure = redux_actions_1.createAction('LOAD STRUCTURE');
exports.loadStructureSuccess = redux_actions_1.createAction('LOAD STRUCTURE SUCCESS');
exports.loadStructureFailed = redux_actions_1.createAction('LOAD STRUCTURE FAILED');
exports.openSymbolPath = redux_actions_1.createAction('OPEN SYMBOL PATH');
exports.closeSymbolPath = redux_actions_1.createAction('CLOSE SYMBOL PATH');
