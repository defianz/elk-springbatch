"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const d3_scale_1 = require("d3-scale");
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
exports.TimeRuler = ({ end, height, start, tickCount, width }) => {
    const yScale = d3_scale_1.scaleTime()
        .domain([start, end])
        .range([0, height]);
    const ticks = yScale.ticks(tickCount);
    const formatTick = yScale.tickFormat();
    return (React.createElement("g", null, ticks.map((tick, tickIndex) => {
        const y = yScale(tick);
        return (React.createElement("g", { key: `tick${tickIndex}` },
            React.createElement(TimeRulerTickLabel, { x: 2, y: y - 4 }, formatTick(tick)),
            React.createElement(TimeRulerGridLine, { x1: 0, y1: y, x2: width, y2: y })));
    })));
};
exports.TimeRuler.displayName = 'TimeRuler';
const TimeRulerTickLabel = eui_styled_components_1.default.text `
  font-size: ${props => props.theme.eui.euiFontSizeXS};
  line-height: ${props => props.theme.eui.euiLineHeight};
  fill: ${props => props.theme.eui.textColors.subdued};
`;
const TimeRulerGridLine = eui_styled_components_1.default.line `
  stroke: ${props => props.theme.darkMode ? props.theme.eui.euiColorDarkShade : props.theme.eui.euiColorMediumShade};
  stroke-dasharray: 2, 2;
  stroke-opacity: 0.5;
  stroke-width: 1px;
`;
