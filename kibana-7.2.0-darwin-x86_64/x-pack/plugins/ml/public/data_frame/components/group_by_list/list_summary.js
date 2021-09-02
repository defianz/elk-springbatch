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
const group_by_label_summary_1 = require("./group_by_label_summary");
exports.GroupByListSummary = ({ list }) => {
    const listKeys = Object.keys(list);
    return (react_1.default.createElement(react_1.Fragment, null, listKeys.map((optionsDataId) => {
        return (react_1.default.createElement(react_1.Fragment, { key: optionsDataId },
            react_1.default.createElement(eui_1.EuiPanel, { paddingSize: "s" },
                react_1.default.createElement(group_by_label_summary_1.GroupByLabelSummary, { item: list[optionsDataId], optionsDataId: optionsDataId })),
            listKeys.length > 0 && react_1.default.createElement(eui_1.EuiSpacer, { size: "s" })));
    })));
};
