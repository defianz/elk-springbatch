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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const droppable_wrapper_1 = require("../../drag_and_drop/droppable_wrapper");
const helpers_1 = require("../../drag_and_drop/helpers");
const i18n = tslib_1.__importStar(require("./translations"));
const Container = styled_components_1.default.div `
  overflow-x: auto;
  overflow-y: hidden;
  position: fixed;
  top: 40%;
  right: -3px;
  min-width: 50px;
  max-width: 80px;
  z-index: 9;
  height: 240px;
  max-height: 240px;
`;
const BadgeButtonContainer = styled_components_1.default.div `
  align-items: center;
  display: flex;
  flex-direction: column;
`;
exports.Button = styled_components_1.default(eui_1.EuiPanel) `
  display: flex;
  z-index: 9;
  justify-content: center;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.eui.euiColorLightShade};
  border-bottom: 1px solid ${({ theme }) => theme.eui.euiColorLightShade};
  border-left: 1px solid ${({ theme }) => theme.eui.euiColorLightShade};
  border-radius: 6px 0 0 6px;
  box-shadow: ${({ theme }) => `0 3px 3px -1px ${theme.eui.euiColorLightestShade}, 0 5px 7px -2px ${theme.eui.euiColorLightestShade}`};
  background-color: inherit;
  cursor: pointer;
`;
exports.Text = styled_components_1.default(eui_1.EuiText) `
  width: 12px;
  z-index: 10;
  user-select: none;
`;
exports.Badge = styled_components_1.default(eui_1.EuiBadge) `
  border-radius: 5px;
  min-width: 25px;
  padding: 0px;
  transform: translateY(10px);
  z-index: 10;
`;
exports.FlyoutButton = recompose_1.pure(({ onOpen, show, dataProviders, timelineId }) => show ? (React.createElement(Container, null,
    React.createElement(droppable_wrapper_1.DroppableWrapper, { droppableId: `${helpers_1.droppableTimelineFlyoutButtonPrefix}${timelineId}` },
        React.createElement(BadgeButtonContainer, { className: "flyout-overlay", "data-test-subj": "flyoutOverlay", onClick: onOpen },
            dataProviders.length !== 0 && (React.createElement(exports.Badge, { "data-test-subj": "badge", color: "primary" }, dataProviders.length)),
            React.createElement(exports.Button, null,
                React.createElement(exports.Text, { "data-test-subj": "flyoutButton", size: "s" }, i18n.TIMELINE.toLocaleUpperCase()
                    .split('')
                    .join(' '))))))) : null);
