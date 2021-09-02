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
const actions_columns_1 = require("./actions_columns");
const common_columns_1 = require("./common_columns");
const extended_columns_1 = require("./extended_columns");
const icon_header_columns_1 = require("./icon_header_columns");
const i18n = tslib_1.__importStar(require("../translations"));
const TimelinesTableContainer = styled_components_1.default.div `
  .euiTableCellContent {
    animation: none;
    text-align: left;
  }

  .euiTableCellContent__text {
    width: 100%;
  }

  tbody {
    th,
    td {
      vertical-align: top;
    }
  }
`;
const getExtendedColumnsIfEnabled = (showExtendedColumnsAndActions) => showExtendedColumnsAndActions ? [...extended_columns_1.getExtendedColumns()] : [];
/**
 * Returns the column definitions (passed as the `columns` prop to
 * `EuiBasicTable`) that are displayed in the compact `Open Timeline` modal
 * view, and the full view shown in the `All Timelines` view of the
 * `Timelines` page
 */
const getTimelinesTableColumns = ({ deleteTimelines, itemIdToExpandedNotesRowMap, onOpenTimeline, onToggleShowNotes, showExtendedColumnsAndActions, }) => [
    ...common_columns_1.getCommonColumns({
        itemIdToExpandedNotesRowMap,
        onOpenTimeline,
        onToggleShowNotes,
        showExtendedColumnsAndActions,
    }),
    ...getExtendedColumnsIfEnabled(showExtendedColumnsAndActions),
    ...icon_header_columns_1.getIconHeaderColumns(),
    ...actions_columns_1.getActionsColumns({
        deleteTimelines,
        onOpenTimeline,
        showDeleteAction: showExtendedColumnsAndActions,
    }),
];
/**
 * Renders a table that displays metadata about timelines, (i.e. name,
 * description, etc.)
 */
exports.TimelinesTable = recompose_1.pure(({ deleteTimelines, defaultPageSize, loading: isLoading, itemIdToExpandedNotesRowMap, onOpenTimeline, onSelectionChange, onTableChange, onToggleShowNotes, pageIndex, pageSize, searchResults, showExtendedColumnsAndActions, sortField, sortDirection, totalSearchResultsCount, }) => {
    const pagination = {
        hidePerPageOptions: !showExtendedColumnsAndActions,
        pageIndex,
        pageSize,
        pageSizeOptions: [
            Math.floor(Math.max(defaultPageSize, 1) / 2),
            defaultPageSize,
            defaultPageSize * 2,
        ],
        totalItemCount: totalSearchResultsCount,
    };
    const sorting = {
        sort: {
            field: sortField,
            direction: sortDirection,
        },
    };
    const selection = {
        selectable: (timelineResult) => timelineResult.savedObjectId != null,
        selectableMessage: (selectable) => !selectable ? i18n.MISSING_SAVED_OBJECT_ID : undefined,
        onSelectionChange,
    };
    return (React.createElement(TimelinesTableContainer, { "data-test-subj": "timelines-table-container" },
        React.createElement(eui_1.EuiBasicTable, { compressed: true, columns: getTimelinesTableColumns({
                deleteTimelines,
                itemIdToExpandedNotesRowMap,
                onOpenTimeline,
                onToggleShowNotes,
                showExtendedColumnsAndActions,
            }), "data-test-subj": "timelines-table", isExpandable: true, isSelectable: showExtendedColumnsAndActions, itemId: "savedObjectId", itemIdToExpandedRowMap: itemIdToExpandedNotesRowMap, items: searchResults, loading: isLoading, noItemsMessage: i18n.ZERO_TIMELINES_MATCH, onChange: onTableChange, pagination: pagination, selection: showExtendedColumnsAndActions ? selection : undefined, sorting: sorting })));
});
