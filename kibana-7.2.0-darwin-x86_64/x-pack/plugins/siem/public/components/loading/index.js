"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importStar(require("styled-components"));
// SIDE EFFECT: the following `injectGlobal` overrides default styling in angular code that was not theme-friendly
// eslint-disable-next-line no-unused-expressions
styled_components_1.injectGlobal `
  .euiPanel-loading-hide-border {
    border: none;
  }
`;
const SpinnerFlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-right: 5px;
`;
exports.LoadingPanel = recompose_1.pure(({ height = 'auto', showBorder = true, text, width, position = 'relative', zIndex = 'inherit', }) => (React.createElement(exports.LoadingStaticPanel, { className: "app-loading", height: height, width: width, position: position, zIndex: zIndex },
    React.createElement(exports.LoadingStaticContentPanel, null,
        React.createElement(eui_1.EuiPanel, { className: showBorder ? '' : 'euiPanel-loading-hide-border' },
            React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", direction: "row", gutterSize: "none" },
                React.createElement(SpinnerFlexItem, { grow: false },
                    React.createElement(eui_1.EuiLoadingSpinner, { size: "m" })),
                React.createElement(eui_1.EuiFlexItem, { grow: false },
                    React.createElement(eui_1.EuiText, null, text))))))));
exports.LoadingStaticPanel = styled_components_1.default.div `
  height: ${({ height }) => height};
  position: ${({ position }) => position};
  width: ${({ width }) => width};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: ${({ zIndex }) => zIndex};
`;
exports.LoadingStaticContentPanel = styled_components_1.default.div `
  flex: 0 0 auto;
  align-self: center;
  text-align: center;
  height: fit-content;
  .euiPanel.euiPanel--paddingMedium {
    padding: 10px;
  }
`;
