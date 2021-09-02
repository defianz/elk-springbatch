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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const field_badge_1 = require("../draggables/field_badge");
const draggable_wrapper_1 = require("../drag_and_drop/draggable_wrapper");
const droppable_wrapper_1 = require("../drag_and_drop/droppable_wrapper");
const helpers_1 = require("../event_details/helpers");
const helpers_2 = require("../drag_and_drop/helpers");
const empty_value_1 = require("../empty_value");
const selectable_text_1 = require("../selectable_text");
const truncatable_text_1 = require("../truncatable_text");
const field_name_1 = require("./field_name");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_3 = require("../timeline/body/helpers");
const default_headers_1 = require("../timeline/body/column_headers/default_headers");
const TypeIcon = styled_components_1.default(eui_1.EuiIcon) `
  margin-left: 5px;
  position: relative;
  top: -1px;
`;
/**
 * Returns the draggable fields, values, and descriptions shown when a user expands an event
 */
exports.getFieldItems = ({ browserFields, category, categoryId, columnHeaders, highlight = '', isLoading, onUpdateColumns, timelineId, toggleColumn, }) => fp_1.uniqBy('name', [
    ...Object.values(category != null && category.fields != null ? category.fields : {}),
]).map(field => ({
    description: (React.createElement(selectable_text_1.SelectableText, null,
        `${field.description || empty_value_1.getEmptyValue()} ${helpers_1.getExampleText(field.example)}`,
        ' ')),
    field: (React.createElement(droppable_wrapper_1.DroppableWrapper, { droppableId: helpers_2.getDroppableId(`field-browser-field-${categoryId}-${field.name}-${timelineId}`), key: `${categoryId}-${field.name}-${timelineId}`, isDropDisabled: true, type: helpers_2.DRAG_TYPE_FIELD },
        React.createElement(react_beautiful_dnd_1.Draggable, { draggableId: helpers_2.getDraggableFieldId({
                contextId: `field-browser-category-${categoryId}-field-${field.name}-${timelineId}`,
                fieldId: field.name || '',
            }), index: 0, type: helpers_2.DRAG_TYPE_FIELD }, (provided, snapshot) => (React.createElement("div", Object.assign({}, provided.draggableProps, provided.dragHandleProps, { ref: provided.innerRef, style: {
                ...provided.draggableProps.style,
                zIndex: 9999,
            } }), !snapshot.isDragging ? (React.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "none" },
            React.createElement(eui_1.EuiFlexItem, { grow: false },
                React.createElement(eui_1.EuiCheckbox, { checked: columnHeaders.findIndex(c => c.id === field.name) !== -1, id: field.name || '', onChange: () => toggleColumn({
                        columnHeaderType: default_headers_1.defaultColumnHeaderType,
                        id: field.name || '',
                        width: helpers_3.DEFAULT_COLUMN_MIN_WIDTH,
                    }) })),
            React.createElement(eui_1.EuiFlexItem, { grow: false },
                React.createElement(eui_1.EuiToolTip, { content: field.type },
                    React.createElement(TypeIcon, { type: helpers_1.getIconFromType(field.type || '') }))),
            React.createElement(eui_1.EuiFlexItem, { grow: false },
                React.createElement(field_name_1.FieldName, { categoryId: field.category || categoryId, categoryColumns: helpers_1.getColumnsWithTimestamp({
                        browserFields,
                        category: field.category || categoryId,
                    }), fieldId: field.name || '', highlight: highlight, isLoading: isLoading, onUpdateColumns: onUpdateColumns })))) : (React.createElement(draggable_wrapper_1.DragEffects, null,
            React.createElement(field_badge_1.DraggableFieldBadge, { fieldId: field.name || '' })))))))),
    fieldId: field.name || '',
}));
/**
 * Returns a table column template provided to the `EuiInMemoryTable`'s
 * `columns` prop
 */
exports.getFieldColumns = () => [
    {
        field: 'field',
        name: i18n.FIELD,
        sortable: true,
        render: (field) => React.createElement(React.Fragment, null, field),
        width: '250px',
    },
    {
        field: 'description',
        name: i18n.DESCRIPTION,
        render: (description) => (React.createElement(eui_1.EuiToolTip, { position: "top", content: description },
            React.createElement(truncatable_text_1.TruncatableText, { size: "s", width: "300px" }, description))),
        sortable: true,
        truncateText: true,
        width: '400px',
    },
];
