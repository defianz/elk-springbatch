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
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const actions_1 = require("../../../../store/actions");
const store_1 = require("../../../../store");
const empty_value_1 = require("../../../empty_value");
const links_1 = require("../../../links");
const load_more_table_1 = require("../../../load_more_table");
const helpers_1 = require("../../../tables/helpers");
const formatted_date_1 = require("../../../formatted_date");
const localized_date_tooltip_1 = require("../../../localized_date_tooltip");
const i18n = tslib_1.__importStar(require("./translations"));
const rowItems = [
    {
        text: i18n.ROWS_5,
        numberOfRow: 5,
    },
    {
        text: i18n.ROWS_10,
        numberOfRow: 10,
    },
    {
        text: i18n.ROWS_20,
        numberOfRow: 20,
    },
    {
        text: i18n.ROWS_50,
        numberOfRow: 50,
    },
];
const EventsTableComponent = recompose_1.pure(({ data, hasNextPage, limit, loading, loadMore, tiebreaker, totalCount, nextCursor, updateLimitPagination, type, }) => (react_1.default.createElement(load_more_table_1.LoadMoreTable, { columns: exports.getEventsColumnsCurated(type), hasNextPage: hasNextPage, headerCount: totalCount, headerTitle: i18n.EVENTS, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.EVENTS, loadMore: () => loadMore(nextCursor, tiebreaker), pageOfItems: data, updateLimitPagination: newLimit => updateLimitPagination({ limit: newLimit, hostsType: type }) })));
const makeMapStateToProps = () => {
    const getEventsSelector = store_1.hostsSelectors.eventsSelector();
    const mapStateToProps = (state, { type }) => {
        return getEventsSelector(state, type);
    };
    return mapStateToProps;
};
exports.EventsTable = react_redux_1.connect(makeMapStateToProps, {
    updateLimitPagination: actions_1.hostsActions.updateEventsLimit,
})(EventsTableComponent);
const getEventsColumns = (pageType) => [
    {
        name: i18n.TIMESTAMP,
        sortable: false,
        truncateText: false,
        render: ({ node }) => node.timestamp != null ? (react_1.default.createElement(localized_date_tooltip_1.LocalizedDateTooltip, { date: moment_1.default(new Date(node.timestamp)).toDate() },
            react_1.default.createElement(formatted_date_1.PreferenceFormattedDate, { value: new Date(node.timestamp) }))) : (empty_value_1.getEmptyTagValue()),
    },
    {
        name: i18n.HOST_NAME,
        sortable: false,
        truncateText: false,
        render: ({ node }) => helpers_1.getRowItemDraggables({
            rowItems: fp_1.getOr(null, 'host.name', node),
            attrName: 'host.name',
            idPrefix: `host-${pageType}-events-table-${node._id}`,
            render: item => react_1.default.createElement(links_1.HostDetailsLink, { hostName: item }),
        }),
    },
    {
        name: i18n.EVENT_MODULE_DATASET,
        sortable: false,
        truncateText: true,
        render: ({ node }) => (react_1.default.createElement(react_1.default.Fragment, null,
            helpers_1.getRowItemDraggables({
                rowItems: fp_1.getOr(null, 'event.module', node),
                attrName: 'event.module',
                idPrefix: `host-${pageType}-events-table-${node._id}`,
            }),
            '/',
            helpers_1.getRowItemDraggables({
                rowItems: fp_1.getOr(null, 'event.dataset', node),
                attrName: 'event.dataset',
                idPrefix: `host-${pageType}-events-table-${node._id}`,
            }))),
    },
    {
        name: i18n.EVENT_ACTION,
        sortable: false,
        truncateText: true,
        render: ({ node }) => helpers_1.getRowItemDraggables({
            rowItems: fp_1.getOr(null, 'event.action', node),
            attrName: 'event.action',
            idPrefix: `host-${pageType}-events-table-${node._id}`,
        }),
    },
    {
        name: i18n.USER,
        sortable: false,
        truncateText: true,
        render: ({ node }) => helpers_1.getRowItemDraggables({
            rowItems: fp_1.getOr(null, 'user.name', node),
            attrName: 'user.name',
            idPrefix: `host-${pageType}-events-table-${node._id}`,
        }),
    },
    {
        name: i18n.SOURCE,
        sortable: false,
        truncateText: true,
        render: ({ node }) => (react_1.default.createElement(react_1.default.Fragment, null,
            helpers_1.getRowItemDraggable({
                rowItem: fp_1.getOr(null, 'source.ip[0]', node),
                attrName: 'source.ip',
                idPrefix: `host-${pageType}-events-table-${node._id}`,
                render: item => react_1.default.createElement(links_1.IPDetailsLink, { ip: item }),
            }),
            ':',
            empty_value_1.getOrEmptyTag('source.port', node))),
    },
    {
        name: i18n.DESTINATION,
        sortable: false,
        truncateText: true,
        render: ({ node }) => (react_1.default.createElement(react_1.default.Fragment, null,
            helpers_1.getRowItemDraggable({
                rowItem: fp_1.getOr(null, 'destination.ip[0]', node),
                attrName: 'destination.ip',
                idPrefix: `host-${pageType}-events-table-${node._id}`,
                render: item => react_1.default.createElement(links_1.IPDetailsLink, { ip: item }),
            }),
            ':',
            empty_value_1.getOrEmptyTag('destination.port', node))),
    },
    {
        name: i18n.MESSAGE,
        sortable: false,
        truncateText: true,
        width: '25%',
        render: ({ node }) => {
            const message = fp_1.getOr(null, 'message[0]', node);
            return message != null ? (react_1.default.createElement(helpers_1.OverflowField, { value: message, showToolTip: false })) : (empty_value_1.getEmptyTagValue());
        },
    },
];
exports.getEventsColumnsCurated = (pageType) => {
    const columns = getEventsColumns(pageType);
    // Columns to exclude from host details pages
    if (pageType === 'details') {
        return [i18n.HOST_NAME].reduce((acc, name) => {
            acc.splice(acc.findIndex(column => column.name === name), 1);
            return acc;
        }, columns);
    }
    return columns;
};
