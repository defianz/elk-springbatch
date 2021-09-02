"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../common/eui_styled_components"));
exports.ColumnarPage = eui_styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 0 0%;
`;
exports.PageContent = eui_styled_components_1.default.div `
  flex: 1 0 0%;
  display: flex;
  flex-direction: row;
  background-color: ${props => props.theme.eui.euiColorEmptyShade};
`;
exports.FlexPage = eui_styled_components_1.default(eui_1.EuiPage) `
  flex: 1 0 0%;
`;
