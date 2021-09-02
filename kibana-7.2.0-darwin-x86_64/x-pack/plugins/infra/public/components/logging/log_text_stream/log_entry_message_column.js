"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = require("../../../../../../common/eui_styled_components");
const log_entry_1 = require("../../../utils/log_entry");
const log_entry_column_1 = require("./log_entry_column");
const text_styles_1 = require("./text_styles");
exports.LogEntryMessageColumn = react_1.memo(({ isHighlighted, isHovered, isWrapped, segments }) => {
    const message = react_1.useMemo(() => segments.map(formatMessageSegment).join(''), [segments]);
    return (react_1.default.createElement(MessageColumnContent, { isHighlighted: isHighlighted, isHovered: isHovered, isWrapped: isWrapped }, message));
});
const wrappedContentStyle = eui_styled_components_1.css `
  overflow: visible;
  white-space: pre-wrap;
  word-break: break-all;
`;
const unwrappedContentStyle = eui_styled_components_1.css `
  overflow: hidden;
  white-space: pre;
`;
const MessageColumnContent = log_entry_column_1.LogEntryColumnContent.extend.attrs({}) `
  background-color: ${props => props.theme.eui.euiColorEmptyShade};
  text-overflow: ellipsis;

  ${props => (props.isHovered || props.isHighlighted ? text_styles_1.hoveredContentStyle : '')};
  ${props => (props.isWrapped ? wrappedContentStyle : unwrappedContentStyle)};
`;
const formatMessageSegment = (messageSegment) => {
    if (log_entry_1.isFieldSegment(messageSegment)) {
        return messageSegment.value;
    }
    else if (log_entry_1.isConstantSegment(messageSegment)) {
        return messageSegment.constant;
    }
    return 'failed to format message';
};
