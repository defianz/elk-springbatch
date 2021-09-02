"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const LOGGING_TAGS = ['siem'];
exports.createLogger = (logger) => ({
    debug: (message) => logger(['debug', ...LOGGING_TAGS], message),
    info: (message) => logger(['info', ...LOGGING_TAGS], message),
    warn: (message) => logger(['warning', ...LOGGING_TAGS], message),
    error: (message) => logger(['error', ...LOGGING_TAGS], message),
});
