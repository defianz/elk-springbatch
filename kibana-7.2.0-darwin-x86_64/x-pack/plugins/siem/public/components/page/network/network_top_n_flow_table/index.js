"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const eui_1 = require("@elastic/eui");
const fp_1 = require("lodash/fp");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const actions_1 = require("../../../../store/actions");
const types_1 = require("../../../../graphql/types");
const store_1 = require("../../../../store");
const flow_direction_select_1 = require("../../../flow_controls/flow_direction_select");
const flow_target_select_1 = require("../../../flow_controls/flow_target_select");
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
exports.NetworkTopNFlowTableId = 'networkTopNFlow-top-talkers';
class NetworkTopNFlowTableComponent extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.onChange = (criteria) => {
            if (criteria.sort != null) {
                const splitField = criteria.sort.field.split('.');
                const field = fp_1.last(splitField) === 'count' ? types_1.NetworkTopNFlowFields.ipCount : fp_1.last(splitField);
                const newTopNFlowSort = {
                    field: field,
                    direction: criteria.sort.direction,
                };
                if (!fp_1.isEqual(newTopNFlowSort, this.props.topNFlowSort)) {
                    this.props.updateTopNFlowSort({
                        topNFlowSort: newTopNFlowSort,
                        networkType: this.props.type,
                    });
                }
            }
        };
        this.onChangeTopNFlowDirection = (flowDirection) => this.props.updateTopNFlowDirection({ flowDirection, networkType: this.props.type });
    }
    render() {
        const { data, hasNextPage, indexPattern, limit, loading, loadMore, totalCount, nextCursor, updateTopNFlowLimit, flowDirection, topNFlowSort, flowTarget, type, updateTopNFlowTarget, } = this.props;
        const field = topNFlowSort.field === types_1.NetworkTopNFlowFields.ipCount
            ? `node.${flowTarget}.count`
            : `node.network.${topNFlowSort.field}`;
        return (react_1.default.createElement(load_more_table_1.LoadMoreTable, { columns: columns_1.getNetworkTopNFlowColumns(indexPattern, flowDirection, flowTarget, type, exports.NetworkTopNFlowTableId), hasNextPage: hasNextPage, headerCount: totalCount, headerSupplement: react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center" },
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(SelectTypeItem, { grow: false, "data-test-subj": `${exports.NetworkTopNFlowTableId}-select-flow-target` },
                        react_1.default.createElement(flow_target_select_1.FlowTargetSelect, { id: exports.NetworkTopNFlowTableId, isLoading: loading, selectedDirection: flowDirection, selectedTarget: flowTarget, displayTextOverride: [
                                i18n.BY_SOURCE_IP,
                                i18n.BY_DESTINATION_IP,
                                i18n.BY_CLIENT_IP,
                                i18n.BY_SERVER_IP,
                            ], updateFlowTargetAction: updateTopNFlowTarget }))),
                react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
                    react_1.default.createElement(flow_direction_select_1.FlowDirectionSelect, { selectedDirection: flowDirection, onChangeDirection: this.onChangeTopNFlowDirection }))), headerTitle: i18n.TOP_TALKERS, headerUnit: i18n.UNIT(totalCount), itemsPerRow: rowItems, limit: limit, loading: loading, loadingTitle: i18n.TOP_TALKERS, loadMore: () => loadMore(nextCursor), onChange: this.onChange, pageOfItems: data, sorting: { field, direction: topNFlowSort.direction }, updateLimitPagination: newLimit => updateTopNFlowLimit({ limit: newLimit, networkType: type }) }));
    }
}
const makeMapStateToProps = () => {
    const getNetworkTopNFlowSelector = store_1.networkSelectors.topNFlowSelector();
    const mapStateToProps = (state) => getNetworkTopNFlowSelector(state);
    return mapStateToProps;
};
exports.NetworkTopNFlowTable = react_redux_1.connect(makeMapStateToProps, {
    updateTopNFlowLimit: actions_1.networkActions.updateTopNFlowLimit,
    updateTopNFlowSort: actions_1.networkActions.updateTopNFlowSort,
    updateTopNFlowTarget: actions_1.networkActions.updateTopNFlowTarget,
    updateTopNFlowDirection: actions_1.networkActions.updateTopNFlowDirection,
})(NetworkTopNFlowTableComponent);
const SelectTypeItem = styled_components_1.default(eui_1.EuiFlexItem) `
  min-width: 180px;
`;
