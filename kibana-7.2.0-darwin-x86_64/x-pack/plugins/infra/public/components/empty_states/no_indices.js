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
exports.NoIndices = ({ actions, message, title, ...rest }) => (react_1.default.createElement(CenteredEmptyPrompt, Object.assign({ title: react_1.default.createElement("h2", null, title), body: react_1.default.createElement("p", null, message), actions: actions }, rest)));
const CenteredEmptyPrompt = eui_styled_components_1.default(eui_1.EuiEmptyPrompt) `
  align-self: center;
`;
