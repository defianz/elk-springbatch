"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const memoize_one_1 = tslib_1.__importDefault(require("memoize-one"));
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const actions_1 = require("../../../../store/actions");
const types_1 = require("../../../../graphql/types");
const helpers_1 = require("../../../../lib/helpers");
const store_1 = require("../../../../store");
const load_more_table_1 = require("../../../load_more_table");
const columns_1 = require("./columns");
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
class HostsTableComponent extends react_1.default.PureComponent {
    constructor(props) {
        super(props);
        this.getSorting = (trigger, sortField, direction) => ({ field: getNodeField(sortField), direction });
        this.wrappedUpdateLimitPagination = (newLimit) => this.props.updateLimitPagination({ limit: newLimit, hostsType: this.props.type });
        this.wrappedLoadMore = () => this.props.loadMore(this.props.nextCursor);
        this.getMemoizeHostsColumns = (type, indexPattern) => columns_1.getHostsColumns(type, indexPattern);
        this.onChange = (criteria) => {
            if (criteria.sort != null) {
                const sort = {
                    field: getSortField(criteria.sort.field),
                    direction: criteria.sort.direction,
                };
                if (sort.direction !== this.props.direction || sort.field !== this.props.sortField) {
                    this.props.updateHostsSort({
                        sort,
                        hostsType: this.props.type,
                    });
                }
            }
        };
        this.memoizedColumns = memoize_one_1.default(this.getMemoizeHostsColumns);
        this.memoizedSorting = memoize_one_1.default(this.getSorting);
    }
    render() {
        const { data, direction, hasNextPage, indexPattern, limit, loading, totalCount, sortField, type, } = this.props;
        return (react_1.default.createElement(load_more_table_1.LoadMoreTable, { columns: this.memoizedColumns(type, indexPattern), hasNextPage: hasNextPage, headerCount: totalCount, headerTitle: i18n.HOSTS, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.HOSTS, loadMore: this.wrappedLoadMore, onChange: this.onChange, pageOfItems: data, sorting: this.memoizedSorting(`${sortField}-${direction}`, sortField, direction), updateLimitPagination: this.wrappedUpdateLimitPagination }));
    }
}
const getSortField = (field) => {
    switch (field) {
        case 'node.host.name':
            return types_1.HostsFields.hostName;
        case 'node.lastSeen':
            return types_1.HostsFields.lastSeen;
        default:
            return types_1.HostsFields.lastSeen;
    }
};
const getNodeField = (field) => {
    switch (field) {
        case types_1.HostsFields.hostName:
            return 'node.host.name';
        case types_1.HostsFields.lastSeen:
            return 'node.lastSeen';
    }
    helpers_1.assertUnreachable(field);
};
const makeMapStateToProps = () => {
    const getHostsSelector = store_1.hostsSelectors.hostsSelector();
    const mapStateToProps = (state, { type }) => {
        return getHostsSelector(state, type);
    };
    return mapStateToProps;
};
exports.HostsTable = react_redux_1.connect(makeMapStateToProps, {
    updateLimitPagination: actions_1.hostsActions.updateHostsLimit,
    updateHostsSort: actions_1.hostsActions.updateHostsSort,
})(HostsTableComponent);
