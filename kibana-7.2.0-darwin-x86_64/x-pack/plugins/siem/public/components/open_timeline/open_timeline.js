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
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const helpers_1 = require("./helpers");
const search_row_1 = require("./search_row");
const timelines_table_1 = require("./timelines_table");
const title_row_1 = require("./title_row");
exports.OpenTimelinePanel = styled_components_1.default(eui_1.EuiPanel) `
  width: 100%;
`;
exports.OpenTimeline = recompose_1.pure(({ deleteTimelines, defaultPageSize, isLoading, itemIdToExpandedNotesRowMap, onAddTimelinesToFavorites, onDeleteSelected, onlyFavorites, onOpenTimeline, onQueryChange, onSelectionChange, onTableChange, onToggleOnlyFavorites, onToggleShowNotes, pageIndex, pageSize, query, searchResults, selectedItems, sortDirection, sortField, title, totalSearchResultsCount, }) => (React.createElement(exports.OpenTimelinePanel, { className: helpers_1.OPEN_TIMELINE_CLASS_NAME, paddingSize: "l" },
    React.createElement(title_row_1.TitleRow, { "data-test-subj": "title-row", onDeleteSelected: onDeleteSelected, onAddTimelinesToFavorites: onAddTimelinesToFavorites, selectedTimelinesCount: selectedItems.length, title: title }),
    React.createElement(eui_1.EuiSpacer, { "data-test-subj": "title-row-spacer", size: "l" }),
    React.createElement(search_row_1.SearchRow, { "data-test-subj": "search-row", onlyFavorites: onlyFavorites, onQueryChange: onQueryChange, onToggleOnlyFavorites: onToggleOnlyFavorites, query: query, totalSearchResultsCount: totalSearchResultsCount }),
    React.createElement(eui_1.EuiSpacer, { "data-test-subj": "search-row-spacer", size: "l" }),
    React.createElement(timelines_table_1.TimelinesTable, { "data-test-subj": "timelines-table", deleteTimelines: deleteTimelines, defaultPageSize: defaultPageSize, loading: isLoading, itemIdToExpandedNotesRowMap: itemIdToExpandedNotesRowMap, onOpenTimeline: onOpenTimeline, onSelectionChange: onSelectionChange, onTableChange: onTableChange, onToggleShowNotes: onToggleShowNotes, pageIndex: pageIndex, pageSize: pageSize, searchResults: searchResults, showExtendedColumnsAndActions: onDeleteSelected != null && deleteTimelines != null, sortDirection: sortDirection, sortField: sortField, totalSearchResultsCount: totalSearchResultsCount }))));
