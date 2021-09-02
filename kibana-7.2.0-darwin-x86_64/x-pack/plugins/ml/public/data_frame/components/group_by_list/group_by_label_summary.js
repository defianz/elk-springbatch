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
const common_1 = require("../../common");
exports.GroupByLabelSummary = ({ item, optionsDataId }) => {
    let interval;
    if (common_1.isGroupByDateHistogram(item)) {
        interval = item.calendar_interval;
    }
    else if (common_1.isGroupByHistogram(item)) {
        interval = item.interval;
    }
    return (react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "s", responsive: false },
        react_1.default.createElement(eui_1.EuiFlexItem, { className: "mlGroupByLabel--text" },
            react_1.default.createElement("span", { className: "eui-textTruncate" }, optionsDataId)),
        interval !== undefined && (react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, className: "mlGroupByLabel--text mlGroupByLabel--interval" },
            react_1.default.createElement(eui_1.EuiTextColor, { color: "subdued", className: "eui-textTruncate" }, interval)))));
};
