"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.findReferences = redux_actions_1.createAction('FIND REFERENCES');
exports.findReferencesSuccess = redux_actions_1.createAction('FIND REFERENCES SUCCESS');
exports.findReferencesFailed = redux_actions_1.createAction('FIND REFERENCES ERROR');
exports.closeReferences = redux_actions_1.createAction('CLOSE REFERENCES');
exports.hoverResult = redux_actions_1.createAction('HOVER RESULT');
exports.revealPosition = redux_actions_1.createAction('REVEAL POSITION');
