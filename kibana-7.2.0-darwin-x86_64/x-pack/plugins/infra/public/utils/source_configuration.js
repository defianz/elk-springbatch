"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFieldLogColumnConfiguration = (logColumnConfiguration) => logColumnConfiguration != null && 'fieldColumn' in logColumnConfiguration;
exports.isMessageLogColumnConfiguration = (logColumnConfiguration) => logColumnConfiguration != null && 'messageColumn' in logColumnConfiguration;
exports.isTimestampLogColumnConfiguration = (logColumnConfiguration) => logColumnConfiguration != null && 'timestampColumn' in logColumnConfiguration;
