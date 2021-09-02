"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
exports.EmptyPlaceholder = (props) => {
    return (react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "column", alignItems: "center" },
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xxl" }),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xxl" }),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiText, { style: { fontSize: '24px', color: '#98A2B3' } },
                "\"",
                props.query,
                "\"")),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiText, { style: { fontSize: '28px', color: '#1A1A1A' } }, "Hmmm... we looked for that, but couldn\u2019t find anything.")),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "l" }),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiText, { style: { fontSize: '16px', color: '#69707D' } }, "You can search for something else or modify your search settings.")),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiButton, { fill: true, onClick: () => {
                    if (props.toggleOptionsFlyout) {
                        props.toggleOptionsFlyout();
                    }
                } }, "Modify your search settings"))));
};
