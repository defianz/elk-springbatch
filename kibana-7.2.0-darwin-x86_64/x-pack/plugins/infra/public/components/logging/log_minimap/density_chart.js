"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const d3_scale_1 = require("d3-scale");
const d3_shape_1 = require("d3-shape");
const max_1 = tslib_1.__importDefault(require("lodash/fp/max"));
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importDefault(require("../../../../../../common/eui_styled_components"));
exports.DensityChart = ({ buckets, start, end, width, height, }) => {
    if (start >= end || height <= 0 || width <= 0 || buckets.length <= 0) {
        return null;
    }
    const yScale = d3_scale_1.scaleTime()
        .domain([start, end])
        .range([0, height]);
    const xMax = max_1.default(buckets.map(bucket => bucket.entriesCount)) || 0;
    const xScale = d3_scale_1.scaleLinear()
        .domain([0, xMax])
        .range([0, width / 2]);
    const path = d3_shape_1.area()
        .x0(xScale(0))
        .x1(bucket => xScale(bucket.entriesCount))
        .y(bucket => yScale((bucket.start + bucket.end) / 2))
        .curve(d3_shape_1.curveMonotoneY);
    const pathData = path(buckets);
    return (React.createElement("g", { transform: `translate(${width / 2}, 0)` },
        React.createElement(PositiveAreaPath, { d: pathData || '' }),
        React.createElement(NegativeAreaPath, { transform: "scale(-1, 1)", d: pathData || '' })));
};
const PositiveAreaPath = eui_styled_components_1.default.path `
  fill: ${props => props.theme.darkMode
    ? props.theme.eui.euiColorMediumShade
    : props.theme.eui.euiColorLightShade};
`;
const NegativeAreaPath = eui_styled_components_1.default.path `
  fill: ${props => props.theme.darkMode
    ? props.theme.eui.euiColorLightShade
    : props.theme.eui.euiColorLightestShade};
`;
