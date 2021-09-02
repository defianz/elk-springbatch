"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
exports.CELL_RESIZE_HANDLE_WIDTH = 2; // px;
exports.TIMELINE_RESIZE_HANDLE_WIDTH = 2; // px
exports.CommonResizeHandle = styled_components_1.default.div `
  cursor: col-resize;
  height: 100%;
  min-height: 20px;
  width: 0;
`;
exports.CellResizeHandle = styled_components_1.default(exports.CommonResizeHandle) `
  border-right: ${exports.CELL_RESIZE_HANDLE_WIDTH}px solid
    ${({ theme }) => theme.darkMode ? theme.eui.euiFormBackgroundColor : theme.eui.euiColorLightestShade};
  border-top: ${exports.CELL_RESIZE_HANDLE_WIDTH}px solid ${({ theme }) => theme.eui.euiColorLightShade};
`;
exports.ColumnHeaderResizeHandle = styled_components_1.default(exports.CommonResizeHandle) `
  border: ${exports.CELL_RESIZE_HANDLE_WIDTH}px solid ${({ theme }) => theme.eui.euiColorLightestShade};
`;
exports.TimelineResizeHandle = styled_components_1.default(exports.CommonResizeHandle) `
  border: ${exports.TIMELINE_RESIZE_HANDLE_WIDTH}px solid ${props => props.theme.eui.euiColorLightShade};
  z-index: 2;
  height: ${({ height }) => `${height}px`};
  position: absolute;
`;
