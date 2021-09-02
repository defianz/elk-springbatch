"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import { darken, transparentize } from 'polished';
const react_1 = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
const log_entry_1 = require("../../../utils/log_entry");
const source_configuration_1 = require("../../../utils/source_configuration");
const log_entry_column_1 = require("./log_entry_column");
const log_entry_field_column_1 = require("./log_entry_field_column");
const log_entry_icon_column_1 = require("./log_entry_icon_column");
const log_entry_message_column_1 = require("./log_entry_message_column");
const log_entry_timestamp_column_1 = require("./log_entry_timestamp_column");
const text_styles_1 = require("./text_styles");
exports.LogEntryRow = ({ boundingBoxRef, columnConfigurations, columnWidths, isHighlighted, logEntry, openFlyoutWithItem, scale, wrap, }) => {
    const [isHovered, setIsHovered] = react_1.useState(false);
    const setItemIsHovered = react_1.useCallback(() => {
        setIsHovered(true);
    }, []);
    const setItemIsNotHovered = react_1.useCallback(() => {
        setIsHovered(false);
    }, []);
    const openFlyout = react_1.useCallback(() => openFlyoutWithItem(logEntry.gid), [
        openFlyoutWithItem,
        logEntry.gid,
    ]);
    const iconColumnWidth = react_1.useMemo(() => columnWidths[columnWidths.length - 1], [columnWidths]);
    return (react_1.default.createElement(LogEntryRowWrapper, { "data-test-subj": "streamEntry logTextStreamEntry", innerRef: 
        /* Workaround for missing RefObject support in styled-components */
        boundingBoxRef, onMouseEnter: setItemIsHovered, onMouseLeave: setItemIsNotHovered, scale: scale },
        logEntry.columns.map((column, columnIndex) => {
            const columnConfiguration = columnConfigurations[columnIndex];
            const columnWidth = columnWidths[columnIndex];
            if (log_entry_1.isTimestampColumn(column) && source_configuration_1.isTimestampLogColumnConfiguration(columnConfiguration)) {
                return (react_1.default.createElement(log_entry_column_1.LogEntryColumn, Object.assign({ "data-test-subj": "logColumn timestampLogColumn", key: columnConfiguration.timestampColumn.id }, columnWidth),
                    react_1.default.createElement(log_entry_timestamp_column_1.LogEntryTimestampColumn, { isHighlighted: isHighlighted, isHovered: isHovered, time: column.timestamp })));
            }
            else if (log_entry_1.isMessageColumn(column) &&
                source_configuration_1.isMessageLogColumnConfiguration(columnConfiguration)) {
                return (react_1.default.createElement(log_entry_column_1.LogEntryColumn, Object.assign({ "data-test-subj": "logColumn messageLogColumn", key: columnConfiguration.messageColumn.id }, columnWidth),
                    react_1.default.createElement(log_entry_message_column_1.LogEntryMessageColumn, { isHighlighted: isHighlighted, isHovered: isHovered, isWrapped: wrap, segments: column.message })));
            }
            else if (log_entry_1.isFieldColumn(column) && source_configuration_1.isFieldLogColumnConfiguration(columnConfiguration)) {
                return (react_1.default.createElement(log_entry_column_1.LogEntryColumn, Object.assign({ "data-test-subj": `logColumn fieldLogColumn fieldLogColumn:${column.field}`, key: columnConfiguration.fieldColumn.id }, columnWidth),
                    react_1.default.createElement(log_entry_field_column_1.LogEntryFieldColumn, { isHighlighted: isHighlighted, isHovered: isHovered, isWrapped: wrap, encodedValue: column.value })));
            }
        }),
        react_1.default.createElement(log_entry_column_1.LogEntryColumn, Object.assign({ key: "logColumn iconLogColumn iconLogColumn:details" }, iconColumnWidth),
            react_1.default.createElement(log_entry_icon_column_1.LogEntryDetailsIconColumn, { isHighlighted: isHighlighted, isHovered: isHovered, openFlyout: openFlyout }))));
};
const LogEntryRowWrapper = eui_styled_components_1.default.div.attrs({
    role: 'row',
}) `
  align-items: stretch;
  color: ${props => props.theme.eui.euiTextColor};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: hidden;

  ${props => text_styles_1.monospaceTextStyle(props.scale)}
`;
