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
exports.JobJsonPane = ({ json }) => {
    return (react_1.default.createElement(eui_1.EuiFlexGroup, null,
        react_1.default.createElement(eui_1.EuiFlexItem, { style: { width: '100%' } },
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            react_1.default.createElement(eui_1.EuiCodeEditor, { value: JSON.stringify(json, null, 2), readOnly: true, mode: "json" })),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false }, "\u00A0")));
};
