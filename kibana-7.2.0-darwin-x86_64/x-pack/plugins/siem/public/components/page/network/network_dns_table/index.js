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
const actions_1 = require("../../../../store/actions");
const store_1 = require("../../../../store");
const load_more_table_1 = require("../../../load_more_table");
const columns_1 = require("./columns");
const is_ptr_included_1 = require("./is_ptr_included");
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
class NetworkDnsTableComponent extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onChange = (criteria) => {
            if (criteria.sort != null) {
                const newDnsSortField = {
                    field: criteria.sort.field.split('.')[1],
                    direction: criteria.sort.direction,
                };
                if (!fp_1.isEqual(newDnsSortField, this.props.dnsSortField)) {
                    this.props.updateDnsSort({ dnsSortField: newDnsSortField, networkType: this.props.type });
                }
            }
        };
        this.onChangePtrIncluded = () => this.props.updateIsPtrIncluded({
            isPtrIncluded: !this.props.isPtrIncluded,
            networkType: this.props.type,
        });
    }
    render() {
        const { data, dnsSortField, hasNextPage, isPtrIncluded, limit, loading, loadMore, nextCursor, totalCount, type, updateDnsLimit, } = this.props;
        return (react_1.default.createElement(load_more_table_1.LoadMoreTable, { columns: columns_1.getNetworkDnsColumns(type), hasNextPage: hasNextPage, headerCount: totalCount, headerSupplement: react_1.default.createElement(is_ptr_included_1.IsPtrIncluded, { isPtrIncluded: isPtrIncluded, onChange: this.onChangePtrIncluded }), headerTitle: i18n.TOP_DNS_DOMAINS, headerTooltip: i18n.TOOLTIP, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.TOP_DNS_DOMAINS, loadMore: () => loadMore(nextCursor), onChange: this.onChange, pageOfItems: data, sorting: {
                field: `node.${dnsSortField.field}`,
                direction: dnsSortField.direction,
            }, updateLimitPagination: newLimit => updateDnsLimit({ limit: newLimit, networkType: type }) }));
    }
}
const makeMapStateToProps = () => {
    const getNetworkDnsSelector = store_1.networkSelectors.dnsSelector();
    const mapStateToProps = (state) => getNetworkDnsSelector(state);
    return mapStateToProps;
};
exports.NetworkDnsTable = react_redux_1.connect(makeMapStateToProps, {
    updateDnsLimit: actions_1.networkActions.updateDnsLimit,
    updateDnsSort: actions_1.networkActions.updateDnsSort,
    updateIsPtrIncluded: actions_1.networkActions.updateIsPtrIncluded,
})(NetworkDnsTableComponent);
