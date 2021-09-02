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
const react_redux_1 = require("react-redux");
const network_1 = require("../../../../store/network");
const types_1 = require("../../../../graphql/types");
const store_1 = require("../../../../store");
const load_more_table_1 = require("../../../load_more_table");
const columns_1 = require("./columns");
const i18n = tslib_1.__importStar(require("./translations"));
const helpers_1 = require("../../../../lib/helpers");
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
exports.usersTableId = 'users-table';
class UsersTableComponent extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onChange = (criteria) => {
            if (criteria.sort != null) {
                const splitField = criteria.sort.field.split('.');
                const newUsersSort = {
                    field: getSortFromString(splitField[splitField.length - 1]),
                    direction: criteria.sort.direction,
                };
                if (!fp_1.isEqual(newUsersSort, this.props.usersSortField)) {
                    this.props.updateUsersSort({
                        usersSortField: newUsersSort,
                        networkType: this.props.type,
                    });
                }
            }
        };
    }
    render() {
        const { data, usersSortField, hasNextPage, limit, loading, loadMore, totalCount, nextCursor, updateUsersLimit, flowTarget, type, } = this.props;
        return (react_1.default.createElement(load_more_table_1.LoadMoreTable, { columns: columns_1.getUsersColumns(flowTarget, exports.usersTableId), hasNextPage: hasNextPage, headerCount: totalCount, headerTitle: i18n.USERS, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.USERS, loadMore: () => loadMore(nextCursor), onChange: this.onChange, pageOfItems: data, sorting: getSortField(usersSortField), updateLimitPagination: newLimit => updateUsersLimit({ limit: newLimit, networkType: type }) }));
    }
}
const makeMapStateToProps = () => {
    const getUsersSelector = store_1.networkSelectors.usersSelector();
    return (state) => ({
        ...getUsersSelector(state),
    });
};
exports.UsersTable = react_redux_1.connect(makeMapStateToProps, {
    updateUsersLimit: network_1.networkActions.updateUsersLimit,
    updateUsersSort: network_1.networkActions.updateUsersSort,
})(UsersTableComponent);
const getSortField = (sortField) => {
    switch (sortField.field) {
        case types_1.UsersFields.name:
            return {
                field: `node.user.${sortField.field}`,
                direction: sortField.direction,
            };
        case types_1.UsersFields.count:
            return {
                field: `node.user.${sortField.field}`,
                direction: sortField.direction,
            };
    }
    return helpers_1.assertUnreachable(sortField.field);
};
const getSortFromString = (sortField) => {
    switch (sortField) {
        case types_1.UsersFields.name.valueOf():
            return types_1.UsersFields.name;
        case types_1.UsersFields.count.valueOf():
            return types_1.UsersFields.count;
        default:
            return types_1.UsersFields.name;
    }
};
