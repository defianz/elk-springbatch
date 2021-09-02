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
const styled_components_1 = tslib_1.__importDefault(require("styled-components"));
const eui_2 = require("@elastic/eui");
const barchart_1 = require("./barchart");
const areachart_1 = require("./areachart");
const empty_value_1 = require("../empty_value");
exports.WrappedByAutoSizer = styled_components_1.default.div `
  height: 100px;
  position: relative;

  &:hover {
    z-index: 100;
  }
`;
const FlexGroup = styled_components_1.default(eui_1.EuiFlexGroup) `
  height: 100%;
`;
const FlexItem = styled_components_1.default(eui_1.EuiFlexItem) `
  min-width: 0;
`;
const StatValue = styled_components_1.default(eui_1.EuiTitle) `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
exports.StatItemsComponent = recompose_1.pure(({ fields, description, key, grow, barChart, areaChart, enableAreaChart, enableBarChart }) => {
    const isBarChartDataAbailable = barChart &&
        barChart.length &&
        barChart.every(item => item.value != null && item.value.length > 0);
    const isAreaChartDataAvailable = areaChart &&
        areaChart.length &&
        areaChart.every(item => item.value != null && item.value.length > 0);
    return (react_1.default.createElement(FlexItem, { key: `stat-items-${key}`, grow: grow },
        react_1.default.createElement(eui_1.EuiPanel, null,
            react_1.default.createElement(eui_1.EuiTitle, { size: "xxxs" },
                react_1.default.createElement("h6", null, description)),
            react_1.default.createElement(eui_1.EuiFlexGroup, null, fields.map(field => (react_1.default.createElement(FlexItem, { key: `stat-items-field-${field.key}` },
                react_1.default.createElement(eui_1.EuiFlexGroup, { alignItems: "center", gutterSize: "m", responsive: false },
                    (isAreaChartDataAvailable || isBarChartDataAbailable) && field.icon && (react_1.default.createElement(FlexItem, { grow: false },
                        react_1.default.createElement(eui_1.EuiIcon, { type: field.icon, color: field.color, size: "l", "data-test-subj": "stat-icon" }))),
                    react_1.default.createElement(FlexItem, null,
                        react_1.default.createElement(StatValue, null,
                            react_1.default.createElement("p", { "data-test-subj": "stat-title" },
                                field.value != null ? field.value.toLocaleString() : empty_value_1.getEmptyTagValue(),
                                ' ',
                                field.description)))))))),
            (enableAreaChart || enableBarChart) && react_1.default.createElement(eui_1.EuiHorizontalRule, null),
            react_1.default.createElement(eui_1.EuiFlexGroup, null,
                enableBarChart && (react_1.default.createElement(FlexItem, null,
                    react_1.default.createElement(barchart_1.BarChart, { barChart: barChart }))),
                enableAreaChart && (react_1.default.createElement(FlexItem, null,
                    react_1.default.createElement(areachart_1.AreaChart, { areaChart: areaChart })))))));
});
exports.ChartHolder = () => (react_1.default.createElement(FlexGroup, { justifyContent: "center", alignItems: "center" },
    react_1.default.createElement(eui_1.EuiFlexItem, { grow: false },
        react_1.default.createElement(eui_2.EuiText, { size: "s", textAlign: "center", color: "subdued" }, "Chart Data Not Available"))));
