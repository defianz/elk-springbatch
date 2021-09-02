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
const react_2 = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
const source_configuration_1 = require("../../../utils/source_configuration");
const log_entry_column_1 = require("./log_entry_column");
const vertical_scroll_panel_1 = require("./vertical_scroll_panel");
exports.LogColumnHeaders = react_1.injectI18n(({ columnConfigurations, columnWidths, intl, showColumnConfiguration }) => {
    const iconColumnWidth = react_2.useMemo(() => columnWidths[columnWidths.length - 1], [columnWidths]);
    const showColumnConfigurationLabel = intl.formatMessage({
        id: 'xpack.infra.logColumnHeaders.configureColumnsLabel',
        defaultMessage: 'Configure columns',
    });
    return (react_2.default.createElement(LogColumnHeadersWrapper, null,
        columnConfigurations.map((columnConfiguration, columnIndex) => {
            const columnWidth = columnWidths[columnIndex];
            if (source_configuration_1.isTimestampLogColumnConfiguration(columnConfiguration)) {
                return (react_2.default.createElement(LogColumnHeader, { columnWidth: columnWidth, "data-test-subj": "logColumnHeader timestampLogColumnHeader", key: columnConfiguration.timestampColumn.id }, "Timestamp"));
            }
            else if (source_configuration_1.isMessageLogColumnConfiguration(columnConfiguration)) {
                return (react_2.default.createElement(LogColumnHeader, { columnWidth: columnWidth, "data-test-subj": "logColumnHeader messageLogColumnHeader", key: columnConfiguration.messageColumn.id }, "Message"));
            }
            else if (source_configuration_1.isFieldLogColumnConfiguration(columnConfiguration)) {
                return (react_2.default.createElement(LogColumnHeader, { columnWidth: columnWidth, "data-test-subj": "logColumnHeader fieldLogColumnHeader", key: columnConfiguration.fieldColumn.id }, columnConfiguration.fieldColumn.field));
            }
        }),
        react_2.default.createElement(LogColumnHeader, { columnWidth: iconColumnWidth, "data-test-subj": "logColumnHeader iconLogColumnHeader", key: "iconColumnHeader" },
            react_2.default.createElement(eui_1.EuiButtonIcon, { "aria-label": showColumnConfigurationLabel, color: "text", iconType: "gear", onClick: showColumnConfiguration, title: showColumnConfigurationLabel }))));
});
const LogColumnHeader = ({ children, columnWidth, 'data-test-subj': dataTestSubj }) => (react_2.default.createElement(LogColumnHeaderWrapper, Object.assign({ "data-test-subj": dataTestSubj }, columnWidth),
    react_2.default.createElement(LogColumnHeaderContent, null, children)));
const LogColumnHeadersWrapper = eui_styled_components_1.default.div.attrs({
    role: 'row',
}) `
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: hidden;
  padding-right: ${vertical_scroll_panel_1.ASSUMED_SCROLLBAR_WIDTH}px;
`;
const LogColumnHeaderWrapper = log_entry_column_1.LogEntryColumn.extend.attrs({
    role: 'columnheader',
}) `
  align-items: center;
  border-bottom: ${props => props.theme.eui.euiBorderThick};
  display: flex;
  flex-direction: row;
  height: 32px;
  overflow: hidden;
`;
const LogColumnHeaderContent = log_entry_column_1.LogEntryColumnContent.extend `
  color: ${props => props.theme.eui.euiTitleColor};
  font-size: ${props => props.theme.eui.euiFontSizeS};
  font-weight: ${props => props.theme.eui.euiFontWeightSemiBold};
  line-height: ${props => props.theme.eui.euiLineHeight};
  text-overflow: clip;
  white-space: pre;
`;
