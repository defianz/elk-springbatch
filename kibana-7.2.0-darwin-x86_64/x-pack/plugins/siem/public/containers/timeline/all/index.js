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
const react_apollo_1 = require("react-apollo");
const memoize_one_1 = tslib_1.__importDefault(require("memoize-one"));
const index_gql_query_1 = require("./index.gql_query");
class AllTimelinesQuery extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.getAllTimeline = (variables, timelines) => {
            return timelines.map(timeline => ({
                created: timeline.created,
                description: timeline.description,
                eventIdToNoteIds: timeline.eventIdToNoteIds != null
                    ? timeline.eventIdToNoteIds.reduce((acc, note) => {
                        if (note.eventId != null) {
                            const notes = fp_1.getOr([], note.eventId, acc);
                            return { ...acc, [note.eventId]: [...notes, note.noteId] };
                        }
                        return acc;
                    }, {})
                    : null,
                favorite: timeline.favorite,
                noteIds: timeline.noteIds,
                notes: timeline.notes != null
                    ? timeline.notes.map(note => ({ ...note, savedObjectId: note.noteId }))
                    : null,
                pinnedEventIds: timeline.pinnedEventIds != null
                    ? timeline.pinnedEventIds.reduce((acc, pinnedEventId) => ({ ...acc, [pinnedEventId]: true }), {})
                    : null,
                savedObjectId: timeline.savedObjectId,
                title: timeline.title,
                updated: timeline.updated,
                updatedBy: timeline.updatedBy,
            }));
        };
        this.memoizedAllTimeline = memoize_one_1.default(this.getAllTimeline);
    }
    render() {
        const { children, onlyUserFavorite, pageInfo, search, sort } = this.props;
        const variables = {
            onlyUserFavorite,
            pageInfo,
            search,
            sort,
        };
        return (react_1.default.createElement(react_apollo_1.Query, { query: index_gql_query_1.allTimelinesQuery, fetchPolicy: "network-only", notifyOnNetworkStatusChange: true, variables: variables }, ({ data, loading }) => {
            return children({
                loading,
                totalCount: fp_1.getOr(0, 'getAllTimeline.totalCount', data),
                timelines: this.memoizedAllTimeline(JSON.stringify(variables), fp_1.getOr([], 'getAllTimeline.timeline', data)),
            });
        }));
    }
}
exports.AllTimelinesQuery = AllTimelinesQuery;
