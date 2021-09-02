"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_1 = require("@elastic/eui");
const draggable_wrapper_1 = require("../../../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../../../drag_and_drop/helpers");
const empty_value_1 = require("../../../empty_value");
const formatted_ip_1 = require("../../../formatted_ip");
const data_provider_1 = require("../../data_providers/data_provider");
const provider_1 = require("../../data_providers/provider");
const formatted_field_1 = require("./formatted_field");
const parse_query_value_1 = require("./parse_query_value");
const parse_value_1 = require("./parse_value");
const truncatable_text_1 = require("../../../truncatable_text");
const constants_1 = require("./constants");
exports.dataExistsAtColumn = (columnName, data) => data.findIndex(item => item.field === columnName) !== -1;
const contextId = 'plain_column_renderer';
// simple black-list to prevent dragging and dropping fields such as message name
const columnNamesNotDraggable = [constants_1.MESSAGE_FIELD_NAME];
exports.plainColumnRenderer = {
    isInstance: (columnName, data) => exports.dataExistsAtColumn(columnName, data),
    renderColumn: ({ columnName, eventId, values, field, width, }) => values != null
        ? values.map(value => {
            const itemDataProvider = {
                enabled: true,
                id: helpers_1.escapeDataProviderId(`id-timeline-column-${columnName}-for-event-${eventId}-${field.id}-${value}`),
                name: `${columnName}: ${parse_query_value_1.parseQueryValue(value)}`,
                queryMatch: {
                    field: field.id,
                    value: parse_query_value_1.parseQueryValue(value),
                    operator: data_provider_1.IS_OPERATOR,
                },
                excluded: false,
                kqlQuery: '',
                and: [],
            };
            if (field.type === constants_1.IP_FIELD_TYPE) {
                // since ip fields may contain multiple IP addresses, return a FormattedIp here to avoid a "draggable of draggables"
                return (react_1.default.createElement(formatted_ip_1.FormattedIp, { key: `timeline-draggable-column-${columnName}-for-event-${eventId}-${field.id}--${value}`, eventId: eventId, contextId: contextId, fieldName: field.id, value: !fp_1.isNumber(value) ? value : String(value), width: width }));
            }
            if (columnNamesNotDraggable.includes(columnName)) {
                if (width != null) {
                    return (react_1.default.createElement(truncatable_text_1.TruncatableText, { size: "s", width: width, key: `timeline-draggable-column-${columnName}-for-event-${eventId}-${field.id}--${value}` },
                        react_1.default.createElement(formatted_field_1.FormattedFieldValue, { eventId: eventId, contextId: contextId, fieldName: columnName, fieldType: field.type || '', value: parse_value_1.parseValue(value) })));
                }
                else {
                    return (react_1.default.createElement(eui_1.EuiText, { "data-test-subj": "draggable-content", size: "s", key: `timeline-draggable-column-${columnName}-for-event-${eventId}-${field.id}--${value}` },
                        react_1.default.createElement(formatted_field_1.FormattedFieldValue, { eventId: eventId, contextId: contextId, fieldName: columnName, fieldType: field.type || '', value: parse_value_1.parseValue(value) })));
                }
            }
            // note: we use a raw DraggableWrapper here instead of a DefaultDraggable,
            // because we pass a width to enable text truncation, and we will show empty values
            return (react_1.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: `timeline-draggable-column-${columnName}-for-event-${eventId}-${field.id}--${value}`, dataProvider: itemDataProvider, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_1.default.createElement(draggable_wrapper_1.DragEffects, null,
                    react_1.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (react_1.default.createElement(formatted_field_1.FormattedFieldValue, { eventId: eventId, contextId: contextId, fieldName: columnName, fieldType: field.type || '', value: parse_value_1.parseValue(value) })), width: width }));
        })
        : empty_value_1.getEmptyTagValue(),
};
