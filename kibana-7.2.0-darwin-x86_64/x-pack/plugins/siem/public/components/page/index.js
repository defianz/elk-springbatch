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
const fp_1 = require("lodash/fp");
// SIDE EFFECT: the following `injectGlobal` overrides default styling in angular code that was not theme-friendly
// eslint-disable-next-line no-unused-expressions
styled_components_1.injectGlobal `
  div.app-wrapper {
    background-color: rgba(0,0,0,0);
  }

  div.application {
    background-color: rgba(0,0,0,0);
  }
`;
exports.PageContainer = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: ${props => props.theme.eui.euiColorEmptyShade};
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  margin: 0px;
`;
exports.PageContent = styled_components_1.default.div `
  flex: 1 1 auto;
  height: 100%;
  position: relative;
  overflow-y: hidden;
  background-color: ${props => props.theme.eui.euiColorEmptyShade};
  margin-top: 62px;
`;
exports.FlexPage = styled_components_1.default(eui_1.EuiPage) `
  flex: 1 0 0;
`;
exports.PageHeader = styled_components_1.default.div `
  background-color: ${props => props.theme.eui.euiColorEmptyShade};
  display: flex;
  user-select: none;
  padding: 1rem 1rem 0rem 1rem;
  width: 100vw;
  position: fixed;
`;
exports.FooterContainer = styled_components_1.default.div `
  bottom: 0;
  color: #666;
  left: 0;
  padding: 8px;
  position: fixed;
  text-align: left;
  user-select: none;
  width: 100%;
  background-color: #f5f7fa;
  padding: 16px;
  border-top: 1px solid #d3dae6;
`;
exports.PaneScrollContainer = styled_components_1.default.div `
  height: 100%;
  overflow-y: scroll;
  > div:last-child {
    margin-bottom: 3rem;
  }
`;
exports.Pane = styled_components_1.default.div `
  height: 100%;
  overflow: hidden;
  user-select: none;
`;
exports.PaneHeader = styled_components_1.default.div `
  display: flex;
`;
exports.Pane1FlexContent = styled_components_1.default.div `
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 100%;
`;
exports.CountBadge = styled_components_1.default(eui_1.EuiBadge) `
  margin-left: 5px;
`;
exports.Spacer = styled_components_1.default.span `
  margin-left: 5px;
`;
exports.Badge = styled_components_1.default(eui_1.EuiBadge) `
  vertical-align: top;
`;
exports.MoreRowItems = styled_components_1.default(eui_1.EuiIcon) `
  margin-left: 5px;
`;
exports.OverviewWrapper = styled_components_1.default(eui_1.EuiFlexGroup) `
  position: relative;
`;
exports.LoadingOverlay = styled_components_1.default.div `
  background-color: ${props => fp_1.getOr('#ffffff', 'theme.eui.euiColorLightShade', props)};
  margin: -4px 5px;
  height: 100%;
  opacity: 0.7;
  width: calc(100% - 10px);
  position: absolute;
  z-index: 3;
  border-radius: 5px;
`;
