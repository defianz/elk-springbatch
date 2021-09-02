"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore missing type definition
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
const format_sparkline_counts_1 = require("./format_sparkline_counts");
const seriesHasCounts = (series) => {
    return series.some(point => !!point.y);
};
/**
 * There is a specific focus on the monitor's down count, the up series is not shown,
 * so we will only render the series component if there are down counts for the selected monitor.
 * @param props - the values for the monitor this sparkline reflects
 */
exports.MonitorSparkline = ({ dangerColor, monitor: { downSeries }, }) => {
    return downSeries && seriesHasCounts(downSeries) ? (react_1.default.createElement(eui_1.EuiSeriesChart, { animateData: false, showDefaultAxis: false, width: 180, height: 70, stackBy: "y", 
        // TODO: style hack
        style: { marginBottom: -24 }, xType: eui_1.EuiSeriesChartUtils.SCALE.TIME, xCrosshairFormat: "YYYY-MM-DD hh:mmZ", showCrosshair: false },
        react_1.default.createElement(eui_1.EuiHistogramSeries, { data: format_sparkline_counts_1.formatSparklineCounts(downSeries || []), name: i18n_1.i18n.translate('xpack.uptime.monitorList.downLineSeries.downLabel', {
                defaultMessage: 'Down',
            }), color: dangerColor }))) : null;
};
