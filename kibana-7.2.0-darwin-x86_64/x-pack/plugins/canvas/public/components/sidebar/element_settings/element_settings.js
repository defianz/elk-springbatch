"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const prop_types_1 = tslib_1.__importDefault(require("prop-types"));
const eui_1 = require("@elastic/eui");
// @ts-ignore unconverted component
const datasource_1 = require("../../datasource");
// @ts-ignore unconverted component
const function_form_list_1 = require("../../function_form_list");
exports.ElementSettings = ({ element }) => {
    const tabs = [
        {
            id: 'edit',
            name: 'Display',
            content: (react_1.default.createElement("div", { className: "canvasSidebar__pop" },
                react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                react_1.default.createElement("div", { className: "canvasSidebar--args" },
                    react_1.default.createElement(function_form_list_1.FunctionFormList, { element: element })))),
        },
        {
            id: 'data',
            name: 'Data',
            content: (react_1.default.createElement("div", { className: "canvasSidebar__pop" },
                react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
                react_1.default.createElement(datasource_1.Datasource, null))),
        },
    ];
    return react_1.default.createElement(eui_1.EuiTabbedContent, { tabs: tabs, initialSelectedTab: tabs[0], size: "s" });
};
exports.ElementSettings.propTypes = {
    element: prop_types_1.default.object,
};
