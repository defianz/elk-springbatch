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
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
exports.NoData = ({ titleText, bodyText, refetchText, onRefetch, testString, }) => (react_1.default.createElement(CenteredEmptyPrompt, { title: react_1.default.createElement("h2", null, titleText), titleSize: "m", body: react_1.default.createElement("p", null, bodyText), actions: react_1.default.createElement(eui_1.EuiButton, { iconType: "refresh", color: "primary", fill: true, onClick: onRefetch }, refetchText), "data-test-subj": testString }));
const CenteredEmptyPrompt = eui_styled_components_1.default(eui_1.EuiEmptyPrompt) `
  align-self: center;
`;
