"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importDefault(require("react"));
const log_entry_column_1 = require("./log_entry_column");
const text_styles_1 = require("./text_styles");
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
exports.LogEntryIconColumn = ({ children, isHighlighted, isHovered, }) => {
    return (react_2.default.createElement(IconColumnContent, { isHighlighted: isHighlighted, isHovered: isHovered }, children));
};
exports.LogEntryDetailsIconColumn = react_1.injectI18n(({ intl, isHighlighted, isHovered, openFlyout }) => {
    const label = intl.formatMessage({
        id: 'xpack.infra.logEntryItemView.viewDetailsToolTip',
        defaultMessage: 'View Details',
    });
    return (react_2.default.createElement(exports.LogEntryIconColumn, { isHighlighted: isHighlighted, isHovered: isHovered }, isHovered ? (react_2.default.createElement(AbsoluteIconButtonWrapper, null,
        react_2.default.createElement(eui_1.EuiButtonIcon, { onClick: openFlyout, iconType: "expand", title: label, "aria-label": label }))) : null));
});
const IconColumnContent = log_entry_column_1.LogEntryColumnContent.extend.attrs({}) `
  background-color: ${props => props.theme.eui.euiColorEmptyShade};
  overflow: hidden;
  user-select: none;

  ${props => (props.isHovered || props.isHighlighted ? text_styles_1.hoveredContentStyle : '')};
`;
// this prevents the button from influencing the line height
const AbsoluteIconButtonWrapper = eui_styled_components_1.default.div `
  overflow: hidden;
  position: absolute;
`;
