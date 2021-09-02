"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const source_1 = require("../../containers/source");
const helpers_1 = require("../timeline/body/helpers");
const actions_1 = require("../../store/actions");
exports.draggableIdPrefix = 'draggableId';
exports.droppableIdPrefix = 'droppableId';
exports.draggableContentPrefix = `${exports.draggableIdPrefix}.content.`;
exports.draggableFieldPrefix = `${exports.draggableIdPrefix}.field.`;
exports.droppableContentPrefix = `${exports.droppableIdPrefix}.content.`;
exports.droppableFieldPrefix = `${exports.droppableIdPrefix}.field.`;
exports.droppableTimelineProvidersPrefix = `${exports.droppableIdPrefix}.timelineProviders.`;
exports.droppableTimelineColumnsPrefix = `${exports.droppableIdPrefix}.timelineColumns.`;
exports.droppableTimelineFlyoutButtonPrefix = `${exports.droppableIdPrefix}.flyoutButton.`;
exports.getDraggableId = (dataProviderId) => `${exports.draggableContentPrefix}${dataProviderId}`;
exports.getDraggableFieldId = ({ contextId, fieldId, }) => `${exports.draggableFieldPrefix}${exports.escapeContextId(contextId)}.${exports.escapeFieldId(fieldId)}`;
exports.getDroppableId = (visualizationPlaceholderId) => `${exports.droppableContentPrefix}${visualizationPlaceholderId}`;
exports.sourceIsContent = (result) => result.source.droppableId.startsWith(exports.droppableContentPrefix);
exports.draggableIsContent = (result) => result.draggableId.startsWith(exports.draggableContentPrefix);
exports.draggableIsField = (result) => result.draggableId.startsWith(exports.draggableFieldPrefix);
exports.reasonIsDrop = (result) => result.reason === 'DROP';
exports.destinationIsTimelineProviders = (result) => result.destination != null &&
    result.destination.droppableId.startsWith(exports.droppableTimelineProvidersPrefix);
exports.destinationIsTimelineColumns = (result) => result.destination != null &&
    result.destination.droppableId.startsWith(exports.droppableTimelineColumnsPrefix);
exports.destinationIsTimelineButton = (result) => result.destination != null &&
    result.destination.droppableId.startsWith(exports.droppableTimelineFlyoutButtonPrefix);
exports.getTimelineIdFromDestination = (result) => result.destination != null &&
    (exports.destinationIsTimelineProviders(result) ||
        exports.destinationIsTimelineButton(result) ||
        exports.destinationIsTimelineColumns(result))
    ? result.destination.droppableId.substring(result.destination.droppableId.lastIndexOf('.') + 1)
    : '';
exports.getProviderIdFromDraggable = (result) => result.draggableId.substring(result.draggableId.lastIndexOf('.') + 1);
exports.getFieldIdFromDraggable = (result) => exports.unEscapeFieldId(result.draggableId.substring(result.draggableId.lastIndexOf('.') + 1));
exports.escapeDataProviderId = (path) => path.replace(/\./g, '_');
exports.escapeContextId = (path) => path.replace(/\./g, '_');
exports.escapeFieldId = (path) => path.replace(/\./g, '!!!DOT!!!');
exports.unEscapeFieldId = (path) => path.replace(/!!!DOT!!!/g, '.');
exports.providerWasDroppedOnTimeline = (result) => exports.reasonIsDrop(result) &&
    exports.draggableIsContent(result) &&
    exports.sourceIsContent(result) &&
    exports.destinationIsTimelineProviders(result);
exports.fieldWasDroppedOnTimelineColumns = (result) => exports.reasonIsDrop(result) && exports.draggableIsField(result) && exports.destinationIsTimelineColumns(result);
exports.providerWasDroppedOnTimelineButton = (result) => exports.reasonIsDrop(result) &&
    exports.draggableIsContent(result) &&
    exports.sourceIsContent(result) &&
    exports.destinationIsTimelineButton(result);
exports.addProviderToTimeline = ({ dataProviders, result, dispatch, addProvider = actions_1.timelineActions.addProvider, noProviderFound = actions_1.dragAndDropActions.noProviderFound, }) => {
    const timeline = exports.getTimelineIdFromDestination(result);
    const providerId = exports.getProviderIdFromDraggable(result);
    const provider = dataProviders[providerId];
    if (provider) {
        dispatch(addProvider({ id: timeline, provider }));
    }
    else {
        dispatch(noProviderFound({ id: providerId }));
    }
};
exports.addFieldToTimelineColumns = ({ upsertColumn = actions_1.timelineActions.upsertColumn, browserFields, dispatch, result, }) => {
    const timeline = exports.getTimelineIdFromDestination(result);
    const fieldId = exports.getFieldIdFromDraggable(result);
    const allColumns = source_1.getAllFieldsByName(browserFields);
    const column = allColumns[fieldId];
    if (column != null) {
        dispatch(upsertColumn({
            column: {
                category: column.category,
                columnHeaderType: 'not-filtered',
                description: fp_1.isString(column.description) ? column.description : undefined,
                example: fp_1.isString(column.example) ? column.example : undefined,
                id: fieldId,
                type: column.type,
                aggregatable: column.aggregatable,
                width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
            },
            id: timeline,
            index: result.destination != null ? result.destination.index : 0,
        }));
    }
    else {
        // create a column definition, because it doesn't exist in the browserFields:
        dispatch(upsertColumn({
            column: {
                columnHeaderType: 'not-filtered',
                id: fieldId,
                width: helpers_1.DEFAULT_COLUMN_MIN_WIDTH,
            },
            id: timeline,
            index: result.destination != null ? result.destination.index : 0,
        }));
    }
};
exports.updateShowTimeline = ({ result, show, dispatch, showTimeline = actions_1.timelineActions.showTimeline, }) => {
    const timeline = exports.getTimelineIdFromDestination(result);
    dispatch(showTimeline({ id: timeline, show }));
};
/**
 * Prevents fields from being dragged or dropped to any area other than column
 * header drop zone in the timeline
 */
exports.DRAG_TYPE_FIELD = 'drag-type-field';
