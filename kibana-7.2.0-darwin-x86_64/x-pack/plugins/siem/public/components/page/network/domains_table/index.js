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
const types_1 = require("../../../../graphql/types");
const store_1 = require("../../../../store");
const flow_direction_select_1 = require("../../../flow_controls/flow_direction_select");
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
exports.DomainsTableId = 'domains-table';
class DomainsTableComponent extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onChange = (criteria) => {
            if (criteria.sort != null) {
                const splitField = criteria.sort.field.split('.');
                const newDomainsSort = {
                    field: getSortFromString(splitField[splitField.length - 1]),
                    direction: criteria.sort.direction,
                };
                if (!fp_1.isEqual(newDomainsSort, this.props.domainsSortField)) {
                    this.props.updateDomainsSort({
                        domainsSortField: newDomainsSort,
                        networkType: this.props.type,
                    });
                }
            }
        };
        this.onChangeDomainsDirection = (flowDirection) => this.props.updateDomainsDirection({ flowDirection, networkType: this.props.type });
    }
    render() {
        const { data, domainsSortField, hasNextPage, indexPattern, ip, limit, loading, loadMore, totalCount, nextCursor, updateDomainsLimit, flowDirection, flowTarget, type, } = this.props;
        return (react_1.default.createElement(load_more_table_1.LoadMoreTable, { columns: columns_1.getDomainsColumns(indexPattern, ip, flowDirection, flowTarget, type, exports.DomainsTableId), hasNextPage: hasNextPage, headerCount: totalCount, headerSupplement: react_1.default.createElement(flow_direction_select_1.FlowDirectionSelect, { selectedDirection: flowDirection, onChangeDirection: this.onChangeDomainsDirection }), headerTitle: i18n.DOMAINS, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.DOMAINS, loadMore: () => loadMore(nextCursor), onChange: this.onChange, pageOfItems: data, sorting: getSortField(domainsSortField, flowTarget), updateLimitPagination: newLimit => updateDomainsLimit({ limit: newLimit, networkType: type }) }));
    }
}
const makeMapStateToProps = () => {
    const getDomainsSelector = store_1.networkSelectors.domainsSelector();
    const mapStateToProps = (state) => ({
        ...getDomainsSelector(state),
    });
    return mapStateToProps;
};
exports.DomainsTable = react_redux_1.connect(makeMapStateToProps, {
    updateDomainsLimit: actions_1.networkActions.updateDomainsLimit,
    updateDomainsDirection: actions_1.networkActions.updateDomainsFlowDirection,
    updateDomainsSort: actions_1.networkActions.updateDomainsSort,
})(DomainsTableComponent);
const getSortField = (sortField, flowTarget) => {
    switch (sortField.field) {
        case types_1.DomainsFields.domainName:
            return {
                field: `node.${flowTarget}.${sortField.field}`,
                direction: sortField.direction,
            };
        case types_1.DomainsFields.bytes:
            return {
                field: `node.network.${sortField.field}`,
                direction: sortField.direction,
            };
        case types_1.DomainsFields.packets:
            return {
                field: `node.network.${sortField.field}`,
                direction: sortField.direction,
            };
        case types_1.DomainsFields.uniqueIpCount:
            return {
                field: `node.${flowTarget}.${sortField.field}`,
                direction: sortField.direction,
            };
        default:
            return {
                field: 'node.network.bytes',
                direction: types_1.Direction.desc,
            };
    }
};
const getSortFromString = (sortField) => {
    switch (sortField) {
        case types_1.DomainsFields.domainName.valueOf():
            return types_1.DomainsFields.domainName;
        case types_1.DomainsFields.bytes.valueOf():
            return types_1.DomainsFields.bytes;
        case types_1.DomainsFields.packets.valueOf():
            return types_1.DomainsFields.packets;
        case types_1.DomainsFields.uniqueIpCount.valueOf():
            return types_1.DomainsFields.uniqueIpCount;
        default:
            return types_1.DomainsFields.bytes;
    }
};
