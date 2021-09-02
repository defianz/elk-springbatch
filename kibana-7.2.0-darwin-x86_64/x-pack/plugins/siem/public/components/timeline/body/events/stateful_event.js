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
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const details_1 = require("../../../../containers/timeline/details");
const note_cards_1 = require("../../../notes/note_cards");
const expandable_event_1 = require("../../expandable_event");
const event_column_view_1 = require("./event_column_view");
const get_row_renderer_1 = require("../renderers/get_row_renderer");
exports.getNewNoteId = () => uuid_1.default.v4();
const emptyNotes = [];
class StatefulEvent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            expanded: {},
            showNotes: {},
        };
        this.onToggleShowNotes = (eventId) => () => {
            this.setState(state => ({
                showNotes: {
                    ...state.showNotes,
                    [eventId]: !state.showNotes[eventId],
                },
            }));
        };
        this.onToggleExpanded = (eventId) => () => {
            this.setState(state => ({
                expanded: {
                    ...state.expanded,
                    [eventId]: !state.expanded[eventId],
                },
            }));
        };
        this.associateNote = (eventId, addNoteToEvent, onPinEvent) => (noteId) => {
            addNoteToEvent({ eventId, noteId });
            onPinEvent(eventId); // pin the event, because it has notes
        };
    }
    render() {
        const { actionsColumnWidth, addNoteToEvent, browserFields, columnHeaders, columnRenderers, event, eventIdToNoteIds, getNotesByIds, isLoading, onColumnResized, onPinEvent, onUpdateColumns, onUnPinEvent, pinnedEventIds, rowRenderers, timelineId, updateNote, width, } = this.props;
        return (React.createElement(details_1.TimelineDetailsComponentQuery, { sourceId: "default", indexName: event._index, eventId: event._id, executeQuery: !!this.state.expanded[event._id] }, ({ detailsData, loading }) => (React.createElement("div", { "data-test-subj": "event" },
            get_row_renderer_1.getRowRenderer(event.ecs, rowRenderers).renderRow({
                browserFields,
                data: event.ecs,
                width,
                children: (React.createElement(React.Fragment, null,
                    React.createElement(eui_1.EuiFlexGroup, { "data-test-subj": "event-rows", direction: "column", gutterSize: "none" },
                        React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "event-column-data", grow: false },
                            React.createElement(event_column_view_1.EventColumnView, { _id: event._id, actionsColumnWidth: actionsColumnWidth, associateNote: this.associateNote(event._id, addNoteToEvent, onPinEvent), columnHeaders: columnHeaders, columnRenderers: columnRenderers, expanded: !!this.state.expanded[event._id], data: event.data, eventIdToNoteIds: eventIdToNoteIds, getNotesByIds: getNotesByIds, loading: loading, onColumnResized: onColumnResized, onEventToggled: this.onToggleExpanded(event._id), onPinEvent: onPinEvent, onUnPinEvent: onUnPinEvent, pinnedEventIds: pinnedEventIds, showNotes: !!this.state.showNotes[event._id], toggleShowNotes: this.onToggleShowNotes(event._id), updateNote: updateNote })),
                        React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "event-notes-flex-item", grow: false },
                            React.createElement(note_cards_1.NoteCards, { associateNote: this.associateNote(event._id, addNoteToEvent, onPinEvent), "data-test-subj": "note-cards", getNewNoteId: exports.getNewNoteId, getNotesByIds: getNotesByIds, noteIds: eventIdToNoteIds[event._id] || emptyNotes, showAddNote: !!this.state.showNotes[event._id], toggleShowAddNote: this.onToggleShowNotes(event._id), updateNote: updateNote, width: `${width - 10}px` }))))),
            }),
            React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "event-details", grow: true },
                React.createElement(expandable_event_1.ExpandableEvent, { browserFields: browserFields, id: event._id, isLoading: isLoading, event: detailsData || [], forceExpand: !!this.state.expanded[event._id] && !loading, onUpdateColumns: onUpdateColumns, timelineId: timelineId, width: width }))))));
    }
}
exports.StatefulEvent = StatefulEvent;
