"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
exports.HighlightedInterval = ({ className, end, getPositionOfTime, start, width, }) => {
    const yStart = getPositionOfTime(start);
    const yEnd = getPositionOfTime(end);
    return (React.createElement(HighlightPolygon, { className: className, points: `0,${yStart} ${width},${yStart} ${width},${yEnd} 0,${yEnd}` }));
};
exports.HighlightedInterval.displayName = 'HighlightedInterval';
const HighlightPolygon = eui_styled_components_1.default.polygon `
  fill: ${props => props.theme.eui.euiColorPrimary};
  fill-opacity: 0.3;
  stroke: ${props => props.theme.eui.euiColorPrimary};
  stroke-width: 1;
`;
