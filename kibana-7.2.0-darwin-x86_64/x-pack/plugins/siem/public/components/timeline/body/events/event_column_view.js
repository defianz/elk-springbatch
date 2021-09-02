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
const actions_1 = require("../actions");
const data_driven_columns_1 = require("../data_driven_columns");
const helpers_1 = require("../helpers");
exports.getNewNoteId = () => uuid_1.default.v4();
const emptyNotes = [];
class EventColumnView extends React.PureComponent {
    render() {
        const { _id, actionsColumnWidth, associateNote, columnHeaders, columnRenderers, data, eventIdToNoteIds, expanded, getNotesByIds, loading, onColumnResized, onEventToggled, onPinEvent, onUnPinEvent, pinnedEventIds, showNotes, toggleShowNotes, updateNote, } = this.props;
        return (React.createElement(eui_1.EuiFlexGroup, { "data-test-subj": "event-column-view", gutterSize: "none" },
            React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "actions-column-item", grow: false },
                React.createElement(actions_1.Actions, { actionsColumnWidth: actionsColumnWidth, associateNote: associateNote, checked: false, expanded: expanded, "data-test-subj": "actions", eventId: _id, eventIsPinned: helpers_1.eventIsPinned({
                        eventId: _id,
                        pinnedEventIds,
                    }), getNotesByIds: getNotesByIds, loading: loading, noteIds: eventIdToNoteIds[_id] || emptyNotes, onEventToggled: onEventToggled, onPinClicked: helpers_1.getPinOnClick({
                        allowUnpinning: !helpers_1.eventHasNotes(eventIdToNoteIds[_id]),
                        eventId: _id,
                        onPinEvent,
                        onUnPinEvent,
                        pinnedEventIds,
                    }), showCheckboxes: false, showNotes: showNotes, toggleShowNotes: toggleShowNotes, updateNote: updateNote })),
            React.createElement(eui_1.EuiFlexItem, { "data-test-subj": "event-columns-item", grow: false },
                React.createElement(data_driven_columns_1.DataDrivenColumns, { _id: _id, columnHeaders: columnHeaders, columnRenderers: columnRenderers, data: data, onColumnResized: onColumnResized }))));
    }
}
exports.EventColumnView = EventColumnView;
