"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function getMlPrefix(serviceName, transactionType) {
    const maybeTransactionType = transactionType ? `${transactionType}-` : '';
    return `${serviceName}-${maybeTransactionType}`.toLowerCase();
}
exports.getMlPrefix = getMlPrefix;
function getMlJobId(serviceName, transactionType) {
    return `${getMlPrefix(serviceName, transactionType)}high_mean_response_time`;
}
exports.getMlJobId = getMlJobId;
function getMlIndex(serviceName, transactionType) {
    return `.ml-anomalies-${getMlJobId(serviceName, transactionType)}`;
}
exports.getMlIndex = getMlIndex;
