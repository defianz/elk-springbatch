"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("vscode-jsonrpc/lib/messages");
exports.ServerNotInitialized = messages_1.ErrorCodes.ServerNotInitialized;
exports.UnknownErrorCode = messages_1.ErrorCodes.UnknownErrorCode;
exports.UnknownFileLanguage = -42404;
exports.LanguageServerNotInstalled = -42403;
exports.LanguageDisabled = -42402;
exports.LanguageServerStartFailed = -42405;
