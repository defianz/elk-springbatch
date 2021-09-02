"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_1 = require("@elastic/eui");
exports.AggListSummary = ({ list }) => {
    const aggNames = Object.keys(list);
    return (react_1.default.createElement(eui_1.EuiForm, null, aggNames.map((aggName) => (react_1.default.createElement(react_1.Fragment, { key: aggName },
        react_1.default.createElement(eui_1.EuiPanel, { paddingSize: "s" },
            react_1.default.createElement("div", { className: "eui-textTruncate" }, aggName)),
        aggNames.length > 0 && react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }))))));
};
