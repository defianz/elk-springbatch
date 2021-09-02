"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const parse_is_paused_1 = require("./parse_is_paused");
const parse_autorefresh_interval_1 = require("./parse_autorefresh_interval");
const constants_1 = require("../../../../common/constants");
const { AUTOREFRESH_INTERVAL, AUTOREFRESH_IS_PAUSED, DATE_RANGE_START, DATE_RANGE_END, SEARCH, SELECTED_PING_LIST_STATUS, } = constants_1.CLIENT_DEFAULTS;
exports.getSupportedUrlParams = (params) => {
    const { autorefreshInterval, autorefreshIsPaused, dateRangeStart, dateRangeEnd, search, selectedPingStatus, } = params;
    return {
        autorefreshInterval: parse_autorefresh_interval_1.parseAutorefreshInterval(autorefreshInterval, AUTOREFRESH_INTERVAL),
        autorefreshIsPaused: parse_is_paused_1.parseIsPaused(autorefreshIsPaused, AUTOREFRESH_IS_PAUSED),
        dateRangeStart: dateRangeStart || DATE_RANGE_START,
        dateRangeEnd: dateRangeEnd || DATE_RANGE_END,
        search: search || SEARCH,
        selectedPingStatus: selectedPingStatus === undefined ? SELECTED_PING_LIST_STATUS : selectedPingStatus,
    };
};
