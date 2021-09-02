"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_beautiful_dnd_1 = require("react-beautiful-dnd");
const eui_1 = require("@elastic/eui");
const React = tslib_1.__importStar(require("react"));
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const draggable_wrapper_1 = require("../drag_and_drop/draggable_wrapper");
const draggables_1 = require("../draggables");
const droppable_wrapper_1 = require("../drag_and_drop/droppable_wrapper");
const field_badge_1 = require("../draggables/field_badge");
const formatted_field_1 = require("../timeline/body/renderers/formatted_field");
const field_name_1 = require("../fields_browser/field_name");
const helpers_1 = require("./helpers");
const helpers_2 = require("../drag_and_drop/helpers");
const selectable_text_1 = require("../selectable_text");
const with_copy_to_clipboard_1 = require("../../lib/clipboard/with_copy_to_clipboard");
const with_hover_actions_1 = require("../with_hover_actions");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_3 = require("../tables/helpers");
const constants_1 = require("../timeline/body/renderers/constants");
const duration_1 = require("../duration");
const HoverActionsContainer = styled_components_1.default(eui_1.EuiPanel) `
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 25px;
  justify-content: center;
  left: 5px;
  position: absolute;
  top: -10px;
  width: 30px;
`;
const FieldTypeIcon = styled_components_1.default(eui_1.EuiIcon) `
  position: relative;
  top: -2px;
`;
exports.getColumns = ({ browserFields, eventId, isLoading, onUpdateColumns, timelineId, }) => [
    {
        field: 'type',
        name: '',
        sortable: false,
        truncateText: false,
        width: '30px',
        render: (type) => (React.createElement(eui_1.EuiToolTip, { content: type },
            React.createElement(FieldTypeIcon, { "data-test-subj": "field-type-icon", type: helpers_1.getIconFromType(type) }))),
    },
    {
        field: 'field',
        name: i18n.FIELD,
        sortable: true,
        truncateText: false,
        render: (field, data) => (React.createElement(droppable_wrapper_1.DroppableWrapper, { droppableId: helpers_2.getDroppableId(`event-details-${eventId}-${data.category}-${field}-${timelineId}`), key: `${data.category}-${field}-${timelineId}`, isDropDisabled: true, type: helpers_2.DRAG_TYPE_FIELD },
            React.createElement(react_beautiful_dnd_1.Draggable, { draggableId: helpers_2.getDraggableFieldId({
                    contextId: `field-browser-category-${eventId}-${data.category}-field-${field}-${timelineId}`,
                    fieldId: field,
                }), index: 0, type: helpers_2.DRAG_TYPE_FIELD }, (provided, snapshot) => (React.createElement("div", Object.assign({}, provided.draggableProps, provided.dragHandleProps, { ref: provided.innerRef }), !snapshot.isDragging ? (React.createElement(field_name_1.FieldName, { categoryId: data.category, categoryColumns: helpers_1.getColumnsWithTimestamp({
                    browserFields,
                    category: data.category,
                }), "data-test-subj": "field-name", fieldId: field, isLoading: isLoading, onUpdateColumns: onUpdateColumns })) : (React.createElement(draggable_wrapper_1.DragEffects, null,
                React.createElement(field_badge_1.DraggableFieldBadge, { fieldId: field })))))))),
    },
    {
        field: 'values',
        name: i18n.VALUE,
        sortable: true,
        truncateText: false,
        render: (values, data) => (React.createElement(eui_1.EuiFlexGroup, { direction: "column", alignItems: "flexStart", component: "span", gutterSize: "none" }, values != null &&
            values.map((value, i) => (React.createElement(eui_1.EuiFlexItem, { grow: false, component: "span", key: `${eventId}-${data.field}-${i}-${value}` },
                React.createElement(with_hover_actions_1.WithHoverActions, { hoverContent: React.createElement(HoverActionsContainer, { "data-test-subj": "hover-actions-container" },
                        React.createElement(eui_1.EuiToolTip, { content: i18n.COPY_TO_CLIPBOARD },
                            React.createElement(with_copy_to_clipboard_1.WithCopyToClipboard, { text: value, titleSummary: i18n.VALUE.toLowerCase() }))), render: () => data.field === constants_1.MESSAGE_FIELD_NAME ? (React.createElement(helpers_3.OverflowField, { value: value })) : (React.createElement(draggables_1.DefaultDraggable, { "data-test-subj": "ip", field: data.field, id: `event-details-field-value-${eventId}-${data.field}-${i}-${value}`, tooltipContent: data.type === constants_1.DATE_FIELD_TYPE || data.field === duration_1.EVENT_DURATION_FIELD_NAME
                            ? null
                            : data.field, value: value },
                        React.createElement(formatted_field_1.FormattedFieldValue, { contextId: 'event-details-field-value', eventId: eventId, fieldName: data.field, fieldType: data.type, value: value }))) })))))),
    },
    {
        field: 'description',
        name: i18n.DESCRIPTION,
        render: (description, data) => (React.createElement(selectable_text_1.SelectableText, null, `${description || ''} ${helpers_1.getExampleText(data.example)}`)),
        sortable: true,
        truncateText: true,
        width: '50%',
    },
    {
        field: 'valuesConcatenated',
        sortable: false,
        truncateText: true,
        render: () => null,
        width: '1px',
    },
];
