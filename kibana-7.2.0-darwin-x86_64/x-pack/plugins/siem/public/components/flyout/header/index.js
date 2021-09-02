"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const store_1 = require("../../../store");
const default_headers_1 = require("../../timeline/body/column_headers/default_headers");
const properties_1 = require("../../timeline/properties");
const app_1 = require("../../../store/app");
const inputs_1 = require("../../../store/inputs");
const actions_1 = require("../../../store/actions");
const helpers_1 = require("../../timeline/body/helpers");
const statefulFlyoutHeader = recompose_1.pure(({ associateNote, createTimeline, description, getNotesByIds, isFavorite, isDatepickerLocked, title, width = helpers_1.DEFAULT_TIMELINE_WIDTH, noteIds, timelineId, toggleLock, updateDescription, updateIsFavorite, updateNote, updateTitle, usersViewing, }) => (React.createElement(properties_1.Properties, { associateNote: associateNote, createTimeline: createTimeline, description: description, getNotesByIds: getNotesByIds, isDatepickerLocked: isDatepickerLocked, isFavorite: isFavorite, title: title, noteIds: noteIds, timelineId: timelineId, toggleLock: toggleLock, updateDescription: updateDescription, updateIsFavorite: updateIsFavorite, updateTitle: updateTitle, updateNote: updateNote, usersViewing: usersViewing, width: width })));
const emptyHistory = []; // stable reference
const makeMapStateToProps = () => {
    const getTimeline = store_1.timelineSelectors.getTimelineByIdSelector();
    const getNotesByIds = store_1.appSelectors.notesByIdsSelector();
    const getGlobalInput = store_1.inputsSelectors.globalSelector();
    const mapStateToProps = (state, { timelineId }) => {
        const timeline = getTimeline(state, timelineId);
        const globalInput = getGlobalInput(state);
        const { description = '', isFavorite = false, title = '', noteIds = [], width = helpers_1.DEFAULT_TIMELINE_WIDTH, } = timeline;
        const history = emptyHistory; // TODO: get history from store via selector
        return {
            description,
            getNotesByIds: getNotesByIds(state),
            history,
            isFavorite,
            isDatepickerLocked: globalInput.linkTo.includes('timeline'),
            noteIds,
            title,
            width,
        };
    };
    return mapStateToProps;
};
const mapDispatchToProps = (dispatch, { timelineId }) => ({
    associateNote: (noteId) => {
        dispatch(actions_1.timelineActions.addNote({ id: timelineId, noteId }));
    },
    applyDeltaToWidth: ({ id, delta, bodyClientWidthPixels, maxWidthPercent, minWidthPixels, }) => {
        dispatch(actions_1.timelineActions.applyDeltaToWidth({
            id,
            delta,
            bodyClientWidthPixels,
            maxWidthPercent,
            minWidthPixels,
        }));
    },
    createTimeline: ({ id, show }) => {
        dispatch(actions_1.timelineActions.createTimeline({
            id,
            columns: default_headers_1.defaultHeaders,
            show,
        }));
    },
    updateDescription: ({ id, description }) => {
        dispatch(actions_1.timelineActions.updateDescription({ id, description }));
    },
    updateIsFavorite: ({ id, isFavorite }) => {
        dispatch(actions_1.timelineActions.updateIsFavorite({ id, isFavorite }));
    },
    updateIsLive: ({ id, isLive }) => {
        dispatch(actions_1.timelineActions.updateIsLive({ id, isLive }));
    },
    updateNote: (note) => {
        dispatch(app_1.appActions.updateNote({ note }));
    },
    updateTitle: ({ id, title }) => {
        dispatch(actions_1.timelineActions.updateTitle({ id, title }));
    },
    toggleLock: ({ linkToId }) => {
        dispatch(inputs_1.inputsActions.toggleTimelineLinkTo({ linkToId }));
    },
});
exports.FlyoutHeader = react_redux_1.connect(makeMapStateToProps, mapDispatchToProps)(statefulFlyoutHeader);
