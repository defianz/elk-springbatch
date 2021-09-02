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
exports.tlsTableId = 'tls-table';
class TlsTableComponent extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onChange = (criteria) => {
            if (criteria.sort != null) {
                const splitField = criteria.sort.field.split('.');
                const newTlsSort = {
                    field: getSortFromString(splitField[splitField.length - 1]),
                    direction: criteria.sort.direction,
                };
                if (!fp_1.isEqual(newTlsSort, this.props.tlsSortField)) {
                    this.props.updateTlsSort({
                        tlsSortField: newTlsSort,
                        networkType: this.props.type,
                    });
                }
            }
        };
    }
    render() {
        const { data, tlsSortField, hasNextPage, limit, loading, loadMore, totalCount, nextCursor, updateTlsLimit, type, } = this.props;
        return (react_1.default.createElement(load_more_table_1.LoadMoreTable, { columns: columns_1.getTlsColumns(exports.tlsTableId), hasNextPage: hasNextPage, headerCount: totalCount, headerTitle: i18n.TRANSPORT_LAYER_SECURITY, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.TRANSPORT_LAYER_SECURITY, loadMore: () => loadMore(nextCursor), onChange: this.onChange, pageOfItems: data, sorting: getSortField(tlsSortField), updateLimitPagination: newLimit => updateTlsLimit({ limit: newLimit, networkType: type }) }));
    }
}
const makeMapStateToProps = () => {
    const getTlsSelector = store_1.networkSelectors.tlsSelector();
    return (state) => ({
        ...getTlsSelector(state),
    });
};
exports.TlsTable = react_redux_1.connect(makeMapStateToProps, {
    updateTlsLimit: network_1.networkActions.updateTlsLimit,
    updateTlsSort: network_1.networkActions.updateTlsSort,
})(TlsTableComponent);
const getSortField = (sortField) => ({
    field: `node.${sortField.field}`,
    direction: sortField.direction,
});
const getSortFromString = (sortField) => {
    switch (sortField) {
        case '_id':
            return types_1.TlsFields._id;
        default:
            return types_1.TlsFields._id;
    }
};
