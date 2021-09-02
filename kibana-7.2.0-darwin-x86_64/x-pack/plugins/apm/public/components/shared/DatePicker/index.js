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
const url_helpers_1 = require("../Links/url_helpers");
const history_1 = require("../../../utils/history");
const useLocation_1 = require("../../../hooks/useLocation");
const useUrlParams_1 = require("../../../hooks/useUrlParams");
function DatePicker() {
    const location = useLocation_1.useLocation();
    const { urlParams, refreshTimeRange } = useUrlParams_1.useUrlParams();
    function updateUrl(nextQuery) {
        history_1.history.push({
            ...location,
            search: url_helpers_1.fromQuery({
                ...url_helpers_1.toQuery(location.search),
                ...nextQuery
            })
        });
    }
    function onRefreshChange({ isPaused, refreshInterval }) {
        updateUrl({ refreshPaused: isPaused, refreshInterval });
    }
    function onTimeChange({ start, end }) {
        updateUrl({ rangeFrom: start, rangeTo: end });
    }
    const { rangeFrom, rangeTo, refreshPaused, refreshInterval } = urlParams;
    return (react_1.default.createElement(eui_1.EuiSuperDatePicker, { start: rangeFrom, end: rangeTo, isPaused: refreshPaused, refreshInterval: refreshInterval, onTimeChange: onTimeChange, onRefresh: ({ start, end }) => {
            refreshTimeRange({ rangeFrom: start, rangeTo: end });
        }, onRefreshChange: onRefreshChange, showUpdateButton: true }));
}
exports.DatePicker = DatePicker;
