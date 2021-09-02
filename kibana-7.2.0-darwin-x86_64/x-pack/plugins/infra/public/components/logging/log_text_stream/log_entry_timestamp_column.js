"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const polished_1 = require("polished");
const react_1 = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = require("../../../../../../common/eui_styled_components");
const formatted_time_1 = require("../../formatted_time");
const log_entry_column_1 = require("./log_entry_column");
exports.LogEntryTimestampColumn = react_1.memo(({ isHighlighted, isHovered, time }) => {
    const formattedTime = formatted_time_1.useFormattedTime(time);
    return (react_1.default.createElement(TimestampColumnContent, { isHovered: isHovered, isHighlighted: isHighlighted }, formattedTime));
});
const hoveredContentStyle = eui_styled_components_1.css `
  background-color: ${props => props.theme.darkMode
    ? polished_1.transparentize(0.9, polished_1.darken(0.05, props.theme.eui.euiColorHighlight))
    : polished_1.darken(0.05, props.theme.eui.euiColorHighlight)};
  border-color: ${props => props.theme.darkMode
    ? polished_1.transparentize(0.7, polished_1.darken(0.2, props.theme.eui.euiColorHighlight))
    : polished_1.darken(0.2, props.theme.eui.euiColorHighlight)};
  color: ${props => props.theme.eui.euiColorFullShade};
`;
const TimestampColumnContent = log_entry_column_1.LogEntryColumnContent.extend.attrs({}) `
  background-color: ${props => props.theme.eui.euiColorLightestShade};
  border-right: solid 2px ${props => props.theme.eui.euiColorLightShade};
  color: ${props => props.theme.eui.euiColorDarkShade};
  overflow: hidden;
  text-align: right;
  text-overflow: clip;
  white-space: pre;

  ${props => (props.isHovered || props.isHighlighted ? hoveredContentStyle : '')};
`;
