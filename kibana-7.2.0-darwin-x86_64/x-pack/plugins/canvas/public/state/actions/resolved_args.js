"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.setLoadingActionType = 'setResolvedLoading';
exports.setValueActionType = 'setResolvedValue';
exports.inFlightActiveActionType = 'inFlightActive';
exports.inFlightCompleteActionType = 'inFlightComplete';
exports.setLoading = redux_actions_1.createAction(exports.setLoadingActionType);
exports.setValue = redux_actions_1.createAction(exports.setValueActionType);
exports.setValues = redux_actions_1.createAction('setResolvedValues');
exports.clearValue = redux_actions_1.createAction('clearResolvedValue');
exports.clearValues = redux_actions_1.createAction('clearResolvedValues');
exports.inFlightActive = redux_actions_1.createAction(exports.inFlightActiveActionType, () => undefined);
exports.inFlightComplete = redux_actions_1.createAction(exports.inFlightCompleteActionType, () => undefined);
