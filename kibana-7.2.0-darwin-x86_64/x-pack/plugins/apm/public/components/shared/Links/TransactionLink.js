"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const APMLink_1 = require("./APMLink");
const url_helpers_1 = require("./url_helpers");
exports.TransactionLink = ({ transaction, children }) => {
    if (!transaction) {
        return null;
    }
    const serviceName = transaction.service.name;
    const transactionType = transaction.transaction.type;
    const traceId = transaction.trace.id;
    const transactionId = transaction.transaction.id;
    const name = transaction.transaction.name;
    const encodedName = url_helpers_1.legacyEncodeURIComponent(name);
    return (react_1.default.createElement(APMLink_1.APMLink, { path: `/${serviceName}/transactions/${transactionType}/${encodedName}`, query: { traceId, transactionId } }, children));
};
