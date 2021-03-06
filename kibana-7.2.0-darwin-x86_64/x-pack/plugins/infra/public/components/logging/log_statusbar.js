"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
exports.LogStatusbar = eui_styled_components_1.default(eui_1.EuiFlexGroup).attrs({
    alignItems: 'center',
    gutterSize: 'none',
    justifyContent: 'flexEnd',
}) `
  padding: ${props => props.theme.eui.euiSizeS};
  border-top: ${props => props.theme.eui.euiBorderThin};
  max-height: 48px;
  min-height: 48px;
  background-color: ${props => props.theme.eui.euiColorEmptyShade};
  flex-direction: row;
`;
exports.LogStatusbarItem = eui_1.EuiFlexItem;
