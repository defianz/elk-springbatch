"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
exports.FullHeightFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: 100%;
`;
exports.FullHeightFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  height: 100%;
`;
