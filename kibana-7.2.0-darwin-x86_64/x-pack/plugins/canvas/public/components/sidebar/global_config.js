"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
// @ts-ignore unconverted component
const element_config_1 = require("../element_config");
// @ts-ignore unconverted component
const page_config_1 = require("../page_config");
// @ts-ignore unconverted component
const workpad_config_1 = require("../workpad_config");
// @ts-ignore unconverted component
const sidebar_section_1 = require("./sidebar_section");
exports.GlobalConfig = () => (react_1.default.createElement(react_1.Fragment, null,
    react_1.default.createElement(sidebar_section_1.SidebarSection, null,
        react_1.default.createElement(workpad_config_1.WorkpadConfig, null)),
    react_1.default.createElement(sidebar_section_1.SidebarSection, null,
        react_1.default.createElement(page_config_1.PageConfig, null)),
    react_1.default.createElement(sidebar_section_1.SidebarSection, null,
        react_1.default.createElement(element_config_1.ElementConfig, null))));
