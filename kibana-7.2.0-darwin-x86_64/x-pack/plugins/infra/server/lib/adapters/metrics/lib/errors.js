"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_errors_1 = require("apollo-server-errors");
const errors_1 = require("../../../../../common/errors");
class InvalidNodeError extends apollo_server_errors_1.ApolloError {
    constructor(message) {
        super(message, errors_1.InfraMetricsErrorCodes.invalid_node);
        Object.defineProperty(this, 'name', { value: 'InvalidNodeError' });
    }
}
exports.InvalidNodeError = InvalidNodeError;
