"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = require("@kbn/i18n/react");
const React = tslib_1.__importStar(require("react"));
const eui_styled_components_1 = tslib_1.__importStar(require("../../../../../../common/eui_styled_components"));
const search_marker_tooltip_1 = require("./search_marker_tooltip");
class SearchMarker extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            hoveredPosition: null,
        };
        this.handleClick = evt => {
            evt.stopPropagation();
            this.props.jumpToTarget(this.props.bucket.representative.fields);
        };
        this.handleMouseEnter = evt => {
            this.setState({
                hoveredPosition: evt.currentTarget.getBoundingClientRect(),
            });
        };
        this.handleMouseLeave = () => {
            this.setState({
                hoveredPosition: null,
            });
        };
    }
    render() {
        const { bucket, height, width } = this.props;
        const { hoveredPosition } = this.state;
        const bulge = bucket.count > 1 ? (React.createElement(SearchMarkerForegroundRect, { x: "-2", y: "-2", width: "4", height: height + 2, rx: "2", ry: "2" })) : (React.createElement(React.Fragment, null,
            React.createElement(SearchMarkerForegroundRect, { x: "-1", y: "0", width: "2", height: height }),
            React.createElement(SearchMarkerForegroundRect, { x: "-2", y: height / 2 - 2, width: "4", height: "4", rx: "2", ry: "2" })));
        return (React.createElement(React.Fragment, null,
            hoveredPosition ? (React.createElement(search_marker_tooltip_1.SearchMarkerTooltip, { markerPosition: hoveredPosition },
                React.createElement(react_1.FormattedMessage, { id: "xpack.infra.logs.searchResultTooltip", defaultMessage: "{bucketCount, plural, one {# search result} other {# search results}}", values: {
                        bucketCount: bucket.count,
                    } }))) : null,
            React.createElement(SearchMarkerGroup, { onClick: this.handleClick, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
                React.createElement(SearchMarkerBackgroundRect, { x: "0", y: "0", width: width, height: height }),
                bulge)));
    }
}
exports.SearchMarker = SearchMarker;
const fadeInAnimation = eui_styled_components_1.keyframes `
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const SearchMarkerGroup = eui_styled_components_1.default.g `
  animation: ${fadeInAnimation} ${props => props.theme.eui.euiAnimSpeedExtraSlow} ease-in both;
`;
const SearchMarkerBackgroundRect = eui_styled_components_1.default.rect `
  fill: ${props => props.theme.eui.euiColorSecondary};
  opacity: 0;
  transition: opacity ${props => props.theme.eui.euiAnimSpeedNormal} ease-in;

  ${SearchMarkerGroup}:hover & {
    opacity: 0.2;
  }
`;
const SearchMarkerForegroundRect = eui_styled_components_1.default.rect `
  fill: ${props => props.theme.eui.euiColorSecondary};
`;
