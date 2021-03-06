"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../common/eui_styled_components"));
const createTickRender = (bounds, formatter) => (rule, index) => {
    const value = rule.value === 0 ? bounds.min : bounds.max * rule.value;
    const style = { left: `${rule.value * 100}%` };
    const label = formatter(value);
    return (react_1.default.createElement(GradientLegendTick, { style: style, key: `legend-rule-${index}` },
        react_1.default.createElement(GradientLegendTickLine, null),
        react_1.default.createElement(GradientLegendTickLabel, null, label)));
};
exports.GradientLegend = ({ legend, bounds, formatter }) => {
    const maxValue = legend.rules.reduce((acc, rule) => {
        return acc < rule.value ? rule.value : acc;
    }, 0);
    const colorStops = legend.rules.map(rule => {
        const percent = (rule.value / maxValue) * 100;
        return `${rule.color} ${percent}%`;
    });
    const style = {
        background: `linear-gradient(to right, ${colorStops})`,
    };
    return (react_1.default.createElement(GradientLegendContainer, { style: style }, legend.rules.map(createTickRender(bounds, formatter))));
};
const GradientLegendContainer = eui_styled_components_1.default.div `
  position: absolute;
  height: 10px;
  bottom: 0;
  left: 0;
  right: 40px;
`;
const GradientLegendTick = eui_styled_components_1.default.div `
  position: absolute;
  bottom: 0;
  top: -18px;
`;
const GradientLegendTickLine = eui_styled_components_1.default.div `
  position: absolute;
  background-color: ${props => props.theme.eui.euiBorderColor};
  width: 1px;
  left: 0;
  top: 15px;
  bottom: 0;
  ${GradientLegendTick}:first-child {
    top: 2px;
  }
  ${GradientLegendTick}:last-child {
    top: 2px;
  }
`;
const GradientLegendTickLabel = eui_styled_components_1.default.div `
  position: absolute;
  font-size: 11px;
  text-align: center;
  top: 0;
  left: 0;
  white-space: nowrap;
  transform: translate(-50%, 0);
  ${GradientLegendTick}:first-child & {
    padding-left: 5px;
    transform: translate(0, 0);
  }
  ${GradientLegendTick}:last-child & {
    padding-right: 5px;
    transform: translate(-100%, 0);
  }
`;
