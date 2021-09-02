"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const eui_1 = require("@elastic/eui");
const variables_1 = require("../../../../style/variables");
exports.StyledAnchorEuiToolTip = ({ className, ...props }) => (react_1.default.createElement(eui_1.EuiToolTip, Object.assign({}, props, { anchorClassName: className })));
exports.TruncatedAnchorEuiToolTip = styled_components_1.default(exports.StyledAnchorEuiToolTip) `
  ${variables_1.truncate('100%')};
`;
