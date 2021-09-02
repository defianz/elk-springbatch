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
// import { SearchSummaryBucket } from '../../../../common/log_search_summary';
const density_chart_1 = require("./density_chart");
const highlighted_interval_1 = require("./highlighted_interval");
// import { SearchMarkers } from './search_markers';
const time_ruler_1 = require("./time_ruler");
class LogMinimap extends React.Component {
    constructor() {
        super(...arguments);
        this.handleClick = event => {
            const svgPosition = event.currentTarget.getBoundingClientRect();
            const clickedYPosition = event.clientY - svgPosition.top;
            const clickedTime = Math.floor(this.getYScale().invert(clickedYPosition));
            this.props.jumpToTarget({
                tiebreaker: 0,
                time: clickedTime,
            });
        };
        this.getYScale = () => {
            const { height, intervalSize, target } = this.props;
            const domainStart = target ? target - intervalSize / 2 : 0;
            const domainEnd = target ? target + intervalSize / 2 : 0;
            return d3_scale_1.scaleLinear()
                .domain([domainStart, domainEnd])
                .range([0, height]);
        };
        this.getPositionOfTime = (time) => {
            const { height, intervalSize } = this.props;
            const [minTime] = this.getYScale().domain();
            return ((time - minTime) * height) / intervalSize;
        };
    }
    render() {
        const { className, height, highlightedInterval, 
        // jumpToTarget,
        summaryBuckets, 
        // searchSummaryBuckets,
        width, } = this.props;
        const [minTime, maxTime] = this.getYScale().domain();
        return (React.createElement("svg", { className: className, height: height, preserveAspectRatio: "none", viewBox: `0 0 ${width} ${height}`, width: width, onClick: this.handleClick },
            React.createElement(MinimapBackground, { x: width / 2, y: "0", width: width / 2, height: height }),
            React.createElement(density_chart_1.DensityChart, { buckets: summaryBuckets, start: minTime, end: maxTime, width: width, height: height }),
            React.createElement(MinimapBorder, { x1: width / 2, y1: 0, x2: width / 2, y2: height }),
            React.createElement(time_ruler_1.TimeRuler, { start: minTime, end: maxTime, width: width, height: height, tickCount: 12 }),
            highlightedInterval ? (React.createElement(highlighted_interval_1.HighlightedInterval, { end: highlightedInterval.end, getPositionOfTime: this.getPositionOfTime, start: highlightedInterval.start, width: width })) : null));
    }
}
exports.LogMinimap = LogMinimap;
const MinimapBackground = eui_styled_components_1.default.rect `
  fill: ${props => props.theme.eui.euiColorLightestShade};
`;
const MinimapBorder = eui_styled_components_1.default.line `
  stroke: ${props => props.theme.eui.euiColorMediumShade};
  stroke-width: 1px;
`;
