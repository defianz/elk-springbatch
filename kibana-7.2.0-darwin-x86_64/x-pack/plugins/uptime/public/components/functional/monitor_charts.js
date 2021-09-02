"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = require("@kbn/i18n/react");
const react_2 = tslib_1.__importStar(require("react"));
const helper_1 = require("../../lib/helper");
const higher_order_1 = require("../higher_order");
const queries_1 = require("../../queries");
exports.MonitorChartsComponent = ({ danger, data, mean, range, success }) => {
    if (data && data.monitorChartsData) {
        const { monitorChartsData: { durationArea, durationLine, status, durationMaxValue, statusMaxCount }, } = data;
        const durationMax = helper_1.convertMicrosecondsToMilliseconds(durationMaxValue);
        // These limits provide domain sizes for the charts
        const checkDomainLimits = [0, statusMaxCount];
        const durationDomainLimits = [0, durationMax ? durationMax : 0];
        return (react_2.default.createElement(react_2.Fragment, null,
            react_2.default.createElement(eui_1.EuiFlexGroup, { gutterSize: "s" },
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiPanel, { paddingSize: "s", style: { height: 248 } },
                        react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                            react_2.default.createElement("h4", null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.monitorCharts.monitorDuration.titleLabel", defaultMessage: "Monitor duration in milliseconds", description: "The 'ms' is an abbreviation for milliseconds." }))),
                        react_2.default.createElement(eui_1.EuiSeriesChart, { margins: { left: 64, right: 0, top: 16, bottom: 32 }, height: 200, xType: eui_1.EuiSeriesChartUtils.SCALE.TIME, xCrosshairFormat: "YYYY-MM-DD hh:mmZ", yDomain: durationDomainLimits, animateData: false },
                            react_2.default.createElement(eui_1.EuiAreaSeries, { color: range, name: i18n_1.i18n.translate('xpack.uptime.monitorCharts.monitorDuration.series.durationRangeLabel', {
                                    defaultMessage: 'Duration range',
                                }), data: durationArea.map(({ x, yMin, yMax }) => ({
                                    x,
                                    y0: helper_1.convertMicrosecondsToMilliseconds(yMin),
                                    y: helper_1.convertMicrosecondsToMilliseconds(yMax),
                                })), curve: "curveBasis" }),
                            react_2.default.createElement(eui_1.EuiLineSeries, { color: mean, lineSize: 2, name: i18n_1.i18n.translate('xpack.uptime.monitorCharts.monitorDuration.series.meanDurationLabel', {
                                    defaultMessage: 'Mean duration',
                                }), data: durationLine.map(({ x, y }) => ({
                                    x,
                                    y: helper_1.convertMicrosecondsToMilliseconds(y),
                                })) })))),
                react_2.default.createElement(eui_1.EuiFlexItem, null,
                    react_2.default.createElement(eui_1.EuiPanel, { paddingSize: "s", style: { height: 248 } },
                        react_2.default.createElement(eui_1.EuiTitle, { size: "xs" },
                            react_2.default.createElement("h4", null,
                                react_2.default.createElement(react_1.FormattedMessage, { id: "xpack.uptime.monitorCharts.checkStatus.title", defaultMessage: "Check status" }))),
                        react_2.default.createElement(eui_1.EuiSeriesChart, { margins: { left: 64, right: 0, top: 16, bottom: 32 }, height: 200, xType: eui_1.EuiSeriesChartUtils.SCALE.TIME, xCrosshairFormat: "YYYY-MM-DD hh:mmZ", stackBy: "y", yDomain: checkDomainLimits, animateData: false },
                            react_2.default.createElement(eui_1.EuiAreaSeries, { name: i18n_1.i18n.translate('xpack.uptime.monitorCharts.checkStatus.series.upCountLabel', {
                                    defaultMessage: 'Up count',
                                }), data: status.map(({ x, up }) => ({ x, y: up || 0 })), color: success }),
                            react_2.default.createElement(eui_1.EuiAreaSeries, { name: i18n_1.i18n.translate('xpack.uptime.monitorCharts.checkStatus.series.downCountLabel', {
                                    defaultMessage: 'Down count',
                                }), data: status.map(({ x, down }) => ({ x, y: down || 0 })), color: danger })))))));
    }
    return (react_2.default.createElement(react_2.Fragment, null, i18n_1.i18n.translate('xpack.uptime.monitorCharts.loadingMessage', {
        defaultMessage: 'Loading…',
    })));
};
exports.MonitorCharts = higher_order_1.withUptimeGraphQL(exports.MonitorChartsComponent, queries_1.monitorChartsQuery);
