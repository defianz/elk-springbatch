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
const hooks_1 = require("../../hooks");
const constants_1 = require("../../../common/constants");
exports.UptimeDatePicker = (props) => {
    const { history, location, refreshApp } = props;
    const [{ autorefreshInterval, autorefreshIsPaused, dateRangeStart, dateRangeEnd }, updateUrl,] = hooks_1.useUrlParams(history, location);
    return (react_1.default.createElement(eui_1.EuiSuperDatePicker, { start: dateRangeStart, end: dateRangeEnd, commonlyUsedRanges: constants_1.CLIENT_DEFAULTS.COMMONLY_USED_DATE_RANGES, isPaused: autorefreshIsPaused, refreshInterval: autorefreshInterval, onTimeChange: ({ start, end }) => {
            updateUrl({ dateRangeStart: start, dateRangeEnd: end });
            refreshApp();
        }, 
        // @ts-ignore onRefresh is not defined on EuiSuperDatePicker's type yet
        onRefresh: refreshApp, onRefreshChange: ({ isPaused, refreshInterval }) => {
            updateUrl({
                autorefreshInterval: refreshInterval === undefined ? autorefreshInterval : refreshInterval,
                autorefreshPaused: isPaused,
            });
        } }));
};
