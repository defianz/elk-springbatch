"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const console_logger_1 = require("./console_logger");
class ConsoleLoggerFactory {
    getLogger(tags) {
        return new console_logger_1.ConsoleLogger();
    }
}
exports.ConsoleLoggerFactory = ConsoleLoggerFactory;
