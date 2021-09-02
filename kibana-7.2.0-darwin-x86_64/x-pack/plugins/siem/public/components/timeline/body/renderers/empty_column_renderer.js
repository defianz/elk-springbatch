"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const draggable_wrapper_1 = require("../../../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../../../drag_and_drop/helpers");
const parse_query_value_1 = require("./parse_query_value");
const data_provider_1 = require("../../data_providers/data_provider");
const provider_1 = require("../../data_providers/provider");
const empty_value_1 = require("../../../empty_value");
exports.dataNotExistsAtColumn = (columnName, data) => data.findIndex(item => item.field === columnName) === -1;
exports.emptyColumnRenderer = {
    isInstance: (columnName, data) => exports.dataNotExistsAtColumn(columnName, data),
    renderColumn: ({ columnName, eventId, field, width, }) => (React.createElement(draggable_wrapper_1.DraggableWrapper, { key: `timeline-draggable-column-${columnName}-for-event-${eventId}-${field.id}`, dataProvider: {
            enabled: true,
            id: helpers_1.escapeDataProviderId(`id-timeline-column-${columnName}-for-event-${eventId}-${field.id}`),
            name: `${columnName}: ${parse_query_value_1.parseQueryValue(null)}`,
            queryMatch: {
                field: field.id,
                value: parse_query_value_1.parseQueryValue(null),
                displayValue: empty_value_1.getEmptyValue(),
                operator: data_provider_1.EXISTS_OPERATOR,
            },
            excluded: true,
            kqlQuery: '',
            and: [],
        }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (React.createElement(draggable_wrapper_1.DragEffects, null,
            React.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (React.createElement("span", null, empty_value_1.getEmptyValue())), width: width })),
};
