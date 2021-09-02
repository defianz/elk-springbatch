"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datemath_1 = tslib_1.__importDefault(require("@elastic/datemath"));
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const react_redux_1 = require("react-redux");
const default_headers_1 = require("../../components/timeline/body/column_headers/default_headers");
const persist_gql_query_1 = require("../../containers/timeline/delete/persist.gql_query");
const index_gql_query_1 = require("../../containers/timeline/all/index.gql_query");
const index_gql_query_2 = require("../../containers/timeline/one/index.gql_query");
const store_1 = require("../../store");
const actions_1 = require("../../store/app/actions");
const actions_2 = require("../../store/inputs/actions");
const actions_3 = require("../../store/timeline/actions");
const open_timeline_1 = require("./open_timeline");
const helpers_1 = require("./helpers");
const open_timeline_modal_1 = require("./open_timeline_modal/open_timeline_modal");
const all_1 = require("../../containers/timeline/all");
const helpers_2 = require("../timeline/body/helpers");
const constants_1 = require("./constants");
/** Returns a collection of selected timeline ids */
exports.getSelectedTimelineIds = (selectedItems) => selectedItems.reduce((validSelections, timelineResult) => timelineResult.savedObjectId != null
    ? [...validSelections, timelineResult.savedObjectId]
    : validSelections, []);
