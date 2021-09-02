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
const footer_1 = require("../footer");
const column_headers_1 = require("./column_headers");
const events_1 = require("./events");
const helpers_1 = require("./helpers");
const HorizontalScroll = styled_components_1.default.div `
  display: block;
  height: ${({ height }) => `${height}px`};
  overflow: hidden;
  overflow-x: auto;
  min-height: 0px;
`;
const VerticalScrollContainer = styled_components_1.default.div `
  display: block;
  height: ${({ height }) => `${height - footer_1.footerHeight - 12}px`};
  overflow: hidden;
  overflow-y: auto;
  min-width: ${({ minWidth }) => `${minWidth}px`};
`;
/** Renders the timeline body */
exports.Body = recompose_1.pure(({ addNoteToEvent, browserFields, columnHeaders, columnRenderers, data, eventIdToNoteIds, getNotesByIds, height, id, isLoading, onColumnRemoved, onColumnResized, onColumnSorted, onFilterChange, onPinEvent, onUpdateColumns, onUnPinEvent, pinnedEventIds, rowRenderers, sort, updateNote, width, }) => {
    const columnWidths = columnHeaders.reduce((totalWidth, header) => totalWidth + header.width, helpers_1.ACTIONS_COLUMN_WIDTH);
    return (React.createElement(HorizontalScroll, { "data-test-subj": "horizontal-scroll", height: height },
        React.createElement(eui_1.EuiText, { size: "s" },
            React.createElement(column_headers_1.ColumnHeaders, { actionsColumnWidth: helpers_1.ACTIONS_COLUMN_WIDTH, browserFields: browserFields, columnHeaders: columnHeaders, isLoading: isLoading, onColumnRemoved: onColumnRemoved, onColumnResized: onColumnResized, onColumnSorted: onColumnSorted, onFilterChange: onFilterChange, onUpdateColumns: onUpdateColumns, showEventsSelect: false, sort: sort, timelineId: id, minWidth: columnWidths }),
            React.createElement(VerticalScrollContainer, { "data-test-subj": "vertical-scroll-container", height: height, minWidth: columnWidths },
                React.createElement(events_1.Events, { actionsColumnWidth: helpers_1.ACTIONS_COLUMN_WIDTH, addNoteToEvent: addNoteToEvent, browserFields: browserFields, columnHeaders: columnHeaders, columnRenderers: columnRenderers, data: data, eventIdToNoteIds: eventIdToNoteIds, getNotesByIds: getNotesByIds, id: id, isLoading: isLoading, onColumnResized: onColumnResized, onPinEvent: onPinEvent, onUpdateColumns: onUpdateColumns, onUnPinEvent: onUnPinEvent, pinnedEventIds: pinnedEventIds, rowRenderers: rowRenderers, updateNote: updateNote, minWidth: columnWidths, width: width })))));
});
