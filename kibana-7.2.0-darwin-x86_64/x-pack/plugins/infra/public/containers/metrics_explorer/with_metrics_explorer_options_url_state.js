"use strict";
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const react_1 = tslib_1.__importStar(require("react"));
const t = tslib_1.__importStar(require("io-ts"));
const ThrowReporter_1 = require("io-ts/lib/ThrowReporter");
const color_palette_1 = require("../../../common/color_palette");
const url_state_1 = require("../../utils/url_state");
const use_metrics_explorer_options_1 = require("./use_metrics_explorer_options");
exports.WithMetricsExplorerOptionsUrlState = () => {
    const { options, currentTimerange, setOptions: setRawOptions, setTimeRange } = react_1.useContext(use_metrics_explorer_options_1.MetricsExplorerOptionsContainer.Context);
    const setOptions = (value) => {
        setRawOptions(value);
    };
    const urlState = react_1.useMemo(() => ({
        options,
        timerange: currentTimerange,
    }), [options, currentTimerange]);
    return (react_1.default.createElement(url_state_1.UrlStateContainer, { urlState: urlState, urlStateKey: "metricsExplorer", mapToUrlState: mapToUrlState, onChange: newUrlState => {
            if (newUrlState && newUrlState.options) {
                setOptions(newUrlState.options);
            }
            if (newUrlState && newUrlState.timerange) {
                setTimeRange(newUrlState.timerange);
            }
        }, onInitialize: newUrlState => {
            if (newUrlState && newUrlState.options) {
                setOptions(newUrlState.options);
            }
            if (newUrlState && newUrlState.timerange) {
                setTimeRange(newUrlState.timerange);
            }
        } }));
};
function isMetricExplorerOptions(subject) {
    const MetricRequired = t.type({
        aggregation: t.string,
    });
    const MetricOptional = t.partial({
        field: t.string,
        rate: t.boolean,
        color: t.union(lodash_1.values(color_palette_1.MetricsExplorerColor).map(c => t.literal(c))),
        label: t.string,
    });
    const Metric = t.intersection([MetricRequired, MetricOptional]);
    const OptionsRequired = t.type({
        aggregation: t.string,
        metrics: t.array(Metric),
    });
    const OptionsOptional = t.partial({
        limit: t.number,
        groupBy: t.string,
        filterQuery: t.string,
    });
    const Options = t.intersection([OptionsRequired, OptionsOptional]);
    const result = Options.decode(subject);
    try {
        ThrowReporter_1.ThrowReporter.report(result);
        return true;
    }
    catch (e) {
        return false;
    }
}
function isMetricExplorerTimeOption(subject) {
    const TimeRange = t.type({
        from: t.string,
        to: t.string,
        interval: t.string,
    });
    const result = TimeRange.decode(subject);
    try {
        ThrowReporter_1.ThrowReporter.report(result);
        return true;
    }
    catch (e) {
        return false;
    }
}
const mapToUrlState = (value) => {
    const finalState = {};
    if (value) {
        if (value.options && isMetricExplorerOptions(value.options)) {
            lodash_1.set(finalState, 'options', value.options);
        }
        if (value.timerange && isMetricExplorerTimeOption(value.timerange)) {
            lodash_1.set(finalState, 'timerange', value.timerange);
        }
        return finalState;
    }
};
