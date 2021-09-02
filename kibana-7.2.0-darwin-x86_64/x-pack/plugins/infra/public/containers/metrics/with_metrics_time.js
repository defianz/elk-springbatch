"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constate_latest_1 = tslib_1.__importDefault(require("constate-latest"));
const moment_1 = tslib_1.__importDefault(require("moment"));
const react_1 = tslib_1.__importStar(require("react"));
const use_interval_1 = require("../../hooks/use_interval");
const url_state_1 = require("../../utils/url_state");
exports.useMetricsTime = () => {
    const [isAutoReloading, setAutoReload] = react_1.useState(false);
    const [refreshInterval, setRefreshInterval] = react_1.useState(5000);
    const [timeRange, setTimeRange] = react_1.useState({
        from: moment_1.default()
            .subtract(1, 'hour')
            .valueOf(),
        to: moment_1.default().valueOf(),
        interval: '>=1m',
    });
    const setTimeRangeToNow = react_1.useCallback(() => {
        const range = timeRange.to - timeRange.from;
        const nowInMs = moment_1.default().valueOf();
        setTimeRange({
            from: nowInMs - range,
            to: nowInMs,
            interval: '>=1m',
        });
    }, [timeRange.from, timeRange.to]);
    use_interval_1.useInterval(setTimeRangeToNow, isAutoReloading ? refreshInterval : null);
    react_1.useEffect(() => {
        if (isAutoReloading) {
            setTimeRangeToNow();
        }
    }, [isAutoReloading]);
    return {
        timeRange,
        setTimeRange,
        refreshInterval,
        setRefreshInterval,
        isAutoReloading,
        setAutoReload,
    };
};
exports.MetricsTimeContainer = constate_latest_1.default(exports.useMetricsTime);
exports.WithMetricsTime = ({ children, }) => {
    const metricsTimeState = react_1.useContext(exports.MetricsTimeContainer.Context);
    return children({ ...metricsTimeState });
};
exports.WithMetricsTimeUrlState = () => (react_1.default.createElement(exports.WithMetricsTime, null, ({ timeRange, setTimeRange, refreshInterval, setRefreshInterval, isAutoReloading, setAutoReload, }) => (react_1.default.createElement(url_state_1.UrlStateContainer, { urlState: {
        time: timeRange,
        autoReload: isAutoReloading,
        refreshInterval,
    }, urlStateKey: "metricTime", mapToUrlState: mapToUrlState, onChange: newUrlState => {
        if (newUrlState && newUrlState.time) {
            setTimeRange(newUrlState.time);
        }
        if (newUrlState && newUrlState.autoReload) {
            setAutoReload(true);
        }
        else if (newUrlState &&
            typeof newUrlState.autoReload !== 'undefined' &&
            !newUrlState.autoReload) {
            setAutoReload(false);
        }
        if (newUrlState && newUrlState.refreshInterval) {
            setRefreshInterval(newUrlState.refreshInterval);
        }
    }, onInitialize: initialUrlState => {
        if (initialUrlState && initialUrlState.time) {
            setTimeRange(initialUrlState.time);
        }
        if (initialUrlState && initialUrlState.autoReload) {
            setAutoReload(true);
        }
        if (initialUrlState && initialUrlState.refreshInterval) {
            setRefreshInterval(initialUrlState.refreshInterval);
        }
    } }))));
const mapToUrlState = (value) => value
    ? {
        time: mapToTimeUrlState(value.time),
        autoReload: mapToAutoReloadUrlState(value.autoReload),
        refreshInterval: mapToRefreshInterval(value.refreshInterval),
    }
    : undefined;
const mapToTimeUrlState = (value) => value && (typeof value.to === 'number' && typeof value.from === 'number') ? value : undefined;
const mapToAutoReloadUrlState = (value) => (typeof value === 'boolean' ? value : undefined);
const mapToRefreshInterval = (value) => (typeof value === 'number' ? value : undefined);
exports.replaceMetricTimeInQueryString = (from, to) => Number.isNaN(from) || Number.isNaN(to)
    ? (value) => value
    : url_state_1.replaceStateKeyInQueryString('metricTime', {
        autoReload: false,
        time: {
            interval: '>=1m',
            from,
            to,
        },
    });
