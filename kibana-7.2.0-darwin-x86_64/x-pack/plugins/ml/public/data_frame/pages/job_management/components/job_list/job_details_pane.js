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
exports.Section = ({ section }) => {
    if (section.items.length === 0) {
        return null;
    }
    return (react_1.default.createElement(eui_1.EuiPanel, null,
        react_1.default.createElement(eui_1.EuiTitle, { size: "xs" },
            react_1.default.createElement("span", null, section.title)),
        react_1.default.createElement(eui_1.EuiDescriptionList, { compressed: true, type: "column", listItems: section.items })));
};
exports.JobDetailsPane = ({ sections }) => {
    return (react_1.default.createElement(eui_1.EuiFlexGroup, null,
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            sections
                .filter(s => s.position === 'left')
                .map(s => (react_1.default.createElement(exports.Section, { section: s, key: s.title })))),
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
            sections
                .filter(s => s.position === 'right')
                .map(s => (react_1.default.createElement(exports.Section, { section: s, key: s.title }))))));
};
