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
const recompose_1 = require("recompose");
const types_1 = require("../../graphql/types");
const i18n = tslib_1.__importStar(require("./translations"));
const toggleTargetOptions = (id, displayText) => [
    {
        id: `${id}-select-flow-target-${types_1.FlowTarget.source}`,
        value: types_1.FlowTarget.source,
        inputDisplay: displayText[0] || i18n.SOURCE,
        directions: [types_1.FlowDirection.uniDirectional, types_1.FlowDirection.biDirectional],
    },
    {
        id: `${id}-select-flow-target-${types_1.FlowTarget.destination}`,
        value: types_1.FlowTarget.destination,
        inputDisplay: displayText[1] || i18n.DESTINATION,
        directions: [types_1.FlowDirection.uniDirectional, types_1.FlowDirection.biDirectional],
    },
    {
        id: `${id}-select-flow-target-${types_1.FlowTarget.client}`,
        value: types_1.FlowTarget.client,
        inputDisplay: displayText[2] || i18n.CLIENT,
        directions: [types_1.FlowDirection.biDirectional],
    },
    {
        id: `${id}-select-flow-target-${types_1.FlowTarget.server}`,
        value: types_1.FlowTarget.server,
        inputDisplay: displayText[3] || i18n.SERVER,
        directions: [types_1.FlowDirection.biDirectional],
    },
];
const onChangeTarget = (flowTarget, updateFlowTargetSelectAction) => {
    updateFlowTargetSelectAction({ flowTarget });
};
exports.FlowTargetSelect = recompose_1.pure(({ id, isLoading = false, selectedDirection, selectedTarget, displayTextOverride = [], updateFlowTargetAction, }) => (react_1.default.createElement(eui_1.EuiSuperSelect, { options: selectedDirection
        ? toggleTargetOptions(id, displayTextOverride).filter(option => option.directions.includes(selectedDirection))
        : toggleTargetOptions(id, displayTextOverride), valueOfSelected: selectedTarget, onChange: (newFlowTarget) => onChangeTarget(newFlowTarget, updateFlowTargetAction), isLoading: isLoading })));
