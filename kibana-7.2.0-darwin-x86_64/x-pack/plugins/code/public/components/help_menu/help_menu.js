"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const chrome_1 = tslib_1.__importDefault(require("ui/chrome"));
const eui_1 = require("@elastic/eui");
const documentation_links_1 = require("../../lib/documentation_links");
class HelpMenu extends react_1.default.PureComponent {
    render() {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(eui_1.EuiHorizontalRule, { margin: "none" }),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiText, { size: "s" },
                react_1.default.createElement("p", null, "For Code specific information")),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiButton, { fill: true, iconType: "popout", href: chrome_1.default.addBasePath('/app/code#/setup-guide') }, "Setup Guide"),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiButton, { fill: true, iconType: "popout", href: documentation_links_1.documentationLinks.code, target: "_blank" }, "Code documentation")));
    }
}
exports.HelpMenu = HelpMenu;
