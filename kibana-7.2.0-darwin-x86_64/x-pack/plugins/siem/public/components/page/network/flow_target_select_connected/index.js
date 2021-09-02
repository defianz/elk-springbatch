"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const react_1 = tslib_1.__importDefault(require("react"));
const react_redux_1 = require("react-redux");
const recompose_1 = require("recompose");
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const types_1 = require("../../../../graphql/types");
const network_1 = require("../../../../store/network");
const i18nIp = tslib_1.__importStar(require("../ip_overview/translations"));
const flow_target_select_1 = require("../../../flow_controls/flow_target_select");
const field_renderers_1 = require("../../../field_renderers/field_renderers");
const SelectTypeItem = styled_components_1.default(eui_1.EuiFlexItem) `
  min-width: 180px;
`;
const FlowTargetSelectComponent = recompose_1.pure(({ flowTarget, updateIpDetailsFlowTarget }) => (react_1.default.createElement(SelectTypeItem, { grow: false, "data-test-subj": `${field_renderers_1.IpOverviewId}-select-flow-target` },
    react_1.default.createElement(flow_target_select_1.FlowTargetSelect, { id: field_renderers_1.IpOverviewId, isLoading: !flowTarget, selectedDirection: types_1.FlowDirection.uniDirectional, selectedTarget: flowTarget, displayTextOverride: [i18nIp.AS_SOURCE, i18nIp.AS_DESTINATION], updateFlowTargetAction: updateIpDetailsFlowTarget }))));
const makeMapStateToProps = () => {
    const getIpDetailsFlowTargetSelector = network_1.networkSelectors.ipDetailsFlowTargetSelector();
    return (state) => {
        return {
            flowTarget: getIpDetailsFlowTargetSelector(state),
        };
    };
};
exports.FlowTargetSelectConnected = react_redux_1.connect(makeMapStateToProps, {
    updateIpDetailsFlowTarget: network_1.networkActions.updateIpDetailsFlowTarget,
})(FlowTargetSelectComponent);
