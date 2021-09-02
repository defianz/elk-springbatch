"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.registerShortcut = redux_actions_1.createAction('REGISTER SHORTCUT');
exports.unregisterShortcut = redux_actions_1.createAction('UNREGISTER SHORTCUT');
exports.toggleHelp = redux_actions_1.createAction('TOGGLE SHORTCUTS HELP');
