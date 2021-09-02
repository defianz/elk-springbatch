"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
const source_configuration_1 = require("../../../utils/source_configuration");
const DATE_COLUMN_SLACK_FACTOR = 1.1;
const FIELD_COLUMN_MIN_WIDTH_CHARACTERS = 10;
const DETAIL_FLYOUT_ICON_MIN_WIDTH = 32;
const COLUMN_PADDING = 8;
exports.LogEntryColumn = eui_styled_components_1.default.div.attrs({
    role: 'cell',
}) `
  align-items: stretch;
  display: flex;
  flex-basis: ${props => props.baseWidth || '0%'};
  flex-direction: row;
  flex-grow: ${props => props.growWeight || 0};
  flex-shrink: ${props => props.shrinkWeight || 0};
  overflow: hidden;
`;
exports.LogEntryColumnContent = eui_styled_components_1.default.div `
  flex: 1 0 0%;
  padding: 2px ${COLUMN_PADDING}px;
`;
exports.getColumnWidths = (columns, characterWidth, formattedDateWidth) => [
    ...columns.map(column => {
        if (source_configuration_1.isTimestampLogColumnConfiguration(column)) {
            return {
                growWeight: 0,
                shrinkWeight: 0,
                baseWidth: `${Math.ceil(characterWidth * formattedDateWidth * DATE_COLUMN_SLACK_FACTOR) +
                    2 * COLUMN_PADDING}px`,
            };
        }
        else if (source_configuration_1.isMessageLogColumnConfiguration(column)) {
            return {
                growWeight: 5,
                shrinkWeight: 0,
                baseWidth: '0%',
            };
        }
        else {
            return {
                growWeight: 1,
                shrinkWeight: 0,
                baseWidth: `${Math.ceil(characterWidth * FIELD_COLUMN_MIN_WIDTH_CHARACTERS) +
                    2 * COLUMN_PADDING}px`,
            };
        }
    }),
    // the detail flyout icon column
    {
        growWeight: 0,
        shrinkWeight: 0,
        baseWidth: `${DETAIL_FLYOUT_ICON_MIN_WIDTH + 2 * COLUMN_PADDING}px`,
    },
];
