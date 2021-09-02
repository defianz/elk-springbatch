"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fp_1 = require("lodash/fp");
const memoize_one_1 = tslib_1.__importDefault(require("memoize-one"));
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const store_1 = require("../../../store");
const helpers_1 = require("./helpers");
const index_1 = require("./index");
const renderers_1 = require("./renderers");
const actions_1 = require("../../../store/actions");
class StatefulBodyComponent extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.onAddNoteToEvent = ({ eventId, noteId, }) => this.props.addNoteToEvent({ id: this.props.id, eventId, noteId });
        this.onColumnSorted = sorted => {
            this.props.updateSort({ id: this.props.id, sort: sorted });
        };
        this.onColumnRemoved = columnId => this.props.removeColumn({ id: this.props.id, columnId });
        this.onColumnResized = ({ columnId, delta }) => this.props.applyDeltaToColumnWidth({ id: this.props.id, columnId, delta });
        this.onPinEvent = eventId => this.props.pinEvent({ id: this.props.id, eventId });
        this.onUnPinEvent = eventId => this.props.unPinEvent({ id: this.props.id, eventId });
        this.onUpdateNote = (note) => this.props.updateNote({ note });
        this.onUpdateColumns = columns => this.props.updateColumns({ id: this.props.id, columns });
    }
    render() {
        const { browserFields, columnHeaders, data, eventIdToNoteIds, getNotesByIds, height, id, isLoading, pinnedEventIds, range, sort, width, } = this.props;
        return (React.createElement(index_1.Body, { addNoteToEvent: this.onAddNoteToEvent, browserFields: browserFields, id: id, isLoading: isLoading, columnHeaders: columnHeaders || [], columnRenderers: renderers_1.columnRenderers, data: data, eventIdToNoteIds: eventIdToNoteIds, getNotesByIds: getNotesByIds, height: height, onColumnResized: this.onColumnResized, onColumnRemoved: this.onColumnRemoved, onColumnSorted: this.onColumnSorted, onFilterChange: fp_1.noop, onPinEvent: this.onPinEvent, onUpdateColumns: this.onUpdateColumns, onUnPinEvent: this.onUnPinEvent, pinnedEventIds: pinnedEventIds, range: range, rowRenderers: renderers_1.rowRenderers, sort: sort, updateNote: this.onUpdateNote, width: width }));
    }
}
const makeMapStateToProps = () => {
    const memoizedColumnHeaders = memoize_one_1.default(helpers_1.getColumnHeaders);
    const getTimeline = store_1.timelineSelectors.getTimelineByIdSelector();
    const getNotesByIds = store_1.appSelectors.notesByIdsSelector();
    const mapStateToProps = (state, { browserFields, id }) => {
        const timeline = getTimeline(state, id);
        const { columns, eventIdToNoteIds, pinnedEventIds } = timeline;
        return {
            columnHeaders: memoizedColumnHeaders(columns, browserFields),
            id,
            eventIdToNoteIds,
            getNotesByIds: getNotesByIds(state),
            pinnedEventIds,
        };
    };
    return mapStateToProps;
};
exports.StatefulBody = react_redux_1.connect(makeMapStateToProps, {
    addNoteToEvent: actions_1.timelineActions.addNoteToEvent,
    applyDeltaToColumnWidth: actions_1.timelineActions.applyDeltaToColumnWidth,
    unPinEvent: actions_1.timelineActions.unPinEvent,
    updateColumns: actions_1.timelineActions.updateColumns,
    updateSort: actions_1.timelineActions.updateSort,
    pinEvent: actions_1.timelineActions.pinEvent,
    removeColumn: actions_1.timelineActions.removeColumn,
    removeProvider: actions_1.timelineActions.removeProvider,
    updateNote: actions_1.appActions.updateNote,
})(StatefulBodyComponent);
