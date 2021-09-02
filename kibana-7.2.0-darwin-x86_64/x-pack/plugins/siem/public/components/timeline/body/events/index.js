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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const stateful_event_1 = require("./stateful_event");
const EventsContainer = styled_components_1.default.div `
  display: block;
  overflow: hidden;
  min-width: ${({ minWidth }) => `${minWidth}px`};
`;
exports.getNewNoteId = () => uuid_1.default.v4();
class Events extends React.PureComponent {
    render() {
        const { actionsColumnWidth, addNoteToEvent, browserFields, columnHeaders, columnRenderers, data, eventIdToNoteIds, getNotesByIds, id, isLoading, minWidth, onColumnResized, onPinEvent, onUpdateColumns, onUnPinEvent, pinnedEventIds, rowRenderers, updateNote, width, } = this.props;
        return (React.createElement(EventsContainer, { "data-test-subj": "events", minWidth: minWidth },
            React.createElement(eui_1.EuiFlexGroup, { "data-test-subj": "events-flex-group", direction: "column", gutterSize: "none" }, data.map(event => (React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "event-flex-item", key: event._id },
                React.createElement(stateful_event_1.StatefulEvent, { actionsColumnWidth: actionsColumnWidth, addNoteToEvent: addNoteToEvent, browserFields: browserFields, columnHeaders: columnHeaders, columnRenderers: columnRenderers, event: event, eventIdToNoteIds: eventIdToNoteIds, getNotesByIds: getNotesByIds, isLoading: isLoading, onColumnResized: onColumnResized, onPinEvent: onPinEvent, onUpdateColumns: onUpdateColumns, onUnPinEvent: onUnPinEvent, pinnedEventIds: pinnedEventIds, rowRenderers: rowRenderers, timelineId: id, updateNote: updateNote, width: width })))))));
    }
}
exports.Events = Events;
