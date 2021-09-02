"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const redux_actions_1 = require("redux-actions");
exports.loadLanguageServers = redux_actions_1.createAction('LOAD LANGUAGE SERVERS');
exports.loadLanguageServersSuccess = redux_actions_1.createAction('LOAD LANGUAGE SERVERS SUCCESS');
exports.loadLanguageServersFailed = redux_actions_1.createAction('LOAD LANGUAGE SERVERS FAILED');
exports.requestInstallLanguageServer = redux_actions_1.createAction('REQUEST INSTALL LANGUAGE SERVERS');
exports.requestInstallLanguageServerSuccess = redux_actions_1.createAction('REQUEST INSTALL LANGUAGE SERVERS SUCCESS');
exports.requestInstallLanguageServerFailed = redux_actions_1.createAction('REQUEST INSTALL LANGUAGE SERVERS FAILED');
exports.installLanguageServerSuccess = redux_actions_1.createAction('INSTALL LANGUAGE SERVERS SUCCESS');
exports.languageServerInitializing = redux_actions_1.createAction('LANGUAGE SERVER INITIALIZING');
