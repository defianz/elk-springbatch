"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
exports.PermissionDenied = () => (react_2.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
    react_2.default.createElement(eui_1.EuiPageContent, { horizontalPosition: "center" },
        react_2.default.createElement(eui_1.EuiEmptyPrompt, { iconType: "securityApp", title: react_2.default.createElement("h2", null,
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.deniedPermissionTitle", defaultMessage: "You need permission to manage roles" })), body: react_2.default.createElement("p", { "data-test-subj": "permissionDeniedMessage" },
                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.security.management.roles.noPermissionToManageRolesDescription", defaultMessage: "Contact your system administrator." })) }))));
