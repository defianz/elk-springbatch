"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_theme_light_json_1 = tslib_1.__importDefault(require("@elastic/eui/dist/eui_theme_light.json"));
const react_1 = tslib_1.__importDefault(require("react"));
exports.CloneStatus = (props) => {
    const { progress: progressRate, cloneProgress, repoName } = props;
    let progress = `Receiving objects: ${progressRate.toFixed(2)}%`;
    if (progressRate < 0) {
        progress = 'Clone Failed';
    }
    else if (cloneProgress) {
        const { receivedObjects, totalObjects, indexedObjects } = cloneProgress;
        if (receivedObjects === totalObjects) {
            progress = `Indexing objects: ${((indexedObjects * 100) / totalObjects).toFixed(2)}% (${indexedObjects}/${totalObjects})`;
        }
        else {
            progress = `Receiving objects: ${((receivedObjects * 100) / totalObjects).toFixed(2)}% (${receivedObjects}/${totalObjects})`;
        }
    }
    return (react_1.default.createElement(eui_1.EuiFlexGroup, { direction: "column", alignItems: "center" },
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xxl" }),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xxl" }),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiText, { style: { fontSize: eui_theme_light_json_1.default.euiSizeXXL, color: '#1A1A1A' } },
                repoName,
                " is cloning")),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "s" }),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement(eui_1.EuiText, { style: { fontSize: eui_theme_light_json_1.default.euiSizeM, color: '#69707D' } }, "Your project will be available when this process is complete")),
        react_1.default.createElement(eui_1.EuiSpacer, { size: "xl" }),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
            react_1.default.createElement("div", null,
                react_1.default.createElement(eui_1.EuiText, { size: "m", color: "subdued" }, progress))),
        react_1.default.createElement(eui_1.EuiFlexItem, { grow: false, style: { minWidth: 640 } },
            react_1.default.createElement(eui_1.EuiProgress, { color: "primary", size: "s", max: 100, value: progressRate }))));
};
