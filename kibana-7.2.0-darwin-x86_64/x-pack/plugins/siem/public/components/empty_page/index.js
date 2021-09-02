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
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const EmptyPrompt = styled_components_1.default(eui_1.EuiEmptyPrompt) `
  align-self: center; // Corrects horizontal centering in IE11
`;
exports.EmptyPage = recompose_1.pure(({ actionPrimaryIcon, actionPrimaryLabel, actionPrimaryTarget, actionPrimaryUrl, actionSecondaryIcon, actionSecondaryLabel, actionSecondaryTarget, actionSecondaryUrl, message, title, ...rest }) => (react_1.default.createElement(EmptyPrompt, Object.assign({ title: react_1.default.createElement("h2", null, title), body: message && react_1.default.createElement("p", null, message), actions: react_1.default.createElement(eui_1.EuiFlexGroup, null,
        react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(eui_1.EuiButton, { fill: true, href: actionPrimaryUrl, iconType: actionPrimaryIcon, target: actionPrimaryTarget }, actionPrimaryLabel)),
        actionSecondaryLabel && actionSecondaryUrl && (react_1.default.createElement(eui_1.EuiFlexItem, null,
            react_1.default.createElement(eui_1.EuiButton, { href: actionSecondaryUrl, iconType: actionSecondaryIcon, target: actionSecondaryTarget }, actionSecondaryLabel)))) }, rest))));
