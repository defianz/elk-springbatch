"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
exports.Toolbar = eui_styled_components_1.default(eui_1.EuiPanel).attrs({
    grow: false,
    paddingSize: 'none',
}) `
  border-top: none;
  border-right: none;
  border-left: none;
  border-radius: 0;
  padding: ${props => props.theme.eui.euiSizeS} ${props => props.theme.eui.euiSizeL};
  z-index: ${props => props.theme.eui.euiZLevel1};
`;
