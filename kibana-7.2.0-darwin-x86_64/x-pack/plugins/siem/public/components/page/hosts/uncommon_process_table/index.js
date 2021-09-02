"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const actions_1 = require("../../../../store/actions");
const store_1 = require("../../../../store");
const empty_value_1 = require("../../../empty_value");
const links_1 = require("../../../links");
const load_more_table_1 = require("../../../load_more_table");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_1 = require("../../../tables/helpers");
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
exports.getArgs = (args) => {
    if (args != null && args.length !== 0) {
        return args.join(' ');
    }
    else {
        return null;
    }
};
const UncommonProcessTableComponent = recompose_1.pure(({ data, hasNextPage, limit, loading, loadMore, totalCount, nextCursor, updateLimitPagination, type, }) => (react_1.default.createElement(load_more_table_1.LoadMoreTable, { columns: getUncommonColumns(), hasNextPage: hasNextPage, headerCount: totalCount, headerTitle: i18n.UNCOMMON_PROCESSES, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.UNCOMMON_PROCESSES, loadMore: () => loadMore(nextCursor), pageOfItems: data, updateLimitPagination: newLimit => updateLimitPagination({ limit: newLimit, hostsType: type }) })));
const makeMapStateToProps = () => {
    const getUncommonProcessesSelector = store_1.hostsSelectors.uncommonProcessesSelector();
    return (state, { type }) => getUncommonProcessesSelector(state, type);
};
exports.UncommonProcessTable = react_redux_1.connect(makeMapStateToProps, {
    updateLimitPagination: actions_1.hostsActions.updateUncommonProcessesLimit,
})(UncommonProcessTableComponent);
const getUncommonColumns = () => [
    {
        name: i18n.NAME,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_1.getRowItemDraggables({
            rowItems: node.process.name,
            attrName: 'process.name',
            idPrefix: `uncommon-process-table-${node._id}-processName`,
        }),
    },
    {
        name: i18n.NUMBER_OF_HOSTS,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => react_1.default.createElement(react_1.default.Fragment, null, node.hosts != null ? node.hosts.length : empty_value_1.getEmptyValue()),
    },
    {
        name: i18n.NUMBER_OF_INSTANCES,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => empty_value_1.defaultToEmptyTag(node.instances),
    },
    {
        name: i18n.HOSTS,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_1.getRowItemDraggables({
            rowItems: exports.getHostNames(node),
            attrName: 'host.name',
            idPrefix: `uncommon-process-table-${node._id}-processHost`,
            render: item => react_1.default.createElement(links_1.HostDetailsLink, { hostName: item }),
        }),
    },
    {
        name: i18n.LAST_COMMAND,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_1.getRowItemDraggables({
            rowItems: node.process != null ? node.process.args : null,
            attrName: 'process.args',
            idPrefix: `uncommon-process-table-${node._id}-processArgs`,
            displayCount: 1,
        }),
    },
    {
        name: i18n.LAST_USER,
        truncateText: false,
        hideForMobile: false,
        render: ({ node }) => helpers_1.getRowItemDraggables({
            rowItems: node.user != null ? node.user.name : null,
            attrName: 'user.name',
            idPrefix: `uncommon-process-table-${node._id}-processUser`,
        }),
    },
];
exports.getHostNames = (node) => {
    if (node.hosts != null) {
        return node.hosts
            .filter(host => host.name != null && host.name[0] != null)
            .map(host => (host.name != null && host.name[0] != null ? host.name[0] : ''));
    }
    else {
        return [];
    }
};
