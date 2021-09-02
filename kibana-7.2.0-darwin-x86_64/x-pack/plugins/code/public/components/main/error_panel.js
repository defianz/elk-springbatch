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
const url_1 = require("../../utils/url");
const icons_1 = require("../shared/icons");
exports.ErrorPanel = (props) => {
    return (react_1.default.createElement("div", { className: "codePanel__error", "data-test-subj": "codeNotFoundErrorPage" },
        react_1.default.createElement(eui_1.EuiPanel, null,
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" },
                react_1.default.createElement(icons_1.ErrorIcon, null)),
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" }, props.title),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" },
                react_1.default.createElement(eui_1.EuiTextColor, null, props.content)),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiText, { textAlign: "center" },
                react_1.default.createElement(eui_1.EuiButton, { fill: true, onClick: url_1.history.goBack }, "Go Back")),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiSpacer, null),
            react_1.default.createElement(eui_1.EuiSpacer, null))));
};
