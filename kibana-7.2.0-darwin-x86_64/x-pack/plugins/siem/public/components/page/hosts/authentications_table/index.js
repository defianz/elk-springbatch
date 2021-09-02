"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = require("@kbn/i18n/react");
const fp_1 = require("lodash/fp");
const react_2 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const hosts_1 = require("../../../../store/hosts");
const store_1 = require("../../../../store");
const draggable_wrapper_1 = require("../../../drag_and_drop/draggable_wrapper");
const helpers_1 = require("../../../drag_and_drop/helpers");
const empty_value_1 = require("../../../empty_value");
const links_1 = require("../../../links");
const load_more_table_1 = require("../../../load_more_table");
const data_provider_1 = require("../../../timeline/data_providers/data_provider");
const provider_1 = require("../../../timeline/data_providers/provider");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_2 = require("../../../tables/helpers");
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
const AuthenticationTableComponent = recompose_1.pure(({ data, hasNextPage, limit, loading, loadMore, totalCount, nextCursor, updateLimitPagination, type, }) => (react_2.default.createElement(load_more_table_1.LoadMoreTable, { columns: exports.getAuthenticationColumnsCurated(type), hasNextPage: hasNextPage, headerCount: totalCount, headerTitle: i18n.AUTHENTICATIONS, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.AUTHENTICATIONS, loadMore: () => loadMore(nextCursor), pageOfItems: data, updateLimitPagination: newLimit => updateLimitPagination({ limit: newLimit, hostsType: type }) })));
const makeMapStateToProps = () => {
    const getAuthenticationsSelector = store_1.hostsSelectors.authenticationsSelector();
    return (state, { type }) => {
        return getAuthenticationsSelector(state, type);
    };
};
exports.AuthenticationTable = react_redux_1.connect(makeMapStateToProps, {
    updateLimitPagination: hosts_1.hostsActions.updateAuthenticationsLimit,
})(AuthenticationTableComponent);
const getAuthenticationColumns = () => [
    {
        name: i18n.USER,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_2.getRowItemDraggables({
            rowItems: node.user.name,
            attrName: 'user.name',
            idPrefix: `authentications-table-${node._id}-userName`,
        }),
    },
    {
        name: i18n.SUCCESSES,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => {
            const id = helpers_1.escapeDataProviderId(`authentications-table-${node._id}-node-successes-${node.successes}`);
            return (react_2.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: id, dataProvider: {
                    and: [],
                    enabled: true,
                    id,
                    name: 'authentication_success',
                    excluded: false,
                    kqlQuery: '',
                    queryMatch: {
                        field: 'event.type',
                        value: 'authentication_success',
                        operator: data_provider_1.IS_OPERATOR,
                    },
                }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_2.default.createElement(draggable_wrapper_1.DragEffects, null,
                    react_2.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (node.successes) }));
        },
    },
    {
        name: i18n.FAILURES,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => {
            const id = helpers_1.escapeDataProviderId(`authentications-table-${node._id}-failures-${node.failures}`);
            return (react_2.default.createElement(draggable_wrapper_1.DraggableWrapper, { key: id, dataProvider: {
                    and: [],
                    enabled: true,
                    id,
                    name: 'authentication_failure',
                    excluded: false,
                    kqlQuery: '',
                    queryMatch: {
                        field: 'event.type',
                        value: 'authentication_failure',
                        operator: data_provider_1.IS_OPERATOR,
                    },
                }, render: (dataProvider, _, snapshot) => snapshot.isDragging ? (react_2.default.createElement(draggable_wrapper_1.DragEffects, null,
                    react_2.default.createElement(provider_1.Provider, { dataProvider: dataProvider }))) : (node.failures) }));
        },
    },
    {
        name: i18n.LAST_SUCCESSFUL_TIME,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => fp_1.has('lastSuccess.timestamp', node) ? (react_2.default.createElement(eui_1.EuiToolTip, { position: "bottom", content: node.lastSuccess.timestamp },
            react_2.default.createElement(react_1.FormattedRelative, { value: new Date(node.lastSuccess.timestamp) }))) : (empty_value_1.getEmptyTagValue()),
    },
    {
        name: i18n.LAST_SUCCESSFUL_SOURCE,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_2.getRowItemDraggables({
            rowItems: node.lastSuccess != null &&
                node.lastSuccess.source != null &&
                node.lastSuccess.source.ip != null
                ? node.lastSuccess.source.ip
                : null,
            attrName: 'source.ip',
            idPrefix: `authentications-table-${node._id}-lastSuccessSource`,
            render: item => react_2.default.createElement(links_1.IPDetailsLink, { ip: item }),
        }),
    },
    {
        name: i18n.LAST_SUCCESSFUL_DESTINATION,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_2.getRowItemDraggables({
            rowItems: node.lastSuccess != null &&
                node.lastSuccess.host != null &&
                node.lastSuccess.host.name != null
                ? node.lastSuccess.host.name
                : null,
            attrName: 'host.name',
            idPrefix: `authentications-table-${node._id}-lastSuccessfulDestination`,
            render: item => react_2.default.createElement(links_1.HostDetailsLink, { hostName: item }),
        }),
    },
    {
        name: i18n.LAST_FAILED_TIME,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => fp_1.has('lastFailure.timestamp', node) && node.lastFailure.timestamp != null ? (react_2.default.createElement(eui_1.EuiToolTip, { position: "bottom", content: node.lastFailure.timestamp },
            react_2.default.createElement(react_1.FormattedRelative, { value: new Date(node.lastFailure.timestamp) }))) : (empty_value_1.getEmptyTagValue()),
    },
    {
        name: i18n.LAST_FAILED_SOURCE,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_2.getRowItemDraggables({
            rowItems: node.lastFailure != null &&
                node.lastFailure.source != null &&
                node.lastFailure.source.ip != null
                ? node.lastFailure.source.ip
                : null,
            attrName: 'source.ip',
            idPrefix: `authentications-table-${node._id}-lastFailureSource`,
            render: item => react_2.default.createElement(links_1.IPDetailsLink, { ip: item }),
        }),
    },
    {
        name: i18n.LAST_FAILED_DESTINATION,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_2.getRowItemDraggables({
            rowItems: node.lastFailure != null &&
                node.lastFailure.host != null &&
                node.lastFailure.host.name != null
                ? node.lastFailure.host.name
                : null,
            attrName: 'host.name',
            idPrefix: `authentications-table-${node._id}-lastFailureDestination`,
            render: item => react_2.default.createElement(links_1.HostDetailsLink, { hostName: item }),
        }),
    },
];
exports.getAuthenticationColumnsCurated = (pageType) => {
    const columns = getAuthenticationColumns();
    // Columns to exclude from host details pages
    if (pageType === 'details') {
        return [i18n.LAST_FAILED_DESTINATION, i18n.LAST_SUCCESSFUL_DESTINATION].reduce((acc, name) => {
            acc.splice(acc.findIndex(column => column.name === name), 1);
            return acc;
        }, columns);
    }
    return columns;
};
