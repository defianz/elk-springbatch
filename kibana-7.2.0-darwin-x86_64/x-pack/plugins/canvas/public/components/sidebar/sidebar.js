"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
// @ts-ignore unconverted component
const sidebar_content_1 = require("./sidebar_content");
exports.Sidebar = ({ commit }) => {
    return (react_1.default.createElement("div", { className: "canvasSidebar" },
        react_1.default.createElement(sidebar_content_1.SidebarContent, { commit: commit })));
};
