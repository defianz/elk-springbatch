"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const constate_latest_1 = tslib_1.__importDefault(require("constate-latest"));
const react_1 = require("react");
const types_1 = require("../../../server/routes/metrics_explorer/types");
const DEFAULT_TIMERANGE = {
    from: 'now-1h',
    to: 'now',
    interval: '>=10s',
};
const DEFAULT_OPTIONS = {
    aggregation: types_1.MetricsExplorerAggregation.avg,
    metrics: [],
};
exports.useMetricsExplorerOptions = () => {
    const [options, setOptions] = react_1.useState(DEFAULT_OPTIONS);
    const [currentTimerange, setTimeRange] = react_1.useState(DEFAULT_TIMERANGE);
    const [isAutoReloading, setAutoReloading] = react_1.useState(false);
    return {
        options,
        currentTimerange,
        isAutoReloading,
        setOptions,
        setTimeRange,
        startAutoReload: () => setAutoReloading(true),
        stopAutoReload: () => setAutoReloading(false),
    };
};
exports.MetricsExplorerOptionsContainer = constate_latest_1.default(exports.useMetricsExplorerOptions);
