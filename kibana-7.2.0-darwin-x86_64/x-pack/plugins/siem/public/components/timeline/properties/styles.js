"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const styled_components_1 = tslib_1.__importStar(require("styled-components"));
const fadeInEffect = styled_components_1.keyframes `
  from { opacity: 0; }
  to { opacity: 1; }
`;
exports.TimelineProperties = styled_components_1.default.div `
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  user-select: none;
  width: ${({ width }) => `${width}px`};
`;
exports.DatePicker = styled_components_1.default(eui_1.EuiFlexItem) `
  width: ${({ width }) => `${width}px`};
  .euiSuperDatePicker__flexWrapper {
    max-width: none;
    width: auto;
  }
`;
exports.NameField = styled_components_1.default(eui_1.EuiFieldText) `
  width: 150px;
  margin-right: 5px;
`;
exports.DescriptionContainer = styled_components_1.default.div `
  animation: ${fadeInEffect} 0.3s;
  margin-right: 5px;
  min-width: 150px;
`;
exports.SmallNotesButtonContainer = styled_components_1.default.div `
  cursor: pointer;
  width: 35px;
`;
exports.ButtonContainer = styled_components_1.default.div `
  animation: ${fadeInEffect} ${({ animate }) => (animate ? '0.3s' : '0s')};
`;
exports.LabelText = styled_components_1.default.div `
  margin-left: 10px;
`;
exports.StyledStar = styled_components_1.default(eui_1.EuiIcon) `
  margin-right: 5px;
  cursor: pointer;
`;
exports.PropertiesLeft = styled_components_1.default(eui_1.EuiFlexGroup) `
  width: 100%;
`;
exports.PropertiesRight = styled_components_1.default(eui_1.EuiFlexGroup) `
  margin-right: 5px;
`;
exports.Facet = styled_components_1.default.div `
  align-items: center;
  display: inline-flex;
  justify-content: center;
  border-radius: 4px;
  background: #e4e4e4;
  color: #000;
  font-size: 12px;
  line-height: 16px;
  height: 20px;
  min-width: 20px;
  padding-left: 8px;
  padding-right: 8px;
  user-select: none;
`;
exports.LockIconContainer = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-right: 2px;
`;