/** Manages the state (e.g table selection) of the (pure) `OpenTimeline` component */
class StatefulOpenTimelineComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        /** Invoked when the user presses enters to submit the text in the search input */
        this.onQueryChange = (query) => {
            this.setState({
                search: query.queryText.trim(),
            });
        };
        /** Focuses the input that filters the field browser */
        this.focusInput = () => {
            const elements = document.querySelector(`.${helpers_1.OPEN_TIMELINE_CLASS_NAME} input`);
            if (elements != null) {
                elements.focus();
            }
        };
        /* This feature will be implemented in the near future, so we are keeping it to know what to do */
        /** Invoked when the user clicks the action to add the selected timelines to favorites */
        // private onAddTimelinesToFavorites: OnAddTimelinesToFavorites = () => {
        // const { addTimelinesToFavorites } = this.props;
        // const { selectedItems } = this.state;
        // if (addTimelinesToFavorites != null) {
        //   addTimelinesToFavorites(getSelectedTimelineIds(selectedItems));
        // TODO: it's not possible to clear the selection state of the newly-favorited
        // items, because we can't pass the selection state as props to the table.
        // See: https://github.com/elastic/eui/issues/1077
        // TODO: the query must re-execute to show the results of the mutation
        // }
        // };
        this.onDeleteOneTimeline = (timelineIds) => {
            const { onlyFavorites, pageIndex, pageSize, search, sortDirection, sortField } = this.state;
            this.deleteTimelines(timelineIds, {
                search,
                pageInfo: {
                    pageIndex: pageIndex + 1,
                    pageSize,
                },
                sort: {
                    sortField: sortField,
                    sortOrder: sortDirection,
                },
                onlyUserFavorite: onlyFavorites,
            });
        };
        /** Invoked when the user clicks the action to delete the selected timelines */
        this.onDeleteSelected = () => {
            const { selectedItems, onlyFavorites } = this.state;
            this.deleteTimelines(exports.getSelectedTimelineIds(selectedItems), {
                search: this.state.search,
                pageInfo: {
                    pageIndex: this.state.pageIndex + 1,
                    pageSize: this.state.pageSize,
                },
                sort: {
                    sortField: this.state.sortField,
                    sortOrder: this.state.sortDirection,
                },
                onlyUserFavorite: onlyFavorites,
            });
            // NOTE: we clear the selection state below, but if the server fails to
            // delete a timeline, it will remain selected in the table:
            this.resetSelectionState();
            // TODO: the query must re-execute to show the results of the deletion
        };
        /** Invoked when the user selects (or de-selects) timelines */
        this.onSelectionChange = (selectedItems) => {
            this.setState({ selectedItems }); // <-- this is NOT passed down as props to the table: https://github.com/elastic/eui/issues/1077
        };
        /** Invoked by the EUI table implementation when the user interacts with the table (i.e. to update sorting) */
        this.onTableChange = ({ page, sort }) => {
            const { index: pageIndex, size: pageSize } = page;
            const { field: sortField, direction: sortDirection } = sort;
            this.setState({
                pageIndex,
                pageSize,
                sortDirection,
                sortField,
            });
        };
        /** Invoked when the user toggles the option to only view favorite timelines */
        this.onToggleOnlyFavorites = () => {
            this.setState(state => ({
                onlyFavorites: !state.onlyFavorites,
            }));
        };
        /** Invoked when the user toggles the expansion or collapse of inline notes in a table row */
        this.onToggleShowNotes = (itemIdToExpandedNotesRowMap) => {
            this.setState(() => ({
                itemIdToExpandedNotesRowMap,
            }));
        };
        /** Resets the selection state such that all timelines are unselected */
        this.resetSelectionState = () => {
            this.setState({
                selectedItems: [],
            });
        };
        this.openTimeline = ({ duplicate, timelineId, }) => {
            const { applyKqlFilterQuery, addNotes, addTimeline, closeModalTimeline, isModal, setTimelineRangeDatePicker, setKqlFilterQueryDraft, updateIsLoading, } = this.props;
            if (isModal && closeModalTimeline != null) {
                closeModalTimeline();
            }
            updateIsLoading({ id: 'timeline-1', isLoading: true });
            this.props.apolloClient
                .query({
                query: index_gql_query_2.oneTimelineQuery,
                fetchPolicy: 'no-cache',
                variables: { id: timelineId },
            })
                .then(result => {
                const timelineToOpen = omitTypenameInTimeline(fp_1.getOr({}, 'data.getOneTimeline', result));
                const { notes, ...timelineModel } = timelineToOpen;
                const momentDate = datemath_1.default.parse('now-24h');
                setTimelineRangeDatePicker({
                    from: fp_1.getOr(momentDate ? momentDate.valueOf() : 0, 'dateRange.start', timelineModel),
                    to: fp_1.getOr(Date.now(), 'dateRange.end', timelineModel),
                });
                addTimeline({
                    id: 'timeline-1',
                    timeline: {
                        ...fp_1.assign(this.props.timeline, timelineModel),
                        columns: timelineModel.columns != null
                            ? timelineModel.columns.map(col => {
                                const timelineCols = {
                                    ...col,
                                    columnHeaderType: default_headers_1.defaultColumnHeaderType,
                                    id: col.id != null ? col.id : 'unknown',
                                    placeholder: col.placeholder != null ? col.placeholder : undefined,
                                    category: col.category != null ? col.category : undefined,
                                    description: col.description != null ? col.description : undefined,
                                    example: col.example != null ? col.example : undefined,
                                    type: col.type != null ? col.type : undefined,
                                    aggregatable: col.aggregatable != null ? col.aggregatable : undefined,
                                    width: col.id === '@timestamp'
                                        ? helpers_2.DEFAULT_DATE_COLUMN_MIN_WIDTH
                                        : helpers_2.DEFAULT_COLUMN_MIN_WIDTH,
                                };
                                return timelineCols;
                            })
                            : default_headers_1.defaultHeaders,
                        eventIdToNoteIds: duplicate
                            ? {}
                            : timelineModel.eventIdToNoteIds != null
                                ? timelineModel.eventIdToNoteIds.reduce((acc, note) => {
                                    if (note.eventId != null) {
                                        const eventNotes = fp_1.getOr([], note.eventId, acc);
                                        return { ...acc, [note.eventId]: [...eventNotes, note.noteId] };
                                    }
                                    return acc;
                                }, {})
                                : {},
                        isFavorite: duplicate
                            ? false
                            : timelineModel.favorite != null
                                ? timelineModel.favorite.length > 0
                                : false,
                        isLive: false,
                        isSaving: false,
                        itemsPerPage: 25,
                        noteIds: duplicate ? [] : timelineModel.noteIds != null ? timelineModel.noteIds : [],
                        pinnedEventIds: duplicate
                            ? {}
                            : timelineModel.pinnedEventIds != null
                                ? timelineModel.pinnedEventIds.reduce((acc, pinnedEventId) => ({ ...acc, [pinnedEventId]: true }), {})
                                : {},
                        pinnedEventsSaveObject: duplicate
                            ? {}
                            : timelineModel.pinnedEventsSaveObject != null
                                ? timelineModel.pinnedEventsSaveObject.reduce((acc, pinnedEvent) => ({ ...acc, [pinnedEvent.pinnedEventId]: pinnedEvent }), {})
                                : {},
                        savedObjectId: duplicate ? null : timelineModel.savedObjectId,
                        version: duplicate ? null : timelineModel.version,
                        title: duplicate ? '' : timelineModel.title || '',
                    },
                });
                if (timelineModel.kqlQuery != null &&
                    timelineModel.kqlQuery.filterQuery != null &&
                    timelineModel.kqlQuery.filterQuery.kuery != null &&
                    timelineModel.kqlQuery.filterQuery.kuery.expression !== '') {
                    setKqlFilterQueryDraft({
                        id: 'timeline-1',
                        filterQueryDraft: {
                            kind: 'kuery',
                            expression: timelineModel.kqlQuery.filterQuery.kuery.expression || '',
                        },
                    });
                    applyKqlFilterQuery({
                        id: 'timeline-1',
                        filterQuery: {
                            kuery: {
                                kind: 'kuery',
                                expression: timelineModel.kqlQuery.filterQuery.kuery.expression || '',
                            },
                            serializedQuery: timelineModel.kqlQuery.filterQuery.serializedQuery || '',
                        },
                    });
                }
                if (!duplicate) {
                    addNotes({
                        notes: notes != null
                            ? notes.map(note => ({
                                created: note.created != null ? new Date(note.created) : new Date(),
                                id: note.noteId,
                                lastEdit: note.updated != null ? new Date(note.updated) : new Date(),
                                note: note.note || '',
                                user: note.updatedBy || 'unknown',
                                saveObjectId: note.noteId,
                                version: note.version,
                            }))
                            : [],
                    });
                }
            })
                .finally(() => {
                updateIsLoading({ id: 'timeline-1', isLoading: false });
            });
        };
        this.deleteTimelines = (timelineIds, variables) => {
            if (timelineIds.includes(this.props.timeline.savedObjectId || '')) {
                this.props.createNewTimeline({ id: 'timeline-1', columns: default_headers_1.defaultHeaders, show: false });
            }
            this.props.apolloClient.mutate({
                mutation: persist_gql_query_1.deleteTimelineMutation,
                fetchPolicy: 'no-cache',
                variables: { id: timelineIds },
                refetchQueries: [
                    {
                        query: index_gql_query_1.allTimelinesQuery,
                        variables,
                    },
                ],
            });
        };
        this.state = {
            itemIdToExpandedNotesRowMap: {},
            onlyFavorites: false,
            search: '',
            pageIndex: 0,
            pageSize: props.defaultPageSize,
            sortField: constants_1.DEFAULT_SORT_FIELD,
            sortDirection: constants_1.DEFAULT_SORT_DIRECTION,
            selectedItems: [],
        };
    }
    componentDidMount() {
        this.focusInput();
    }
    render() {
        const { defaultPageSize, isModal = false, title } = this.props;
        const { itemIdToExpandedNotesRowMap, onlyFavorites, pageIndex, pageSize, search: query, selectedItems, sortDirection, sortField, } = this.state;
        return (React.createElement(all_1.AllTimelinesQuery, { pageInfo: {
                pageIndex: pageIndex + 1,
                pageSize,
            }, search: query, sort: { sortField: sortField, sortOrder: sortDirection }, onlyUserFavorite: onlyFavorites }, ({ timelines, loading, totalCount }) => {
            return !isModal ? (React.createElement(open_timeline_1.OpenTimeline, { deleteTimelines: this.onDeleteOneTimeline, defaultPageSize: defaultPageSize, isLoading: loading, itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap, onAddTimelinesToFavorites: undefined, onDeleteSelected: this.onDeleteSelected, onlyFavorites: onlyFavorites, onOpenTimeline: this.openTimeline, onQueryChange: this.onQueryChange, onSelectionChange: this.onSelectionChange, onTableChange: this.onTableChange, onToggleOnlyFavorites: this.onToggleOnlyFavorites, onToggleShowNotes: this.onToggleShowNotes, pageIndex: pageIndex, pageSize: pageSize, query: query, searchResults: timelines, selectedItems: selectedItems, sortDirection: sortDirection, sortField: sortField, title: title, totalSearchResultsCount: totalCount })) : (React.createElement(open_timeline_modal_1.OpenTimelineModal, { deleteTimelines: this.onDeleteOneTimeline, defaultPageSize: defaultPageSize, isLoading: loading, itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap, onAddTimelinesToFavorites: undefined, onlyFavorites: onlyFavorites, onOpenTimeline: this.openTimeline, onQueryChange: this.onQueryChange, onSelectionChange: this.onSelectionChange, onTableChange: this.onTableChange, onToggleOnlyFavorites: this.onToggleOnlyFavorites, onToggleShowNotes: this.onToggleShowNotes, pageIndex: pageIndex, pageSize: pageSize, query: query, searchResults: timelines, selectedItems: selectedItems, sortDirection: sortDirection, sortField: sortField, title: title, totalSearchResultsCount: totalCount }));
        }));
    }
}
exports.StatefulOpenTimelineComponent = StatefulOpenTimelineComponent;
const makeMapStateToProps = () => {
    const getTimeline = store_1.timelineSelectors.getTimelineByIdSelector();
    const mapStateToProps = (state) => {
        const timeline = getTimeline(state, 'timeline-1');
        return {
            timeline,
        };
    };
    return mapStateToProps;
};
exports.StatefulOpenTimeline = react_redux_1.connect(makeMapStateToProps, {
    applyKqlFilterQuery: actions_3.applyKqlFilterQuery,
    addTimeline: actions_3.addTimeline,
    addNotes: actions_1.addNotes,
    createNewTimeline: actions_3.createTimeline,
    setKqlFilterQueryDraft: actions_3.setKqlFilterQueryDraft,
    setTimelineRangeDatePicker: actions_2.setTimelineRangeDatePicker,
    updateIsLoading: actions_3.updateIsLoading,
})(StatefulOpenTimelineComponent);
const omitTypename = (key, value) => key === '__typename' ? undefined : value;
const omitTypenameInTimeline = (timeline) => JSON.parse(JSON.stringify(timeline), omitTypename);
