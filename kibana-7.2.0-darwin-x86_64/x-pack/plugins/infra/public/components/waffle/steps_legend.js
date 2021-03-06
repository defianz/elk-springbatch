"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const polished_1 = require("polished");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const lib_1 = require("../../lib/lib");
const OPERATORS = {
    [lib_1.InfraWaffleMapRuleOperator.gte]: '>=',
    [lib_1.InfraWaffleMapRuleOperator.gt]: '>',
    [lib_1.InfraWaffleMapRuleOperator.lte]: '<=',
    [lib_1.InfraWaffleMapRuleOperator.lt]: '<',
    [lib_1.InfraWaffleMapRuleOperator.eq]: '=',
};
const createStep = (formatter) => (rule, index) => {
    const label = rule.label != null ? rule.label : `${OPERATORS[rule.operator]} ${formatter(rule.value)}`;
    const squareStyle = { backgroundColor: polished_1.darken(0.4, rule.color) };
    const squareInnerStyle = { backgroundColor: rule.color };
    return (react_1.default.createElement(StepContainer, { key: `legend-step-${index}` },
        react_1.default.createElement(StepSquare, { style: squareStyle },
            react_1.default.createElement(StepSquareInner, { style: squareInnerStyle })),
        react_1.default.createElement(StepLabel, null, label)));
};
exports.StepLegend = ({ legend, formatter }) => {
    return react_1.default.createElement(StepLegendContainer, null, legend.rules.map(createStep(formatter)));
};
const StepLegendContainer = eui_styled_components_1.default.div `
  display: flex;
  padding: 10px 40px 10px 10px;
`;
const StepContainer = eui_styled_components_1.default.div `
  display: flex;
  margin-right: 20px
  align-items: center;
`;
const StepSquare = eui_styled_components_1.default.div `
  position: relative;
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  margin-right: 5px;
  border-radius: 3px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;
const StepSquareInner = eui_styled_components_1.default.div `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 2px;
  border-radius: 3px;
`;
const StepLabel = eui_styled_components_1.default.div `
  font-size: 12px;
`;
