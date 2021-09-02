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
const log_entry_column_1 = require("./log_entry_column");
exports.LogEntryFieldColumn = ({ encodedValue, isHighlighted, isHovered, isWrapped, }) => {
    const value = react_1.useMemo(() => JSON.parse(encodedValue), [encodedValue]);
    return (react_1.default.createElement(FieldColumnContent, { isHighlighted: isHighlighted, isHovered: isHovered, isWrapped: isWrapped }, value));
};
const hoveredContentStyle = eui_styled_components_1.css `
  background-color: ${props => props.theme.darkMode
    ? polished_1.transparentize(0.9, polished_1.darken(0.05, props.theme.eui.euiColorHighlight))
    : polished_1.darken(0.05, props.theme.eui.euiColorHighlight)};
`;
const wrappedContentStyle = eui_styled_components_1.css `
  overflow: visible;
  white-space: pre-wrap;
  word-break: break-all;
`;
const unwrappedContentStyle = eui_styled_components_1.css `
  overflow: hidden;
  white-space: pre;
`;
const FieldColumnContent = log_entry_column_1.LogEntryColumnContent.extend.attrs({}) `
  background-color: ${props => props.theme.eui.euiColorEmptyShade};
  text-overflow: ellipsis;

  ${props => (props.isHovered || props.isHighlighted ? hoveredContentStyle : '')};
  ${props => (props.isWrapped ? wrappedContentStyle : unwrappedContentStyle)};
`;
