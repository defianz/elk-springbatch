"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const eui_1 = require("@elastic/eui");
const capabilities_1 = require("ui/capabilities");
const import_project_1 = require("./import_project");
exports.EmptyProject = () => {
    const isAdmin = capabilities_1.capabilities.get().code.admin;
    return (react_1.default.createElement("div", { className: "codeTab__projects" },
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
        react_1.default.createElement("div", { className: "codeTab__projects--emptyHeader" },
            react_1.default.createElement(eui_1.EuiText, null,
                react_1.default.createElement("h1", null, "You don't have any repos yet")),
            react_1.default.createElement(eui_1.EuiText, { color: "subdued" }, isAdmin && react_1.default.createElement("p", null, "Let's import your first one"))),
        isAdmin && react_1.default.createElement(import_project_1.ImportProject, null),
        react_1.default.createElement(eui_1.EuiSpacer, null),
        react_1.default.createElement(eui_1.EuiFlexGroup, { justifyContent: "center" },
            react_1.default.createElement(react_router_dom_1.Link, { to: "/setup-guide" },
                react_1.default.createElement(eui_1.EuiButton, null, "View the Setup Guide")))));
};
