"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const draggable_wrapper_1 = require("../../../drag_and_drop/draggable_wrapper");
const droppable_wrapper_1 = require("../../../drag_and_drop/droppable_wrapper");
const helpers_1 = require("../../../drag_and_drop/helpers");
const field_badge_1 = require("../../../draggables/field_badge");
const fields_browser_1 = require("../../../fields_browser");
const events_select_1 = require("./events_select");
const header_1 = require("./header");
const helpers_2 = require("../../../fields_browser/helpers");
const is_resizing_1 = require("../../../resize_handle/is_resizing");
const ActionsContainer = styled_components_1.default.div `
  overflow: hidden;
  width: ${({ actionsColumnWidth }) => actionsColumnWidth}px;
`;
const COLUMN_HEADERS_HEIGHT = '38px';
const ColumnHeadersContainer = styled_components_1.default.div `
  display: block;
  height: ${COLUMN_HEADERS_HEIGHT};
  overflow: hidden;
  overflow-x: auto;
  min-width: ${({ minWidth }) => `${minWidth}px`};
  margin-bottom: 2px;
`;
const ColumnHeadersFlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: ${COLUMN_HEADERS_HEIGHT};
`;
const EventsSelectContainer = styled_components_1.default(eui_1.EuiFlexItem) `
  margin-right: 4px;
`;
/** Renders the timeline header columns */
exports.ColumnHeaders = recompose_1.pure(({ actionsColumnWidth, browserFields, columnHeaders, isLoading, onColumnRemoved, onColumnResized, onColumnSorted, onUpdateColumns, onFilterChange = fp_1.noop, showEventsSelect, sort, timelineId, minWidth, }) => {
    const { isResizing, setIsResizing } = is_resizing_1.isContainerResizing();
    return (React.createElement(ColumnHeadersContainer, { "data-test-subj": "column-headers", minWidth: minWidth },
        React.createElement(ColumnHeadersFlexGroup, { alignItems: "center", "data-test-subj": "column-headers-group", gutterSize: "none" },
            React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "actions-item", grow: false },
                React.createElement(ActionsContainer, { actionsColumnWidth: actionsColumnWidth, "data-test-subj": "actions-container" },
                    React.createElement(eui_1.EuiFlexGroup, { gutterSize: "none" },
                        showEventsSelect && (React.createElement(EventsSelectContainer, { grow: false },
                            React.createElement(events_select_1.EventsSelect, { checkState: "unchecked", timelineId: timelineId }))),
                        React.createElement(eui_1.EuiFlexItem, { grow: true },
                            React.createElement(fields_browser_1.StatefulFieldsBrowser, { browserFields: browserFields, columnHeaders: columnHeaders, "data-test-subj": "field-browser", height: helpers_2.FIELD_BROWSER_HEIGHT, isLoading: isLoading, onUpdateColumns: onUpdateColumns, timelineId: timelineId, width: helpers_2.FIELD_BROWSER_WIDTH }))))),
            React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "headers-item", grow: false },
                React.createElement(droppable_wrapper_1.DroppableWrapper, { droppableId: `${helpers_1.droppableTimelineColumnsPrefix}${timelineId}`, height: COLUMN_HEADERS_HEIGHT, isDropDisabled: false, type: helpers_1.DRAG_TYPE_FIELD },
                    React.createElement(eui_1.EuiFlexGroup, { "data-test-subj": "headers-group", gutterSize: "none" }, columnHeaders.map((header, i) => (React.createElement(eui_1.EuiFlexItem, { grow: false, key: header.id },
                        React.createElement(react_beautiful_dnd_1.Draggable, { "data-test-subj": "draggable", draggableId: helpers_1.getDraggableFieldId({
                                contextId: `timeline-column-headers-${timelineId}`,
                                fieldId: header.id,
                            }), index: i, type: helpers_1.DRAG_TYPE_FIELD, isDragDisabled: isResizing }, (provided, snapshot) => (React.createElement("div", Object.assign({}, provided.draggableProps, provided.dragHandleProps, { ref: provided.innerRef, "data-test-subj": "draggable-header" }), !snapshot.isDragging ? (React.createElement(header_1.Header, { timelineId: timelineId, header: header, isLoading: isLoading, onColumnRemoved: onColumnRemoved, onColumnResized: onColumnResized, onColumnSorted: onColumnSorted, onFilterChange: onFilterChange, setIsResizing: setIsResizing, sort: sort })) : (React.createElement(draggable_wrapper_1.DragEffects, null,
                            React.createElement(field_badge_1.DraggableFieldBadge, { fieldId: header.id })))))))))))))));
});
