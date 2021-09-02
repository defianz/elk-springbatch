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
/**
 * Applies CSS styling to enable text to be truncated with an ellipsis.
 * Example: "Don't leave me hanging..."
 *
 * Width is required, because CSS will not truncate the text unless a width is
 * specified.
 */
exports.TruncatableText = styled_components_1.default(eui_1.EuiText) `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${({ width }) => width};
`;
