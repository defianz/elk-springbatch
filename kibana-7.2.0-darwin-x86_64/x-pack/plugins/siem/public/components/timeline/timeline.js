"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const React = tslib_1.__importStar(require("react"));
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const timeline_1 = require("../../containers/timeline");
const auto_sizer_1 = require("../auto_sizer");
const default_headers_1 = require("./body/column_headers/default_headers");
const stateful_body_1 = require("./body/stateful_body");
const footer_1 = require("./footer");
const header_1 = require("./header");
const helpers_1 = require("./helpers");
const refetch_timeline_1 = require("./refetch_timeline");
const timeline_context_1 = require("./timeline_context");
const WrappedByAutoSizer = styled_components_1.default.div `
  width: 100%;
`; // required by AutoSizer
const TimelineContainer = styled_components_1.default(eui_1.EuiFlexGroup) `
  min-height: 500px;
  overflow: hidden;
  padding: 0 10px 0 12px;
  user-select: none;
  width: 100%;
`;
/** The parent Timeline component */
exports.Timeline = recompose_1.pure(({ browserFields, columns, dataProviders, end, flyoutHeaderHeight, flyoutHeight, id, indexPattern, isLive, itemsPerPage, itemsPerPageOptions, kqlMode, kqlQueryExpression, onChangeDataProviderKqlQuery, onChangeDroppableAndProvider, onChangeItemsPerPage, onDataProviderEdited, onDataProviderRemoved, onToggleDataProviderEnabled, onToggleDataProviderExcluded, show, start, sort, }) => {
    const combinedQueries = helpers_1.combineQueries(dataProviders, indexPattern, browserFields, kqlQueryExpression, kqlMode, start, end);
    const columnsHeader = fp_1.isEmpty(columns) ? default_headers_1.defaultHeaders : columns;
    return (React.createElement(auto_sizer_1.AutoSizer, { detectAnyWindowResize: true, content: true }, ({ measureRef, content: { height: timelineHeaderHeight = 0, width = 0 } }) => (React.createElement(TimelineContainer, { "data-test-subj": "timeline", direction: "column", gutterSize: "none", justifyContent: "flexStart" },
        React.createElement(WrappedByAutoSizer, { innerRef: measureRef },
            React.createElement(header_1.TimelineHeader, { browserFields: browserFields, id: id, indexPattern: indexPattern, dataProviders: dataProviders, onChangeDataProviderKqlQuery: onChangeDataProviderKqlQuery, onChangeDroppableAndProvider: onChangeDroppableAndProvider, onDataProviderEdited: onDataProviderEdited, onDataProviderRemoved: onDataProviderRemoved, onToggleDataProviderEnabled: onToggleDataProviderEnabled, onToggleDataProviderExcluded: onToggleDataProviderExcluded, show: show, sort: sort })),
        combinedQueries != null ? (React.createElement(timeline_1.TimelineQuery, { fields: columnsHeader.map(c => c.id), sourceId: "default", limit: itemsPerPage, filterQuery: combinedQueries.filterQuery, sortField: {
                sortFieldId: sort.columnId,
                direction: sort.sortDirection,
            } }, ({ events, loading, totalCount, pageInfo, loadMore, getUpdatedAt, refetch }) => (React.createElement(refetch_timeline_1.TimelineRefetch, { loading: loading, id: id, refetch: refetch },
            React.createElement(timeline_context_1.TimelineContext.Provider, { value: { isLoading: loading } }),
            React.createElement(stateful_body_1.StatefulBody, { browserFields: browserFields, data: events, id: id, isLoading: loading, height: helpers_1.calculateBodyHeight({
                    flyoutHeight,
                    flyoutHeaderHeight,
                    timelineHeaderHeight,
                    timelineFooterHeight: footer_1.footerHeight,
                }), sort: sort, width: width }),
            React.createElement(footer_1.Footer, { serverSideEventCount: totalCount, hasNextPage: fp_1.getOr(false, 'hasNextPage', pageInfo), height: footer_1.footerHeight, isLive: isLive, isLoading: loading, itemsCount: events.length, itemsPerPage: itemsPerPage, itemsPerPageOptions: itemsPerPageOptions, onChangeItemsPerPage: onChangeItemsPerPage, onLoadMore: loadMore, nextCursor: fp_1.getOr(null, 'endCursor.value', pageInfo), tieBreaker: fp_1.getOr(null, 'endCursor.tiebreaker', pageInfo), getUpdatedAt: getUpdatedAt, width: width }))))) : null))));
});
