"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore Missing typings for series charts
const eui_1 = require("@elastic/eui");
const i18n_1 = require("@kbn/i18n");
const react_1 = tslib_1.__importDefault(require("react"));
/**
 * These charts are going to be deprecated. Their responsive feature isn't
 * working with our app, so temporarily we will use this ratio to auto-resize
 * the histogram. When we upgrade the charts we will delete this.
 */
exports.SnapshotHistogram = ({ dangerColor, histogram, successColor, }) => (react_1.default.createElement(eui_1.EuiSeriesChart, { height: 120, stackBy: "y", xType: eui_1.EuiSeriesChartUtils.SCALE.TIME, xCrosshairFormat: "YYYY-MM-DD hh:mmZ", animateData: false },
    react_1.default.createElement(eui_1.EuiHistogramSeries, { data: histogram.map(({ x, x0, downCount }) => ({ x, x0, y: downCount || 0 })), name: i18n_1.i18n.translate('xpack.uptime.snapshotHistogram.series.downLabel', {
            defaultMessage: 'Down',
        }), color: dangerColor }),
    react_1.default.createElement(eui_1.EuiHistogramSeries, { data: histogram.map(({ x, x0, upCount }) => ({ x, x0, y: upCount || 0 })), name: i18n_1.i18n.translate('xpack.uptime.snapshotHistogram.series.upLabel', {
            defaultMessage: 'Up',
        }), color: successColor })));
