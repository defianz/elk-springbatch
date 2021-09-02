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
exports.PositionedIcon = styled_components_1.default.div `
  position: relative;
  top: -2px;
`;
/**
 * The width of an action column, which must be wide enough to render a
 * two digit count without wrapping
 */
exports.ACTION_COLUMN_WIDTH = '35px';
exports.Avatar = styled_components_1.default(eui_1.EuiAvatar) `
  margin-right: 5px;
  user-select: none;
`;
