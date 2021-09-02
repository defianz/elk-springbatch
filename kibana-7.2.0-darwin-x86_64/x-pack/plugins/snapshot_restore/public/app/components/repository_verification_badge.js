"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const index_1 = require("../index");
exports.RepositoryVerificationBadge = ({ verificationResults, }) => {
    const { core: { i18n: { FormattedMessage }, }, } = index_1.useAppDependencies();
    if (!verificationResults) {
        return (react_1.default.createElement(eui_1.EuiHealth, { color: "subdued" },
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryVerification.verificationUnknownValue", defaultMessage: "Unknown" })));
    }
    if (verificationResults.valid) {
        return (react_1.default.createElement(eui_1.EuiHealth, { color: "success" },
            react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryVerification.verificationSuccessfulValue", defaultMessage: "Connected" })));
    }
    return (react_1.default.createElement(eui_1.EuiHealth, { color: "warning" },
        react_1.default.createElement(FormattedMessage, { id: "xpack.snapshotRestore.repositoryVerification.verificationErrorValue", defaultMessage: "Not connected" })));
};
