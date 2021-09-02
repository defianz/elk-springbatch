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
const and_or_badge_1 = require("../../and_or_badge");
const i18n = tslib_1.__importStar(require("./translations"));
const Text = styled_components_1.default(eui_1.EuiText) `
  overflow: hidden;
  margin: 5px 0 5px 0;
  padding: 3px;
  white-space: nowrap;
`;
const BadgeHighlighted = styled_components_1.default(eui_1.EuiBadge) `
  height: 20px;
  margin: 0 5px 0 5px;
  max-width: 70px;
  min-width: 70px;
`;
const EmptyContainer = styled_components_1.default.div `
  width: ${props => (props.showSmallMsg ? '60px' : 'auto')}
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  user-select: none;
  align-content: center;
  ${props => props.showSmallMsg
    ? `
      border-right: 1px solid ${props.theme.eui.euiColorMediumShade};
      margin-right: 10px;
    `
    : `
  min-height: 100px;
  + div {
    display: none !important;
   }
  `}
`;
const NoWrap = styled_components_1.default.div `
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`;
/**
 * Prompts the user to drop anything with a facet count into the data providers section.
 */
exports.Empty = recompose_1.pure(({ showSmallMsg = false }) => (React.createElement(EmptyContainer, { className: "timeline-drop-area-empty", "data-test-subj": "empty", showSmallMsg: showSmallMsg },
    !showSmallMsg && (React.createElement(React.Fragment, null,
        React.createElement(NoWrap, null,
            React.createElement(Text, { color: "subdued", size: "s" }, i18n.DROP_ANYTHING),
            React.createElement(BadgeHighlighted, null, i18n.HIGHLIGHTED)),
        React.createElement(NoWrap, null,
            React.createElement(Text, { color: "subdued", size: "s" }, i18n.HERE_TO_BUILD_AN),
            React.createElement(and_or_badge_1.AndOrBadge, { type: "or" }),
            React.createElement(Text, { color: "subdued", size: "s" }, i18n.QUERY)))),
    showSmallMsg && React.createElement(and_or_badge_1.AndOrBadge, { type: "or" }))));
